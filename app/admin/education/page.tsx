"use client";

import React, { useEffect, useState, useTransition } from "react";
import AdminHeader from "@/components/admin/AdminHeader";
import { GraduationCap, Check, Loader2, Plus, Trash2 } from "lucide-react";
import { fetchAdminEducation, upsertEducation, deleteEducation } from "./actions";
import type { EducationRecord } from "./actions";

export default function AdminEducationPage() {
  const [educationList, setEducationList] = useState<EducationRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [isPending, startTransition] = useTransition();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | undefined>(undefined);
  const [edu, setEdu] = useState({
    institute: "",
    degree: "",
    start_date: "",
    end_date: "",
    description: "",
    logo_url: "",
    sort_order: 0,
  });
  const [saved, setSaved] = useState(false);

  const loadData = async () => {
    setLoading(true);
    const data = await fetchAdminEducation();
    setEducationList(data ?? []);
    setLoading(false);
  };

  useEffect(() => {
    queueMicrotask(() => {
      loadData();
    });
  }, []);

  const handleOpenForm = (record?: EducationRecord) => {
    if (record) {
      setEditingId(record.id);
      setEdu({
        institute: record.institute,
        degree: record.degree,
        start_date: record.year,
        end_date: "",
        description: record.description ?? "",
        logo_url: record.logo_url ?? "",
        sort_order: record.sort_order ?? 0,
      });
    } else {
      setEditingId(undefined);
      setEdu({
        institute: "",
        degree: "",
        start_date: new Date().getFullYear().toString(),
        end_date: "",
        description: "",
        logo_url: "",
        sort_order: 0,
      });
    }
    setShowForm(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      const res = await upsertEducation({
        id: editingId,
        institution: edu.institute,
        degree: edu.degree,
        start_date: edu.start_date,
        end_date: edu.end_date || null,
        description: edu.description,
        logo_url: edu.logo_url,
        sort_order: edu.sort_order,
      });
      if (res.success) {
        setSaved(true);
        setTimeout(() => setSaved(false), 2500);
        setShowForm(false);
        loadData();
      }
    });
  };

  const handleDelete = (id: string) => {
    startTransition(async () => {
      const res = await deleteEducation(id);
      if (res.success) loadData();
    });
  };

  return (
    <div className="flex-1 flex flex-col min-w-0">
      <AdminHeader
        title="Education &amp; Credentials CMS"
        subtitle="Manage degree credentials, university affiliations &amp; academic records"
      />

      <main className="flex-1 p-6 md:p-8 space-y-6 overflow-y-auto">
        <div className="flex justify-end">
          <button
            onClick={() => handleOpenForm()}
            disabled={isPending}
            className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold flex items-center gap-2 disabled:opacity-60"
          >
            <Plus className="w-4 h-4" /> Add Credential
          </button>
        </div>

        {showForm && (
          <form onSubmit={handleSave} className="p-6 md:p-8 rounded-2xl bg-slate-900/40 border border-white/10 space-y-4 max-w-2xl">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300 block">Degree Title</label>
              <input type="text" required value={edu.degree} onChange={(e) => setEdu({ ...edu, degree: e.target.value })} className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs font-mono" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300 block">Institution / College</label>
              <input type="text" required value={edu.institute} onChange={(e) => setEdu({ ...edu, institute: e.target.value })} className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs font-mono" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300 block">Year / Period</label>
              <input type="text" required value={edu.start_date} onChange={(e) => setEdu({ ...edu, start_date: e.target.value })} placeholder="e.g. 2025 — Present or 2024" className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs font-mono" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300 block">Description (optional)</label>
              <textarea rows={3} value={edu.description} onChange={(e) => setEdu({ ...edu, description: e.target.value })} className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs leading-relaxed" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300 block">Logo URL (optional)</label>
              <input type="url" value={edu.logo_url} onChange={(e) => setEdu({ ...edu, logo_url: e.target.value })} className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs font-mono" />
            </div>
            <div className="pt-4 border-t border-white/10 flex justify-end gap-2">
              <button type="button" onClick={() => setShowForm(false)} className="px-5 py-2.5 rounded-xl bg-slate-800 text-slate-300 text-xs border border-white/10">Cancel</button>
              <button type="submit" disabled={isPending} className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold flex items-center gap-2 disabled:opacity-60">
                {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : saved ? <Check className="w-4 h-4 text-emerald-300" /> : <GraduationCap className="w-4 h-4" />}
                <span>{isPending ? "Saving..." : saved ? "Saved" : "Save Credentials"}</span>
              </button>
            </div>
          </form>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl">
          {loading ? (
            <div className="col-span-full p-12 text-center text-slate-400 text-xs flex items-center justify-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" />
              Loading education records...
            </div>
          ) : educationList.length === 0 ? (
            <div className="col-span-full p-12 rounded-2xl bg-slate-900/40 border border-white/10 text-center text-slate-400 text-xs">
              No education records yet. Add your first credential above.
            </div>
          ) : (
            educationList.map((record) => (
              <div key={record.id} className="p-6 rounded-2xl bg-slate-900/40 border border-white/10 space-y-3 relative">
                <button onClick={() => handleDelete(record.id)} disabled={isPending} className="absolute top-4 right-4 p-1.5 rounded-lg bg-slate-900 border border-white/10 text-slate-400 hover:text-rose-400 hover:border-rose-500/30 disabled:opacity-50">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
                <button onClick={() => handleOpenForm(record)} className="absolute top-4 right-14 p-1.5 rounded-lg bg-slate-900 border border-white/10 text-slate-400 hover:text-purple-300 hover:border-purple-500/30">
                  <Plus className="w-3.5 h-3.5 rotate-45" />
                </button>
                <div className="pr-24 space-y-2">
                  <h4 className="text-sm font-bold text-white">{record.degree}</h4>
                  <p className="text-xs text-purple-400 font-mono">{record.institute}</p>
                  <p className="text-[10px] font-mono text-slate-400">{record.year}</p>
                  {record.description && <p className="text-xs text-slate-400 leading-relaxed">{record.description}</p>}
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
