"use client";

import React, { useState } from "react";
import AdminHeader from "@/components/admin/AdminHeader";
import { Plus, Trash2 } from "lucide-react";

interface SkillItem {
  id: string;
  name: string;
  level: number;
}

const initialSkills: SkillItem[] = [
  { id: "s1", name: "HTML5 / CSS3", level: 95 },
  { id: "s2", name: "Tailwind CSS", level: 90 },
  { id: "s3", name: "Responsive Design & UI/UX", level: 90 },
  { id: "s4", name: "JavaScript (ES6+)", level: 88 },
  { id: "s5", name: "Java", level: 88 },
  { id: "s6", name: "JavaFX & FXML", level: 86 },
  { id: "s7", name: "React", level: 85 },
  { id: "s8", name: "Git & GitHub", level: 85 },
  { id: "s9", name: "TypeScript", level: 82 },
  { id: "s10", name: "Next.js", level: 82 },
  { id: "s11", name: "SQL (MSSQL / MySQL)", level: 82 },
];

export default function AdminSkillsPage() {
  const [skills, setSkills] = useState<SkillItem[]>(initialSkills);
  const [newSkillName, setNewSkillName] = useState("");
  const [newSkillLevel, setNewSkillLevel] = useState(85);

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkillName.trim()) return;

    setSkills([
      ...skills,
      { id: `skill-${Date.now()}`, name: newSkillName, level: newSkillLevel },
    ]);
    setNewSkillName("");
    setNewSkillLevel(85);
  };

  const handleDelete = (id: string) => {
    setSkills(skills.filter((s) => s.id !== id));
  };

  return (
    <div className="flex-1 flex flex-col min-w-0">
      <AdminHeader
        title="Skills Management CMS"
        subtitle="Manage technical skill levels, percentage meters &amp; sorting"
      />

      <main className="flex-1 p-6 md:p-8 space-y-6 overflow-y-auto">
        {/* Add Skill Form */}
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
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold flex items-center justify-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Add Skill</span>
          </button>
        </form>

        {/* Skills Grid List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {skills.map((skill) => (
            <div
              key={skill.id}
              className="p-4 rounded-xl bg-slate-900/40 border border-white/10 flex items-center justify-between gap-4"
            >
              <div className="space-y-1.5 flex-1">
                <div className="flex justify-between items-center text-xs font-semibold">
                  <span className="text-slate-200">{skill.name}</span>
                  <span className="text-purple-400 font-mono">{skill.level}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-900 border border-white/10 overflow-hidden">
                  <div
                    style={{ width: `${skill.level}%` }}
                    className="h-full bg-linear-to-r from-purple-600 to-pink-500 rounded-full"
                  />
                </div>
              </div>

              <button
                onClick={() => handleDelete(skill.id)}
                className="p-2 rounded-lg bg-slate-900 border border-white/10 text-slate-400 hover:text-rose-400 hover:border-rose-500/30 transition-colors shrink-0"
                title="Remove Skill"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
