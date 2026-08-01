"use client";

import React, { useState } from "react";
import AdminHeader from "@/components/admin/AdminHeader";
import { Save, Check } from "lucide-react";

export default function AdminAboutPage() {
  const [bio, setBio] = useState(
    "Full-Stack Software Developer & BCA Student at LA GRANDEE International College in Pokhara, Nepal. Engineering low-level C programs, JavaFX desktop systems (StudyBuddy), and Next.js 16 web applications."
  );
  const [location, setLocation] = useState("Pokhara, Nepal");
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="flex-1 flex flex-col min-w-0">
      <AdminHeader
        title="About &amp; Bio CMS"
        subtitle="Manage narrative bio, location details &amp; technical focus list"
      />

      <main className="flex-1 p-6 md:p-8 space-y-6 overflow-y-auto">
        <form onSubmit={handleSave} className="p-6 md:p-8 rounded-2xl bg-slate-900/40 border border-white/10 space-y-6 max-w-3xl">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300 block">Personal Narrative Bio</label>
            <textarea
              rows={4}
              required
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-white/10 text-white text-xs sm:text-sm leading-relaxed focus:border-purple-500 focus:outline-none"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300 block">Location Badge</label>
            <input
              type="text"
              required
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs font-mono focus:border-purple-500 focus:outline-none"
            />
          </div>

          <div className="pt-4 border-t border-white/10 flex justify-end">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold flex items-center gap-2 transition-all shadow-[0_0_15px_rgba(168,85,247,0.3)]"
            >
              {saved ? <Check className="w-4 h-4 text-emerald-300" /> : <Save className="w-4 h-4" />}
              <span>{saved ? "Saved Changes" : "Save Narrative Bio"}</span>
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
