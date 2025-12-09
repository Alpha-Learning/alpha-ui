"use client";
import Link from "next/link";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { FiCheckCircle, FiHome } from "react-icons/fi";

export default function QuestionnaireSuccessPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
          <div className="text-slate-600 text-lg">Loading...</div>
        </main>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}

function SuccessContent() {
  const searchParams = useSearchParams();
  const formType = searchParams.get("type") || "questionnaire";
  const applicationId = searchParams.get("applicationId");

  const formTypeNames: Record<string, string> = {
    "parent-guardian": "Parent/Guardian Questionnaire",
    "caregiver": "Caregiver Questionnaire",
    "outsider": "Outsider Questionnaire",
    "ks1-interview": "KS1 Interview Questions",
    "ks2-interview": "KS2 Interview Questions",
    "guided-observation": "Guided Observation Procedure",
  };

  const formName = formTypeNames[formType] || "Questionnaire";

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
      <div className="bg-white rounded-2xl shadow-sm ring-1 ring-black/5 p-10 text-center max-w-lg w-full">
        <div className="mb-6">
          <FiCheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">
            Thank You!
          </h1>
          <p className="text-slate-600 mt-2">
            Your {formName} has been submitted successfully.
          </p>
          {applicationId && (
            <p className="text-sm text-slate-500 mt-1">
              Application ID: {applicationId}
            </p>
          )}
        </div>

        <div className="space-y-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="text-sm font-medium text-blue-900 mb-2">
              What's Next?
            </h3>
            <ul className="text-xs text-blue-800 space-y-1 text-left">
              <li>• Our team will review your submission</li>
              <li>• You'll receive updates via email</li>
              <li>• We'll contact you if any additional information is needed</li>
            </ul>
          </div>

          <div className="pt-4 space-y-3">
            <Link href="/">
              <button className="[clip-path:polygon(0%_0%,95%_0%,100%_28%,100%_100%,6%_100%,0%_65%)] w-full cursor-pointer bg-gradient-to-r from-[#8EC0C2] to-[#142954] text-white px-6 py-3 rounded-lg hover:brightness-[1.05] active:brightness-95 transition-all flex items-center justify-center gap-2 font-semibold">
                <FiHome className="w-5 h-5" />
                Return to Home
              </button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

