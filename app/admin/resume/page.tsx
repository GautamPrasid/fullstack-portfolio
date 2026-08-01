"use client";

import { useEffect, useState, useTransition } from "react";
import {
  FileText,
  Upload,
  Download,
  Trash2,
  CheckCircle2,
  ExternalLink,
  Plus,
  X,
  Loader2,
  Sparkles,
} from "lucide-react";
import {
  fetchAdminResumes,
  createOrUpdateResume,
  deleteResume,
} from "./actions";
import type { ResumeRecord, ResumeFormData } from "@/lib/validations/resume";

type ResumeFormState = Partial<ResumeFormData>;

export default function ResumeAdminPage() {
  const [resumes, setResumes] = useState<ResumeRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const [formData, setFormData] = useState<ResumeFormState>({
    pdf_url: "",
    cv_image_url: "",
    version: "v1.0",
    is_active: true,
  });
  const [editingId, setEditingId] = useState<string | undefined>(undefined);
  const [errorMessage, setErrorMessage] = useState("");

  const loadData = async () => {
    setIsLoading(true);
    const data = await fetchAdminResumes();
    setResumes(data);
    setIsLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleOpenModal = (resume?: ResumeRecord) => {
    setErrorMessage("");
    if (resume) {
      setEditingId(resume.id);
      setFormData({
        id: resume.id,
        version: resume.version ?? "v1.0",
        pdf_url: resume.pdf_url,
        cv_image_url: resume.cv_image_url ?? "",
        is_active: resume.is_active ?? true,
        download_count: resume.download_count ?? 0,
      });
    } else {
      setEditingId(undefined);
      setFormData({
        pdf_url: "",
        cv_image_url: "",
        version: `v${new Date().getFullYear()}.${new Date().getMonth() + 1}`,
        is_active: resumes.length === 0,
        download_count: 0,
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    startTransition(async () => {
      const submission: ResumeFormData = {
        id: editingId,
        version: formData.version ?? "v1.0",
        pdf_url: formData.pdf_url ?? "",
        cv_image_url: formData.cv_image_url ?? "",
        is_active: formData.is_active ?? true,
        download_count: formData.download_count ?? 0,
      };
      const res = await createOrUpdateResume(submission);

      if (res.success) {
        setIsModalOpen(false);
        loadData();
      } else {
        setErrorMessage(res.error || "Failed to save resume");
      }
    });
  };

  const handleDelete = (id: string) => {
    if (!confirm("Are you sure you want to delete this resume entry?")) return;

    startTransition(async () => {
      const res = await deleteResume(id);
      if (res.success) {
        loadData();
      } else {
        alert("Delete failed: " + res.error);
      }
    });
  };

  const totalDownloads = resumes.reduce(
    (acc, r) => acc + (r.download_count ?? 0),
    0
  );
  const activeResume = resumes.find((r) => r.is_active);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            <FileText className="w-6 h-6 text-purple-400" />
            Resume &amp; CV Manager
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Manage active downloadable CVs, track download stats, and configure direct storage URLs.
          </p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-sm font-medium transition-all duration-200 border border-purple-400/30 shadow-lg shadow-purple-500/20"
        >
          <Plus className="w-4 h-4" /> Upload New Resume
        </button>
      </div>

      {/* Analytics Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900/40 border border-white/10 backdrop-blur-xl">
          <p className="text-slate-400 text-xs font-medium uppercase tracking-wider">Active Version</p>
          <div className="mt-2 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-400" />
            <span className="text-xl font-bold text-white">
              {activeResume ? activeResume.version ?? "Untitled" : "None"}
            </span>
          </div>
          <p className="text-slate-500 text-xs mt-1 truncate">
            {activeResume
              ? activeResume.cv_image_url
                ? "CV preview image attached"
                : "Resume record active"
              : "No active resume set"}
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/40 border border-white/10 backdrop-blur-xl">
          <p className="text-slate-400 text-xs font-medium uppercase tracking-wider">Total Downloads</p>
          <div className="mt-2 flex items-center gap-2">
            <Download className="w-5 h-5 text-emerald-400" />
            <span className="text-xl font-bold text-white">{totalDownloads}</span>
          </div>
          <p className="text-slate-500 text-xs mt-1">Across all uploaded versions</p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/40 border border-white/10 backdrop-blur-xl">
          <p className="text-slate-400 text-xs font-medium uppercase tracking-wider">Stored Files</p>
          <div className="mt-2 flex items-center gap-2">
            <FileText className="w-5 h-5 text-cyan-400" />
            <span className="text-xl font-bold text-white">{resumes.length}</span>
          </div>
          <p className="text-slate-500 text-xs mt-1">Available in database records</p>
        </div>
      </div>

      {/* Resumes List Table */}
      <div className="rounded-2xl bg-slate-900/40 border border-white/10 backdrop-blur-xl overflow-hidden">
        {isLoading ? (
          <div className="p-12 text-center text-slate-400 flex items-center justify-center gap-2">
            <Loader2 className="w-5 h-5 animate-spin text-purple-400" />
            Loading resume records...
          </div>
        ) : resumes.length === 0 ? (
          <div className="p-12 text-center">
            <FileText className="w-10 h-10 text-slate-600 mx-auto mb-3" />
            <p className="text-slate-300 font-medium">No resume records found</p>
            <p className="text-slate-500 text-sm mt-1">Click &quot;Upload New Resume&quot; to add your first CV file.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="bg-slate-800/50 text-slate-400 border-b border-white/10 text-xs uppercase font-medium">
                <tr>
                  <th className="px-6 py-4">Version</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Downloads</th>
                  <th className="px-6 py-4">PDF Link</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {resumes.map((resume) => (
                  <tr key={resume.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-semibold text-white flex items-center gap-2">
                        <FileText className="w-4 h-4 text-slate-400" />
                        <span className="text-xs px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20">
                          {resume.version ?? "Untitled"}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {resume.is_active ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Active Public
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-slate-800 text-slate-400 border border-white/10">
                          Archived
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 font-mono text-slate-300">
                      {resume.download_count ?? 0}
                    </td>
                    <td className="px-6 py-4">
                      <a
                        href={resume.pdf_url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-purple-400 hover:text-purple-300 transition-colors text-xs"
                      >
                        View PDF <ExternalLink className="w-3 h-3" />
                      </a>
                      {resume.cv_image_url && (
                        <div className="mt-1">
                          <a
                            href={resume.cv_image_url}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 text-slate-500 hover:text-slate-300 transition-colors text-[10px]"
                          >
                            CV image <ExternalLink className="w-2.5 h-2.5" />
                          </a>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <button
                        onClick={() => handleOpenModal(resume)}
                        className="px-3 py-1.5 text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg border border-white/10 transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(resume.id)}
                        disabled={isPending}
                        className="p-1.5 text-red-400 hover:bg-red-500/10 rounded-lg border border-red-500/20 transition-colors inline-flex items-center justify-center"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
          <div className="w-full max-w-lg rounded-2xl bg-slate-900 border border-white/10 p-6 shadow-2xl space-y-5 relative">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <Upload className="w-5 h-5 text-purple-400" />
                {editingId ? "Edit Resume Record" : "Add Resume Record"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {errorMessage && (
              <div className="p-3 text-xs rounded-xl bg-red-500/10 border border-red-500/20 text-red-400">
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Version Identifier</label>
                <input
                  type="text"
                  required
                  value={formData.version ?? ""}
                  onChange={(e) => setFormData({ ...formData, version: e.target.value })}
                  placeholder="e.g. v2.4 or 2026-Q3"
                  className="w-full px-3 py-2 rounded-xl bg-slate-800/60 border border-white/10 text-white text-sm focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  PDF URL (Supabase Bucket or CDN)
                </label>
                <input
                  type="url"
                  required
                  value={formData.pdf_url ?? ""}
                  onChange={(e) => setFormData({ ...formData, pdf_url: e.target.value })}
                  placeholder="https://...supabase.co/storage/v1/object/public/portfolio-media/resume.pdf"
                  className="w-full px-3 py-2 rounded-xl bg-slate-800/60 border border-white/10 text-white text-sm focus:outline-none focus:border-purple-500 font-mono text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  CV Preview Image URL (optional)
                </label>
                <input
                  type="url"
                  value={formData.cv_image_url ?? ""}
                  onChange={(e) => setFormData({ ...formData, cv_image_url: e.target.value })}
                  placeholder="https://...supabase.co/storage/v1/object/public/portfolio-media/cv.png"
                  className="w-full px-3 py-2 rounded-xl bg-slate-800/60 border border-white/10 text-white text-sm focus:outline-none focus:border-purple-500 font-mono text-xs"
                />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <input
                  type="checkbox"
                  id="is_active"
                  checked={formData.is_active ?? true}
                  onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                  className="w-4 h-4 accent-purple-600 rounded border-white/10 bg-slate-800 cursor-pointer"
                />
                <label htmlFor="is_active" className="text-sm text-slate-300 cursor-pointer">
                  Set as active public resume (Unsets previous active version)
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-sm font-medium text-slate-400 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="flex items-center gap-2 px-5 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-sm font-medium transition-all shadow-lg shadow-purple-500/20 disabled:opacity-50"
                >
                  {isPending && <Loader2 className="w-4 h-4 animate-spin" />}
                  {editingId ? "Save Changes" : "Create Record"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
