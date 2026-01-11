"use client";
import { useState, useEffect } from "react";
import { apiService } from "@/app/utils";
import OdooLoginModal from "@/app/components/OdooLoginModal";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface UserData {
  id: string;
  name: string;
  email: string;
  phone?: string;
  city?: string;
  applicationStatus: string;
  submittedAt: string | null;
  applicationId?: string | null;
  allFormsCompleted?: boolean;
  isPaid?: boolean;
  paymentAmount?: number | null;
  paidAt?: string | null;
}

export default function UserDashboard() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showOdooModal, setShowOdooModal] = useState(false);
  const [isOdooLoggedIn, setIsOdooLoggedIn] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [applicationData, setApplicationData] = useState<any>(null);
  const [reportStatus, setReportStatus] = useState<'loading' | 'available' | 'not_generated' | 'error'>('loading');
const [reportApplicationId, setReportApplicationId] = useState<string | null>(null);
const router = useRouter();

  useEffect(() => {
    const loadUserData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await apiService.get("/api/auth/me");
        
        if (response.success) {
          setUserData(response.data);
          
          // If user has an application ID, try to fetch application details for syncing
          if (response.data.applicationId) {
            try {
              // Try to get application from user's applications list
              const appsResponse = await apiService.get("/api/applications/user");
              if (appsResponse.success && appsResponse.data?.applications) {
                const app = appsResponse.data.applications.find(
                  (a: any) => a.id === response.data.applicationId
                );
                if (app) {
                  setApplicationData(app);
                }
              }
            } catch (err) {
              console.log("Could not fetch application details:", err);
            }
          }
        } else {
          setError(response.message || "Failed to load user data");
        }
      } catch (error) {
        console.error("Failed to load user data:", error);
        setError("Failed to load user data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, []);

  // Check Odoo login status
  useEffect(() => {
    const checkOdooLoginStatus = () => {
      const odooToken = localStorage.getItem("odooToken");
      setIsOdooLoggedIn(!!odooToken);
    };

    checkOdooLoginStatus();
    // Also check when storage changes (e.g., after login)
    window.addEventListener("storage", checkOdooLoginStatus);
    return () => window.removeEventListener("storage", checkOdooLoginStatus);
  }, []);

  // Check report status
useEffect(() => {
  const checkReportStatus = async () => {
    if (!userData?.applicationId) {
      setReportStatus('not_generated');
      return;
    }

    try {
      setReportStatus('loading');
      const response = await apiService.get(`/api/applications/${userData.applicationId}/learner-report`);
      
      if (response.success && response.data) {
        setReportStatus('available');
        setReportApplicationId(userData.applicationId);
      } else {
        setReportStatus('not_generated');
      }
    } catch (err) {
      console.error("Error checking report status:", err);
      setReportStatus('error');
    }
  };

  if (userData?.applicationId) {
    checkReportStatus();
  }
}, [userData?.applicationId]);

  // Helper function to map relation to child ID
  const mapRelationToChildId = (relation: string | null): number => {
    if (!relation) return 1;
    const relationLower = relation.toLowerCase().trim();
    const mapping: Record<string, number> = {
      "father": 1, "dad": 1, "mother": 2, "mom": 2, "parent": 1, "guardian": 3, "other": 4,
    };
    for (const [key, id] of Object.entries(mapping)) {
      if (relationLower.includes(key)) return id;
    }
    const numValue = parseInt(relation);
    return !isNaN(numValue) ? numValue : 1;
  };

  // Helper function to normalize gender
  const normalizeGender = (gender: string | null | undefined): string | null => {
    if (!gender) return null;
    const genderLower = gender.toLowerCase();
    if (genderLower === "f" || genderLower === "m") return genderLower;
    if (genderLower.startsWith("f") || genderLower === "female") return "f";
    if (genderLower.startsWith("m") || genderLower === "male") return "m";
    return null;
  };

  // Helper function to validate and format school_year
  const normalizeSchoolYear = (schoolYear: string | null | undefined): string | null => {
    if (!schoolYear) return null;
    const yearStr = String(schoolYear).trim();
    const yearMatch = yearStr.match(/^(\d{4})$/);
    if (yearMatch) return yearMatch[1];
    const dateMatch = yearStr.match(/^(\d{4})-\d{2}-\d{2}$/);
    if (dateMatch) return dateMatch[1];
    const parsedDate = new Date(schoolYear);
    if (!isNaN(parsedDate.getTime())) return String(parsedDate.getFullYear());
    return null;
  };

  // Handle syncing application to Odoo
  const handleSyncToOdoo = async (): Promise<boolean> => {
    if (!applicationData || !userData?.applicationId) {
      toast.error("Application data not available for syncing");
      return false;
    }

    const sessionSid = localStorage.getItem('odooToken');
    if (!sessionSid) {
      toast.error("Please login to Odoo first");
      return false;
    }

    try {
      setSyncing(true);
      
      const parent = {
        full_name: applicationData.parentFullName || userData.name || "",
        email: applicationData.parentEmail || userData.email || "",
        phone: userData.phone || "",
        relation_to_child_id: 1, // Default to parent
      };

      const student = {
        full_name: applicationData.childFullName || "",
        date_of_birth: null, // May not be available in user dashboard data
        age: applicationData.childAge || null,
        gender: normalizeGender(null),
        school_year: normalizeSchoolYear(applicationData.childGrade || null),
        current_school: null,
        school_type: null,
      };

      const response = await apiService.post("/api/odoo/admission/create", {
        sessionSid,
        parent,
        student,
        applicationId: userData.applicationId,
      });

      if (response.success && response.data) {
        // Toast will be shown by the caller in automatic flow
        return true;
      } else {
        const errorMsg = response.message || "Failed to create admission in Odoo";
        console.error("Odoo sync failed:", response);
        toast.error(errorMsg, {
          style: {
            background: "#ef4444",
            color: "#fff",
          },
        });
        return false;
      }
    } catch (error: any) {
      const errorMsg = error.message || "Failed to sync to Odoo";
      console.error("Odoo sync error:", error);
      toast.error(errorMsg, {
        style: {
          background: "#ef4444",
          color: "#fff",
        },
      });
      return false;
    } finally {
      setSyncing(false);
    }
  };

  // Handle Odoo logout
  const handleOdooLogout = async (suppressToast: boolean = false) => {
    try {
      const odooToken = localStorage.getItem("odooToken");
      
      if (odooToken) {
        await apiService.post("/api/odoo/logout", {
          sessionToken: odooToken,
        });
      }

      // Clear local storage
      localStorage.removeItem("odooToken");
      localStorage.removeItem("odooSession");
      setIsOdooLoggedIn(false);
      
      if (!suppressToast) {
        toast.success("Successfully logged out from Odoo!", {
          style: {
            background: "#3b82f6",
            color: "#fff",
          },
        });
      }
    } catch (error: any) {
      console.error("Odoo logout error:", error);
      // Still clear local storage even if API call fails
      localStorage.removeItem("odooToken");
      localStorage.removeItem("odooSession");
      setIsOdooLoggedIn(false);
      
      if (!suppressToast) {
        toast.success("Logged out from Odoo", {
          style: {
            background: "#3b82f6",
            color: "#fff",
          },
        });
      }
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-xl shadow-sm ring-1 ring-black/5 p-6">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm ring-1 ring-black/5 p-6">
          <div className="animate-pulse">
            <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 rounded w-1/6"></div>
              <div className="h-8 bg-gray-200 rounded w-1/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/6"></div>
              <div className="h-4 bg-gray-200 rounded w-1/3"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-xl shadow-sm ring-1 ring-black/5 p-6">
          <div className="text-center">
            <div className="text-red-600 mb-4">
              <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Error Loading Data</h3>
            <p className="text-gray-600 mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-white rounded-xl shadow-sm ring-1 ring-black/5 p-6">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Welcome back, {userData?.name}!</h2>
        <p className="text-slate-600">Here's an overview of your account and application status.</p>
      </div>

      {/* Application Status */}
      <div className="bg-white rounded-xl shadow-sm ring-1 ring-black/5 p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Application Status</h3>
        
        <div className="space-y-4">
          <div>
            <p className="text-sm text-slate-500">Current Status</p>
            <div className="mt-1">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                userData?.applicationStatus === 'completed' ? 'bg-green-100 text-green-800' :
                userData?.applicationStatus === 'approved' ? 'bg-green-100 text-green-800' :
                userData?.applicationStatus === 'rejected' ? 'bg-red-100 text-red-800' :
                userData?.applicationStatus === 'No Application' ? 'bg-gray-100 text-gray-800' :
                'bg-yellow-100 text-yellow-800'
              }`}>
                {userData?.applicationStatus}
              </span>
            </div>
          </div>
          
          <div>
            <p className="text-sm text-slate-500">Submitted On</p>
            <p className="font-medium text-slate-900">
              {userData?.submittedAt ? new Date(userData.submittedAt).toLocaleDateString() : 'No application submitted'}
            </p>
          </div>

          {/* Odoo Approve/Logout Button - Show when all forms are completed */}
          {userData?.allFormsCompleted && userData?.applicationStatus === 'completed' && (
            <div className="pt-4 border-t border-gray-200">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-blue-900 mb-2">
                  🎉 All Forms Completed!
                </h4>
                <p className="text-sm text-blue-800 mb-3">
                  {isOdooLoggedIn 
                    ? "You are logged in to Odoo. You can logout when done."
                    : "Your application has been completed. Approve student to sync your registration data."
                  }
                </p>
                {isOdooLoggedIn ? (
                  <button
                    onClick={() => handleOdooLogout(false)}
                    className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium flex items-center justify-center gap-2"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      />
                    </svg>
                    Logout Odoo
                  </button>
                ) : (
                  <button
                    onClick={() => setShowOdooModal(true)}
                    className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center gap-2"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    Approve Student
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Payment Status */}
      {userData?.applicationId && (
        <div className="bg-white rounded-xl shadow-sm ring-1 ring-black/5 p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Payment Status</h3>
          
          <div className="space-y-4">
            <div>
              <p className="text-sm text-slate-500">Payment Status</p>
              <div className="mt-1">
                {userData?.isPaid ? (
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-800">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Paid
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold bg-red-100 text-red-800">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Unpaid
                  </span>
                )}
              </div>
            </div>

            {userData?.isPaid && (
              <>
                <div>
                  <p className="text-sm text-slate-500">Payment Amount</p>
                  <p className="font-medium text-slate-900">
                    ${userData?.paymentAmount || 150}
                  </p>
                </div>
                {userData?.paidAt && (
                  <div>
                    <p className="text-sm text-slate-500">Paid On</p>
                    <p className="font-medium text-slate-900">
                      {new Date(userData.paidAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                )}
              </>
            )}    
          </div>
        </div>
      )}

        {/* Learner Report Section - Separate Card */}
      {userData?.applicationId && (
        <div className="bg-white rounded-xl shadow-sm ring-1 ring-black/5 p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">AI-Generated Learner Report</h3>
          
          <div className="space-y-4">
            <div>
              <p className="text-sm text-slate-500">Report Status</p>
              <div className="mt-1">
                {reportStatus === 'loading' && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold bg-gray-100 text-gray-800">
                    <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Checking...
                  </span>
                )}
                {reportStatus === 'available' && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-800">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Available
                  </span>
                )}
                 {reportStatus === 'not_generated' && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold bg-yellow-100 text-yellow-800">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Not Generated Yet
                  </span>
                )}
                {reportStatus === 'error' && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold bg-red-100 text-red-800">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                    Error
                  </span>
                )}
              </div>
            </div>
             {reportStatus === 'available' && reportApplicationId && (
              <div className="pt-4 border-t border-gray-200">
                <p className="text-sm text-slate-600 mb-3">
                  Your comprehensive AI-generated learner assessment report is ready for review.
                </p>
                <button
                  onClick={() => router.push(`/dashboard/user/learner-report/${reportApplicationId}`)}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl text-sm w-full sm:w-auto"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  View Learner Report
                </button>
              </div>
            )}

            {reportStatus === 'not_generated' && (
              <div className="pt-4 border-t border-gray-200">
                <p className="text-sm text-slate-600">
                  The AI-generated learner report will be available here once it has been generated by the assessment team.
                </p>
              </div>
            )}
          </div>
        </div>
      )}


      {/* User Details */}
      <div className="bg-white rounded-xl shadow-sm ring-1 ring-black/5 p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Account Details</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-slate-500">Email</p>
            <p className="font-medium text-slate-900">{userData?.email}</p>
          </div>
          {userData?.phone && (
            <div>
              <p className="text-sm text-slate-500">Phone</p>
              <p className="font-medium text-slate-900">{userData.phone}</p>
            </div>
          )}
          {userData?.city && (
            <div>
              <p className="text-sm text-slate-500">City</p>
              <p className="font-medium text-slate-900">{userData.city}</p>
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      {/* <div className="bg-white rounded-xl shadow-sm ring-1 ring-black/5 p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Quick Actions</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button className="text-left p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
            <p className="font-medium text-blue-900">View Application Details</p>
            <p className="text-sm text-blue-700">Review your submitted information</p>
          </button>
          
          <button className="text-left p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors">
            <p className="font-medium text-green-900">Contact Support</p>
            <p className="text-sm text-green-700">Get help with your application</p>
          </button>
        </div>
      </div> */}

      {/* Odoo Login Modal */}
      <OdooLoginModal
        isOpen={showOdooModal}
        onClose={() => {
          setShowOdooModal(false);
          // Check login status after modal closes
          const odooToken = localStorage.getItem("odooToken");
          setIsOdooLoggedIn(!!odooToken);
        }}
        onSuccess={async () => {
          // Update login status after successful login
          setIsOdooLoggedIn(true);
          
          // Step 1: Show login success (blue/info)
          toast("✅ Successfully logged in to Odoo!", {
            icon: "🔵",
            style: {
              background: "#3b82f6",
              color: "#fff",
            },
            duration: 2000,
          });
          
          // Wait 1.5 seconds before starting sync
          await new Promise(resolve => setTimeout(resolve, 1500));
          
          if (applicationData && userData?.applicationId) {
            // Step 2: Show syncing message (yellow/loading)
            toast.loading("⏳ Syncing application to Odoo...", { 
              id: "syncing",
              style: {
                background: "#f59e0b",
                color: "#fff",
              },
            });
            
            // Wait 1 second before actually syncing (for visual effect)
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            const syncSuccess = await handleSyncToOdoo();
            
            if (syncSuccess) {
              // Dismiss loading toast
              toast.dismiss("syncing");
              
              // Wait 0.5 seconds
              await new Promise(resolve => setTimeout(resolve, 500));
              
              // Step 3: Show sync success (green)
              toast.success("✅ Sync completed successfully!", {
                style: {
                  background: "#10b981",
                  color: "#fff",
                },
                duration: 2000,
              });
              
              // Wait 2 seconds before showing logout message
              await new Promise(resolve => setTimeout(resolve, 2000));
              
              // Step 4: Show logout message (blue/info)
              toast("🔄 Logging out from Odoo...", {
                icon: "🔵",
                style: {
                  background: "#3b82f6",
                  color: "#fff",
                },
                duration: 2000,
              });
              
              // Wait 1.5 seconds before actually logging out
              await new Promise(resolve => setTimeout(resolve, 1500));
              
              await handleOdooLogout(true); // suppressToast = true
              
              // Wait 0.5 seconds
              await new Promise(resolve => setTimeout(resolve, 500));
              
              // Step 5: Show final success (green)
              toast.success("🎉 Process completed successfully!", {
                style: {
                  background: "#10b981",
                  color: "#fff",
                },
                duration: 3000,
              });
            } else {
              toast.dismiss("syncing");
              // Don't logout if sync failed - let user try again
            }
          } else {
            toast.error("❌ Application data not available. Please contact support.", {
              style: {
                background: "#ef4444",
                color: "#fff",
              },
            });
          }
        }}
      />
    </div>
  );
}