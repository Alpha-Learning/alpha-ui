"use client";
import React, { useEffect, useMemo, useState } from "react";
import { apiService } from "@/app/utils";

type AdminApp = {
  id: string;
  status: string;
  adminComment?: string | null;
  createdAt: string;
  updatedAt: string;
  parentFullName: string;
  parentEmail: string;
  childFullName: string;
  childAge?: number | null;
  childSchoolYear?: string | null;
};

export default function AdminApplicationsPage() {
  const [items, setItems] = useState<AdminApp[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [modal, setModal] = useState<{ id: string; open: boolean }>({ id: "", open: false });
  const [newStatus, setNewStatus] = useState<string>("submitted");
  const [comment, setComment] = useState<string>("");

  const filtered = useMemo(() => {
    return statusFilter ? items.filter(i => i.status === statusFilter) : items;
  }, [items, statusFilter]);

  const load = async () => {
    try {
      setLoading(true);
      setError(null);
      const qs = statusFilter ? `?status=${encodeURIComponent(statusFilter)}` : "";
      const res = await apiService.get(`/admin/applications${qs}`);
      if (res.success) {
        setItems(res.data.applications);
      } else {
        setError(res.message || "Failed to load");
      }
    } catch (e: any) {
      setError(e?.message || "Failed to load");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, [statusFilter]);

  const openModal = (id: string, currentStatus: string, currentComment?: string | null) => {
    setModal({ id, open: true });
    setNewStatus(currentStatus);
    setComment(currentComment || "");
  };

  const submitStatus = async () => {
    try {
      const payload: any = { id: modal.id, status: newStatus };
      if (newStatus === "rejected") payload.adminComment = comment.trim();
      const res = await apiService.post(`/admin/applications/status`, payload);
      if (res.success) {
        setModal({ id: "", open: false });
        setComment("");
        await load();
      } else {
        alert(res.message || "Failed to update");
      }
    } catch (e: any) {
      alert(e?.message || "Failed to update");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">Applications</h1>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="border rounded-lg px-3 py-2">
          <option value="">All</option>
          {['submitted','processing','completed','rejected'].map(s => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      {loading ? (
        <div className="bg-white rounded-xl shadow-sm ring-1 ring-black/5 p-6">Loading…</div>
      ) : error ? (
        <div className="bg-white rounded-xl shadow-sm ring-1 ring-black/5 p-6 text-red-600">{error}</div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm ring-1 ring-black/5">
          <div className="divide-y">
            {filtered.map((app) => (
              <div key={app.id} className="p-4 flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="font-semibold text-slate-900">{app.parentFullName} <span className="text-slate-500">({app.parentEmail})</span></div>
                  <div className="text-sm text-slate-600">Child: {app.childFullName}{app.childAge ? ` (Age ${app.childAge})` : ''}{app.childSchoolYear ? ` - ${app.childSchoolYear}` : ''}</div>
                  {app.adminComment && <div className="text-xs text-red-700 mt-1">Comment: {app.adminComment}</div>}
                  <div className="text-xs text-slate-400 mt-1">Submitted: {new Date(app.createdAt).toLocaleString()}</div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-sm px-3 py-1 rounded-full bg-slate-100 text-slate-700">{app.status}</span>
                  <button onClick={() => openModal(app.id, app.status, app.adminComment)} className="px-3 py-2 rounded-lg bg-blue-600 text-white cursor-pointer">Change</button>
                </div>
              </div>
            ))}
            {filtered.length === 0 && <div className="p-6 text-slate-500">No applications</div>}
          </div>
        </div>
      )}

      {modal.open && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-xl p-5 space-y-4">
            <div className="text-lg font-semibold">Update Status</div>
            <select value={newStatus} onChange={(e) => setNewStatus(e.target.value)} className="w-full border rounded-lg px-3 py-2">
              {['submitted','processing','completed','rejected'].map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
            {newStatus === 'rejected' && (
              <textarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Add rejection comment" rows={4} className="w-full border rounded-lg px-3 py-2" />
            )}
            <div className="flex justify-end gap-2">
              <button onClick={() => setModal({ id: '', open: false })} className="px-3 py-2 rounded-lg border">Cancel</button>
              <button onClick={submitStatus} className="px-3 py-2 rounded-lg bg-blue-600 text-white cursor-pointer">Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


