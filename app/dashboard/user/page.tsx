"use client";
import { useState, useEffect } from "react";
import { apiService } from "@/app/utils";

interface UserData {
  id: string;
  name: string;
  email: string;
  phone?: string;
  city?: string;
  applicationStatus: string;
  submittedAt: string | null;
}

export default function UserDashboard() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await apiService.get("/api/auth/me");
        
        if (response.success) {
          setUserData(response.data);
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
        </div>
      </div>

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
    </div>
  );
}