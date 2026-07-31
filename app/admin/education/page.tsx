"use client";

import React, { useState } from "react";
import AdminHeader from "@/components/admin/AdminHeader";
import { GraduationCap, Award, Check } from "lucide-react";

export default function AdminEducationPage() {
  const [edu, setEdu] = useState({
    degree: "Bachelor of Computer Applications (BCA)",
    institution: "LA GRANDEE International College",
    affiliation: "Pokhara University",
    location: "Pokhara, Nepal",
    period: "2025 — Present",
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
        title="Education &amp; Credentials CMS"
        subtitle="Manage degree credentials, university affiliations &amp; academic records"
      />

      <main className="flex-1 p-6 md:p-8 space-y-6 overflow-y-auto">
        <form onSubmit={handleSave} className="p-6 md:p-8 rounded-2xl bg-slate-900/40 border border-white/10 space-y-4 max-w-2xl">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300 block">Degree Title</label>
            <input
              type="text"
              required
              value={edu.degree}
              onChange={(e) => setEdu({ ...edu, degree: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs font-mono"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300 block">Institution / College</label>
            <input
              type="text"
              required
              value={edu.institution}
              onChange={(e) => setEdu({ ...edu, institution: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs font-mono"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300 block">University Affiliation</label>
              <input
                type="text"
                required
                value={edu.affiliation}
                onChange={(e) => setEdu({ ...edu, affiliation: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs font-mono"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300 block">Period</label>
              <input
                type="text"
                required
                value={edu.period}
                onChange={(e) => setEdu({ ...edu, period: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs font-mono"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-white/10 flex justify-end">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold flex items-center gap-2"
            >
              {saved ? <Check className="w-4 h-4 text-emerald-300" /> : <GraduationCap className="w-4 h-4" />}
              <span>{saved ? "Saved Credentials" : "Save Credentials"}</span>
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
