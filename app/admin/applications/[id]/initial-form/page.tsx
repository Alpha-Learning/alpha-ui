"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { apiService } from "@/app/utils";

type InitialFormData = {
  id: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  adminComment?: string | null;
  
  // Payment
  isPaid: boolean;
  paymentAmount?: number | null;
  paidAt?: string | null;

  // Parent/Guardian Information
  parentFullName: string;
  parentEmail: string;
  parentPhone?: string | null;
  relationToChild?: string | null;
  parentCity?: string | null;
  parentEthnicity?: string | null;

  // Child Information
  childFullName: string;
  childDateOfBirth?: string | null;
  childAge?: number | null;
  childGender?: string | null;
  childEthnicity?: string | null;
  childSchoolYear?: string | null;
  childCurrentSchool?: string | null;
  childSchoolType?: string | null;
  childSchoolTypeOther?: string | null;
  childDiagnosedNeeds?: string | null;

  // Caregiver/Nanny Information
  caregiverFullName?: string | null;
  caregiverPhone?: string | null;

  // Parent Questions
  qExcitesMost: string;
  qNonTraditionalReason: string;
  qBiggestHope: string;
  enjoysTech: string;
  enjoysHandsOn: string;

  // Consent
  consentContact: boolean;
  consentUpdates: boolean;
  consentBiometric?: boolean | null;
};

