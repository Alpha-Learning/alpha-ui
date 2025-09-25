"use client";
import { useState, useEffect } from "react";
import { FiUser, FiMail, FiPhone, FiMapPin, FiEdit } from "react-icons/fi";

interface UserData {
  id: string;
  name: string;
  email: string;
  phone?: string;
  city?: string;
  applicationStatus: string;
  submittedAt: string;
}

export default function ProfilePage() {
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    // Simulate loading user data
    const loadUserData = async () => {
      try {
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
      <div className="bg-white rounded-xl shadow-sm ring-1 ring-black/5 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-slate-900">Profile Information</h2>
          <button className="flex items-center gap-2 px-3 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
            <FiEdit className="w-4 h-4" />
            Edit
          </button>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <FiUser className="w-5 h-5 text-slate-400" />
            <div>
              <p className="text-sm text-slate-500">Full Name</p>
              <p className="font-medium text-slate-900">{userData?.name}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <FiMail className="w-5 h-5 text-slate-400" />
            <div>
              <p className="text-sm text-slate-500">Email</p>
              <p className="font-medium text-slate-900">{userData?.email}</p>
            </div>
          </div>
          
          {userData?.phone && (
            <div className="flex items-center gap-3">
              <FiPhone className="w-5 h-5 text-slate-400" />
              <div>
                <p className="text-sm text-slate-500">Phone</p>
                <p className="font-medium text-slate-900">{userData.phone}</p>
              </div>
            </div>
          )}
          
          {userData?.city && (
            <div className="flex items-center gap-3">
              <FiMapPin className="w-5 h-5 text-slate-400" />
              <div>
                <p className="text-sm text-slate-500">City</p>
                <p className="font-medium text-slate-900">{userData.city}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
