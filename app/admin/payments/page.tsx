"use client";
import React, { useEffect, useMemo, useState } from "react";
import { apiService } from "@/app/utils";
import DataTable, { TableColumn } from "react-data-table-component";
import Link from "next/link";

type PaymentTransaction = {
  id: string;
  parentFullName: string;
  parentEmail: string;
  childFullName: string;
  status: string;
  paymentAmount?: number | null;
  paidAt?: string | null;
};

export default function PaymentTransactionsPage() {
  const [items, setItems] = useState<PaymentTransaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pageIndex, setPageIndex] = useState(0);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");
  const [sortColumn, setSortColumn] = useState<string>("paidAt");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [dateFilter, setDateFilter] = useState<string>("");
  const limit = 10;

  const getStatusClasses = (status: string) => {
    const classes: Record<string, string> = {
      submitted: "bg-yellow-100 text-yellow-800",
      processing: "bg-blue-100 text-blue-800",
      completed: "bg-green-100 text-green-800",
      rejected: "bg-red-100 text-red-800",
    };
    return classes[status] || "bg-gray-100 text-gray-800";
  };

  const formatDate = (dateString: string | null | undefined) => {
    if (!dateString) return "-";
    
    const date = new Date(dateString);
    
    // Validate the date
    if (isNaN(date.getTime())) {
      return "-";
    }
    
    // Format date: DD/MM/YYYY
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear());
    
    return `${day}/${month}/${year}`;
  };

  const formatTime = (dateString: string | null | undefined) => {
    if (!dateString) return "-";
    
    const date = new Date(dateString);
    
    // Validate the date
    if (isNaN(date.getTime())) {
      return "-";
    }
    
    // Format time: HH:MM AM/PM (12-hour format)
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    
    // Convert to 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    
    return `${String(hours).padStart(2, '0')}:${minutes} ${ampm}`;
  };

  const columns = useMemo<TableColumn<PaymentTransaction>[]>(() => [
    { 
      name: "Parent Name", 
      selector: r => r.parentFullName, 
      sortable: true,
      id: "parentFullName",
      grow: 1 
    },
    { 
      name: "Parent Email", 
      selector: r => r.parentEmail, 
      sortable: true,
      id: "parentEmail",
      grow: 1 
    },
    { 
      name: "Child Name", 
      selector: r => r.childFullName, 
      sortable: true,
      id: "childFullName"
    },
    {
      name: "Application Status",
      cell: (row) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusClasses(row.status)}`}>
          {row.status}
        </span>
      ),
      sortable: true,
      id: "status",
    },
    {
      name: "Payment Status",
      cell: () => (
        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800 whitespace-nowrap">
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          Paid
        </span>
      ),
      sortable: false,
      width: "120px",
    },
    {
      name: "Amount",
      cell: (row) => (
        <span className="font-medium">
          {row.paymentAmount ? `$${row.paymentAmount}` : "$150"}
        </span>
      ),
      sortable: true,
      id: "paymentAmount",
      width: "100px",
    },
    {
      name: "Date",
      cell: (row) => (
        <span className="text-sm text-slate-600">
          {formatDate(row.paidAt)}
        </span>
      ),
      sortable: true,
      id: "paidAt",
      width: "110px",
    },
    {
      name: "Time",
      cell: (row) => (
        <span className="text-sm text-slate-600">
          {formatTime(row.paidAt)}
        </span>
      ),
      sortable: false,
      width: "100px",
    },
    {
      name: "View Application",
      cell: (row) => (
        <Link
          className="text-blue-600 hover:underline text-sm"
          href={`/admin/applications/${row.id}`}
        >
          Open
        </Link>
      ),
      ignoreRowClick: true,
      width: "120px",
    },
  ], []);

  const handleSort = (column: TableColumn<PaymentTransaction>, sortDirection: "asc" | "desc") => {
    const sortField = (column as any).id;
    if (sortField) {
      setSortColumn(sortField);
      setSortDirection(sortDirection);
      setPageIndex(0); // Reset to first page on sort
    }
  };

  const load = async () => {
    try {
      setLoading(true);
      setError(null);
      const params = new URLSearchParams();
      params.set('page', String(pageIndex + 1));
      params.set('limit', String(limit));
      params.set('paid', 'true'); // Only fetch paid transactions
      params.set('sortBy', sortColumn);
      params.set('sortOrder', sortDirection);
      
      if (search.trim()) {
        params.set('q', search.trim());
      }
      
      if (dateFilter) {
        params.set('dateFilter', dateFilter);
      }
      
      const qs = params.toString() ? `?${params.toString()}` : "";
      const res = await apiService.get(`/api/admin/applications${qs}`);
      
      if (res.success) {
        let applications = res.data.applications || [];
        
        // Filter to only include paid transactions (safety check)
        applications = applications.filter((app: PaymentTransaction) => {
          // Ensure it's paid and not rejected
          return (app as any).isPaid === true && app.status !== 'rejected';
        });
        
        setItems(applications);
        setTotal(res.data.meta?.total ?? applications.length);
      } else {
        setError(res.message || 'Failed to load');
      }
    } catch (e: any) {
      setError(e?.message || 'Failed to load');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { 
    load(); 
  }, [pageIndex, search, sortColumn, sortDirection, dateFilter]);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm ring-1 ring-black/5 p-6">
        <div className="flex items-center justify-between gap-3 flex-wrap mb-4">
          <h1 className="text-2xl font-bold text-slate-900">Payment Transactions</h1>
          <div className="flex items-center gap-3 flex-wrap">
            <input
              type="date"
              value={dateFilter}
              onChange={(e) => { setPageIndex(0); setDateFilter(e.target.value); }}
              className="border border-slate-300 rounded-lg px-3 py-2 text-slate-900 text-sm"
              placeholder="Filter by date"
            />
            <input
              value={search}
              onChange={(e) => { setPageIndex(0); setSearch(e.target.value); }}
              placeholder="Search by parent, email, child, or amount..."
              className="w-56 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 placeholder:text-slate-400"
            />
            {dateFilter && (
              <button
                onClick={() => { setPageIndex(0); setDateFilter(""); }}
                className="px-3 py-2 text-sm bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition-colors whitespace-nowrap"
              >
                Clear Date
              </button>
            )}
          </div>
        </div>

        {error && (
          <div className="mb-4 text-red-600 bg-red-50 p-3 rounded-lg">{error}</div>
        )}

        <DataTable
          columns={columns}
          data={items}
          progressPending={loading}
          highlightOnHover
          pointerOnHover
          onSort={handleSort}
          sortServer
          defaultSortFieldId="paidAt"
          defaultSortAsc={false}
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
              No paid transactions found
            </div>
          }
        />
      </div>
    </div>
  );
}