"use client";

import React from "react";
import { AlertCircle, RefreshCw } from "lucide-react";

interface ErrorViewProps {
  message: string;
  onRetry: () => void;
}

export default function ErrorView({ message, onRetry }: ErrorViewProps) {
  return (
    <div className="mx-auto my-12 max-w-md rounded-3xl border border-red-200 bg-white p-8 text-center shadow-md">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-red-500">
        <AlertCircle className="h-7 w-7" />
      </div>
      
      <h3 className="mt-5 font-serif text-xl font-bold text-slate-900">
        Failed to load collection
      </h3>
      
      <p className="mt-3 text-sm text-slate-500">
        {message || "We encountered an issue fetching the product listings. Please check your connection and try again."}
      </p>

      <button
        onClick={onRetry}
        className="group mt-6 inline-flex items-center gap-2 rounded-full bg-blue-600 px-5 py-2.5 text-xs font-semibold text-white shadow-md shadow-blue-500/10 transition-all duration-300 hover:bg-blue-700"
      >
        <RefreshCw className="h-3.5 w-3.5 transition-transform duration-500 group-hover:rotate-180" />
        <span>Try Again</span>
      </button>
    </div>
  );
}
