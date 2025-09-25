"use client";
import { useState, useEffect } from "react";

interface UserData {
  id: string;
  name: string;
  email: string;
  phone?: string;
  city?: string;
  applicationStatus: string;
  submittedAt: string;
}

export default function UserDashboard() {
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    // Simulate loading user data
    const loadUserData = async () => {
      try {
        // In a real app, you'd fetch this from your API
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const mockUserData: UserData = {
          id: "user_123",
          name: "John Doe",
          email: "john@example.com",
          phone: "+973 1234 5678",
          city: "Manama",
          applicationStatus: "Under Review",
          submittedAt: new Date().toISOString(),
        };
        
        setUserData(mockUserData);
      } catch (error) {
        console.error("Failed to load user data:", error);
      }
    };

    loadUserData();
  }, []);

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
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                {userData?.applicationStatus}
              </span>
            </div>
          </div>
          
          <div>
            <p className="text-sm text-slate-500">Submitted On</p>
            <p className="font-medium text-slate-900">
              {userData?.submittedAt ? new Date(userData.submittedAt).toLocaleDateString() : 'N/A'}
            </p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm ring-1 ring-black/5 p-6">
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
      </div>
    </div>
  );
}