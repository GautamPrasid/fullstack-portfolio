"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import AdminHeader from "@/components/admin/AdminHeader";
import StatCard from "@/components/admin/StatCard";
import { createClient } from "@/lib/supabase/client";
import type { Database } from "@/lib/supabase/database.types";
import {
  FolderKanban,
  Wrench,
  Inbox,
  Eye,
  Plus,
  ArrowRight,
  Clock,
  Sparkles,
} from "lucide-react";

type ProjectRow = Database["public"]["Tables"]["projects"]["Row"];
type ProfileRow = Database["public"]["Tables"]["profile"]["Row"];

export default function AdminDashboardPage() {
  const [projectsList, setProjectsList] = useState<ProjectRow[]>([]);
  const [stats, setStats] = useState({
    projectsCount: 0,
    featuredCount: 0,
    skillsCount: 0,
    messagesCount: 0,
    viewsCount: "5,420",
  });

  useEffect(() => {
    async function loadDashboardData() {
      try {
        const supabase = createClient();
        const [projRes, skillsRes, msgsRes, profileRes] = await Promise.all([
          supabase.from("projects").select("*").order("sort_order", { ascending: true }),
          supabase.from("skills").select("*", { count: "exact", head: true }),
          supabase.from("contact_messages").select("*", { count: "exact", head: true }),
          supabase.from("profile").select("monthly_views").single(),
        ]);

        const projectsData = (projRes.data ?? []) as ProjectRow[];
        const profileData = (profileRes.data ?? null) as ProfileRow | null;
        setProjectsList(projectsData);
        setStats({
          projectsCount: projectsData.length,
          featuredCount: projectsData.filter((p) => p.is_featured).length,
          skillsCount: skillsRes.count || 0,
          messagesCount: msgsRes.count || 0,
          viewsCount: profileData?.monthly_views ? profileData.monthly_views.toLocaleString("en-US") : "5,420",
        });
      } catch (err) {
        console.error("Dashboard fetch error:", err);
      }
    }

    loadDashboardData();
  }, []);

  return (
    <div className="flex-1 flex flex-col min-w-0">
      <AdminHeader
        title="Admin Overview Dashboard"
        subtitle="Live metrics & status of Prasid Gautam Portfolio CMS"
      />

      <main className="flex-1 p-6 md:p-8 space-y-8 overflow-y-auto">
        {/* Quick Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <StatCard
            title="Total Projects"
            value={stats.projectsCount}
            change={`${stats.featuredCount} Featured Items`}
            icon={FolderKanban}
            color="purple"
          />
          <StatCard
            title="Technical Skills"
            value={stats.skillsCount}
            change="Active Skills"
            icon={Wrench}
            color="cyan"
          />
          <StatCard
            title="Inbox Messages"
            value={stats.messagesCount}
            change="User Contact Submissions"
            icon={Inbox}
            color="emerald"
          />
          <StatCard
            title="Monthly Reach"
            value={stats.viewsCount}
            change="Impressions & Views"
            icon={Eye}
            color="amber"
          />
        </div>

        {/* Quick Admin Actions Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <Link
            href="/admin/projects"
            className="p-5 rounded-2xl bg-purple-500/10 border border-purple-500/20 hover:border-purple-500/40 transition-all group flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-300">
                <Plus className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-white">Add New Project</p>
                <p className="text-xs text-slate-400">Publish showcase item</p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-purple-400 group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            href="/admin/resume"
            className="p-5 rounded-2xl bg-pink-500/10 border border-pink-500/20 hover:border-pink-500/40 transition-all group flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-pink-500/20 flex items-center justify-center text-pink-300">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-white">Update Resume PDF</p>
                <p className="text-xs text-slate-400">Set active CV download</p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-pink-400 group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            href="/admin/messages"
            className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 hover:border-emerald-500/40 transition-all group flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-300">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-white">View Contact Messages</p>
                <p className="text-xs text-slate-400">Review user inquiries</p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-emerald-400 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Recent Projects Table Preview */}
        <div className="p-6 rounded-2xl bg-slate-900/40 border border-white/10 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white">Recent Catalog Projects</h3>
            <Link href="/admin/projects" className="text-xs font-semibold text-purple-400 hover:text-purple-300">
              Manage All Projects →
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-900/80 uppercase text-[10px] text-slate-400 font-mono">
                <tr>
                  <th className="p-3 rounded-l-xl">Title</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">Badge</th>
                  <th className="p-3">Date</th>
                  <th className="p-3 rounded-r-xl">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {projectsList.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-4 text-center text-slate-400">
                      No project records found. Add your first project in <Link href="/admin/projects" className="text-purple-400 underline">Projects Admin</Link>.
                    </td>
                  </tr>
                ) : (
                  projectsList.slice(0, 5).map((project) => (
                    <tr key={project.id} className="hover:bg-white/5 transition-colors">
                      <td className="p-3 font-semibold text-white">{project.title}</td>
                      <td className="p-3 text-purple-300 font-mono">{project.category}</td>
                      <td className="p-3">
                        {project.badge ? (
                          <span className="px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-[10px] font-mono">
                            {project.badge}
                          </span>
                        ) : (
                          <span className="text-slate-500">-</span>
                        )}
                      </td>
                      <td className="p-3 text-slate-400 font-mono">
                        {project.created_at ? project.created_at.slice(0, 4) : "2026"}
                      </td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono ${
                          project.is_published
                            ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-400"
                            : "bg-slate-800 text-slate-400"
                        }`}>
                          {project.is_published ? "Published" : "Draft"}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
