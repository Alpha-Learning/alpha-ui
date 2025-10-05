"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { apiService } from "@/app/utils";

// Stage 3 Dropdown Component
function Stage3Dropdown({ applicationId, isCompleted, stageTitle }: { 
  applicationId: string; 
  isCompleted: boolean; 
  stageTitle: string; 
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
  const forms = [
    {
      name: "Parent/Guardian Form",
      url: `${baseUrl}/admin/applications/${applicationId}/parent-guardian-form`,
      color: "blue"
    },
    {
      name: "Caregiver Form", 
      url: `${baseUrl}/admin/applications/${applicationId}/caregiver-form`,
      color: "green"
    },
    {
      name: "Outsider Form",
      url: `${baseUrl}/admin/applications/${applicationId}/outsider-form`,
      color: "purple"
    }
  ];

  const copyToClipboard = async (url: string, formName: string) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(formName);
      setTimeout(() => setCopied(null), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  return (
    <div className="relative">
      <div 
        className={`p-3 rounded-lg border cursor-pointer ${isCompleted ? 'bg-green-50 border-green-200' : 'bg-slate-50 border-slate-200'} hover:opacity-95`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="text-sm font-medium text-slate-900">{stageTitle}</div>
        <div className="text-xs text-slate-600 flex items-center justify-between">
          <span>{isCompleted ? 'Completed' : 'Pending'}</span>
          <span className="text-blue-600">▼ Forms</span>
        </div>
      </div>
      
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-200 rounded-lg shadow-lg z-10">
          <div className="p-2">
            <div className="text-xs font-medium text-slate-700 mb-2 px-2">Share Forms:</div>
            {forms.map((form, index) => (
              <div key={index} className="flex items-center justify-between p-2 hover:bg-slate-50 rounded">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full `}></div>
                  <span className="text-sm text-slate-700">{form.name}</span>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => copyToClipboard(form.url, form.name)}
                    className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
                  >
                    {copied === form.name ? 'Copied!' : 'Copy'}
                  </button>
                  <Link
                    href={form.url}
                    className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded hover:bg-green-200"
                    target="_blank"
                  >
                    Open
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// Stage 7 Dropdown Component
function Stage7Dropdown({ applicationId, isCompleted, stageTitle }: { 
  applicationId: string; 
  isCompleted: boolean; 
  stageTitle: string; 
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
  const forms = [
    {
      name: "KS1 Interview Questions",
      url: `${baseUrl}/admin/applications/${applicationId}/ks1interview`,
      color: "teal"
    },
    {
      name: "KS2 Interview Questions", 
      url: `${baseUrl}/admin/applications/${applicationId}/ks2interview`,
      color: "orange"
    }
  ];

  const copyToClipboard = async (url: string, formName: string) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(formName);
      setTimeout(() => setCopied(null), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  return (
    <div className="relative">
      <div 
        className={`p-3 rounded-lg border cursor-pointer ${isCompleted ? 'bg-green-50 border-green-200' : 'bg-slate-50 border-slate-200'} hover:opacity-95`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="text-sm font-medium text-slate-900">{stageTitle}</div>
        <div className="text-xs text-slate-600 flex items-center justify-between">
          <span>{isCompleted ? 'Completed' : 'Pending'}</span>
          <span className="text-blue-600">▼ Forms</span>
        </div>
      </div>
      
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-200 rounded-lg shadow-lg z-10">
          <div className="p-2">
            <div className="text-xs font-medium text-slate-700 mb-2 px-2">Interview Forms:</div>
            {forms.map((form, index) => (
              <div key={index} className="flex items-center justify-between p-2 hover:bg-slate-50 rounded">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full bg-${form.color}-500`}></div>
                  <span className="text-sm text-slate-700">{form.name}</span>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => copyToClipboard(form.url, form.name)}
                    className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
                  >
                    {copied === form.name ? 'Copied!' : 'Copy'}
                  </button>
                  <Link
                    href={form.url}
                    className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded hover:bg-green-200"
                    target="_blank"
                  >
                    Open
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

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

  // Calculate completion based on individual form completion fields
  const completionFields = [
    data.isFirstFormCompleted,
    data.isSecondFormCompleted,
    data.isThirdFormCompleted,
    data.isFourthFormCompleted,
    data.isFifthFormCompleted,
    data.isSixthFormCompleted,
    data.isSeventhFormCompleted,
    data.isEighthFormCompleted,
    data.isNinthFormCompleted,
    data.isTenthFormCompleted,
  ];
  const completedCount = completionFields.filter(Boolean).length;
  const pct = Math.round((completedCount / data.totalStages) * 100);
  
  const stageTitles = [
    "1. Application form",
    "2. Screening call and flow script",
    "3. Parent/Guardian/Outsider question",
    "4. Facility walkthrough checklist",
    "5. Initial observation form",
    "6. Guided observation procedures",
    "7. KS1 interview / KS2 interview question",
    "8. Examiner Form: Peer Dynamic Observation",
    "9. Parent-Child Dynamic Observation",
    "10. Understanding The Learning Comprehensive Profile Sheet",
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
          <div className="text-xs text-slate-500 mt-1">{completedCount} / {data.totalStages} ({pct}%)</div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {Array.from({ length: data.totalStages }, (_, i) => i).map((idx) => {
            const stageNumber = idx + 1;
            const isCompleted = completionFields[idx] || false;
            const hrefMap: Record<number, string> = {
              1: `/admin/applications/${data.id}/initial-form`,
              2: `/admin/applications/${data.id}/screening-call`,
              4: `/admin/applications/${data.id}/facility-walkthrough-checklist`,
              5: `/admin/applications/${data.id}/initial-observation-form`,
              6: `/admin/applications/${data.id}/guided-observations-procedure`,
              8: `/admin/applications/${data.id}/peer-dynamic-observation`,
              9: `/admin/applications/${data.id}/parent-child-dynamic-observation`,
              10: `/admin/applications/${data.id}/comprehensive-profile-sheet`,
            };
            const href = hrefMap[stageNumber];
            
            // Special handling for stage 3 with dropdown
            if (stageNumber === 3) {
              return (
                <Stage3Dropdown 
                  key={idx} 
                  applicationId={data.id} 
                  isCompleted={isCompleted}
                  stageTitle={stageTitles[idx]}
                />
              );
            }
            
            // Special handling for stage 7 with dropdown
            if (stageNumber === 7) {
              return (
                <Stage7Dropdown 
                  key={idx} 
                  applicationId={data.id} 
                  isCompleted={isCompleted}
                  stageTitle={stageTitles[idx]}
                />
              );
            }
            
            const inner = (
              <div className={`p-3 rounded-lg border ${isCompleted ? 'bg-green-50 border-green-200' : 'bg-slate-50 border-slate-200'}`}>
                <div className="text-sm font-medium text-slate-900">{stageTitles[idx] ?? `Form ${stageNumber}`}</div>
                <div className="text-xs text-slate-600">{isCompleted ? 'Completed' : 'Pending'}</div>
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


