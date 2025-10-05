"use client";
import React, { useEffect, useMemo, useState } from "react";
import { apiService } from "@/app/utils";
import Modal from "@/app/components/Modal";
import DataTable, { TableColumn } from "react-data-table-component";
import Link from "next/link";

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
  isPaid?: boolean;
  currentStage?: number;
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

export default function AdminApplicationsPage() {
  const [items, setItems] = useState<AdminApp[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [paymentFilter, setPaymentFilter] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [modal, setModal] = useState<{ id: string; open: boolean }>({ id: "", open: false });
  const [newStatus, setNewStatus] = useState<string>("submitted");
  const [comment, setComment] = useState<string>("");
  const [pageIndex, setPageIndex] = useState(0);
  const [total, setTotal] = useState(0);
  const limit = 10;
  const [sheet, setSheet] = useState<{ id: string; open: boolean }>({ id: "", open: false });
  const [saving, setSaving] = useState(false);

  const filtered = useMemo(() => {
    // When doing API-side search/filtering, just show items as-is
    return items;
  }, [items]);

  const columns = useMemo<TableColumn<AdminApp>[]>(() => [
    { name: "Parent", selector: row => row.parentFullName, sortable: true, grow: 1 },
    { name: "Email", selector: row => row.parentEmail, sortable: true, grow: 1 },
    { name: "Child", selector: row => row.childFullName, sortable: true },
    { name: "Age", selector: row => String(row.childAge ?? ""), width: "80px" },
    { name: "Year", selector: row => row.childSchoolYear ?? "", sortable: true },
    {
      name: "Status",
      cell: (row) => (
        <button
          onClick={() => row.status !== 'completed' && openBottomSheet(row.id, row.status, row.adminComment)}
          disabled={row.status === 'completed'}
          className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusClasses(row.status)} ${
            row.status === 'completed' ? 'cursor-not-allowed' : 'cursor-pointer'
          }`}
          title={row.status === 'completed' ? 'Status cannot be changed' : 'Change status'}
        >
          {row.status}
        </button>
      ),
      sortable: true,
    },
    {
      name: "Payment",
      cell: (row) => (
        <div className="flex items-center justify-center">
          {row.isPaid ? (
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800 whitespace-nowrap">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Paid
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-800 whitespace-nowrap">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              Unpaid
            </span>
          )}
        </div>
      ),
      width: "110px",
    },
    {
      name: "Forms",
      cell: (row) => {
        const completedForms = [
          { name: "Form 1", completed: row.isFirstFormCompleted },
          { name: "Form 2", completed: row.isSecondFormCompleted },
          { name: "Form 3", completed: row.isThirdFormCompleted },
          { name: "Form 4", completed: row.isFourthFormCompleted },
          { name: "Form 5", completed: row.isFifthFormCompleted },
          { name: "Form 6", completed: row.isSixthFormCompleted },
          { name: "Form 7", completed: row.isSeventhFormCompleted },
          { name: "Form 8", completed: row.isEighthFormCompleted },
          { name: "Form 9", completed: row.isNinthFormCompleted },
          { name: "Form 10", completed: row.isTenthFormCompleted },
        ];
        
        const completedCount = completedForms.filter(f => f.completed).length;
        const totalCount = completedForms.length;
        const progressPercentage = Math.round((completedCount / totalCount) * 100);
        
        return (
          <div className="min-w-[120px]">
            {/* Progress Header */}
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-gray-900">
                {completedCount}/{totalCount}
              </span>
              <span className="text-xs text-gray-500 font-medium">
                {progressPercentage}%
              </span>
            </div>
            
            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-2 mb-2 overflow-hidden">
              <div 
                className={`h-2 rounded-full transition-all duration-300 ${
                  progressPercentage === 100 
                    ? 'bg-green-500' 
                    : progressPercentage >= 70 
                    ? 'bg-blue-500' 
                    : progressPercentage >= 40 
                    ? 'bg-yellow-500' 
                    : 'bg-red-500'
                }`}
                style={{ 
                  width: `${progressPercentage}%`,
                  minWidth: progressPercentage > 0 ? '4px' : '0px'
                }}
              ></div>
            </div>
            
            {/* Form Status Grid */}
            <div className="grid grid-cols-5 gap-1">
              {completedForms.map((form, index) => (
                <div
                  key={index}
                  className={`w-4 h-4 rounded-sm flex items-center justify-center text-xs font-bold ${
                    form.completed
                      ? 'bg-green-100 text-green-700 border border-green-300'
                      : 'bg-gray-100 text-gray-400 border border-gray-300'
                  }`}
                  title={`${form.name}: ${form.completed ? 'Completed' : 'Pending'}`}
                >
                  {form.completed ? '✓' : index + 1}
                </div>
              ))}
            </div>
            
            {/* Status Text */}
            <div className="mt-1 text-xs text-gray-600">
              {progressPercentage === 100 ? (
                <span className="text-green-600 font-medium">All Complete</span>
              ) : progressPercentage >= 70 ? (
                <span className="text-blue-600 font-medium">Almost Done</span>
              ) : progressPercentage >= 40 ? (
                <span className="text-yellow-600 font-medium">In Progress</span>
              ) : (
                <span className="text-red-600 font-medium">Getting Started</span>
              )}
            </div>
          </div>
        );
      },
      width: "150px",
    },
    { name: "Comment", selector: row => row.adminComment ?? "" },
    {
      name: "Actions",
      cell: (row) => (
        <button 
          onClick={() => openModal(row.id, row.status, row.adminComment)} 
          disabled={row.status === 'completed'}
          className={`px-2 py-1 rounded-md text-white cursor-pointer ${
            row.status === 'completed' 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {row.status === 'completed' ? 'Completed' : 'Change'}
        </button>
      ),
      ignoreRowClick: true,
    },
    {
      name: "View",
      cell: (row) => (
        <Link className="text-blue-600 hover:underline" href={`/admin/applications/${row.id}`}>
          Open
        </Link>
      ),
      ignoreRowClick: true,
    },
  ], []);

  const load = async () => {
    try {
      setLoading(true);
      setError(null);
      const params = new URLSearchParams();
      if (statusFilter) params.set('status', statusFilter);
      if (paymentFilter) params.set('payment', paymentFilter);
      if (search.trim()) params.set('q', search.trim());
      params.set('page', String(pageIndex + 1));
      params.set('limit', String(limit));
      const qs = params.toString() ? `?${params.toString()}` : "";
      const res = await apiService.get(`/api/admin/applications${qs}`);
      if (res.success) {
        setItems(res.data.applications);
        setTotal(res.data.meta?.total ?? res.data.applications.length);
      } else {
        setError(res.message || "Failed to load");
      }
    } catch (e: any) {
      setError(e?.message || "Failed to load");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, [statusFilter, paymentFilter, search, pageIndex]);

  const openModal = (id: string, currentStatus: string, currentComment?: string | null) => {
    console.log("Opening modal for:", { id, currentStatus, currentComment });
    setModal({ id, open: true });
    setNewStatus(currentStatus);
    setComment(currentComment || "");
  };

  const openBottomSheet = (id: string, currentStatus: string, currentComment?: string | null) => {
    console.log("Opening bottom sheet for:", { id, currentStatus, currentComment });
    setSheet({ id, open: true });
    setNewStatus(currentStatus);
    setComment(currentComment || "");
  };

  const submitStatus = async () => {
    try {
      setSaving(true);
      const payload: any = { 
        id: modal.id || sheet.id, 
        status: newStatus,
        adminComment: comment.trim() || undefined
      };
      
      console.log("Sending payload:", payload);
      
      const res = await apiService.post(`/api/admin/applications/status`, payload);
      if (res.success) {
        setModal({ id: "", open: false });
        setSheet({ id: "", open: false });
        setComment("");
        await load();
      } else {
        alert(res.message || "Failed to update");
      }
    } catch (e: any) {
      console.error("Status update error:", e);
      alert(e?.message || "Failed to update");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <h1 className="text-2xl font-bold text-slate-900">Applications</h1>
        <div className="flex items-center gap-2 ml-auto">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by parent, email, child..."
            className="w-56 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 placeholder:text-slate-400"
          />
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="border border-slate-300 rounded-lg px-3 py-2 text-slate-900">
            <option value="">All Status</option>
            {['submitted','completed','rejected'].map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          <select value={paymentFilter} onChange={(e) => setPaymentFilter(e.target.value)} className="border border-slate-300 rounded-lg px-3 py-2 text-slate-900">
            <option value="">All Payments</option>
            <option value="paid">Paid</option>
            <option value="unpaid">Unpaid</option>
          </select>
        </div>
      </div>

      {error && (
        <div className="bg-white rounded-xl shadow-sm ring-1 ring-black/5 p-6 text-red-600">{error}</div>
      )}

      <div className="bg-white rounded-xl shadow-sm ring-1 ring-black/5 p-2">
        <DataTable
          columns={columns}
          data={filtered}
          progressPending={loading}
          highlightOnHover
          pointerOnHover
          // dense
          customStyles={{
            headRow: { style: { backgroundColor: '#f1f5f9' } },
            headCells: { style: { fontWeight: 600, color: '#0f172a' } },
            rows: { style: { color: '#0f172a' } },
          }}
          pagination
          paginationServer
          paginationTotalRows={total}
          paginationPerPage={limit}
          paginationDefaultPage={pageIndex + 1}
          onChangePage={(p) => setPageIndex(p - 1)}
        />
      </div>

      {modal.open && (
        <Modal isOpen={modal.open} onClose={() => setModal({ id: '', open: false })} title="Update Status">
          <div className="p-5 space-y-4 text-slate-900">
            <select value={newStatus} onChange={(e) => {
              console.log("Modal status changed to:", e.target.value);
              setNewStatus(e.target.value);
            }} className="w-full border rounded-lg px-3 py-2">
              {['submitted','completed','rejected'].map(s => (
                <option key={s} value={s}>{s === "completed" ? "Accept" : s === "rejected" ? "Reject" : s}</option>
              ))}
            </select>
            {newStatus === 'rejected' && (
              <textarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Add rejection comment" rows={4} className="w-full border rounded-lg px-3 py-2" />
            )}
            <div className="flex justify-end gap-2">
              <button 
                onClick={() => setModal({ id: '', open: false })} 
                disabled={saving}
                className="px-3 py-2 rounded-lg border disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
              <button 
                onClick={submitStatus} 
                disabled={saving}
                className="px-3 py-2 rounded-lg bg-blue-600 text-white cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {saving && (
                  <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                )}
                {saving ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>
        </Modal>
      )}

      {sheet.open && (
        <div className="fixed inset-0 z-50" onClick={() => setSheet({ id: '', open: false })}>
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-x-0 bottom-0 bg-white rounded-t-2xl p-5 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="text-slate-900 text-lg font-semibold mb-3">Update Status</div>
            <div className="space-y-4">
              <select value={newStatus} onChange={(e) => {
                console.log("Bottom sheet status changed to:", e.target.value);
                setNewStatus(e.target.value);
              }} className="w-full border rounded-lg px-3 py-2 text-slate-900">
                {['submitted','completed','rejected'].map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
              {newStatus === 'rejected' && (
                <textarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Add rejection comment" rows={4} className="w-full border rounded-lg px-3 py-2 text-slate-900" />
              )}
              <div className="flex justify-end gap-2">
                <button 
                  onClick={() => setSheet({ id: '', open: false })} 
                  disabled={saving}
                  className="px-3 py-2 rounded-lg border disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancel
                </button>
                <button 
                  onClick={submitStatus} 
                  disabled={saving}
                  className="px-3 py-2 rounded-lg bg-blue-600 text-white cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {saving && (
                    <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  )}
                  {saving ? 'Saving...' : 'Save'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function getStatusClasses(status: string): string {
  switch (status) {
    case 'completed':
      return 'bg-green-100 text-green-800';
    case 'processing':
      return 'bg-blue-100 text-blue-800';
    case 'submitted':
      return 'bg-yellow-100 text-yellow-800';
    case 'rejected':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-slate-100 text-slate-800';
  }
}


