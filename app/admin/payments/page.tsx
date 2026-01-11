"use client";
import React, { useEffect, useMemo, useState } from "react";
import { apiService } from "@/app/utils";
import DataTable, { TableColumn } from "react-data-table-component";
import Link from "next/link";
import Modal from "@/app/components/Modal";
import toast from "react-hot-toast";

type PaymentItem = {
  id: string;
  parentFullName: string;
  parentEmail: string;
  childFullName: string;
  childAge?: number | null;
  status: string;
  isPaid: boolean;
  paymentAmount?: number | null;
  paidAt?: string | null;
  createdAt: string;
};

export default function PaymentsPage() {
  const [items, setItems] = useState<PaymentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pageIndex, setPageIndex] = useState(0);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");
  const [paymentFilter, setPaymentFilter] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [modal, setModal] = useState<{ id: string; open: boolean }>({ id: "", open: false });
  const [paymentData, setPaymentData] = useState({
    isPaid: false,
    paymentAmount: 150,
    paidAt: "",
  });
  const [saving, setSaving] = useState(false);
  const limit = 10;
  const [sendingReminder, setSendingReminder] = useState<string | null>(null);

  const getPaymentStatusBadge = (isPaid: boolean) => {
    if (isPaid) {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800 whitespace-nowrap">
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          Paid
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-800 whitespace-nowrap">
        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
        Unpaid
      </span>
    );
  };

  const getStatusClasses = (status: string) => {
    const classes: Record<string, string> = {
      submitted: "bg-yellow-100 text-yellow-800",
      processing: "bg-blue-100 text-blue-800",
      completed: "bg-green-100 text-green-800",
      rejected: "bg-red-100 text-red-800",
    };
    return classes[status] || "bg-gray-100 text-gray-800";
  };

  const columns = useMemo<TableColumn<PaymentItem>[]>(() => [
    { name: "Parent", selector: r => r.parentFullName, sortable: true, grow: 1 },
    { name: "Email", selector: r => r.parentEmail, sortable: true, grow: 1 },
    { name: "Child", selector: r => r.childFullName, sortable: true },
    { name: "Age", selector: r => String(r.childAge ?? ""), width: "80px" },
    {
      name: "Status",
      cell: (row) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusClasses(row.status)}`}>
          {row.status}
        </span>
      ),
      sortable: true,
    },
    {
      name: "Payment Status",
      cell: (row) => getPaymentStatusBadge(row.isPaid),
      sortable: true,
    },
    {
      name: "Amount",
      cell: (row) => (
        <span className="font-medium">
          {row.paymentAmount ? `$${row.paymentAmount}` : "$150"}
        </span>
      ),
      sortable: true,
    },
    {
      name: "Paid At",
      cell: (row) => (
        <span className="text-sm text-slate-600">
          {row.paidAt ? new Date(row.paidAt).toLocaleString() : "-"}
        </span>
      ),
      sortable: true,
    },
    // {
    //   name: "Actions",
    //   cell: (row) => (
    //     <button
    //       onClick={() => openModal(row)}
    //       className="px-3 py-1 my-2 rounded-md text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 transition-colors"
    //     >
    //       Update Payment
    //     </button>
    //   ),
    //   ignoreRowClick: true,
    //   width: "150px",
    // },
    {
  name: "Actions",
  cell: (row) => (
    <div className="flex items-center gap-2">
      <button
        onClick={() => openModal(row)}
        className="px-3 py-1.5 rounded-md text-xs font-medium bg-blue-600 text-white hover:bg-blue-700 transition-colors whitespace-nowrap"
      >
        Update
      </button>
      {!row.isPaid && (
        <button
          onClick={() => handleSendReminder(row.id)}
          disabled={sendingReminder === row.id}
          className="px-3 py-1.5 rounded-md text-xs font-medium bg-orange-600 text-white hover:bg-orange-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
        >
          {sendingReminder === row.id ? "Sending..." : "Remind"}
        </button>
      )}
    </div>
  ),
  ignoreRowClick: true,
  width: "180px",
},
    {
      name: "View Applicatoin",
      cell: (row) => (
        <Link
          className="text-blue-600 hover:underline text-sm"
          href={`/admin/applications/${row.id}`}
        >
          Open
        </Link>
      ),
      ignoreRowClick: true,
      width: "80px",
    },
    ], [sendingReminder]);
  // ], []);


  const load = async () => {
    try {
      setLoading(true);
      setError(null);
      const params = new URLSearchParams();
      params.set('page', String(pageIndex + 1));
      params.set('limit', String(limit));
      if (search.trim()) params.set('q', search.trim());
      if (paymentFilter === 'paid') params.set('paid', 'true');
      if (paymentFilter === 'unpaid') {
        // We'll filter on client side or add API support
      }
      // Only set status filter if it's not empty, and never include rejected
      // The API will exclude rejected by default when status is not "rejected"
      if (statusFilter) params.set('status', statusFilter);
      const qs = params.toString() ? `?${params.toString()}` : "";
      const res = await apiService.get(`/api/admin/applications${qs}`);
      if (res.success) {
        let applications = res.data.applications || [];
        // Always filter out rejected applications (safety check)
        applications = applications.filter((app: PaymentItem) => app.status !== 'rejected');
        // Filter unpaid if needed
        if (paymentFilter === 'unpaid') {
          applications = applications.filter((app: PaymentItem) => !app.isPaid);
        }
        setItems(applications);
        // Recalculate total after filtering
        const filteredTotal = applications.length;
        setTotal(filteredTotal);
      } else {
        setError(res.message || 'Failed to load');
      }
    } catch (e: any) {
      setError(e?.message || 'Failed to load');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, [pageIndex, search, paymentFilter, statusFilter]);

  const openModal = (item: PaymentItem) => {
    setModal({ id: item.id, open: true });
    setPaymentData({
      isPaid: item.isPaid,
      paymentAmount: item.paymentAmount ?? 150,
      paidAt: item.paidAt ? new Date(item.paidAt).toISOString().split('T')[0] : "",
    });
  };

  const closeModal = () => {
    setModal({ id: "", open: false });
    setPaymentData({
      isPaid: false,
      paymentAmount: 150,
      paidAt: "",
    });
  };

  const handleSavePayment = async () => {
    try {
      setSaving(true);
      setError(null);
      const payload: any = {
        isPaid: paymentData.isPaid,
        paymentAmount: paymentData.paymentAmount,
      };
      
      if (paymentData.isPaid) {
        if (paymentData.paidAt) {
          payload.paidAt = new Date(paymentData.paidAt).toISOString();
        } else {
          payload.paidAt = new Date().toISOString();
        }
      } else {
        payload.paidAt = null;
      }

      const res = await apiService.post(`/api/admin/payments/${modal.id}`, payload);
      if (res.success) {
        closeModal();
        load();
      } else {
        setError(res.message || 'Failed to update payment');
      }
    } catch (e: any) {
      setError(e?.message || 'Failed to update payment');
    } finally {
      setSaving(false);
    }
  };

const handleSendReminder = async (applicationId: string) => {
  try {
    setSendingReminder(applicationId);
    setError(null);
    const res = await apiService.post(`/api/admin/payments/${applicationId}/reminder`, {});
    if (res.success) {
      toast.success('Payment reminder email sent successfully!');
    } else {
      const errorMsg = res.message || 'Failed to send reminder email';
      setError(errorMsg);
      toast.error(errorMsg);
    }
  } catch (e: any) {
    const errorMsg = e?.message || 'Failed to send reminder email';
    setError(errorMsg);
    toast.error(errorMsg);
  } finally {
    setSendingReminder(null);
  }
};

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm ring-1 ring-black/5 p-6">
        <div className="flex items-center justify-between gap-3 flex-wrap mb-4">
          <h1 className="text-2xl font-bold text-slate-900">Payment Management</h1>
          <div className="flex items-center gap-3 flex-wrap">
            <input
              value={search}
              onChange={(e) => { setPageIndex(0); setSearch(e.target.value); }}
              placeholder="Search by parent, email, child..."
              className="w-56 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 placeholder:text-slate-400"
            />
          </div>
        </div>

        <div className="flex items-center gap-3 flex-wrap mb-4">
          <select
            value={paymentFilter}
            onChange={(e) => { setPageIndex(0); setPaymentFilter(e.target.value); }}
            className="border border-slate-300 rounded-lg px-3 py-2 text-slate-900 bg-white"
          >
            <option value="">All Payments</option>
            <option value="paid">Paid</option>
            <option value="unpaid">Unpaid</option>
          </select>
          <select
            value={statusFilter}
            onChange={(e) => { setPageIndex(0); setStatusFilter(e.target.value); }}
            className="border border-slate-300 rounded-lg px-3 py-2 text-slate-900 bg-white"
          >
            <option value="">All Statuses</option>
            <option value="submitted">Submitted</option>
            <option value="processing">Processing</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        {error && <div className="mb-4 text-red-600 bg-red-50 p-3 rounded-lg">{error}</div>}

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

      {modal.open && (
        <Modal isOpen={modal.open} onClose={closeModal} title="Update Payment Status">
          <div className="p-5 space-y-4 text-slate-900">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Payment Status
              </label>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    checked={paymentData.isPaid === true}
                    onChange={() => setPaymentData({ ...paymentData, isPaid: true })}
                    className="h-4 w-4 text-blue-600"
                  />
                  <span className="text-slate-700">Paid</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    checked={paymentData.isPaid === false}
                    onChange={() => setPaymentData({ ...paymentData, isPaid: false })}
                    className="h-4 w-4 text-blue-600"
                  />
                  <span className="text-slate-700">Unpaid</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Payment Amount ($)
              </label>
              <input
                type="number"
                value={paymentData.paymentAmount}
                onChange={(e) => setPaymentData({ ...paymentData, paymentAmount: parseFloat(e.target.value) || 0 })}
                className="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-900"
                min="0"
                step="0.01"
              />
            </div>

            {paymentData.isPaid && (
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Paid Date
                </label>
                <input
                  type="date"
                  value={paymentData.paidAt}
                  onChange={(e) => setPaymentData({ ...paymentData, paidAt: e.target.value })}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-900"
                />
                <p className="text-xs text-slate-500 mt-1">
                  Leave empty to use current date
                </p>
              </div>
            )}

            <div className="flex justify-end gap-3 pt-4">
              <button
                onClick={closeModal}
                className="px-4 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50"
                disabled={saving}
              >
                Cancel
              </button>
              <button
                onClick={handleSavePayment}
                disabled={saving}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? "Saving..." : "Save Payment"}
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
