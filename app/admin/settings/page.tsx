"use client";

import React, { useEffect, useState, useTransition } from "react";
import AdminHeader from "@/components/admin/AdminHeader";
import { Settings, Check, Loader2, Trash2, RefreshCw } from "lucide-react";
import { fetchSiteSettings, createOrUpdateSiteSettings } from "./actions";
import type { SiteSettingsRecord } from "./actions";

const REVALIDATE_SECRET = process.env.NEXT_PUBLIC_REVALIDATE_SECRET_TOKEN ?? process.env.REVALIDATE_SECRET_TOKEN ?? "";

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<SiteSettingsRecord>({
    id: "",
    site_name: "",
    accent_color: null,
    google_analytics_id: null,
    google_search_console_id: null,
    maintenance_mode: false,
    primary_color: null,
    theme: null,
    created_at: null,
    updated_at: null,
  });
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);
  const [clearing, setClearing] = useState(false);
  const [revalidating, setRevalidating] = useState(false);
  const [isPending, startTransition] = useTransition();

  const loadData = async () => {
    setLoading(true);
    const data = await fetchSiteSettings();
    if (data) setSettings(data);
    setLoading(false);
  };

  useEffect(() => {
    queueMicrotask(() => {
      loadData();
    });
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      const res = await createOrUpdateSiteSettings({
        id: settings.id,
        site_name: settings.site_name,
        accent_color: settings.accent_color ?? undefined,
        google_analytics_id: settings.google_analytics_id ?? undefined,
        google_search_console_id: settings.google_search_console_id ?? undefined,
        maintenance_mode: settings.maintenance_mode,
        primary_color: settings.primary_color ?? undefined,
        theme: settings.theme ?? undefined,
      });
      if (res.success) {
        setSaved(true);
        setTimeout(() => setSaved(false), 2500);
        loadData();
      }
    });
  };

  const handleRevalidate = async () => {
    setRevalidating(true);
    try {
      const url = REVALIDATE_SECRET
        ? `/api/revalidate?secret=${encodeURIComponent(REVALIDATE_SECRET)}`
        : `/api/revalidate`;
      await fetch(url);
      setTimeout(() => setRevalidating(false), 1500);
    } catch {
      setRevalidating(false);
    }
  };

  const handleClearCache = () => {
    setClearing(true);
    if ("caches" in window) {
      caches.keys().then((names) => Promise.all(names.map((n) => caches.delete(n)))).finally(() => {
        setTimeout(() => setClearing(false), 1500);
      });
    } else {
      setTimeout(() => setClearing(false), 1200);
    }
    localStorage.clear();
    sessionStorage.clear();
  };

  return (
    <div className="flex-1 flex flex-col min-w-0">
      <AdminHeader
        title="Site-Wide Settings Control"
        subtitle="Configure global site name, themes, analytics, maintenance &amp; cache control"
      />

      <main className="flex-1 p-6 md:p-8 overflow-y-auto">
        {loading ? (
          <div className="p-12 text-center text-slate-400 text-xs flex items-center justify-center gap-2">
            <Loader2 className="w-4 h-4 animate-spin" />
            Loading site settings...
          </div>
        ) : (
          <form onSubmit={handleSave} className="max-w-4xl space-y-6">
            <div className="p-6 md:p-8 rounded-2xl bg-slate-900/40 border border-white/10 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2 space-y-1">
                  <label className="text-xs font-semibold text-slate-300 block">
                    Site / Display Name
                  </label>
                  <input
                    type="text"
                    value={settings.site_name ?? ""}
                    onChange={(e) => setSettings({ ...settings, site_name: e.target.value })}
                    placeholder="Prasid Gautam — Portfolio"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs font-mono"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300 block">
                    UI Theme Mode
                  </label>
                  <select
                    value={settings.theme ?? "dark"}
                    onChange={(e) => setSettings({ ...settings, theme: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs font-mono"
                  >
                    <option value="dark">Dark / Midnight</option>
                    <option value="light">Light / Day</option>
                    <option value="system">Follow System</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300 block">
                    Accent Color (Hex)
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={settings.accent_color ?? "#9333ea"}
                      onChange={(e) => setSettings({ ...settings, accent_color: e.target.value })}
                      className="w-14 h-10 rounded-lg bg-slate-900 border border-white/10 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={settings.accent_color ?? "#9333ea"}
                      onChange={(e) => setSettings({ ...settings, accent_color: e.target.value })}
                      className="flex-1 px-4 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs font-mono"
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300 block">
                    Google Analytics ID
                  </label>
                  <input
                    type="text"
                    value={settings.google_analytics_id ?? ""}
                    onChange={(e) => setSettings({ ...settings, google_analytics_id: e.target.value })}
                    placeholder="G-XXXXXXXXXX"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs font-mono"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300 block">
                    Google Search Console / Site Verification ID
                  </label>
                  <input
                    type="text"
                    value={settings.google_search_console_id ?? ""}
                    onChange={(e) => setSettings({ ...settings, google_search_console_id: e.target.value })}
                    placeholder="googleXXXXXXXXXXXX.html"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs font-mono"
                  />
                </div>
              </div>

              <label className="flex items-center justify-between p-4 rounded-xl bg-slate-900/60 border border-white/10 cursor-pointer group">
                <div className="space-y-0.5">
                  <span className="text-xs font-semibold text-rose-300 block group-hover:text-rose-200">
                    Maintenance Mode
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono block">
                    Show landing page to public visitors while you edit the site
                  </span>
                </div>
                <div className="relative w-12 h-7 shrink-0">
                  <input
                    type="checkbox"
                    checked={settings.maintenance_mode ?? false}
                    onChange={(e) =>
                      setSettings({ ...settings, maintenance_mode: e.target.checked })
                    }
                    className="peer sr-only absolute inset-0 w-full h-full cursor-pointer"
                  />
                  <div className="w-12 h-7 rounded-full bg-slate-800 border border-white/10 peer-checked:bg-rose-500/70 peer-checked:border-rose-400/40 transition-colors" />
                  <div className="absolute left-1 top-1 w-5 h-5 rounded-full bg-white transition-transform peer-checked:translate-x-5 shadow-lg" />
                </div>
              </label>
            </div>

            <div className="p-6 md:p-8 rounded-2xl bg-slate-900/40 border border-white/10 space-y-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Settings className="w-4 h-4 text-purple-400" />
                System Maintenance &amp; Cache
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={handleClearCache}
                  disabled={clearing}
                  className="p-4 rounded-xl bg-slate-900/80 border border-white/10 text-left hover:border-rose-500/30 hover:bg-rose-500/5 transition group disabled:opacity-70"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-xs font-semibold text-slate-200 group-hover:text-rose-300">
                        Clear Local Cache
                      </p>
                      <p className="text-[10px] text-slate-500 font-mono mt-0.5">
                        storage / service worker / sessions
                      </p>
                    </div>
                    {clearing ? (
                      <Loader2 className="w-4 h-4 text-rose-400 animate-spin" />
                    ) : (
                      <Trash2 className="w-4 h-4 text-slate-500 group-hover:text-rose-400" />
                    )}
                  </div>
                </button>

                <button
                  type="button"
                  onClick={handleRevalidate}
                  disabled={revalidating}
                  className="p-4 rounded-xl bg-slate-900/80 border border-white/10 text-left hover:border-purple-500/30 hover:bg-purple-500/5 transition group disabled:opacity-70"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-xs font-semibold text-slate-200 group-hover:text-purple-300">
                        Revalidate Full Site
                      </p>
                      <p className="text-[10px] text-slate-500 font-mono mt-0.5">
                        purge ISR cache · rebuild pages
                      </p>
                    </div>
                    {revalidating ? (
                      <Loader2 className="w-4 h-4 text-purple-400 animate-spin" />
                    ) : (
                      <RefreshCw className="w-4 h-4 text-slate-500 group-hover:text-purple-400" />
                    )}
                  </div>
                </button>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isPending}
                className="px-8 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold flex items-center gap-2 shadow-xl shadow-purple-600/20 disabled:opacity-60"
              >
                {isPending ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : saved ? (
                  <Check className="w-4 h-4 text-emerald-300" />
                ) : (
                  <Settings className="w-4 h-4" />
                )}
                <span>{isPending ? "Saving..." : saved ? "Settings Saved" : "Save All Settings"}</span>
              </button>
            </div>
          </form>
        )}
      </main>
    </div>
  );
}
