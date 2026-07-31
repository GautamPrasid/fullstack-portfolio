"use client";

import React, { useState } from "react";
import Link from "next/link";
import AdminHeader from "@/components/admin/AdminHeader";
import StatCard from "@/components/admin/StatCard";
import {
  FolderKanban,
  Wrench,
  Inbox,
  Eye,
  Plus,
  ArrowRight,
  TrendingUp,
  Clock,
  Sparkles,
} from "lucide-react";
import projectsData from "@/data/projects.json";

export default function AdminDashboardPage() {
  const [stats] = useState({
    projectsCount: projectsData.length,
    featuredCount: projectsData.filter((p) => p.isFeatured || p.featured).length,
    skillsCount: 11,
    messagesCount: 3,
    viewsCount: "5,420",
  });

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
            change="Across 4 Categories"
            icon={Wrench}
            color="cyan"
          />
          <StatCard
            title="Contact Inbox"
            value={stats.messagesCount}
            change="3 Unread Submissions"
            changeType="positive"
            icon={Inbox}
            color="amber"
          />
          <StatCard
            title="Monthly Views"
            value={stats.viewsCount}
            change="+18% vs last month"
            changeType="positive"
            icon={Eye}
            color="emerald"
          />
        </div>

        {/* Quick Actions Panel */}
        <div className="p-6 rounded-2xl bg-slate-900/40 border border-white/10 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span>Quick Management Actions</span>
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link
              href="/admin/projects"
              className="p-4 rounded-xl bg-purple-600/10 border border-purple-500/30 hover:border-purple-500 text-purple-200 text-xs font-semibold flex items-center justify-between transition-all group focus-ring"
            >
              <div className="flex items-center gap-2.5">
                <Plus className="w-4 h-4 text-purple-400" />
                <span>Manage Projects</span>
              </div>
              <ArrowRight className="w-4 h-4 text-purple-400 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/admin/messages"
              className="p-4 rounded-xl bg-amber-600/10 border border-amber-500/30 hover:border-amber-500 text-amber-200 text-xs font-semibold flex items-center justify-between transition-all group focus-ring"
            >
              <div className="flex items-center gap-2.5">
                <Inbox className="w-4 h-4 text-amber-400" />
                <span>View Contact Messages</span>
              </div>
              <ArrowRight className="w-4 h-4 text-amber-400 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/admin/about"
              className="p-4 rounded-xl bg-cyan-600/10 border border-cyan-500/30 hover:border-cyan-500 text-cyan-200 text-xs font-semibold flex items-center justify-between transition-all group focus-ring"
            >
              <div className="flex items-center gap-2.5">
                <TrendingUp className="w-4 h-4 text-cyan-400" />
                <span>Update Bio &amp; Focus</span>
              </div>
              <ArrowRight className="w-4 h-4 text-cyan-400 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
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
                {projectsData.slice(0, 5).map((project) => (
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
                    <td className="p-3 text-slate-400 font-mono">{project.date}</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-mono">
                        Published
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
