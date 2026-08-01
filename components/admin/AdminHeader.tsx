"use client";

import React from "react";
import Link from "next/link";
import { ExternalLink, Bell, RefreshCw } from "lucide-react";

interface AdminHeaderProps {
  title: string;
  subtitle?: string;
  onRefresh?: () => void;
}

export default function AdminHeader({ title, subtitle, onRefresh }: AdminHeaderProps) {
  return (
    <header className="sticky top-0 z-20 bg-background/90 backdrop-blur-md border-b border-white/10 px-6 py-4 flex items-center justify-between">
      <div>
        <h1 className="text-xl font-bold text-white tracking-tight">{title}</h1>
        {subtitle && <p className="text-xs text-slate-400 mt-0.5">{subtitle}</p>}
      </div>

      <div className="flex items-center gap-3">
        {onRefresh && (
          <button
            onClick={onRefresh}
            className="p-2.5 rounded-xl bg-slate-900 border border-white/10 text-slate-300 hover:text-white hover:border-purple-500/40 transition-all focus-ring"
            title="Refresh Data"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        )}

        <Link
          href="/"
          target="_blank"
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs font-semibold text-purple-300 hover:text-white hover:border-purple-500/40 transition-all focus-ring"
        >
          <span>View Public Site</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>

        <div className="w-8 h-8 rounded-full bg-linear-to-r from-purple-600 to-pink-600 flex items-center justify-center text-white text-xs font-bold shadow-lg">
          PG
        </div>
      </div>
    </header>
  );
}
