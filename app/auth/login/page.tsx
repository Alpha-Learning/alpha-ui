"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string; form?: string }>({});
  const [submitting, setSubmitting] = useState(false);
  const params = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const incoming = params.get("email");
    if (incoming) setEmail(incoming);
  }, [params]);

  const validate = () => {
    const next: typeof errors = {};
    if (!email.trim()) {
      next.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      next.email = "Enter a valid email";
    }
    if (!password) {
      next.password = "Password is required";
    } else if (password.length < 6) {
      next.password = "Minimum 6 characters";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    try {
      // Placeholder: integrate with your auth API here
      await new Promise((r) => setTimeout(r, 800));
      // Redirect or show toast
      router.push("/");
    } catch (err) {
      setErrors((prev) => ({ ...prev, form: "Login failed. Try again." }));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.08)] ring-1 ring-black/5 p-6 sm:p-8">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 text-center">Welcome back</h1>
          <p className="text-sm text-slate-500 text-center mt-2 mb-6">Sign in to your account</p>

          {errors.form && (
            <div className="mb-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
              {errors.form}
            </div>
          )}

          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                className={`w-full rounded-xl border px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition ${
                  errors.email ? "border-red-300" : "border-slate-300"
                }`}
                placeholder="you@example.com"
              />
              {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                className={`w-full rounded-xl border px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition ${
                  errors.password ? "border-red-300" : "border-slate-300"
                }`}
                placeholder="••••••••"
              />
              {errors.password && <p className="mt-1 text-xs text-red-600">{errors.password}</p>}
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="inline-flex items-center gap-2 select-none">
                <input type="checkbox" className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-600" />
                <span className="text-slate-600">Remember me</span>
              </label>
              <Link href="#" className="text-blue-700 hover:text-blue-800 font-medium">Forgot password?</Link>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full [clip-path:polygon(0%_0%,95%_0%,100%_28%,100%_100%,6%_100%,0%_65%)] rounded-xl bg-gradient-to-r from-sky-400 to-blue-700 text-white font-semibold py-3 shadow-md hover:from-sky-500 hover:to-blue-800 active:scale-[0.99] transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {submitting ? "Signing in…" : "Sign in"}
            </button>
          </form>

          <p className="text-xs text-slate-500 text-center mt-6">
            Don’t have an account? {" "}
            <Link href="/" className="text-blue-700 hover:text-blue-800 font-medium">Create one</Link>
          </p>
        </div>
      </div>
    </main>
  );
}


