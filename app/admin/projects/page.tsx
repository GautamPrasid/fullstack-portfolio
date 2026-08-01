"use client";

import React, { useState } from "react";
import AdminHeader from "@/components/admin/AdminHeader";
import ImageUploader from "@/components/admin/ImageUploader";
import { Plus, Edit2, Trash2, Tag, Calendar, ExternalLink, Search } from "lucide-react";

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingProject, setEditingProject] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filtered = projects.filter(
    (p) =>
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject) return;

    if (projects.some((p) => p.id === editingProject.id)) {
      setProjects(projects.map((p) => (p.id === editingProject.id ? editingProject : p)));
    } else {
      setProjects([editingProject, ...projects]);
    }
    setIsModalOpen(false);
    setEditingProject(null);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this project?")) {
      setProjects(projects.filter((p) => p.id !== id));
    }
  };

  return (
    <div className="flex-1 flex flex-col min-w-0">
      <AdminHeader
        title="Project Management CMS"
        subtitle="Create, edit, drag-sort, and feature portfolio catalog items"
      />

      <main className="flex-1 p-6 md:p-8 space-y-6 overflow-y-auto">
        {/* Controls Toolbar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs font-mono focus:border-purple-500 focus:outline-none"
            />
          </div>

          <button
            onClick={() => {
              setEditingProject({
                id: `project-${Date.now()}`,
                title: "",
                description: "",
                category: "web-nextjs",
                tech: ["Next.js", "TypeScript"],
                highlights: ["Authentication", "Responsive UI"],
                date: new Date().toISOString().split("T")[0],
                isFeatured: true,
                github: "https://github.com/GautamPrasid",
                demo: "",
                badge: "",
                image: "https://placehold.co/800x450/0d0d1a/8b5cf6?text=New+Project",
              });
              setIsModalOpen(true);
            }}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(168,85,247,0.3)] focus-ring"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Project</span>
          </button>
        </div>

        {/* Projects Data Table */}
        <div className="p-6 rounded-2xl bg-slate-900/40 border border-white/10 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-900 uppercase text-[10px] text-slate-400 font-mono">
                <tr>
                  <th className="p-3.5 rounded-l-xl">Project</th>
                  <th className="p-3.5">Category</th>
                  <th className="p-3.5">Featured</th>
                  <th className="p-3.5">Tech Stack</th>
                  <th className="p-3.5">Date</th>
                  <th className="p-3.5 text-right rounded-r-xl">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filtered.map((project) => (
                  <tr key={project.id} className="hover:bg-white/5 transition-colors">
                    <td className="p-3.5 font-bold text-white max-w-xs">
                      <div>
                        <p className="text-sm text-white">{project.title}</p>
                        <p className="text-[11px] text-slate-400 line-clamp-1 font-normal">
                          {project.description}
                        </p>
                      </div>
                    </td>
                    <td className="p-3.5 font-mono text-purple-300">
                      <span className="px-2.5 py-1 rounded-md bg-purple-500/10 border border-purple-500/20">
                        {project.category}
                      </span>
                    </td>
                    <td className="p-3.5">
                      {project.isFeatured || project.featured ? (
                        <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-[10px] font-mono">
                          ⭐ Featured
                        </span>
                      ) : (
                        <span className="text-slate-500">-</span>
                      )}
                    </td>
                    <td className="p-3.5">
                      <div className="flex flex-wrap gap-1 max-w-xs">
                        {project.tech.slice(0, 3).map((t) => (
                          <span key={t} className="px-2 py-0.5 rounded bg-white/5 text-[10px] font-mono text-slate-300">
                            {t}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="p-3.5 font-mono text-slate-400">{project.date}</td>
                    <td className="p-3.5 text-right space-x-2">
                      <button
                        onClick={() => {
                          setEditingProject(project);
                          setIsModalOpen(true);
                        }}
                        className="p-2 rounded-lg bg-slate-900 border border-white/10 text-slate-300 hover:text-purple-300 hover:border-purple-500/40 transition-colors"
                        title="Edit Project"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(project.id)}
                        className="p-2 rounded-lg bg-slate-900 border border-white/10 text-slate-300 hover:text-rose-400 hover:border-rose-500/40 transition-colors"
                        title="Delete Project"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal Form */}
        {isModalOpen && editingProject && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
            <div className="w-full max-w-2xl p-6 sm:p-8 rounded-3xl bg-[#090a0f] border border-white/15 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto custom-scrollbar">
              <h2 className="text-xl font-bold text-white">
                {editingProject.id ? "Edit Project" : "Create New Project"}
              </h2>

              <form onSubmit={handleSave} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">Title</label>
                    <input
                      type="text"
                      required
                      value={editingProject.title}
                      onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs font-mono"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">Category</label>
                    <select
                      value={editingProject.category}
                      onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs font-mono"
                    >
                      <option value="web-nextjs">Web &amp; Next.js</option>
                      <option value="java-desktop">Java Desktop</option>
                      <option value="c-systems">C Systems</option>
                      <option value="media-legacy">Media &amp; Legacy</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Description</label>
                  <textarea
                    rows={3}
                    required
                    value={editingProject.description}
                    onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs leading-relaxed"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">GitHub Link</label>
                    <input
                      type="text"
                      value={editingProject.github}
                      onChange={(e) => setEditingProject({ ...editingProject, github: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">Live Demo Link</label>
                    <input
                      type="text"
                      value={editingProject.demo || ""}
                      onChange={(e) => setEditingProject({ ...editingProject, demo: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs font-mono"
                    />
                  </div>
                </div>

                <ImageUploader
                  value={editingProject.image || ""}
                  onChange={(url) => setEditingProject({ ...editingProject, image: url })}
                />

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-slate-300 text-xs font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold"
                  >
                    Save Project
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
