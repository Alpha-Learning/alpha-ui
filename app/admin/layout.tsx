"use client";
import React from "react";
import ProtectedRoute from "@/app/components/ProtectedRoute";
import { useAuth } from "@/app/contexts/AuthContext";

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth();
  return (
    <ProtectedRoute requiredRoles={["admin"]}>
      <div className="h-screen bg-slate-50 flex overflow-hidden">
        <aside className="group/sidebar hidden md:flex md:flex-col bg-white border-r w-16 hover:w-64 transition-all duration-200 ease-out">
          <div className="p-3 border-b flex items-center gap-3">
            <div className="w-8 h-8 grid place-items-center text-[#142954]">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                <path d="M12 2l7 4v6c0 5-3.5 9-7 10-3.5-1-7-5-7-10V6l7-4z" />
                <path d="M9 12l3 3 4-5" />
              </svg>
            </div>
            <div className="overflow-hidden">
              <div className="font-extrabold text-lg text-[#142954] whitespace-nowrap opacity-0 group-hover/sidebar:opacity-100 transition-opacity">Admin</div>
              <div className="text-[10px] text-slate-500 whitespace-nowrap opacity-0 group-hover/sidebar:opacity-100 transition-opacity">{user?.email}</div>
            </div>
          </div>
          <nav className="p-2 space-y-1">
            <a href="/admin/dashboard" className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-slate-100 text-slate-700">
              <span className="w-8 text-center">🏠</span>
              <span className="whitespace-nowrap opacity-0 group-hover/sidebar:opacity-100 transition-opacity">Dashboard</span>
            </a>
            <a href="/admin/applications" className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-slate-100 text-slate-700">
              <span className="w-8 text-center">🗂️</span>
              <span className="whitespace-nowrap opacity-0 group-hover/sidebar:opacity-100 transition-opacity">Applications</span>
            </a>
            <a href="/admin/users" className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-slate-100 text-slate-700">
              <span className="w-8 text-center">👥</span>
              <span className="whitespace-nowrap opacity-0 group-hover/sidebar:opacity-100 transition-opacity">Users</span>
            </a>
            <a href="/admin/requests" className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-slate-100 text-slate-700">
              <span className="w-8 text-center">📩</span>
              <span className="whitespace-nowrap opacity-0 group-hover/sidebar:opacity-100 transition-opacity">Requests</span>
            </a>
          </nav>
          <div className="mt-auto p-2 border-t">
            <button onClick={logout} className="w-full cursor-pointer flex items-center gap-3 px-2 py-2 rounded-lg bg-slate-900 text-white">
              <span className="w-8 text-center">↩️</span>
              <span className="whitespace-nowrap opacity-0 group-hover/sidebar:opacity-100 transition-opacity">Logout</span>
            </button>
          </div>
        </aside>
        <main className="flex-1 p-4 sm:p-6 overflow-y-auto">{children}</main>
      </div>
    </ProtectedRoute>
  );
}


