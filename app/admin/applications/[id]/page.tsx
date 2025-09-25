"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { apiService } from "@/app/utils";

type AppDetail = {
  id: string;
  parentFullName: string;
  parentEmail: string;
  childFullName: string;
  status: string;
  isPaid: boolean;
  paymentAmount?: number | null;
  paidAt?: string | null;
  currentStage: number;
  totalStages: number;
};

export default function AdminApplicationDetailPage() {
  const params = useParams<{ id: string }>();
  const [data, setData] = useState<AppDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await apiService.get(`/api/admin/applications/${params.id}`);
        if (res.success) setData(res.data);
        else setError(res.message || 'Failed to load');
      } catch (e: any) {
        setError(e?.message || 'Failed to load');
      } finally {
        setLoading(false);
      }
    })();
  }, [params.id]);

  if (loading) return <div className="bg-white rounded-xl shadow-sm ring-1 ring-black/5 p-6">Loading…</div>;
  if (error) return <div className="bg-white rounded-xl shadow-sm ring-1 ring-black/5 p-6 text-red-600">{error}</div>;
  if (!data) return null;

  const pct = Math.round((data.currentStage / data.totalStages) * 100);
  const stageTitles = [
    "Application form",
    "Screening call and flow script",
    "Parent/Guardian/Outsider question",
    "Facility walkthrough checklist",
    "Initial observation form",
    "Guided observation procedures",
    "KS1 interview / KS2 interview question",
    "Examiner Form: Peer Dynamic Observation",
    "Parent-Child Dynamic Observation",
    "Understanding The Learning Comprehensive Profile Sheet",
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm ring-1 ring-black/5 p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-xl font-bold text-slate-900">{data.parentFullName} <span className="text-slate-500">({data.parentEmail})</span></div>
            <div className="text-sm text-slate-600">Child: {data.childFullName}</div>
          </div>
          <div className="text-sm text-slate-600">Status: <span className="font-medium text-slate-900">{data.status}</span></div>
        </div>

        <div className="mb-4">
          <div className="text-sm text-slate-700 mb-1">Application Progress</div>
          <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
            <div className="h-full bg-blue-600" style={{ width: `${pct}%` }} />
          </div>
          <div className="text-xs text-slate-500 mt-1">{data.currentStage} / {data.totalStages} ({pct}%)</div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {Array.from({ length: data.totalStages }, (_, i) => i).map((idx) => {
            const stageNumber = idx + 1;
            const hrefMap: Record<number, string> = {
              1: `/admin/applications/${data.id}`,
              2: `/admin/applications/${data.id}/screening-call`,
            };
            const href = hrefMap[stageNumber];
            const inner = (
              <div className={`p-3 rounded-lg border ${stageNumber <= data.currentStage ? 'bg-green-50 border-green-200' : 'bg-slate-50 border-slate-200'}`}>
                <div className="text-sm font-medium text-slate-900">{stageTitles[idx] ?? `Form ${stageNumber}`}</div>
                <div className="text-xs text-slate-600">{stageNumber <= data.currentStage ? 'Completed' : 'Pending'}</div>
              </div>
            );
            return href ? (
              <Link key={idx} href={href} className="block hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg">
                {inner}
              </Link>
            ) : (
              <div key={idx}>{inner}</div>
            );
          })}
        </div>

        <div className="mt-6 text-sm text-slate-600">
          Payment: {data.isPaid ? (<span className="text-green-700 font-medium">Paid ${data.paymentAmount ?? 150} {data.paidAt ? `on ${new Date(data.paidAt).toLocaleString()}` : ''}</span>) : (<span className="text-slate-900">Unpaid</span>)}
        </div>
      </div>
    </div>
  );
}


