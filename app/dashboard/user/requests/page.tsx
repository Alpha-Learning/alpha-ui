"use client";
import { useState, useEffect } from "react";
import { apiService } from "@/app/utils";
import { UserApplication, UserApplicationsResponse } from "@/app/types/application";
import { useAuth } from "@/app/contexts/AuthContext";

export default function RequestsPage() {
  const [applications, setApplications] = useState<UserApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isAuthenticated, token } = useAuth();

  useEffect(() => {
    const loadUserApplications = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Check if user is authenticated
        if (!isAuthenticated || !token) {
          setError("Please log in to view your applications");
          setLoading(false);
          return;
        }
        
        console.log('Loading user applications with token:', token ? 'Present' : 'Missing');
        const response: UserApplicationsResponse = await apiService.get("/api/applications/user");
        
        if (response.success && response.data) {
          setApplications(response.data.applications);
        } else {
          setError(response.message || "Failed to load applications");
        }
      } catch (err) {
        console.error("Failed to load user applications:", err);
        setError(err instanceof Error ? err.message : "Failed to load applications");
      } finally {
        setLoading(false);
      }
    };

    loadUserApplications();
  }, [isAuthenticated, token]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg';
      case 'processing':
        return 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg';
      case 'submitted':
        return 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg';
      case 'rejected':
        return 'bg-gradient-to-r from-red-500 to-rose-500 text-white shadow-lg';
      case 'pending':
        return 'bg-gradient-to-r from-slate-500 to-gray-500 text-white shadow-lg';
      default:
        return 'bg-gradient-to-r from-slate-500 to-gray-500 text-white shadow-lg';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        );
      case 'processing':
        return (
          <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        );
      case 'submitted':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'rejected':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        );
      case 'pending':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      default:
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Completed';
      case 'processing':
        return 'Processing';
      case 'submitted':
        return 'Submitted';
      case 'rejected':
        return 'Rejected';
      case 'pending':
        return 'Pending';
      default:
        return status;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-3 sm:p-6">
        <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6">
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-slate-200/60 p-4 sm:p-6 lg:p-8">
            <div className="flex items-center gap-3 mb-6 sm:mb-8">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 rounded-lg sm:rounded-xl flex items-center justify-center">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900">My Applications</h2>
            </div>
            <div className="space-y-4 sm:space-y-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-gradient-to-r from-slate-50 to-slate-100 rounded-lg sm:rounded-xl p-4 sm:p-6 animate-pulse border border-slate-200/50">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-2 sm:space-y-3 flex-1">
                      <div className="h-4 sm:h-5 bg-slate-300 rounded-lg w-48 sm:w-64"></div>
                      <div className="h-3 sm:h-4 bg-slate-200 rounded w-32 sm:w-48"></div>
                      <div className="h-3 bg-slate-200 rounded w-24 sm:w-32"></div>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-4">
                      <div className="h-6 sm:h-8 bg-slate-300 rounded-full w-16 sm:w-24"></div>
                      <div className="h-6 sm:h-8 bg-slate-300 rounded-lg w-16 sm:w-20"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-3 sm:p-6">
        <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6">
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-slate-200/60 p-4 sm:p-6 lg:p-8">
            <div className="flex items-center gap-3 mb-6 sm:mb-8">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 rounded-lg sm:rounded-xl flex items-center justify-center">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900">My Applications</h2>
            </div>
            <div className="text-center py-8 sm:py-12">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-slate-900 mb-2">Unable to Load Applications</h3>
              <p className="text-sm sm:text-base text-slate-600 mb-4 sm:mb-6 max-w-md mx-auto px-4">{error}</p>
              <button 
                onClick={() => window.location.reload()} 
                className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-blue-600 text-white rounded-lg sm:rounded-xl hover:bg-blue-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl text-sm sm:text-base"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  console.log("applications===========> ",applications);
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-3 sm:p-6">
      <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6">
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-slate-200/60 p-4 sm:p-6 lg:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 sm:mb-8 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 sm:w-7 sm:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900">My Applications</h2>
                <p className="text-sm sm:text-base text-slate-600">Track your application status and progress</p>
              </div>
            </div>
            <div className="text-center sm:text-right">
              <div className="text-xl sm:text-2xl font-bold text-slate-900">{applications.length}</div>
              <div className="text-xs sm:text-sm text-slate-500">Total Applications</div>
            </div>
          </div>
          
          {applications.length === 0 ? (
            <div className="text-center py-8 sm:py-16">
              <div className="w-16 h-16 sm:w-24 sm:h-24 bg-gradient-to-br from-slate-100 to-slate-200 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <svg className="w-8 h-8 sm:w-12 sm:h-12 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-slate-900 mb-2">No Applications Yet</h3>
              <p className="text-sm sm:text-base text-slate-600 mb-4 sm:mb-6 max-w-md mx-auto px-4">You haven't submitted any applications yet. Start by filling out the pre-assessment form.</p>
              <button 
                onClick={() => window.location.href = '/form/pre-assessment'}
                className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg sm:rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl text-sm sm:text-base w-full sm:w-auto"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Start Application
              </button>
            </div>
          ) : (
            <div className="space-y-4 sm:space-y-6">
              {applications.map((application) => (
                <div key={application.id} className="bg-gradient-to-r from-white to-slate-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-slate-200/60 hover:shadow-lg hover:border-slate-300/60 transition-all duration-300 group">
                  <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                    <div className="flex-1 space-y-3 sm:space-y-4">
                      <div className="flex items-start gap-3 sm:gap-4">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg sm:rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-200 flex-shrink-0">
                          <svg className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-base sm:text-lg font-semibold text-slate-900 mb-1 truncate">{application.type}</h3>
                          <p className="text-sm sm:text-base text-slate-600 mb-2 sm:mb-3 line-clamp-2">{application.description}</p>
                          
                          {application.childFullName && (
                            <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 mb-2">
                              <svg className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                              </svg>
                              <span className="truncate">{application.childFullName}</span>
                              {application.childAge && <span>(Age {application.childAge})</span>}
                              {application.childGrade && <span>- {application.childGrade}</span>}
                            </div>
                          )}
                          
                          <div className="flex items-center gap-2 sm:gap-4 text-xs sm:text-sm text-slate-500">
                            <div className="flex items-center gap-1">
                              <svg className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                              <span>Submitted {new Date(application.submittedAt).toLocaleDateString()}</span>
                            </div>
                          </div>
                          
                          {application.status === 'rejected' && application.adminComment && (
                            <div className="mt-3 p-2 sm:p-3 bg-red-50 border border-red-200 rounded-lg">
                              <div className="flex items-start gap-2">
                                <svg className="w-3 h-3 sm:w-4 sm:h-4 text-red-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                                </svg>
                                <div>
                                  <p className="text-xs sm:text-sm font-medium text-red-800">Admin Comment:</p>
                                  <p className="text-xs sm:text-sm text-red-700">{application.adminComment}</p>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row lg:flex-col items-stretch sm:items-center lg:items-end gap-2 sm:gap-3">
                      <div className="flex justify-center sm:justify-start lg:justify-end">
                        <span className={`inline-flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold ${getStatusColor(application.status)}`}>
                          {getStatusIcon(application.status)}
                          <span className="whitespace-nowrap">{getStatusText(application.status)}</span>
                        </span>
                      </div>
                      
                      {application.status === 'completed' && !application.isPaid && (
                        <button
                          onClick={async () => {
                            try {
                              await apiService.post('/api/applications/pay', { id: application.id });
                              window.location.reload();
                            } catch (e) {
                              console.error(e);
                            }
                          }}
                          className="inline-flex items-center justify-center gap-1 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg sm:rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl text-xs sm:text-sm w-full sm:w-auto"
                        >
                          <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                          </svg>
                          <span className="hidden sm:inline">Pay $150</span>
                          <span className="sm:hidden">Pay</span>
                        </button>
                      )}
                      
                      {application.isPaid && (
                        <div className="inline-flex items-center justify-center gap-1 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 rounded-lg sm:rounded-xl font-medium text-xs sm:text-sm w-full sm:w-auto">
                          <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="hidden sm:inline">Paid</span>
                          <span className="sm:hidden">✓</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
