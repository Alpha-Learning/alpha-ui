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

  const handleSubmit = () => {
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!isValid) {
      setError("Enter a valid email address");
      return;
    }
    setError(null);
    setDrawerOpen(false);
    router.push(`/auth/login?email=${encodeURIComponent(email)}`);
  };
  return (
    <div className="fixed inset-0 z-50">
      <div
        className="absolute inset-0 bg-black/40"
        onClick={() => setDrawerOpen(false)}
      />
      <div className="absolute left-0 top-0 h-full w-[86vw] max-w-[420px] m-2 mt-[14px] pb-7">
        <div className="h-full bg-white rounded-3xl shadow-xl slide-in-left flex flex-col">
          {/* Header */}
          <div className="p-4 flex items-center justify-between gap-3 ">
            <div className="flex items-center gap-2">
              <FaRegQuestionCircle className="text-gray-600" />
              {/* <span className="text-sm font-semibold text-gray-800">Request Form</span> */}
            </div>
            {/* <button
              className="px-2 py-1 text-gray-400 hover:text-gray-600 cursor-pointer text-lg font-bold"
              
            > */}
             <RiCloseFill className="text-gray-600 cursor-pointer" onClick={() => setDrawerOpen(false)} />
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
              className="w-[16px] h-33 rotate-[132deg] absolute -top-7 right-9 hidden md:flex bg-[#9A9A9A]"
            />
          </div>

          {/* Main Content */}
          <div className="flex-1 p-6 flex flex-col justify-center">
            <div className="w-full mb-6">
              <label className="block text-sm text-gray-700 font-semibold mb-3">
                Enter your email
              </label>
              <input 
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-2 text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" 
              />
              {error && <p className="text-xs text-red-600 mb-2">{error}</p>}
              <button onClick={handleSubmit} className="[clip-path:polygon(0%_0%,95%_0%,100%_28%,100%_100%,6%_100%,0%_65%)] w-full cursor-pointer py-3 flex justify-between items-center bg-gradient-to-r from-sky-400 to-blue-600 text-white rounded-lg px-4 hover:from-sky-500 hover:to-blue-700 transition-all">
                <span className="font-semibold">Continue</span>
                <span className="text-lg">→</span>
              </button>
              <Link className="text-blue-600 hover:text-blue-800 font-sm text-center mt-4 block" href="/auth/login">Already registered? Login here</Link>
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 pt-0">
            <p className="text-xs text-gray-500 text-center leading-relaxed">
              By continuing, you accept the Regulations and the Privacy Policy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
