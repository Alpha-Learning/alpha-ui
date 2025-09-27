"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FaRegQuestionCircle } from "react-icons/fa";
import { RiCloseFill } from "react-icons/ri";


export default function LeftInputSection({
  setDrawerOpen,
}: {
  setDrawerOpen: (open: boolean) => void;
}) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = () => {
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!isValid) {
      setError("Enter a valid email address");
      return;
    }
    setError(null);
    setIsSubmitting(true);
    
    // Navigate immediately without waiting for drawer animation
    router.push(`/form/pre-assessment?email=${encodeURIComponent(email)}`);
    
    // Close drawer after navigation starts
    // setTimeout(() => {
    //   setDrawerOpen(false);
    // }, 100);
  };
  return (
    <div className="fixed inset-0 z-50">
      <div
        className="absolute inset-0 bg-black/40"
        onClick={() => setDrawerOpen(false)}
      />
      <div className="absolute left-0 top-0 h-full w-[90vw] sm:w-[80vw] md:w-[70vw] lg:w-[60vw] xl:w-[50vw] max-w-[420px] m-1 sm:m-2 md:m-3 lg:m-2 mt-2 sm:mt-[14px] md:mt-4 lg:mt-4 pb-4 sm:pb-7">
        <div className="h-full bg-white rounded-2xl sm:rounded-3xl shadow-xl slide-in-left flex flex-col">
          {/* Header */}
          <div className="p-3 sm:p-4 md:p-5 lg:p-6 flex items-center justify-between gap-2 sm:gap-3">
            <div className="flex items-center gap-1 sm:gap-2">
              <FaRegQuestionCircle className="text-gray-600 w-4 h-4 sm:w-5 sm:h-5" />
              {/* <span className="text-sm font-semibold text-gray-800">Request Form</span> */}
            </div>
            {/* <button
              className="px-2 py-1 text-gray-400 hover:text-gray-600 cursor-pointer text-lg font-bold"
              
            > */}
             <RiCloseFill className="text-gray-600 cursor-pointer w-5 h-5 sm:w-6 sm:h-6" onClick={() => setDrawerOpen(false)} />
            {/* </button> */}
            {/* Decorative element */}
            <div
              style={{
                clipPath: `polygon(
                  0% 0%, 8% 3%, 16% 6%, 22% 18%, 28% 50%,
                  22% 82%, 16% 94%, 8% 97%, 0% 100%,
                  100% 100%, 92% 97%, 84% 94%, 78% 82%, 72% 50%,
                  78% 18%, 84% 6%, 92% 3%, 100% 0%
                )`,
              }}
              className=" w-[14px] sm:w-[16px] h-8 sm:h-39 rotate-[132deg] absolute -top-5 sm:-top-8 right-7 sm:right-11 hidden xl:flex bg-[#9A9A9A]"
            />
          </div>

          {/* Main Content */}
          <div className="flex-1 p-4 sm:p-6 md:p-8 lg:p-10 flex flex-col justify-center">
            <div className="w-full mb-4 sm:mb-6">
              <label className="block text-sm sm:text-base text-gray-700 font-semibold mb-2 sm:mb-3">
                Enter your email
              </label>
              <input 
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full border border-gray-300 rounded-lg px-3 sm:px-4 py-2 sm:py-3 mb-2 text-sm sm:text-base text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" 
              />
              {error && <p className="text-xs sm:text-sm text-red-600 mb-2">{error}</p>}
              <button 
                onClick={handleSubmit} 
                disabled={isSubmitting}
                className="[clip-path:polygon(0%_0%,95%_0%,100%_28%,100%_100%,6%_100%,0%_65%)] w-full cursor-pointer py-2 sm:py-3 flex justify-between items-center bg-gradient-to-r from-[#8EC0C2] to-[#142954] text-white rounded-lg px-3 sm:px-4 hover:brightness-[1.05] active:brightness-95 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
              >
                <span className="font-semibold text-sm sm:text-base">{isSubmitting ? "Redirecting..." : "Continue"}</span>
                <span className="text-base sm:text-lg">{isSubmitting ? "⏳" : "→"}</span>
              </button>
              <Link className="text-[#142954] text-xs sm:text-sm text-center mt-3 sm:mt-4 block" href="/auth/login">Already registered? Login here</Link>
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 sm:p-6 md:p-8 lg:p-10 pt-0">
            <p className="text-xs sm:text-sm text-[#142954] text-center leading-relaxed">
              By continuing, you accept the Regulations and the Privacy Policy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
