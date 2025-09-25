"use client";
import React, { useEffect, useMemo, useState } from "react";
import { apiService } from "@/app/utils";
import DataTable, { TableColumn } from "react-data-table-component";
import Link from "next/link";

type PaidItem = {
  id: string;
  parentFullName: string;
  parentEmail: string;
  childFullName: string;
  paymentAmount?: number | null;
  paidAt?: string | null;
};

export default function PaidUsersPage() {
  const [items, setItems] = useState<PaidItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pageIndex, setPageIndex] = useState(0);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");
  const limit = 10;

  const columns = useMemo<TableColumn<PaidItem>[]>(() => [
    { name: "Parent", selector: r => r.parentFullName, sortable: true },
    { name: "Email", selector: r => r.parentEmail, sortable: true },
    { name: "Child", selector: r => r.childFullName, sortable: true },
    { name: "Amount", selector: r => `$${r.paymentAmount ?? 150}` },
    { name: "Paid At", selector: r => (r.paidAt ? new Date(r.paidAt).toLocaleString() : "-") },
    { name: "View", cell: r => (<Link className="text-blue-600 hover:underline" href={`/admin/applications/${r.id}`}>Open</Link>), ignoreRowClick: true },
  ], []);

  const load = async () => {
    try {
      setLoading(true);
      setError(null);
      const params = new URLSearchParams();
      params.set('paid', 'true');
      params.set('page', String(pageIndex + 1));
      params.set('limit', String(limit));
      if (search.trim()) params.set('q', search.trim());
      const qs = `?${params.toString()}`;
      const res = await apiService.get(`/api/admin/applications${qs}`);
      if (res.success) {
        setItems(res.data.applications || []);
        setTotal(res.data.meta?.total ?? res.data.applications?.length ?? 0);
      } else {
        setError(res.message || 'Failed to load');
      }
    } catch (e: any) {
      setError(e?.message || 'Failed to load');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, [pageIndex, search]);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm ring-1 ring-black/5 p-6">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <h1 className="text-2xl font-bold text-slate-900">Paid Users</h1>
          <input
            value={search}
            onChange={(e) => { setPageIndex(0); setSearch(e.target.value); }}
            placeholder="Search by parent, email, child..."
            className="w-56 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 placeholder:text-slate-400"
          />
        </div>

        {error && <div className="mt-4 text-red-600">{error}</div>}

        <div className="mt-4">
          <DataTable
            columns={columns}
            data={items}
            progressPending={loading}
            highlightOnHover
            pointerOnHover
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
      </div>
    </div>
  );
}


