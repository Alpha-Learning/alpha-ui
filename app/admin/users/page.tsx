"use client";
import React, { useEffect, useState } from "react";
import { apiService } from "@/app/utils";

type AdminUser = { id: number; name: string; email: string; role: string; createdAt: string };

export default function AdminUsersPage() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Placeholder: you may add a real endpoint later
    (async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await apiService.get(`/admin/applications?limit=1`);
        if (!res.success) throw new Error(res.message || 'Failed');
        setUsers([]);
      } catch (e: any) {
        setError(null);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm ring-1 ring-black/5 p-6">
        <h1 className="text-2xl font-bold text-slate-900">Users</h1>
        <p className="text-slate-500">Users management coming soon.</p>
      </div>
    </div>
  );
}


