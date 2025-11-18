"use client";

import React from "react";
import { FieldError } from "react-hook-form";

type FormFieldProps = {
  label: React.ReactNode;
  htmlFor: string;
  children: React.ReactNode;
  error?: FieldError;
  hint?: string;
};

export function FormField({ label, htmlFor, children, error, hint }: FormFieldProps) {
  return (
    <div className="space-y-1">
      <label htmlFor={htmlFor} className="block text-sm font-medium text-slate-800">
        {label}
      </label>
      {children}
      {hint && !error && <p className="text-xs text-slate-500">{hint}</p>}
      {error && <p className="text-xs text-red-600">{error.message}</p>}
    </div>
  );
}

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & { error?: boolean };

export function Input({ className = "", error, ...props }: InputProps) {
  return (
    <input
      {...props}
      className={`w-full rounded-xl border px-4 py-3 bg-transparent text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent transition ${
        error ? "border-red-300" : "border-slate-400"
      } ${className}`}
    />
  );
}


type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & { error?: boolean };

export function Textarea({ className = "", error, ...props }: TextareaProps) {
  return (
    <textarea
      {...props}
      className={`w-full rounded-xl border px-4 py-3 bg-transparent text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent transition ${
        error ? "border-red-300" : "border-slate-400"
      } ${className}`}
    />
  );
}

type FormSectionHeaderProps = { title: string; bgClassName?: string; className?: string };

export function FormSectionHeader({ title, bgClassName = "bg-transparent", className = "" }: FormSectionHeaderProps) {
  const hasBackground = !bgClassName.includes("transparent");
  return (
    <div className={`text-sm font-semibold px-3 py-2 rounded ${bgClassName} ${hasBackground ? "text-white" : "text-slate-900"} ${className}`}>
      {title}
    </div>
  );
}


