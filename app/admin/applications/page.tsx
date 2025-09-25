"use client";
import React, { useEffect, useMemo, useState } from "react";
import { apiService } from "@/app/utils";
import Modal from "@/app/components/Modal";
import {
  ColumnDef,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
  useReactTable,
} from "@tanstack/react-table";

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
  const [search, setSearch] = useState<string>("");
  const [modal, setModal] = useState<{ id: string; open: boolean }>({ id: "", open: false });
  const [newStatus, setNewStatus] = useState<string>("submitted");
  const [comment, setComment] = useState<string>("");
  const [pageIndex, setPageIndex] = useState(0);
  const [total, setTotal] = useState(0);
  const limit = 10;
  const [sheet, setSheet] = useState<{ id: string; open: boolean }>({ id: "", open: false });

  const filtered = useMemo(() => {
    let data = statusFilter ? items.filter(i => i.status === statusFilter) : items;
    if (search.trim()) {
      const q = search.toLowerCase();
      data = data.filter(i =>
        i.parentFullName.toLowerCase().includes(q) ||
        i.parentEmail.toLowerCase().includes(q) ||
        i.childFullName.toLowerCase().includes(q) ||
        (i.childSchoolYear?.toLowerCase().includes(q) ?? false)
      );
    }
    return data;
  }, [items, statusFilter, search]);

  const columns = useMemo<ColumnDef<AdminApp>[]>(() => [
    { header: "Parent", accessorKey: "parentFullName" },
    { header: "Email", accessorKey: "parentEmail" },
    { header: "Child", accessorKey: "childFullName" },
    { header: "Age", accessorKey: "childAge" },
    { header: "Year", accessorKey: "childSchoolYear" },
    {
      header: "Status",
      accessorKey: "status",
      cell: ({ row }) => {
        const s = row.original.status;
        const cls = getStatusClasses(s);
        return (
          <button
            onClick={() => openBottomSheet(row.original.id, row.original.status, row.original.adminComment)}
            className={`px-3 py-1 rounded-full text-xs font-medium ${cls} cursor-pointer`}
            title="Change status"
          >
            {s}
          </button>
        );
      }
    },
    { header: "Comment", accessorKey: "adminComment" },
    {
      header: "Actions",
      cell: ({ row }) => (
        <button onClick={() => openModal(row.original.id, row.original.status, row.original.adminComment)} className="px-2 py-1 rounded-md bg-blue-600 text-white cursor-pointer">Change</button>
      )
    },
  ], []);

  const table = useReactTable({
    data: filtered,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true,
    pageCount: Math.max(1, Math.ceil(total / limit)),
    state: { pagination: { pageIndex, pageSize: limit } },
  });

  const load = async () => {
    try {
      setLoading(true);
      setError(null);
      const params = new URLSearchParams();
      if (statusFilter) params.set('status', statusFilter);
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

  useEffect(() => { load(); }, [statusFilter, pageIndex]);

  const openModal = (id: string, currentStatus: string, currentComment?: string | null) => {
    setModal({ id, open: true });
    setNewStatus(currentStatus);
    setComment(currentComment || "");
  };

  const openBottomSheet = (id: string, currentStatus: string, currentComment?: string | null) => {
    setSheet({ id, open: true });
    setNewStatus(currentStatus);
    setComment(currentComment || "");
  };

  const submitStatus = async () => {
    try {
      const payload: any = { id: modal.id, status: newStatus };
      if (newStatus === "rejected") payload.adminComment = comment.trim();
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
      alert(e?.message || "Failed to update");
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
          <option value="">All</option>
          {['submitted','processing','completed','rejected'].map(s => (
            <option key={s} value={s}>{s}</option>
          ))}
          </select>
        </div>
      </div>

      {loading ? (
        <div className="bg-white rounded-xl shadow-sm ring-1 ring-black/5 p-6">Loading…</div>
      ) : error ? (
        <div className="bg-white rounded-xl shadow-sm ring-1 ring-black/5 p-6 text-red-600">{error}</div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm ring-1 ring-black/5 p-4">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-slate-900">
              <thead className="text-left text-slate-900 bg-slate-100">
                {table.getHeaderGroups().map(hg => (
                  <tr key={hg.id}>
                    {hg.headers.map(header => (
                      <th key={header.id} className="px-3 py-3 font-semibold">
                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody className="text-slate-900">
                {table.getRowModel().rows.map(row => (
                  <tr key={row.id} className="hover:bg-slate-100">
                    {row.getVisibleCells().map(cell => (
                      <td key={cell.id} className="px-3 py-2">
                        {cell.column.columnDef.cell
                          ? flexRender(cell.column.columnDef.cell, cell.getContext())
                          : String(cell.getValue() ?? '')}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between mt-4">
            <div className="text-xs text-slate-900">Page {pageIndex + 1} of {Math.max(1, Math.ceil(total / limit))}</div>
            <div className="flex gap-2">
              <button className="px-3 py-1 border border-slate-300 rounded text-slate-900 hover:bg-slate-50 disabled:opacity-50" onClick={() => setPageIndex(p => Math.max(0, p - 1))} disabled={pageIndex === 0}>Prev</button>
              <button className="px-3 py-1 border border-slate-300 rounded text-slate-900 hover:bg-slate-50 disabled:opacity-50" onClick={() => setPageIndex(p => p + 1)} disabled={(pageIndex + 1) >= Math.max(1, Math.ceil(total / limit))}>Next</button>
            </div>
          </div>
        </div>
      )}

      {modal.open && (
        <Modal isOpen={modal.open} onClose={() => setModal({ id: '', open: false })} title="Update Status">
          <div className="p-5 space-y-4 text-slate-900">
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
        </Modal>
      )}

      {sheet.open && (
        <div className="fixed inset-0 z-50" onClick={() => setSheet({ id: '', open: false })}>
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-x-0 bottom-0 bg-white rounded-t-2xl p-5 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="text-slate-900 text-lg font-semibold mb-3">Update Status</div>
            <div className="space-y-4">
              <select value={newStatus} onChange={(e) => setNewStatus(e.target.value)} className="w-full border rounded-lg px-3 py-2 text-slate-900">
                {['submitted','processing','completed','rejected'].map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
              {newStatus === 'rejected' && (
                <textarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Add rejection comment" rows={4} className="w-full border rounded-lg px-3 py-2 text-slate-900" />
              )}
              <div className="flex justify-end gap-2">
                <button onClick={() => setSheet({ id: '', open: false })} className="px-3 py-2 rounded-lg border">Cancel</button>
                <button onClick={submitStatus} className="px-3 py-2 rounded-lg bg-blue-600 text-white cursor-pointer">Save</button>
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


