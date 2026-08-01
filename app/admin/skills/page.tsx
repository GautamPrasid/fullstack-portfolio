"use client";

import React, { useEffect, useState, useTransition } from "react";
import AdminHeader from "@/components/admin/AdminHeader";
import { Plus, Trash2, Loader2 } from "lucide-react";
import { fetchAdminSkills, upsertSkill, deleteSkill } from "./actions";
import type { SkillRecord } from "./actions";

export default function AdminSkillsPage() {
  const [skills, setSkills] = useState<SkillRecord[]>([]);
  const [newSkillName, setNewSkillName] = useState("");
  const [newSkillLevel, setNewSkillLevel] = useState(85);
  const [loading, setLoading] = useState(true);
  const [isPending, startTransition] = useTransition();

  const loadData = async () => {
    setLoading(true);
    const data = await fetchAdminSkills();
    setSkills(data ?? []);
    setLoading(false);
  };

  useEffect(() => {
    queueMicrotask(() => {
      loadData();
    });
  }, []);

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkillName.trim()) return;

    startTransition(async () => {
      const res = await upsertSkill({
        name: newSkillName,
        category: "General",
        proficiency_percentage: newSkillLevel,
        color_hex: "#9333ea",
        is_visible: true,
      });
      if (res.success) {
        setNewSkillName("");
        setNewSkillLevel(85);
        loadData();
      }
    });
  };

  const handleDelete = (id: string) => {
    startTransition(async () => {
      const res = await deleteSkill(id);
      if (res.success) {
        loadData();
      }
    });
  };

  return (
    <div className="flex-1 flex flex-col min-w-0">
      <AdminHeader
        title="Skills Management CMS"
        subtitle="Manage technical skill levels, percentage meters &amp; sorting"
      />

      <main className="flex-1 p-6 md:p-8 space-y-6 overflow-y-auto">
        <form onSubmit={handleAddSkill} className="p-6 rounded-2xl bg-slate-900/40 border border-white/10 flex flex-col sm:flex-row gap-4 items-end">
          <div className="flex-1 space-y-1">
            <label className="text-xs font-semibold text-slate-300 block">Skill Name</label>
            <input
              type="text"
              required
              value={newSkillName}
              onChange={(e) => setNewSkillName(e.target.value)}
              placeholder="e.g. Docker / Node.js"
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs font-mono"
            />
          </div>

          <div className="w-full sm:w-48 space-y-1">
            <label className="text-xs font-semibold text-slate-300 block">Level ({newSkillLevel}%)</label>
            <input
              type="range"
              min={10}
              max={100}
              value={newSkillLevel}
              onChange={(e) => setNewSkillLevel(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
            />
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold flex items-center justify-center gap-1.5 disabled:opacity-60"
          >
            {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
            <span>{isPending ? "Saving..." : "Add Skill"}</span>
          </button>
        </form>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {loading ? (
            <div className="col-span-full p-8 text-center text-slate-400 text-xs flex items-center justify-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" />
              Loading skills...
            </div>
          ) : skills.length === 0 ? (
            <div className="col-span-full p-8 rounded-2xl bg-slate-900/40 border border-white/10 text-center text-slate-400 text-xs">
              No skills yet. Add your first skill above.
            </div>
          ) : (
            skills.map((skill) => (
              <div
                key={skill.id}
                className="p-4 rounded-xl bg-slate-900/40 border border-white/10 flex items-center justify-between gap-4"
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex justify-between items-center text-xs font-semibold">
                    <span className="text-slate-200">{skill.name}</span>
                    <span className="text-purple-400 font-mono">{skill.percentage ?? 0}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-900 border border-white/10 overflow-hidden">
                    <div
                      style={{ width: `${skill.percentage ?? 0}%` }}
                      className="h-full bg-linear-to-r from-purple-600 to-pink-500 rounded-full"
                    />
                  </div>
                </div>

                <button
                  onClick={() => handleDelete(skill.id)}
                  disabled={isPending}
                  className="p-2 rounded-lg bg-slate-900 border border-white/10 text-slate-400 hover:text-rose-400 hover:border-rose-500/30 transition-colors shrink-0 disabled:opacity-50"
                  title="Remove Skill"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
