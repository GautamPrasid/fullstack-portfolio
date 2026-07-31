"use client";

import React, { useState } from "react";
import AdminHeader from "@/components/admin/AdminHeader";
import { Globe, Check, Save } from "lucide-react";

export default function AdminSeoPage() {
  const [seo, setSeo] = useState({
    title: "Prasid Gautam | Full-Stack Developer & BCA Student",
    description: "Personal portfolio of Prasid Gautam showcasing software projects in C, JavaFX, and Next.js 16.",
    keywords: "Prasid Gautam, Full-Stack Developer, BCA Student, LA GRANDEE, Pokhara Nepal, Next.js, JavaFX",
    ogImage: "https://prasidgautam.com.np/profile.JPG",
  });
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="flex-1 flex flex-col min-w-0">
      <AdminHeader
        title="SEO &amp; Dynamic Metadata CMS"
        subtitle="Manage search engine indexing title tags, meta descriptions &amp; OpenGraph cards"
      />

      <main className="flex-1 p-6 md:p-8 space-y-6 overflow-y-auto">
        <form onSubmit={handleSave} className="p-6 md:p-8 rounded-2xl bg-slate-900/40 border border-white/10 space-y-4 max-w-2xl">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300 block">Default Meta Title Tag</label>
            <input
              type="text"
              required
              value={seo.title}
              onChange={(e) => setSeo({ ...seo, title: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs font-mono"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300 block">Meta Description</label>
            <textarea
              rows={3}
              required
              value={seo.description}
              onChange={(e) => setSeo({ ...seo, description: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs leading-relaxed"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300 block">Keywords (Comma Separated)</label>
            <input
              type="text"
              value={seo.keywords}
              onChange={(e) => setSeo({ ...seo, keywords: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs font-mono"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300 block">OpenGraph Preview Image URL</label>
            <input
              type="text"
              value={seo.ogImage}
              onChange={(e) => setSeo({ ...seo, ogImage: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs font-mono"
            />
          </div>

          <div className="pt-4 border-t border-white/10 flex justify-end">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold flex items-center gap-2"
            >
              {saved ? <Check className="w-4 h-4 text-emerald-300" /> : <Save className="w-4 h-4" />}
              <span>{saved ? "Saved Metadata" : "Save SEO Metadata"}</span>
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
