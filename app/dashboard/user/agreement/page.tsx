"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/contexts/AuthContext";

export default function ParentSchoolAgreementPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth/login');
    }
  }, [isAuthenticated, router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 mb-6">
          <button
            onClick={() => router.push('/dashboard/user')}
            className="text-gray-600 hover:text-gray-900 mb-4 flex items-center gap-2 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Dashboard
          </button>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Parent–School Agreement</h1>
          <p className="text-gray-600">Please review the terms and conditions of enrollment</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
          <div className="prose max-w-none">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Terms and Conditions</h2>
            
            <section className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">1. Enrollment Agreement</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                By enrolling your child at Alphera Academy, you agree to the terms and conditions outlined in this agreement. This agreement establishes the mutual understanding between the parent/guardian and the school regarding the educational services provided.
              </p>
            </section>

            <section className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">2. School Policies</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Parents and students are expected to comply with all school policies, including but not limited to:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Attendance and punctuality requirements</li>
                <li>Code of conduct and behavioral expectations</li>
                <li>Academic standards and assessment policies</li>
                <li>Technology use and digital citizenship</li>
                <li>Health and safety protocols</li>
              </ul>
            </section>

            <section className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">3. Parent Responsibilities</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Parents/guardians agree to:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Ensure regular attendance and punctuality</li>
                <li>Support the school's educational philosophy and approach</li>
                <li>Maintain open communication with teachers and staff</li>
                <li>Participate in parent-teacher conferences and school events</li>
                <li>Provide accurate and updated contact information</li>
                <li>Submit all required documents in a timely manner</li>
              </ul>
            </section>

            <section className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">4. School Responsibilities</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Alphera Academy commits to:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Provide high-quality, personalized education</li>
                <li>Maintain a safe and supportive learning environment</li>
                <li>Communicate regularly about student progress</li>
                <li>Respect individual learning styles and needs</li>
                <li>Foster a culture of innovation and creativity</li>
              </ul>
            </section>

            <section className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">5. Required Documents</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                The following documents must be submitted to complete enrollment:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Student CPR / ID</li>
                <li>Student Passport</li>
                <li>Birth Certificate</li>
                <li>Previous School Reports</li>
                <li>Vaccination / Immunization Record</li>
                <li>Passport Size Photographs (4)</li>
                <li>Parent CPR / ID Copies</li>
                <li>Parent Passport Copies</li>
              </ul>
            </section>

            <section className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">6. Fees and Payment</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                All fees and payment schedules are outlined in the enrollment package. Parents agree to fulfill all financial obligations as specified.
              </p>
            </section>

            <section className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">7. Acknowledgment</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                By proceeding with enrollment, you acknowledge that you have read, understood, and agree to comply with all terms and conditions outlined in this Parent–School Agreement.
              </p>
            </section>

            <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Note:</strong> This is a read-only view of the agreement. If you have any questions or need clarification on any terms, please contact the admissions office at info@alpheraacademy.edu.bh
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}