"use client";
import { useAuth } from "@/app/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRoles?: string[];
  fallbackPath?: string;
}

export default function ProtectedRoute({ 
  children, 
  requiredRoles = [], 
  fallbackPath = "/auth/login" 
}: ProtectedRouteProps) {
  const { isAuthenticated, user, isLoading, hasAnyRole } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        router.push(fallbackPath);
        return;
      }

      if (requiredRoles.length > 0 && !hasAnyRole(requiredRoles)) {
        router.push("/unauthorized");
        return;
      }
    }
  }, [isAuthenticated, user, isLoading, requiredRoles, hasAnyRole, router, fallbackPath]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Will redirect
  }

  if (requiredRoles.length > 0 && !hasAnyRole(requiredRoles)) {
    return null; // Will redirect
  }

  return <>{children}</>;
}
