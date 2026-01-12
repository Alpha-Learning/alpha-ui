"use client";
import React, { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { apiService } from "@/app/utils";
import OdooLoginModal from "@/app/components/OdooLoginModal";
import toast from "react-hot-toast";

// Stage 3 Dropdown Component
// function Stage3Dropdown({ applicationId, isCompleted, stageTitle }: { 
function Stage3Dropdown({ applicationId, isCompleted, stageTitle, isArchived = false,isPaid = false }: {
  applicationId: string; 
  isCompleted: boolean; 
  stageTitle: string; 
    isArchived?: boolean;
      isPaid?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
  const forms = [
    {
      name: "Parent/Guardian Form",
      url: `${baseUrl}/form/parent-guardian/${applicationId}`,
      color: "blue"
    },
    {
      name: "Caregiver Form", 
      url: `${baseUrl}/form/caregiver/${applicationId}`,
      color: "green"
    },
    {
      name: "Outsider Form",
      url: `${baseUrl}/form/outsider/${applicationId}`,
      color: "purple"
    }
  ];

  const copyToClipboard = async (url: string, formName: string) => {
     if (isArchived) return;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(formName);
      setTimeout(() => setCopied(null), 2000);
    } catch (err) {
    }
  };

  return (
    <div className="relative h-full">
      <div 
        className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 h-full min-h-[180px] flex flex-col ${
        //   isCompleted 
        //     ? 'bg-green-50 border-green-200 hover:border-green-300' 
        //     : 'bg-gray-50 border-gray-200 hover:border-gray-300'
        // }`}
        // onClick={() => setIsOpen(!isOpen)}
        isArchived
            ? 'bg-gray-100 border-gray-300 opacity-75 cursor-not-allowed'
            : isCompleted 
            ? 'bg-green-50 border-green-200 hover:border-green-300 cursor-pointer' 
            : 'bg-gray-50 border-gray-200 hover:border-gray-300 cursor-pointer'
        }`}
         onClick={() => !isArchived && setIsOpen(!isOpen)}
      >
        <div className="flex items-start justify-between mb-3">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
            isCompleted 
              ? 'bg-green-500 text-white' 
              : 'bg-gray-300 text-gray-600'
          }`}>
            {isCompleted ? '✓' : '3'}
          </div>
          <div className={`w-3 h-3 rounded-full ${
            isCompleted ? 'bg-green-500' : 'bg-gray-300'
          }`}></div>
                    {/* {isArchived && (
            <div className="mt-2 text-xs text-gray-500 italic">
              Rejected
            </div>
          )} */}
        </div>
        <div className="text-sm font-medium text-gray-900 mb-1">{stageTitle}</div>
        <div className="flex items-center justify-between">
          <div className={`text-xs font-medium ${
            isCompleted ? 'text-green-600' : 'text-gray-500'
          }`}>
            {isCompleted ? 'Completed' : 'Pending'}
          </div>
          <span className="text-blue-600 text-xs font-medium">▼ Forms</span>
        </div>
      </div>
      
      {/* {isOpen && ( */}
            {isOpen && !isArchived && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-xl z-20">
          <div className="p-4">
            <div className="text-sm font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <div className="w-2 h-2  rounded-full"></div>
              Share Forms
            </div>
<div className="space-y-2">
  {forms.map((form, index) => {
    const isDisabled = !isPaid;
    return (
      <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg border border-gray-100">
        <div className="flex items-center gap-3">
          <div className={`w-2 h-2 rounded-full `}></div>
          <span className={`text-sm font-medium ${isDisabled ? 'text-gray-400' : 'text-gray-700'}`}>
            {form.name}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative group">
            <button
              onClick={() => copyToClipboard(form.url, form.name)}
              disabled={isArchived || isDisabled}
              className="text-xs px-3 py-1 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {copied === form.name ? 'Copied!' : 'Copy'}
            </button>
            {isDisabled && !isArchived && (
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                Questionnaire will be available once payment is confirmed.
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1">
                  <div className="border-4 border-transparent border-t-gray-900"></div>
                </div>
              </div>
            )}
          </div>
          {!isArchived && (
            <div className="relative group">
              {isDisabled ? (
                <button
                  disabled
                  className="text-xs px-3 py-1 bg-gray-100 text-gray-400 rounded-md cursor-not-allowed font-medium"
                >
                  Open
                </button>
              ) : (
                <Link
                  href={form.url}
                  className="text-xs px-3 py-1 bg-green-100 text-green-700 rounded-md hover:bg-green-200 transition-colors font-medium"
                  target="_blank"
                >
                  Open
                </Link>
              )}
              {isDisabled && (
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                  Questionnaire will be available once payment is confirmed.
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1">
                    <div className="border-4 border-transparent border-t-gray-900"></div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  })}
</div>
          </div>
        </div>
      )}
    </div>
  );
}

// AI Assessment Card Component
function AIAssessmentCard({ applicationId, childName }: { 
  applicationId: string; 
  childName: string;
}) {
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);
  const [hasAssessment, setHasAssessment] = useState(false);

  const checkExistingAssessment = useCallback(async () => {
    try {
      setChecking(true);
      const response = await apiService.get(`/api/admin/applications/${applicationId}/ai-assessment`);
      // If response.success is true and data exists, assessment exists
      if (response.success && response.data) {
        setHasAssessment(true);
      } else {
        // success: false means no assessment exists yet (expected)
        setHasAssessment(false);
      }
    } catch (error: any) {
      // If apiService throws an error, treat as no assessment exists
      // This can happen if the API is unreachable or returns an error
      // The card will still show, allowing user to try generating
      console.warn('Could not check for existing assessment:', error?.message || error);
      setHasAssessment(false);
    } finally {
      setChecking(false);
    }
  }, [applicationId]);

  useEffect(() => {
    checkExistingAssessment();
  }, [checkExistingAssessment]);

  const handleGenerateAssessment = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      setLoading(true);
      
      // Create an AbortController with a 130-second timeout (backend has 120s maxDuration)
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 130000); // 130 seconds
      
      try {
        // Use fetch directly with timeout signal for this long-running request
        const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
        const response = await fetch(`/api/admin/applications/${applicationId}/ai-assessment/generate`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...(token && { 'Authorization': `Bearer ${token}` }),
          },
          signal: controller.signal,
        });
        
        clearTimeout(timeoutId);
        
        const data = await response.json();
        
        if (data.success) {
          toast.success("AI Assessment generated successfully!");
          setHasAssessment(true);
          // Navigate to assessment page after a short delay
          setTimeout(() => {
            window.location.href = `/admin/applications/${applicationId}/ai-assessment`;
          }, 500);
        } else {
          toast.error(data.message || "Failed to generate assessment");
        }
      } catch (fetchError: any) {
        clearTimeout(timeoutId);
        
        // If the request was aborted (timeout), check if assessment was actually created
        if (fetchError.name === 'AbortError' || fetchError.message?.includes('aborted')) {
          console.log("Request timed out, checking if assessment was created...");
          
          // Wait a moment for the backend to finish
          await new Promise(resolve => setTimeout(resolve, 2000));
          
          // Check if assessment was actually created
          try {
            const checkResponse = await apiService.get(`/api/admin/applications/${applicationId}/ai-assessment`);
            if (checkResponse.success && checkResponse.data) {
              // Assessment was created successfully despite timeout
              toast.success("AI Assessment generated successfully! (This may take a moment to appear)");
              setHasAssessment(true);
              setTimeout(() => {
                window.location.href = `/admin/applications/${applicationId}/ai-assessment`;
              }, 500);
              return;
            }
          } catch (checkError) {
            console.error("Could not verify assessment creation:", checkError);
          }
          
          toast.error("Generation is taking longer than expected. Please wait a moment and refresh the page to check if it was created.");
        } else {
          throw fetchError; // Re-throw other errors
        }
      }
    } catch (error: any) {
      console.error("Error generating assessment:", error);
      const errorMessage = error?.message || "Failed to generate assessment";
      
      // If it's a network/timeout error, provide helpful message
      if (errorMessage.includes('aborted') || errorMessage.includes('timeout') || errorMessage.includes('network')) {
        toast.error("Generation is taking longer than expected. Please wait a moment and refresh the page to check if it was created.");
      } else {
        toast.error(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  if (checking) {
    return (
      <div className="relative h-full">
        <div className="p-4 rounded-lg border-2 bg-gray-50 border-gray-200 h-full min-h-[180px] flex flex-col items-center justify-center">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-600"></div>
          <p className="text-xs text-gray-500 mt-2">Checking...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-full">
      <div 
        className={`p-4 rounded-lg border-2 transition-all duration-200 h-full min-h-[180px] flex flex-col ${
          hasAssessment
            ? 'bg-gradient-to-br from-purple-50 to-purple-100 border-purple-300 hover:border-purple-400 hover:shadow-md' 
            : 'bg-gradient-to-br from-purple-50 to-indigo-50 border-purple-200 hover:border-purple-300'
        }`}
      >
        <div className="flex items-start justify-between mb-3">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
            hasAssessment
              ? 'bg-purple-500 text-white' 
              : 'bg-gradient-to-br from-purple-500 to-indigo-600 text-white'
          }`}>
            {hasAssessment ? '✓' : 'AI'}
          </div>
          <div className={`w-3 h-3 rounded-full ${
            hasAssessment ? 'bg-purple-500' : 'bg-purple-400 animate-pulse'
          }`}></div>
        </div>
        <div className="text-sm font-medium text-gray-900 mb-1">
          AI Assessment
        </div>
        <div className="text-xs text-gray-600 mb-3">
          {hasAssessment 
            ? "View comprehensive AI-powered assessment report"
            : "Generate comprehensive assessment using all form data"
          }
        </div>
        <div className="flex items-center justify-between mt-auto">
          {hasAssessment ? (
            <>
              <div className="text-xs font-medium text-purple-600 flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Assessment Ready
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  window.location.href = `/admin/applications/${applicationId}/ai-assessment`;
                }}
                className="px-4 py-2 bg-purple-600 text-white text-xs font-medium rounded-lg hover:bg-purple-700 transition-colors shadow-sm flex items-center gap-1"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                View Report
              </button>
            </>
          ) : (
            <>
              <div className="text-xs text-gray-500">
                Not generated yet
              </div>
              <button
                onClick={handleGenerateAssessment}
                disabled={loading}
                className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs font-medium rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm flex items-center gap-1"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white"></div>
                    Generating...
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    Generate
                  </>
                )}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// Stage 7 Dropdown Component
// function Stage7Dropdown({ applicationId, isCompleted, stageTitle, childAge }: { 
function Stage7Dropdown({ applicationId, isCompleted, stageTitle, childAge, isArchived = false }: {
  applicationId: string; 
  isCompleted: boolean; 
  stageTitle: string;
  childAge?: number | null;
    isArchived?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
  
  // Dynamically determine which forms to show based on child's age
  // Age 5-7 → KS1, Age 8-11 → KS2
  const forms: Array<{ name: string; url: string; color: string }> = [];
  
  if (childAge !== null && childAge !== undefined) {
    if (childAge >= 5 && childAge <= 7) {
      // KS1 for ages 5-7
      forms.push({
        name: "KS1 Interview Questions",
        url: `${baseUrl}/form/ks1-interview/${applicationId}`,
        color: "teal"
      });
    } else if (childAge >= 8 && childAge <= 11) {
      // KS2 for ages 8-11
      forms.push({
        name: "KS2 Interview Questions", 
        url: `${baseUrl}/form/ks2-interview/${applicationId}`,
        color: "orange"
      });
    }
  }
  
  // Always include Guided Observation Procedure
  // forms.push({
  //   name: "Guided Observation Procedure",
  //   url: `${baseUrl}/form/guided-observation/${applicationId}`,
  //   color: "purple"
  // });

  const copyToClipboard = async (url: string, formName: string) => {
     if (isArchived) return;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(formName);
      setTimeout(() => setCopied(null), 2000);
    } catch (err) {
    }
  };

  return (
    <div className="relative h-full">
      <div 
        className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 h-full min-h-[180px] flex flex-col ${
        //   isCompleted 
        //     ? 'bg-green-50 border-green-200 hover:border-green-300' 
        //     : 'bg-gray-50 border-gray-200 hover:border-gray-300'
        // }`}
        // onClick={() => setIsOpen(!isOpen)}
        isArchived
            ? 'bg-gray-100 border-gray-300 opacity-75 cursor-not-allowed'
            : isCompleted 
            ? 'bg-green-50 border-green-200 hover:border-green-300 cursor-pointer' 
            : 'bg-gray-50 border-gray-200 hover:border-gray-300 cursor-pointer'
        }`}
        onClick={() => !isArchived && setIsOpen(!isOpen)}
      >
        <div className="flex items-start justify-between mb-3">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
            isCompleted 
              ? 'bg-green-500 text-white' 
              : 'bg-gray-300 text-gray-600'
          }`}>
            {isCompleted ? '✓' : '5'}
          </div>
          <div className={`w-3 h-3 rounded-full ${
            isCompleted ? 'bg-green-500' : 'bg-gray-300'
          }`}></div>
        </div>
        <div className="text-sm font-medium text-gray-900 mb-1">{stageTitle}</div>
        <div className="flex items-center justify-between">
          <div className={`text-xs font-medium ${
            isCompleted ? 'text-green-600' : 'text-gray-500'
          }`}>
            {isCompleted ? 'Completed' : 'Pending'}
          </div>
          <span className="text-blue-600 text-xs font-medium">▼ Forms</span>
        </div>
      </div>
      
      {/* {isOpen && ( */}
            {isOpen && !isArchived && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-xl z-20">
          <div className="p-4">
            <div className="text-sm font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
              Assessment Forms
            </div>
            <div className="space-y-2">
              {forms.map((form, index) => (
                <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg border border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full bg-${form.color}-500`}></div>
                    <span className="text-sm font-medium text-gray-700">{form.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                                        <button
                      onClick={() => copyToClipboard(form.url, form.name)}
                      disabled={isArchived}
                      className="text-xs px-3 py-1 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {copied === form.name ? 'Copied!' : 'Copy'}
                    </button>
                    {!isArchived && (
                      <Link
                        href={form.url}
                        className="text-xs px-3 py-1 bg-green-100 text-green-700 rounded-md hover:bg-green-200 transition-colors font-medium"
                        target="_blank"
                      >
                        Open
                      </Link>
                    )}
                    {/* <button
                      onClick={() => copyToClipboard(form.url, form.name)}
                      className="text-xs px-3 py-1 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors font-medium"
                    >
                      {copied === form.name ? 'Copied!' : 'Copy'}
                    </button> */}
                    {/* <Link
                      href={form.url}
                      className="text-xs px-3 py-1 bg-green-100 text-green-700 rounded-md hover:bg-green-200 transition-colors font-medium"
                      target="_blank"
                    >
                      Open
                    </Link> */}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

type AppDetail = {
  id: string;
  parentFullName: string;
  parentEmail: string;
  parentPhone?: string | null;
  relationToChild?: string | null;
  childFullName: string;
  childDateOfBirth?: string | Date | null;
  childAge?: number | null;
  childGender?: string | null;
  childSchoolYear?: string | null;
  childCurrentSchool?: string | null;
  childSchoolType?: string | null;
  status: string;
  isPaid: boolean;
  paymentAmount?: number | null;
  paidAt?: string | null;
  currentStage: number;
  // Form completion status
  isFirstFormCompleted?: boolean;
  isSecondFormCompleted?: boolean;
  isThirdFormCompleted?: boolean;
  isFourthFormCompleted?: boolean;
  isFifthFormCompleted?: boolean;
  isSixthFormCompleted?: boolean;
  isSeventhFormCompleted?: boolean;
  isEighthFormCompleted?: boolean;
  isNinthFormCompleted?: boolean;
   isTenthFormCompleted?: boolean; 
  // Individual questionnaire completion flags
  isParentGuardianFormCompleted?: boolean;
  isCaregiverFormCompleted?: boolean;
  isOutsiderFormCompleted?: boolean;
};

export default function AdminApplicationDetailPage() {
  const params = useParams<{ id: string }>();
  const [data, setData] = useState<AppDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showOdooModal, setShowOdooModal] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [rejecting, setRejecting] = useState(false);
  const [showRejectConfirm, setShowRejectConfirm] = useState(false);
  const [isOdooLoggedIn, setIsOdooLoggedIn] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await apiService.get(`/api/admin/applications/${params.id}`);
        if (res.success) setData(res.data);
        else setError(res.message || 'Failed to load');
      } catch (e: any) {
        setError(e?.message || 'Failed to load');
      } finally {
        setLoading(false);
      }
    })();
  }, [params.id]);

  // Check Odoo login status
  useEffect(() => {
    const checkOdooLoginStatus = () => {
      const odooToken = typeof window !== 'undefined' ? localStorage.getItem("odooToken") : null;
      setIsOdooLoggedIn(!!odooToken);
    };

    checkOdooLoginStatus();
    // Also check when storage changes (e.g., after login)
    if (typeof window !== 'undefined') {
      window.addEventListener("storage", checkOdooLoginStatus);
      return () => window.removeEventListener("storage", checkOdooLoginStatus);
    }
  }, []);

  if (loading) return <div className="bg-white rounded-xl shadow-sm ring-1 ring-black/5 p-6">Loading…</div>;
  if (error) return <div className="bg-white rounded-xl shadow-sm ring-1 ring-black/5 p-6 text-red-600">{error}</div>;
  if (!data) return null;

  // Calculate completion based on individual form completion fields
 const completionFields = [
    data.isFirstFormCompleted,      // Form 1
    data.isSecondFormCompleted,      // Form 2
    data.isThirdFormCompleted,       // Form 3
    data.isFourthFormCompleted,      // Form 4: Initial Observation
    data.isFifthFormCompleted,       // Form 5: Guided Observation Procedure - NEW
    data.isSixthFormCompleted,       // Form 6: KS1/KS2 Interview - UPDATED
    data.isSeventhFormCompleted,     // Form 7: Parent-Child Dynamic Observation - UPDATED
    data.isEighthFormCompleted,      // Form 8: Peer Dynamic Observation - UPDATED
    data.isNinthFormCompleted,       // Form 9: Understanding The Parent - UPDATED
    data.isTenthFormCompleted,      // Form 10: UTL Comprehensive Profile Sheet - NEW
  ];
  const completedCount = completionFields.filter(Boolean).length;
  const pct = Math.round((completedCount / 10) * 100);  // CHANGED from 9 to 10
  const allFormsCompleted = completedCount === 10;  // CHANGED from 9 to 10
  
  const stageTitles = [
    "1. Application form",
    "2. Screening call and flow script",
    "3. Parent/Guardian/Outsider question",
    "4. Initial observation form",
   "5. Guided Observation Procedure",  
    "6. KS1 interview / KS2 interview",  
    "7. Parent-Child Dynamic Observation", 
    "8. Examiner Form: Peer Dynamic Observation",  
    "9. Understanding The Parent", 
    "10. UTL Comprehensive Profile Sheet",  
  ];

  // Handle Odoo logout
  const handleOdooLogout = async (suppressToast: boolean = false) => {
    try {
      const odooToken = typeof window !== 'undefined' ? localStorage.getItem("odooToken") : null;
      
      if (odooToken) {
        await apiService.post("/api/odoo/logout", {
          sessionToken: odooToken,
        });
      }

      // Clear local storage
      if (typeof window !== 'undefined') {
        localStorage.removeItem("odooToken");
        localStorage.removeItem("odooSession");
      }
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
      if (typeof window !== 'undefined') {
        localStorage.removeItem("odooToken");
        localStorage.removeItem("odooSession");
      }
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
    
    // If it's already a valid year (4 digits), return as is
    const yearMatch = yearStr.match(/^(\d{4})$/);
    if (yearMatch) {
      return yearMatch[1]; // Return just the year, e.g., "2000" or "2025"
    }
    
    // If it's a date format (YYYY-MM-DD), extract just the year
    const dateMatch = yearStr.match(/^(\d{4})-\d{2}-\d{2}$/);
    if (dateMatch) {
      return dateMatch[1]; // Extract and return just the year part
    }
    
    // Try to parse as date and extract year
    const parsedDate = new Date(schoolYear);
    if (!isNaN(parsedDate.getTime())) {
      return String(parsedDate.getFullYear()); // Return just the year as string
    }
    
    // If it's not a valid year/date, return null to avoid Odoo errors
    return null;
  };

  // Handle syncing application to Odoo - calls API directly
  const handleSyncToOdoo = async (suppressToast: boolean = false): Promise<boolean> => {
    if (!data) return false;

    // Get the login-generated token from localStorage
    const sessionSid = typeof window !== 'undefined' ? localStorage.getItem('odooToken') : null;
    if (!sessionSid) {
      toast.error("Please login to Odoo first");
      setShowOdooModal(true);
      return false;
    }

    try {
      setSyncing(true);
      
      // Format data for Odoo
      const parent = {
        full_name: data.parentFullName || "",
        email: data.parentEmail || "",
        phone: data.parentPhone || "",
        relation_to_child_id: mapRelationToChildId(data.relationToChild || null),
      };

      const student = {
        full_name: data.childFullName || "",
        date_of_birth: data.childDateOfBirth
          ? new Date(data.childDateOfBirth).toISOString().split("T")[0]
          : null,
        age: data.childAge || null,
        gender: normalizeGender(data.childGender),
        school_year: normalizeSchoolYear(data.childSchoolYear),
        current_school: data.childCurrentSchool || null,
        school_type: data.childSchoolType || null,
        parent_pwd: (data as any).parentPassword || null,
      };

      // Use apiService to call the backend proxy endpoint
      const response = await apiService.post("/api/odoo/admission/create", {
        sessionSid,
        parent,
        student,
        // Pass the Alpha application ID so Odoo can store it as temp_student
        applicationId: data.id,
      });

      if (response.success && response.data) {
        if (!suppressToast) {
          toast.success("Application synced to Odoo successfully!", {
            style: {
              background: "#10b981",
              color: "#fff",
            },
          });
        }
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
      // apiService throws errors with message property
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

  // Handle Odoo login success - automatically sync after login, then logout
  const handleOdooLoginSuccess = async () => {
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
    
    if (data) {
      // Wait 1.5 seconds before starting sync
      await new Promise(resolve => setTimeout(resolve, 1500));
      
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
      
      const syncSuccess = await handleSyncToOdoo(true); // suppressToast = true
      
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
    }
  };

  // Handle rejecting application
  const handleRejectApplication = async () => {
    if (!data) return;

    try {
      setRejecting(true);
      const response = await apiService.post("/api/admin/applications/status", {
        id: data.id,
        status: "rejected",
        adminComment: "Application rejected by admin",
      });

      if (response.success) {
        toast.success("Application rejected successfully");
        // Update local state
        setData({ ...data, status: "rejected" });
        setShowRejectConfirm(false);
      } else {
        toast.error(response.message || "Failed to reject application");
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to reject application");
    } finally {
      setRejecting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           {/* Archive Banner - Show if application is rejected */}
        {/* {data?.status === 'rejected' && (
          <div className="mb-4 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <p className="text-yellow-800 font-medium">This application is rejected.</p>
            </div>
          </div>
        )} */}
        {/* Header Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">
                    {data.parentFullName.split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </span>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">{data.parentFullName}</h1>
                  <p className="text-gray-600">{data.parentEmail}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <span className="font-medium">Child:</span>
                  <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded-md font-medium">
                    {data.childFullName}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">Status:</span>
                  <span className={`px-2 py-1 rounded-md font-medium ${
                    data.status === 'completed' 
                      ? 'bg-green-100 text-green-700' 
                      : data.status === 'in_progress'
                      ? 'bg-yellow-100 text-yellow-700'
                      : 'bg-gray-100 text-gray-700'
                  }`}>
                    {data.status}
                  </span>
                </div>
              </div>
            </div>
            
            {/* Payment Status & Odoo Actions */}
            <div className="lg:text-right space-y-3">
              <div>
                <div className="text-sm text-gray-600 mb-1">Payment Status</div>
                {data.isPaid ? (
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-green-700 font-semibold">
                      Paid ${data.paymentAmount ?? 150}
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span className="text-red-700 font-semibold">Unpaid</span>
                  </div>
                )}
                {data.paidAt && (
                  <div className="text-xs text-gray-500 mt-1">
                    {new Date(data.paidAt).toLocaleDateString()}
                  </div>
                )}
              </div>
              
              {/* Odoo Approve/Logout/Sync Buttons */}
              {allFormsCompleted && data.status === 'completed'  && (
                <div className="space-y-2">
                  {isOdooLoggedIn ? (
                    <>
                      <button
                        onClick={() => handleSyncToOdoo(false)}
                        disabled={syncing}
                        className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center justify-center gap-2 text-sm disabled:opacity-50"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 10V3L4 14h7v7l9-11h-7z"
                          />
                        </svg>
                        {syncing ? "Syncing..." : "Sync to Odoo"}
                      </button>
                      <button
                        onClick={() => handleOdooLogout(false)}
                        className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium flex items-center justify-center gap-2 text-sm"
                      >
                        <svg
                          className="w-4 h-4"
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
                    </>
                  ) : (
                    <button
                      onClick={() => setShowOdooModal(true)}
                      className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center gap-2 text-sm"
                    >
                      <svg
                        className="w-4 h-4"
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
              )}

              {/* Reject Application Button */}
              {data.status !== 'rejected' && (
                <div>
                  <button
                    onClick={() => setShowRejectConfirm(true)}
                    disabled={rejecting}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium flex items-center justify-center gap-2 text-sm disabled:opacity-50 w-full"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                    {rejecting ? "Rejecting..." : "Reject Application"}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Progress Overview */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Application Progress</h2>
            <div className="text-sm text-gray-600">
              {completedCount} of 10 stages completed
            </div>
          </div>
          
          {/* Enhanced Progress Bar */}
          {/* <div className="mb-4">
            <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
              <span>Overall Progress</span>
              <span className="font-semibold">{pct}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div 
                className={`h-3 rounded-full W-[${pct}%] transition-all duration-500 ${
                  pct === 100 
                    ? 'bg-gradient-to-r from-green-500 to-green-600' 
                    : pct >= 70 
                    ? 'bg-gradient-to-r from-blue-500 to-blue-600' 
                    : pct >= 40 
                    ? 'bg-gradient-to-r from-yellow-500 to-yellow-600' 
                    : 'bg-gradient-to-r from-red-500 to-red-600'
                }`}
              ></div>
            </div>
          </div> */}

          {/* Progress Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{completedCount}</div>
              <div className="text-sm text-green-700">Completed</div>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <div className="text-2xl font-bold text-yellow-600">{10 - completedCount}</div>
              <div className="text-sm text-yellow-700">Remaining</div>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{pct}%</div>
              <div className="text-sm text-blue-700">Progress</div>
            </div>
          </div>
        </div>

        {/* Forms Grid */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Application Forms</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 items-stretch">
            {Array.from({ length: 10 }, (_, i) => i).map((idx) => {
              const stageNumber = idx + 1;
              const isCompleted = completionFields[idx] || false;
              const isArchived = data.status === 'rejected';
              //  const hrefMap: Record<number, string> = {
              //    1: `/admin/applications/${data.id}/initial-form`,
              //    2: `/admin/applications/${data.id}/screening-call`,
              //    4: `/admin/applications/${data.id}/initial-observation-form`,
              //    6: `/admin/applications/${data.id}/parent-child-dynamic-observation`,
              //    7: `/admin/applications/${data.id}/peer-dynamic-observation`,
              //    8: `/admin/applications/${data.id}/understanding-parent`,
              //    9: `/admin/applications/${data.id}/comprehensive-profile-sheet`,
              //  };
              const hrefMap: Record<number, string> = {
    1: `/admin/applications/${data.id}/initial-form`,
    2: `/admin/applications/${data.id}/screening-call`,
    4: `/admin/applications/${data.id}/initial-observation-form`,
    5: `/admin/applications/${data.id}/guided-observations-procedure`,  
    7: `/admin/applications/${data.id}/parent-child-dynamic-observation`,  
    8: `/admin/applications/${data.id}/peer-dynamic-observation`, 
    9: `/admin/applications/${data.id}/understanding-parent`,  
    10: `/admin/applications/${data.id}/comprehensive-profile-sheet`,  
  }; 
  
              const href = hrefMap[stageNumber];
              
              // Special handling for stage 3 with dropdown
              if (stageNumber === 3) {
                return (
                  <Stage3Dropdown 
                    key={idx} 
                    applicationId={data.id} 
                    isCompleted={isCompleted}
                    stageTitle={stageTitles[idx]}
                     isArchived={isArchived}
                      isPaid={data.isPaid}
                  />
                );
              }
              
               // Special handling for stage 5 with dropdown (KS1/KS2 Interview)
               if (stageNumber === 6) {
                 return (
                   <Stage7Dropdown 
                     key={idx} 
                     applicationId={data.id} 
                     isCompleted={isCompleted}
                     stageTitle={stageTitles[idx]}
                     childAge={data.childAge}
                      isArchived={isArchived}
                   />
                 );
               }

                const isFirstForm = stageNumber === 1;
              const shouldDisableLink = isArchived && !isFirstForm;
              
              const inner = (
                // <div className={`p-4 rounded-lg border-2 transition-all duration-200 h-full min-h-[180px] flex flex-col ${
                //   isCompleted 
                //     ? 'bg-green-50 border-green-200 hover:border-green-300' 
                //     : 'bg-gray-50 border-gray-200 hover:border-gray-300'
                // }`}>
                 <div className={`p-4 rounded-lg border-2 transition-all duration-200 h-full min-h-[180px] flex flex-col ${
                  // isArchived
                   isArchived && !isFirstForm
                    ? 'bg-gray-100 border-gray-300 opacity-75 cursor-not-allowed'
                    : isCompleted 
                    ? 'bg-green-50 border-green-200 hover:border-green-300' 
                    : 'bg-gray-50 border-gray-200 hover:border-gray-300'
                }`}>
                  <div className="flex items-start justify-between mb-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      isCompleted 
                        ? 'bg-green-500 text-white' 
                        : 'bg-gray-300 text-gray-600'
                    }`}>
                      {isCompleted ? '✓' : stageNumber}
                    </div>
                    <div className={`w-3 h-3 rounded-full ${
                      isCompleted ? 'bg-green-500' : 'bg-gray-300'
                    }`}></div>
                  </div>
                  <div className="text-sm font-medium text-gray-900 mb-1">
                    {stageTitles[idx] ?? `Form ${stageNumber}`}
                  </div>
                  <div className={`text-xs font-medium ${
                    isCompleted ? 'text-green-600' : 'text-gray-500'
                  }`}>
                    {isCompleted ? 'Completed' : 'Pending'}
                  </div>
                </div>
              );

             
               return href && !shouldDisableLink ? (
                            // return href && !isArchived ? (
                <Link 
                  key={idx} 
                  href={href} 
                  className="block h-full hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg transition-transform duration-200"
                >
                  {inner}
                </Link>
              ) : (
                <div key={idx} className={isArchived ? "cursor-not-allowed" : ""}>{inner}</div>
              );
              
              // return href ? (
              //   <Link 
              //     key={idx} 
              //     href={href} 
              //     className="block h-full hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg transition-transform duration-200"
              //   >
              //     {inner}
              //   </Link>
              // ) : (
              //   <div key={idx}>{inner}</div>
              // );
            })}
            
            {/* AI Assessment Card - Only show when all 10 forms are completed */}
            {/* {allFormsCompleted && ( */}
               {allFormsCompleted && data.status !== 'rejected' && (
              <AIAssessmentCard 
                applicationId={data.id}
                childName={data.childFullName}
              />
            )}
          </div>
        </div>

        {/* Odoo Login Modal */}
        <OdooLoginModal
          isOpen={showOdooModal}
          onClose={() => {
            setShowOdooModal(false);
            // Check login status after modal closes
            const odooToken = typeof window !== 'undefined' ? localStorage.getItem("odooToken") : null;
            setIsOdooLoggedIn(!!odooToken);
          }}
          onSuccess={handleOdooLoginSuccess}
        />

        {/* Reject Confirmation Modal */}
        {showRejectConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md mx-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-red-900">Reject Application</h2>
                <button
                  onClick={() => setShowRejectConfirm(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <p className="text-sm text-gray-600 mb-6">
                Are you sure you want to reject this application? This action cannot be undone.
              </p>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowRejectConfirm(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleRejectApplication}
                  disabled={rejecting}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {rejecting ? "Rejecting..." : "Confirm Reject"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


