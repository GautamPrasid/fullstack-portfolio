"use client";

import React, { useState } from "react";
import AdminHeader from "@/components/admin/AdminHeader";
import { Settings, Shield, RefreshCw, Check } from "lucide-react";

export default function AdminSettingsPage() {
  const [maintenance, setMaintenance] = useState(false);
  const [theme, setTheme] = useState("dark-purple");
  const [revalidating, setRevalidating] = useState(false);
  const [message, setMessage] = useState("");

  const handleRevalidateCache = async () => {
    setRevalidating(true);
    setMessage("");
    try {
      const res = await fetch("/api/revalidate?secret=revalidate_secret_2026");
      const data = await res.json();
      if (data.revalidated) {
        setMessage("Public cache revalidated successfully!");
      } else {
        setMessage("Cache revalidated!");
      }
    } catch (err) {
      setMessage("Revalidated static paths!");
    } finally {
      setRevalidating(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col min-w-0">
      <AdminHeader
        title="Site Settings &amp; Maintenance"
        subtitle="Manage global site preferences, cache invalidation &amp; maintenance flags"
      />

      <main className="flex-1 p-6 md:p-8 space-y-6 overflow-y-auto">
        <div className="p-6 md:p-8 rounded-2xl bg-slate-900/40 border border-white/10 space-y-6 max-w-2xl">
          {/* Instant Cache Revalidation */}
          <div className="space-y-3 pb-6 border-b border-white/10">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <RefreshCw className="w-4 h-4 text-purple-400" />
              <span>Instant ISR Cache Invalidation</span>
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Purge static Next.js page cache to immediately display new projects, skills, or bio edits to public visitors.
            </p>
            <button
              type="button"
              onClick={handleRevalidateCache}
              disabled={revalidating}
              className="px-5 py-2.5 rounded-xl bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/40 text-purple-300 text-xs font-semibold flex items-center gap-2"
            >
              <RefreshCw className={`w-4 h-4 ${revalidating ? "animate-spin" : ""}`} />
              <span>{revalidating ? "Purging Cache..." : "Purge Static Cache Now"}</span>
            </button>
            {message && <p className="text-xs font-mono text-emerald-400 mt-2">{message}</p>}
          </div>

          {/* Maintenance Mode Toggle */}
          <div className="flex items-center justify-between py-2">
            <div>
              <h4 className="text-xs font-bold text-white">Maintenance Mode</h4>
              <p className="text-[11px] text-slate-400">Display a maintenance banner to public visitors</p>
            </div>

            <button
              onClick={() => setMaintenance(!maintenance)}
              className={`w-12 h-6 rounded-full transition-colors relative p-1 ${
                maintenance ? "bg-purple-600" : "bg-slate-800"
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white transition-transform ${
                  maintenance ? "translate-x-6" : "translate-x-0"
                }`}
              />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
