"use client";

import React, { useState } from "react";
import AdminHeader from "@/components/admin/AdminHeader";
import { Plus, Edit2, Trash2, History } from "lucide-react";

interface TimelineEvent {
  id: string;
  period: string;
  role: string;
  institution: string;
  description: string;
}

const initialEvents: TimelineEvent[] = [
  {
    id: "e1",
    period: "2026 — Present",
    role: "Full-Stack Web & Next.js Architecture",
    institution: "LA GRANDEE International College · Pokhara",
    description: "Engineering modern full-stack web applications using Next.js 16, React 19, TypeScript, and Tailwind CSS v4.",
  },
  {
    id: "e2",
    period: "2026 Early",
    role: "JavaFX Desktop Platform Architecture (StudyBuddy)",
    institution: "Flagship Software Project",
    description: "Architected desktop learning platform featuring notes management, resource sharing, and MSSQL database layer.",
  },
  {
    id: "e3",
    period: "2025",
    role: "Foundational Systems Engineering & C Programming",
    institution: "BCA Academic Milestone",
    description: "Built Bank Management System, Student Management System, and Pac-Man game logic loops.",
  },
];

export default function AdminExperiencePage() {
  const [events, setEvents] = useState<TimelineEvent[]>(initialEvents);

  const handleDelete = (id: string) => {
    setEvents(events.filter((e) => e.id !== id));
  };

  return (
    <div className="flex-1 flex flex-col min-w-0">
      <AdminHeader
        title="Experience &amp; Career Timeline CMS"
        subtitle="Manage progression events, milestones &amp; technical achievements"
      />

      <main className="flex-1 p-6 md:p-8 space-y-6 overflow-y-auto">
        <div className="space-y-4 max-w-4xl">
          {events.map((event) => (
            <div
              key={event.id}
              className="p-6 rounded-2xl bg-slate-900/40 border border-white/10 flex items-start justify-between gap-4"
            >
              <div className="space-y-2">
                <span className="text-xs font-mono font-bold text-purple-300 bg-purple-500/15 border border-purple-500/30 rounded-lg px-2.5 py-1">
                  {event.period}
                </span>
                <h4 className="text-base font-bold text-white pt-1">{event.role}</h4>
                <p className="text-xs text-purple-400 font-mono">{event.institution}</p>
                <p className="text-xs text-slate-400 leading-relaxed max-w-2xl">{event.description}</p>
              </div>

              <button
                onClick={() => handleDelete(event.id)}
                className="p-2 rounded-lg bg-slate-900 border border-white/10 text-slate-400 hover:text-rose-400 hover:border-rose-500/30 transition-colors shrink-0"
                title="Remove Event"
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
