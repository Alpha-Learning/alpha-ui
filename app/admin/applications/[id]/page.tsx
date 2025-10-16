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
    <div className="relative h-full">
      <div 
        className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 h-full min-h-[180px] flex flex-col ${
          isCompleted 
            ? 'bg-green-50 border-green-200 hover:border-green-300' 
            : 'bg-gray-50 border-gray-200 hover:border-gray-300'
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-start justify-between mb-3">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
            isCompleted 
              ? 'bg-green-500 text-white' 
              : 'bg-gray-300 text-gray-600'
          }`}>
            {isCompleted ? '✓' : '3'}
          </div>
          <div className={`w-3 h-3 rounded-full ${
            isCompleted ? 'bg-green-500' : 'bg-gray-300'
          }`}></div>
        </div>
        <div className="text-sm font-medium text-gray-900 mb-1">{stageTitle}</div>
        <div className="flex items-center justify-between">
          <div className={`text-xs font-medium ${
            isCompleted ? 'text-green-600' : 'text-gray-500'
          }`}>
            {isCompleted ? 'Completed' : 'Pending'}
          </div>
          <span className="text-blue-600 text-xs font-medium">▼ Forms</span>
        </div>
      </div>
      
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-xl z-20">
          <div className="p-4">
            <div className="text-sm font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <div className="w-2 h-2  rounded-full"></div>
              Share Forms
            </div>
            <div className="space-y-2">
              {forms.map((form, index) => (
                <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg border border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full `}></div>
                    <span className="text-sm font-medium text-gray-700">{form.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => copyToClipboard(form.url, form.name)}
                      className="text-xs px-3 py-1 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors font-medium"
                    >
                      {copied === form.name ? 'Copied!' : 'Copy'}
                    </button>
                    <Link
                      href={form.url}
                      className="text-xs px-3 py-1 bg-green-100 text-green-700 rounded-md hover:bg-green-200 transition-colors font-medium"
                      target="_blank"
                    >
                      Open
                    </Link>
                  </div>
                </div>
              ))}
            </div>
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
    },
    {
      name: "Guided Observation Procedure",
      url: `${baseUrl}/admin/applications/${applicationId}/guided-observations-procedure`,
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
    <div className="relative h-full">
      <div 
        className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 h-full min-h-[180px] flex flex-col ${
          isCompleted 
            ? 'bg-green-50 border-green-200 hover:border-green-300' 
            : 'bg-gray-50 border-gray-200 hover:border-gray-300'
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-start justify-between mb-3">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
            isCompleted 
              ? 'bg-green-500 text-white' 
              : 'bg-gray-300 text-gray-600'
          }`}>
            {isCompleted ? '✓' : '5'}
          </div>
          <div className={`w-3 h-3 rounded-full ${
            isCompleted ? 'bg-green-500' : 'bg-gray-300'
          }`}></div>
        </div>
        <div className="text-sm font-medium text-gray-900 mb-1">{stageTitle}</div>
        <div className="flex items-center justify-between">
          <div className={`text-xs font-medium ${
            isCompleted ? 'text-green-600' : 'text-gray-500'
          }`}>
            {isCompleted ? 'Completed' : 'Pending'}
          </div>
          <span className="text-blue-600 text-xs font-medium">▼ Forms</span>
        </div>
      </div>
      
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-xl z-20">
          <div className="p-4">
            <div className="text-sm font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
              Assessment Forms
            </div>
            <div className="space-y-2">
              {forms.map((form, index) => (
                <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg border border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full bg-${form.color}-500`}></div>
                    <span className="text-sm font-medium text-gray-700">{form.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => copyToClipboard(form.url, form.name)}
                      className="text-xs px-3 py-1 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors font-medium"
                    >
                      {copied === form.name ? 'Copied!' : 'Copy'}
                    </button>
                    <Link
                      href={form.url}
                      className="text-xs px-3 py-1 bg-green-100 text-green-700 rounded-md hover:bg-green-200 transition-colors font-medium"
                      target="_blank"
                    >
                      Open
                    </Link>
                  </div>
                </div>
              ))}
            </div>
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
  ];
  const completedCount = completionFields.filter(Boolean).length;
  const pct = Math.round((completedCount / 9) * 100);
  
  const stageTitles = [
    "1. Application form",
    "2. Screening call and flow script",
    "3. Parent/Guardian/Outsider question",
    "4. Initial observation form",
    "5. KS1 interview / KS2 interview / Guided Observation Procedure",
    "6. Parent-Child Dynamic Observation",
    "7. Examiner Form: Peer Dynamic Observation",
    "8. Understanding The Parent",
    "9. UTL Comprehensive Profile Sheet",
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">
                    {data.parentFullName.split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </span>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">{data.parentFullName}</h1>
                  <p className="text-gray-600">{data.parentEmail}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <span className="font-medium">Child:</span>
                  <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded-md font-medium">
                    {data.childFullName}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">Status:</span>
                  <span className={`px-2 py-1 rounded-md font-medium ${
                    data.status === 'completed' 
                      ? 'bg-green-100 text-green-700' 
                      : data.status === 'in_progress'
                      ? 'bg-yellow-100 text-yellow-700'
                      : 'bg-gray-100 text-gray-700'
                  }`}>
                    {data.status}
                  </span>
                </div>
              </div>
            </div>
            
            {/* Payment Status */}
            <div className="lg:text-right">
              <div className="text-sm text-gray-600 mb-1">Payment Status</div>
              {data.isPaid ? (
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-green-700 font-semibold">
                    Paid ${data.paymentAmount ?? 150}
                  </span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-red-700 font-semibold">Unpaid</span>
                </div>
              )}
              {data.paidAt && (
                <div className="text-xs text-gray-500 mt-1">
                  {new Date(data.paidAt).toLocaleDateString()}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Progress Overview */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Application Progress</h2>
            <div className="text-sm text-gray-600">
              {completedCount} of 9 stages completed
            </div>
          </div>
          
          {/* Enhanced Progress Bar */}
          {/* <div className="mb-4">
            <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
              <span>Overall Progress</span>
              <span className="font-semibold">{pct}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div 
                className={`h-3 rounded-full W-[${pct}%] transition-all duration-500 ${
                  pct === 100 
                    ? 'bg-gradient-to-r from-green-500 to-green-600' 
                    : pct >= 70 
                    ? 'bg-gradient-to-r from-blue-500 to-blue-600' 
                    : pct >= 40 
                    ? 'bg-gradient-to-r from-yellow-500 to-yellow-600' 
                    : 'bg-gradient-to-r from-red-500 to-red-600'
                }`}
              ></div>
            </div>
          </div> */}

          {/* Progress Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{completedCount}</div>
              <div className="text-sm text-green-700">Completed</div>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <div className="text-2xl font-bold text-yellow-600">{9 - completedCount}</div>
              <div className="text-sm text-yellow-700">Remaining</div>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{pct}%</div>
              <div className="text-sm text-blue-700">Progress</div>
            </div>
          </div>
        </div>

        {/* Forms Grid */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Application Forms</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 items-stretch">
            {Array.from({ length: 9 }, (_, i) => i).map((idx) => {
              const stageNumber = idx + 1;
              const isCompleted = completionFields[idx] || false;
               const hrefMap: Record<number, string> = {
                 1: `/admin/applications/${data.id}/initial-form`,
                 2: `/admin/applications/${data.id}/screening-call`,
                 4: `/admin/applications/${data.id}/initial-observation-form`,
                 6: `/admin/applications/${data.id}/parent-child-dynamic-observation`,
                 7: `/admin/applications/${data.id}/peer-dynamic-observation`,
                 8: `/admin/applications/${data.id}/understanding-parent`,
                 9: `/admin/applications/${data.id}/comprehensive-profile-sheet`,
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
              
               // Special handling for stage 5 with dropdown (KS1/KS2 Interview)
               if (stageNumber === 5) {
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
                <div className={`p-4 rounded-lg border-2 transition-all duration-200 h-full min-h-[180px] flex flex-col ${
                  isCompleted 
                    ? 'bg-green-50 border-green-200 hover:border-green-300' 
                    : 'bg-gray-50 border-gray-200 hover:border-gray-300'
                }`}>
                  <div className="flex items-start justify-between mb-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      isCompleted 
                        ? 'bg-green-500 text-white' 
                        : 'bg-gray-300 text-gray-600'
                    }`}>
                      {isCompleted ? '✓' : stageNumber}
                    </div>
                    <div className={`w-3 h-3 rounded-full ${
                      isCompleted ? 'bg-green-500' : 'bg-gray-300'
                    }`}></div>
                  </div>
                  <div className="text-sm font-medium text-gray-900 mb-1">
                    {stageTitles[idx] ?? `Form ${stageNumber}`}
                  </div>
                  <div className={`text-xs font-medium ${
                    isCompleted ? 'text-green-600' : 'text-gray-500'
                  }`}>
                    {isCompleted ? 'Completed' : 'Pending'}
                  </div>
                </div>
              );
              
              return href ? (
                <Link 
                  key={idx} 
                  href={href} 
                  className="block h-full hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg transition-transform duration-200"
                >
                  {inner}
                </Link>
              ) : (
                <div key={idx}>{inner}</div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}


