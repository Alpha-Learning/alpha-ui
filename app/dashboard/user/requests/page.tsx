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
        return 'bg-green-100 text-green-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'submitted':
        return 'bg-yellow-100 text-yellow-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'pending':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
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
      <div className="space-y-6">
        <div className="bg-white rounded-xl shadow-sm ring-1 ring-black/5 p-6">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">My Requests</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="border border-slate-200 rounded-lg p-4 animate-pulse">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <div className="h-4 bg-slate-200 rounded w-48"></div>
                    <div className="h-3 bg-slate-200 rounded w-32"></div>
                  </div>
                  <div className="h-6 bg-slate-200 rounded-full w-20"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-xl shadow-sm ring-1 ring-black/5 p-6">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">My Requests</h2>
          <div className="text-center py-8">
            <div className="text-red-600 mb-2">⚠️ Error loading applications</div>
            <p className="text-slate-500 mb-4">{error}</p>
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

  console.log("applications===========> ",applications);
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm ring-1 ring-black/5 p-6">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">My Requests</h2>
        
        {applications.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-slate-400 mb-2">📋 No applications found</div>
            <p className="text-slate-500">You haven't submitted any applications yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {applications.map((application) => (
              <div key={application.id} className="border border-slate-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-medium text-slate-900">{application.type}</h3>
                    <p className="text-sm text-slate-500 mb-1">{application.description}</p>
                    {application.childFullName && (
                      <p className="text-xs text-slate-400">
                        Child: {application.childFullName}
                        {application.childAge && ` (Age ${application.childAge})`}
                        {application.childGrade && ` - ${application.childGrade}`}
                      </p>
                    )}
                    <p className="text-xs text-slate-400">
                      Submitted: {new Date(application.submittedAt).toLocaleDateString()}
                    </p>
                    {application.status === 'rejected' && application.adminComment && (
                      <p className="text-xs text-red-700 mt-1">Comment: {application.adminComment}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(application.status)}`}>
                      {getStatusText(application.status)}
                    </span>
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
                        className="px-3 py-1 rounded-lg bg-green-600 text-white cursor-pointer"
                      >
                        Pay $150
                      </button>
                    )}
                    {application.isPaid  && (
                      <span className="text-xs text-green-700">Paid</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
