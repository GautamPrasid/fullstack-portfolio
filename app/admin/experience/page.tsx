"use client";

import React, { useEffect, useState, useTransition } from "react";
import AdminHeader from "@/components/admin/AdminHeader";
import { Trash2, Plus, Loader2 } from "lucide-react";
import { fetchAdminExperiences, upsertExperience, deleteExperience } from "./actions";
import type { ExperienceRecord } from "./actions";

export default function AdminExperiencePage() {
  const [events, setEvents] = useState<ExperienceRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [isPending, startTransition] = useTransition();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | undefined>(undefined);
  const [formData, setFormData] = useState({
    company: "",
    position: "",
    start_date: "",
    end_date: "",
    is_current: false,
    description: "",
    technologies: [] as string[],
    sort_order: 0,
  });
  const [techInput, setTechInput] = useState("");

  const loadData = async () => {
    setLoading(true);
    const data = await fetchAdminExperiences();
    setEvents(data ?? []);
    setLoading(false);
  };

  useEffect(() => {
    queueMicrotask(() => {
      loadData();
    });
  }, []);

  const handleOpenForm = (event?: ExperienceRecord) => {
    if (event) {
      setEditingId(event.id);
      setFormData({
        company: event.company,
        position: event.position,
        start_date: event.start_date,
        end_date: event.end_date ?? "",
        is_current: event.is_current ?? false,
        description: event.description,
        technologies: event.technologies ?? [],
        sort_order: event.sort_order ?? 0,
      });
    } else {
      setEditingId(undefined);
      setFormData({
        company: "",
        position: "",
        start_date: new Date().toISOString().split("T")[0],
        end_date: "",
        is_current: true,
        description: "",
        technologies: [],
        sort_order: 0,
      });
    }
    setShowForm(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      const res = await upsertExperience({
        id: editingId,
        company: formData.company,
        position: formData.position,
        start_date: formData.start_date,
        end_date: formData.end_date || null,
        is_current: formData.is_current,
        description: formData.description,
        technologies: formData.technologies,
        sort_order: formData.sort_order,
      });
      if (res.success) {
        setShowForm(false);
        setTechInput("");
        loadData();
      }
    });
  };

  const handleDelete = (id: string) => {
    startTransition(async () => {
      const res = await deleteExperience(id);
      if (res.success) loadData();
    });
  };

  const addTech = () => {
    if (!techInput.trim()) return;
    setFormData({ ...formData, technologies: [...formData.technologies, techInput.trim()] });
    setTechInput("");
  };

  const removeTech = (t: string) => {
    setFormData({ ...formData, technologies: formData.technologies.filter((x: string) => x !== t) });
  };

  const formatPeriod = (exp: ExperienceRecord) => {
    const start = exp.start_date?.slice(0, 7).replace("-", "/") ?? "";
    const end = exp.is_current ? "Present" : exp.end_date?.slice(0, 7).replace("-", "/") ?? "";
    return end ? `${start} — ${end}` : start;
  };

  return (
    <div className="flex-1 flex flex-col min-w-0">
      <AdminHeader
        title="Experience &amp; Career Timeline CMS"
        subtitle="Manage progression events, milestones &amp; technical achievements"
      />

      <main className="flex-1 p-6 md:p-8 space-y-6 overflow-y-auto">
        <div className="flex justify-end">
          <button
            onClick={() => handleOpenForm()}
            disabled={isPending}
            className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold flex items-center gap-2 disabled:opacity-60"
          >
            <Plus className="w-4 h-4" /> Add Experience
          </button>
        </div>

        {showForm && (
          <form onSubmit={handleSave} className="p-6 rounded-2xl bg-slate-900/40 border border-white/10 space-y-4 max-w-3xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300 block">Company / Institution</label>
                <input required value={formData.company} onChange={(e) => setFormData({ ...formData, company: e.target.value })} className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs font-mono" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300 block">Position / Role</label>
                <input required value={formData.position} onChange={(e) => setFormData({ ...formData, position: e.target.value })} className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs font-mono" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300 block">Start Date</label>
                <input required type="date" value={formData.start_date} onChange={(e) => setFormData({ ...formData, start_date: e.target.value })} className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs font-mono" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300 block">End Date</label>
                <input type="date" value={formData.end_date} onChange={(e) => setFormData({ ...formData, end_date: e.target.value })} disabled={formData.is_current} className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs font-mono disabled:opacity-50" />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="is_current" checked={formData.is_current} onChange={(e) => setFormData({ ...formData, is_current: e.target.checked })} className="w-4 h-4 accent-purple-600" />
              <label htmlFor="is_current" className="text-xs text-slate-300">Currently Working Here</label>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300 block">Description</label>
              <textarea required rows={3} value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs leading-relaxed" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300 block">Technologies Used</label>
              <div className="flex gap-2">
                <input value={techInput} onChange={(e) => setTechInput(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addTech(); } }} placeholder="e.g. Next.js" className="flex-1 px-4 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs font-mono" />
                <button type="button" onClick={addTech} className="px-4 py-2.5 rounded-xl bg-slate-800 text-white text-xs border border-white/10">Add</button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.technologies.map((t) => (
                  <span key={t} className="px-2.5 py-1 rounded-lg bg-purple-500/15 border border-purple-500/30 text-xs text-purple-300 flex items-center gap-1.5">
                    {t}
                    <button type="button" onClick={() => removeTech(t)} className="text-purple-400 hover:text-rose-400">×</button>
                  </span>
                ))}
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2 border-t border-white/10">
              <button type="button" onClick={() => setShowForm(false)} className="px-5 py-2.5 rounded-xl bg-slate-800 text-slate-300 text-xs border border-white/10">Cancel</button>
              <button type="submit" disabled={isPending} className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold disabled:opacity-60 flex items-center gap-2">
                {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                {isPending ? "Saving..." : "Save Experience"}
              </button>
            </div>
          </form>
        )}

        <div className="space-y-4 max-w-4xl">
          {loading ? (
            <div className="p-12 text-center text-slate-400 text-xs flex items-center justify-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" />
              Loading experiences...
            </div>
          ) : events.length === 0 ? (
            <div className="p-12 rounded-2xl bg-slate-900/40 border border-white/10 text-center text-slate-400 text-xs">
              No experience entries yet. Add your first role above.
            </div>
          ) : (
            events.map((event) => (
              <div
                key={event.id}
                className="p-6 rounded-2xl bg-slate-900/40 border border-white/10 flex items-start justify-between gap-4"
              >
                <div className="space-y-2 flex-1">
                  <span className="text-xs font-mono font-bold text-purple-300 bg-purple-500/15 border border-purple-500/30 rounded-lg px-2.5 py-1">
                    {formatPeriod(event)}
                  </span>
                  <h4 className="text-base font-bold text-white pt-1">{event.position}</h4>
                  <p className="text-xs text-purple-400 font-mono">{event.company}{event.location ? ` · ${event.location}` : ""}</p>
                  <p className="text-xs text-slate-400 leading-relaxed max-w-2xl">{event.description}</p>
                  {event.technologies && event.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {event.technologies.map((t: string) => (
                        <span key={t} className="px-2 py-0.5 rounded-md bg-white/5 text-[10px] font-mono text-slate-300">{t}</span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex flex-col gap-2 shrink-0">
                  <button
                    onClick={() => handleOpenForm(event)}
                    className="p-2 rounded-lg bg-slate-900 border border-white/10 text-slate-400 hover:text-purple-300 hover:border-purple-500/30 transition-colors"
                    title="Edit"
                  >
                    <Plus className="w-3.5 h-3.5 rotate-45" />
                  </button>
                  <button
                    onClick={() => handleDelete(event.id)}
                    disabled={isPending}
                    className="p-2 rounded-lg bg-slate-900 border border-white/10 text-slate-400 hover:text-rose-400 hover:border-rose-500/30 transition-colors shrink-0 disabled:opacity-50"
                    title="Remove Event"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
