"use client";

import React, { useState } from "react";
import AdminHeader from "@/components/admin/AdminHeader";
import { Check, Save } from "lucide-react";

export default function AdminContentPage() {
  const [content, setContent] = useState({
    youtubeHandle: "@deeeznotfound",
    youtubeVideoId: "dQw4w9WgXcQ",
    instagramHandle: "@user_on_break__",
    facebookHandle: "Prasid Gautam",
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
        title="Media &amp; Content CMS"
        subtitle="Manage YouTube video embeds, social handles &amp; content tags"
      />

      <main className="flex-1 p-6 md:p-8 space-y-6 overflow-y-auto">
        <form onSubmit={handleSave} className="p-6 md:p-8 rounded-2xl bg-slate-900/40 border border-white/10 space-y-4 max-w-2xl">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300 block">YouTube Channel Handle</label>
            <input
              type="text"
              required
              value={content.youtubeHandle}
              onChange={(e) => setContent({ ...content, youtubeHandle: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs font-mono"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300 block">Featured YouTube Video ID</label>
            <input
              type="text"
              required
              value={content.youtubeVideoId}
              onChange={(e) => setContent({ ...content, youtubeVideoId: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs font-mono"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300 block">Instagram Handle</label>
              <input
                type="text"
                value={content.instagramHandle}
                onChange={(e) => setContent({ ...content, instagramHandle: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs font-mono"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300 block">Facebook Profile</label>
              <input
                type="text"
                value={content.facebookHandle}
                onChange={(e) => setContent({ ...content, facebookHandle: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs font-mono"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-white/10 flex justify-end">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold flex items-center gap-2"
            >
              {saved ? <Check className="w-4 h-4 text-emerald-300" /> : <Save className="w-4 h-4" />}
              <span>{saved ? "Saved Settings" : "Save Content Settings"}</span>
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