export default function InitialFormPage() {
  const params = useParams<{ id: string }>();
  const [data, setData] = useState<InitialFormData | null>(null);
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

  const formatDate = (dateString: any) => {
    if (!dateString) return 'Not provided';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatBoolean = (value: boolean | null | undefined) => {
    if (value === null || value === undefined) return 'Not specified';
    return value ? 'Yes' : 'No';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm ring-1 ring-black/5 p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Initial Application Form</h1>
            <p className="text-slate-600">Submitted by {data.parentFullName} ({data.parentEmail})</p>
          </div>
          {/* <Link 
            href={`/admin/applications/${params.id}`}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            ← Back to Application
          </Link> */}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <span className="font-medium text-slate-700">Status:</span>
            <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${
              data.status === 'completed' ? 'bg-green-100 text-green-800' :
              data.status === 'rejected' ? 'bg-red-100 text-red-800' :
              'bg-yellow-100 text-yellow-800'
            }`}>
              {data.status}
            </span>
          </div>
          <div>
            <span className="font-medium text-slate-700">Submitted:</span>
            <span className="ml-2 text-slate-900">{formatDate(data.createdAt)}</span>
          </div>
          <div>
            <span className="font-medium text-slate-700">Payment:</span>
            <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${
              data.isPaid ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              {data.isPaid ? `Paid $${data.paymentAmount || 150}` : 'Unpaid'}
            </span>
          </div>
        </div>
      </div>

      {/* Parent/Guardian Information */}
      <div className="bg-white rounded-xl shadow-sm ring-1 ring-black/5 p-6">
        <h2 className="text-xl font-bold text-slate-900 mb-4">Parent/Guardian Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
            <p className="text-slate-900 bg-slate-50 p-3 rounded-lg">{data.parentFullName}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
            <p className="text-slate-900 bg-slate-50 p-3 rounded-lg">{data.parentEmail}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
            <p className="text-slate-900 bg-slate-50 p-3 rounded-lg">{data.parentPhone || 'Not provided'}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Relation to Child</label>
            <p className="text-slate-900 bg-slate-50 p-3 rounded-lg">{data.relationToChild == "1" ? "Father" : data.relationToChild == "2" ? "Mother" : "Guardian"}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">City/Location</label>
            <p className="text-slate-900 bg-slate-50 p-3 rounded-lg">{data.parentCity || 'Not provided'}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Ethnicity</label>
            <p className="text-slate-900 bg-slate-50 p-3 rounded-lg">{data.parentEthnicity || 'Not provided'}</p>
          </div>
        </div>
      </div>

      {/* Child Information */}
      <div className="bg-white rounded-xl shadow-sm ring-1 ring-black/5 p-6">
        <h2 className="text-xl font-bold text-slate-900 mb-4">Child Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
            <p className="text-slate-900 bg-slate-50 p-3 rounded-lg">{data.childFullName}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Date of Birth</label>
            <p className="text-slate-900 bg-slate-50 p-3 rounded-lg">{formatDate(data.childDateOfBirth)}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Age</label>
            <p className="text-slate-900 bg-slate-50 p-3 rounded-lg">{data.childAge || 'Not provided'}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Gender</label>
            <p className="text-slate-900 bg-slate-50 p-3 rounded-lg">
              {data.childGender === 'M' ? 'Male' : data.childGender === 'F' ? 'Female' : 'Not provided'}
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Ethnicity</label>
            <p className="text-slate-900 bg-slate-50 p-3 rounded-lg">{data.childEthnicity || 'Not provided'}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">School Year</label>
            <p className="text-slate-900 bg-slate-50 p-3 rounded-lg">{data.childSchoolYear || 'Not provided'}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Current School</label>
            <p className="text-slate-900 bg-slate-50 p-3 rounded-lg">{data.childCurrentSchool || 'Not provided'}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">School Type</label>
            <p className="text-slate-900 bg-slate-50 p-3 rounded-lg">
              {data.childSchoolType === 'Other' && data.childSchoolTypeOther 
                ? data.childSchoolTypeOther 
                : data.childSchoolType || 'Not provided'}
            </p>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-slate-700 mb-1">Diagnosed Learning Needs</label>
            <p className="text-slate-900 bg-slate-50 p-3 rounded-lg">{data.childDiagnosedNeeds || 'Not provided'}</p>
          </div>
        </div>
      </div>

      {/* Caregiver Information */}
      {(data.caregiverFullName || data.caregiverPhone) && (
        <div className="bg-white rounded-xl shadow-sm ring-1 ring-black/5 p-6">
          <h2 className="text-xl font-bold text-slate-900 mb-4">Caregiver/Nanny Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
              <p className="text-slate-900 bg-slate-50 p-3 rounded-lg">{data.caregiverFullName || 'Not provided'}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
              <p className="text-slate-900 bg-slate-50 p-3 rounded-lg">{data.caregiverPhone || 'Not provided'}</p>
            </div>
          </div>
        </div>
      )}

      {/* Parent Questions */}
      <div className="bg-white rounded-xl shadow-sm ring-1 ring-black/5 p-6">
        <h2 className="text-xl font-bold text-slate-900 mb-4">Parent Questions</h2>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">What excites you most about this school?</label>
            <p className="text-slate-900 bg-slate-50 p-4 rounded-lg whitespace-pre-wrap">{data.qExcitesMost}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">What makes you consider a non-traditional education model?</label>
            <p className="text-slate-900 bg-slate-50 p-4 rounded-lg whitespace-pre-wrap">{data.qNonTraditionalReason}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">What is your biggest hope for your child's future?</label>
            <p className="text-slate-900 bg-slate-50 p-4 rounded-lg whitespace-pre-wrap">{data.qBiggestHope}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Does your child enjoy using technology to learn?</label>
              <p className="text-slate-900 bg-slate-50 p-3 rounded-lg">
                {data.enjoysTech === 'Yes' ? 'Yes' : data.enjoysTech === 'No' ? 'No' : 'Not Sure'}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Does your child enjoy hands-on experiential learning?</label>
              <p className="text-slate-900 bg-slate-50 p-3 rounded-lg">
                {data.enjoysHandsOn === 'Yes' ? 'Yes' : data.enjoysHandsOn === 'No' ? 'No' : 'Not Sure'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Consent */}
      <div className="bg-white rounded-xl shadow-sm ring-1 ring-black/5 p-6">
        <h2 className="text-xl font-bold text-slate-900 mb-4">Consent</h2>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
              data.consentContact ? 'bg-green-500 border-green-500' : 'border-slate-300'
            }`}>
              {data.consentContact && <div className="w-2 h-2 bg-white rounded-sm"></div>}
            </div>
            <span className="text-slate-900">I agree to be contacted by a member of the admissions team</span>
          </div>
          <div className="flex items-center gap-3">
            <div className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
              data.consentUpdates ? 'bg-green-500 border-green-500' : 'border-slate-300'
            }`}>
              {data.consentUpdates && <div className="w-2 h-2 bg-white rounded-sm"></div>}
            </div>
            <span className="text-slate-900">I give permission to receive updates about the school</span>
          </div>
          <div className="flex items-center gap-3">
            <div className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
              data.consentBiometric ? 'bg-green-500 border-green-500' : 'border-slate-300'
            }`}>
              {data.consentBiometric && <div className="w-2 h-2 bg-white rounded-sm"></div>}
            </div>
            <span className="text-slate-900">I consent to the use of biometric data for learning optimization (optional)</span>
          </div>
        </div>
      </div>

      {/* Admin Comment */}
      {data.adminComment && (
        <div className="bg-white rounded-xl shadow-sm ring-1 ring-black/5 p-6">
          <h2 className="text-xl font-bold text-slate-900 mb-4">Admin Comment</h2>
          <p className="text-slate-900 bg-slate-50 p-4 rounded-lg whitespace-pre-wrap">{data.adminComment}</p>
        </div>
      )}
    </div>
  );
}
