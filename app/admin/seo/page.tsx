"use client";

import React, { useEffect, useState, useTransition } from "react";
import AdminHeader from "@/components/admin/AdminHeader";
import { Search, Check, Loader2 } from "lucide-react";
import { fetchSeoSettings, createOrUpdateSeoSettings } from "./actions";
import type { SeoSettingsRecord } from "./actions";

export default function AdminSeoPage() {
  const [seo, setSeo] = useState<SeoSettingsRecord>({
    id: "",
    site_title: "",
    meta_description: "",
    keywords: null,
    favicon_url: null,
    og_image_url: null,
    robots: null,
    twitter_card: null,
    created_at: null,
    updated_at: null,
  });
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);
  const [keywordInput, setKeywordInput] = useState("");
  const [isPending, startTransition] = useTransition();

  const loadData = async () => {
    setLoading(true);
    const data = await fetchSeoSettings();
    if (data) setSeo(data);
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
      const res = await createOrUpdateSeoSettings({
        id: seo.id,
        site_title: seo.site_title,
        meta_description: seo.meta_description,
        keywords: seo.keywords ?? undefined,
        favicon_url: seo.favicon_url ?? undefined,
        og_image_url: seo.og_image_url ?? undefined,
        robots: seo.robots ?? undefined,
        twitter_card: seo.twitter_card ?? undefined,
      });
      if (res.success) {
        setSaved(true);
        setTimeout(() => setSaved(false), 2500);
        loadData();
      }
    });
  };

  const addKeyword = () => {
    if (!keywordInput.trim()) return;
    setSeo({ ...seo, keywords: [...(seo.keywords ?? []), keywordInput.trim()] });
    setKeywordInput("");
  };

  const removeKeyword = (k: string) => {
    setSeo({ ...seo, keywords: (seo.keywords ?? []).filter((x: string) => x !== k) });
  };

  return (
    <div className="flex-1 flex flex-col min-w-0">
      <AdminHeader
        title="Search Engine Optimization Panel"
        subtitle="Configure meta tags, OG images, keywords, crawling &amp; search discovery"
      />

      <main className="flex-1 p-6 md:p-8 overflow-y-auto">
        {loading ? (
          <div className="p-12 text-center text-slate-400 text-xs flex items-center justify-center gap-2">
            <Loader2 className="w-4 h-4 animate-spin" />
            Loading SEO settings...
          </div>
        ) : (
          <form onSubmit={handleSave} className="max-w-4xl space-y-6">
            <div className="p-6 md:p-8 rounded-2xl bg-slate-900/40 border border-white/10 space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300 block">
                  Browser / Tab Title
                </label>
                <input
                  type="text"
                  required
                  value={seo.site_title}
                  onChange={(e) => setSeo({ ...seo, site_title: e.target.value })}
                  placeholder="Prasid Gautam — Full-Stack Developer"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs font-mono"
                />
                <p className="text-[10px] text-slate-500 font-mono pt-1">
                  {seo.site_title.length} / 60 characters recommended
                </p>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300 block">
                  Meta Description
                </label>
                <textarea
                  required
                  rows={3}
                  value={seo.meta_description}
                  onChange={(e) => setSeo({ ...seo, meta_description: e.target.value })}
                  placeholder="Portfolio of Prasid Gautam — Full-stack developer specializing in Next.js, React, scalable web apps, and ML-driven solutions."
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs leading-relaxed"
                />
                <p className="text-[10px] text-slate-500 font-mono pt-1">
                  {seo.meta_description.length} / 160 characters recommended
                </p>
              </div>
            </div>

            <div className="p-6 md:p-8 rounded-2xl bg-slate-900/40 border border-white/10 space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-300 block">Search Keywords (Tags)</label>
                <div className="flex gap-2">
                  <input
                    value={keywordInput}
                    onChange={(e) => setKeywordInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addKeyword();
                      }
                    }}
                    placeholder="Add keyword and press Enter"
                    className="flex-1 px-4 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs font-mono"
                  />
                  <button
                    type="button"
                    onClick={addKeyword}
                    className="px-4 py-2.5 rounded-xl bg-slate-800 text-white text-xs border border-white/10"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2 pt-1">
                  {(seo.keywords ?? []).length === 0 ? (
                    <span className="text-[11px] text-slate-500">No keywords yet.</span>
                  ) : (
                    (seo.keywords ?? []).map((k: string) => (
                      <span
                        key={k}
                        className="px-2.5 py-1 rounded-lg bg-purple-500/15 border border-purple-500/30 text-xs text-purple-300 flex items-center gap-1.5"
                      >
                        <Search className="w-3 h-3" />
                        {k}
                        <button type="button" onClick={() => removeKeyword(k)} className="text-purple-400 hover:text-rose-400">
                          ×
                        </button>
                      </span>
                    ))
                  )}
                </div>
              </div>
            </div>

            <div className="p-6 md:p-8 rounded-2xl bg-slate-900/40 border border-white/10 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300 block">Favicon URL</label>
                  <input
                    type="url"
                    value={seo.favicon_url ?? ""}
                    onChange={(e) => setSeo({ ...seo, favicon_url: e.target.value })}
                    placeholder="https://... /favicon.ico"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs font-mono"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300 block">Social OG Image URL (1200×630)</label>
                  <input
                    type="url"
                    value={seo.og_image_url ?? ""}
                    onChange={(e) => setSeo({ ...seo, og_image_url: e.target.value })}
                    placeholder="https://.../og-banner.jpg"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs font-mono"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300 block">Robots.txt / Crawl Policy</label>
                  <select
                    value={seo.robots ?? "index, follow"}
                    onChange={(e) => setSeo({ ...seo, robots: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs font-mono"
                  >
                    <option value="index, follow">Index &amp; Follow (Recommended)</option>
                    <option value="index, nofollow">Index, NoFollow</option>
                    <option value="noindex, follow">NoIndex, Follow</option>
                    <option value="noindex, nofollow">NoIndex, NoFollow</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300 block">Twitter / X Card Style</label>
                  <select
                    value={seo.twitter_card ?? "summary_large_image"}
                    onChange={(e) => setSeo({ ...seo, twitter_card: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs font-mono"
                  >
                    <option value="summary_large_image">Summary Large Image</option>
                    <option value="summary">Summary (Small)</option>
                    <option value="app">App Card</option>
                    <option value="player">Player Card</option>
                  </select>
                </div>
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
                  <Search className="w-4 h-4" />
                )}
                <span>{isPending ? "Saving..." : saved ? "SEO Config Saved" : "Save SEO Configuration"}</span>
              </button>
            </div>
          </form>
        )}
      </main>
    </div>
  );
}
