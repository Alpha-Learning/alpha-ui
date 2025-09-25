"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/contexts/AuthContext";
import { FormField, Input } from "@/app/components/forms/FormField";

export default function AdminLoginPage() {
  const router = useRouter();
  const { login, isLoading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const ok = await login(email, password);
    if (!ok) {
      setError("Invalid credentials");
      return;
    }
    // role check happens server-side on admin pages via ProtectedRoute; route to admin dashboard
    router.push("/admin/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-sm ring-1 ring-black/5 p-6">
        <h1 className="text-2xl font-bold text-slate-900 mb-1">Admin Login</h1>
        <p className="text-slate-500 mb-6">Sign in with your admin account</p>
        {error && <div className="mb-4 text-sm text-red-600">{error}</div>}
        <form onSubmit={onSubmit} className="space-y-4">
          <FormField label="Email" htmlFor="adminEmail">
            <Input
              id="adminEmail"
              type="email"
              placeholder="admin@example.com"
              value={email}
              onChange={(e: any) => setEmail(e.target.value)}
            />
          </FormField>
          <FormField label="Password" htmlFor="adminPassword">
            <Input
              id="adminPassword"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e: any) => setPassword(e.target.value)}
            />
          </FormField>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg px-4 py-2 disabled:opacity-60"
          >
            {isLoading ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}


