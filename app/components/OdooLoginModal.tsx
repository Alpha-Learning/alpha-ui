"use client";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const ODOO_BASE_URL = process.env.NEXT_PUBLIC_ODOO_BASE_URL || "https://smslive.alpheraacademy.edu.bh";
const ODOO_DB = process.env.NEXT_PUBLIC_ODOO_DB || "sms_new_db";

interface OdooLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function OdooLoginModal({
  isOpen,
  onClose,
  onSuccess,
}: OdooLoginModalProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error("Please enter both email and password");
      return;
    }

    try {
      setLoading(true);
      
      // Call Odoo API directly with axios
      const payload = {
        jsonrpc: "2.0",
        method: "call",
        params: {
          db: ODOO_DB,
          login: email,
          password: password,
        },
        id: Math.floor(Math.random() * 100000),
      };

      const response = await axios.post(
        `${ODOO_BASE_URL}/web/session/authenticate`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      console.log("Login response:", response);
      console.log("Response headers:", response.headers);

      const data = response.data;

      if (data.error || !data.result) {
        toast.error(data.error?.message || data.error?.data?.message || "Invalid credentials");
        return;
      }

      const sessionInfo = data.result;
      
      // Try to extract session_id from response headers (Set-Cookie) first
      let sessionId = null;
      const setCookieHeader = response.headers['set-cookie'];
      if (setCookieHeader) {
        // set-cookie can be a string or array
        const cookies = Array.isArray(setCookieHeader) ? setCookieHeader : [setCookieHeader];
        for (const cookie of cookies) {
          const match = cookie.match(/session_id=([^;]+)/);
          if (match && match[1]) {
            sessionId = match[1];
            break;
          }
        }
      }
      
      // Fallback to extracting from response body
      if (!sessionId) {
        sessionId = sessionInfo.session_sid || sessionInfo.session_id || sessionInfo.uid;
      }
      
      if (!sessionId) {
        console.error("Session info:", sessionInfo);
        toast.error("Failed to get session token from Odoo");
        return;
      }

      // Store the login-generated token for use in cookie headers
      // This token will be passed as session_id in the Cookie header for subsequent API calls
      localStorage.setItem("odooToken", String(sessionId));
      localStorage.setItem("odooSession", JSON.stringify(sessionInfo));
      
      console.log("Odoo login successful. Session token stored:", sessionId);
      
      toast.success("Successfully logged in to Odoo!");
      onSuccess?.();
      onClose();
      
      // Reset form
      setEmail("");
      setPassword("");
    } catch (error: any) {
      console.error("Odoo login error:", error);
      toast.error(error.response?.data?.error?.message || error.message || "Failed to connect to Odoo server");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md mx-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-slate-900">Login to Odoo</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <p className="text-sm text-slate-600 mb-6">
          Enter your credentials to sync your application with Odoo Admission System.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-slate-700 mb-1"
            >
              Email / Username
            </label>
            <input
              id="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your email or username"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-slate-700 mb-1"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

