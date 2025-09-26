"use client";
import Link from "next/link";
import { FiArrowRight, FiUser, FiCheckCircle } from "react-icons/fi";

export default function ThanksPage() {
  return (
    <main className="min-h-screen flex items-center justify-center sm:bg-slate-50 p-6">
      <div className="bg-white rounded-2xl sm:shadow-sm sm:ring-1 sm:ring-black/5 p-10 text-center max-w-lg">
        <div className="mb-6">
          <FiCheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">Thank you!</h1>
          <p className="text-slate-600 mt-2">
            Your pre-assessment details have been received. Our admissions team will contact you soon.
          </p>
        </div>

        <div className="space-y-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="text-sm font-medium text-blue-900 mb-2">What's Next?</h3>
            <ul className="text-xs text-blue-800 space-y-1 text-left">
              <li>• Our team will review your application</li>
              <li>• You'll receive updates via email</li>
              <li>• We'll schedule a follow-up call if needed</li>
            </ul>
          </div>

          <div className="pt-4">
            <Link href="/auth/login">
              <button className="[clip-path:polygon(0%_0%,95%_0%,100%_28%,100%_100%,6%_100%,0%_65%)]  w-full cursor-pointer bg-gradient-to-r from-[#8EC0C2] to-[#142954] text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 font-semibold">
                <FiUser className="w-5 h-5" />
                Access Your Dashboard
                <FiArrowRight className="w-4 h-4" />
              </button>
            </Link>
          </div>

          <div className="text-center">
            <Link href="/" className="text-sm text-gray-500 hover:text-gray-700 transition-colors">
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}


