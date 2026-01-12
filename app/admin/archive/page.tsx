"use client";
import React, { useEffect, useMemo, useState } from "react";
import { apiService } from "@/app/utils";
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
};

export default function AdminArchivePage() {
  const [items, setItems] = useState<AdminApp[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState<string>("");
  const [pageIndex, setPageIndex] = useState(0);
  const [total, setTotal] = useState(0);
  const limit = 10;

  const columns = useMemo<TableColumn<AdminApp>[]>(() => [
    { 
      name: "Parent", 
      selector: (row: AdminApp) => row.parentFullName, 
      sortable: true, 
      grow: 1 
    },
    { 
      name: "Email", 
      selector: (row: AdminApp) => row.parentEmail, 
      sortable: true, 
      grow: 1 
    },
    { 
      name: "Child", 
      selector: (row: AdminApp) => row.childFullName, 
      sortable: true 
    },
    { 
      name: "Age", 
      selector: (row: AdminApp) => String(row.childAge ?? ""), 
     // width: "80px" 
    },
    { 
      name: "Year", 
      selector: (row: AdminApp) => row.childSchoolYear ?? "", 
      sortable: true ,
      // width: "180px",
    },
      {
      name: "Rejection Date",
      selector: (row: AdminApp) => {
        const date = new Date(row.updatedAt);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
      },
      sortable: true,
     //width: "180px",
    },
    {
      name: "View",
      cell: (row: AdminApp) => (
        <Link 
          className="text-blue-600 hover:underline" 
          href={`/admin/applications/${row.id}`}
        >
          View
        </Link>
      ),
      ignoreRowClick: true,
      //width: "100px",
    },
  ], []);

  const load = async () => {
    try {
      setLoading(true);
      setError(null);
      const params = new URLSearchParams();
      if (search.trim()) params.set('q', search.trim());
      params.set('page', String(pageIndex + 1));
      params.set('limit', String(limit));
      const qs = params.toString() ? `?${params.toString()}` : "";
      const res = await apiService.get(`/api/admin/applications/archive${qs}`);
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

  useEffect(() => { 
    load(); 
  }, [search, pageIndex]);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm ring-1 ring-black/5 p-6">
        <div className="flex items-center justify-between gap-3 flex-wrap mb-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Archive</h1>
          <p className="text-sm text-slate-500 mt-1">Rejected applications archive</p>
        </div>
          <div className="flex items-center gap-2">
          <input
            type="text"
            value={search}
              onChange={(e) => { setPageIndex(0); setSearch(e.target.value); }}
            placeholder="Search by parent, email, child..."
            className="w-56 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 placeholder:text-slate-400"
          />
        </div>
      </div>

      {error && (
          <div className="mb-4 text-red-600 bg-red-50 p-3 rounded-lg">{error}</div>
      )}

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
          noDataComponent={
            <div className="py-8 text-center text-slate-500">
              No rejected applications found in archive.
            </div>
          }
        />
        </div>
      </div>
    </div>
  );
}