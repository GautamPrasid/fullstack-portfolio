"use client";

import React, { useEffect, useState, useTransition } from "react";
import Image from "next/image";
import { Award, Plus, Loader2, Trash2, ExternalLink } from "lucide-react";
import { fetchAdminCertificates, upsertCertificate, deleteCertificate } from "./actions";
import type { CertificateRecord } from "./actions";

export default function CertificatesAdminPage() {
  const [certificates, setCertificates] = useState<CertificateRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [isPending, startTransition] = useTransition();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | undefined>(undefined);
  const [formData, setFormData] = useState({
    title: "",
    issuer: "",
    issue_date: new Date().toISOString().split("T")[0],
    credential_url: "",
    image_url: "",
    skills_associated: [] as string[],
  });
  const [skillInput, setSkillInput] = useState("");

  const loadData = async () => {
    setLoading(true);
    const data = await fetchAdminCertificates();
    setCertificates(data ?? []);
    setLoading(false);
  };

  useEffect(() => {
    queueMicrotask(() => {
      loadData();
    });
  }, []);

  const handleOpenForm = (cert?: CertificateRecord) => {
    if (cert) {
      setEditingId(cert.id);
      setFormData({
        title: cert.name,
        issuer: cert.issuer,
        issue_date: cert.issue_date,
        credential_url: cert.credential_url ?? "",
        image_url: cert.image_url ?? "",
        skills_associated: [],
      });
    } else {
      setEditingId(undefined);
      setFormData({
        title: "",
        issuer: "",
        issue_date: new Date().toISOString().split("T")[0],
        credential_url: "",
        image_url: "",
        skills_associated: [],
      });
    }
    setShowForm(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      const res = await upsertCertificate({
        id: editingId,
        title: formData.title,
        issuer: formData.issuer,
        issue_date: formData.issue_date,
        credential_url: formData.credential_url,
        image_url: formData.image_url,
        skills_associated: formData.skills_associated,
      });
      if (res.success) {
        setShowForm(false);
        setSkillInput("");
        loadData();
      }
    });
  };

  const handleDelete = (id: string) => {
    startTransition(async () => {
      const res = await deleteCertificate(id);
      if (res.success) loadData();
    });
  };

  const addSkill = () => {
    if (!skillInput.trim()) return;
    setFormData({ ...formData, skills_associated: [...formData.skills_associated, skillInput.trim()] });
    setSkillInput("");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            <Award className="w-6 h-6 text-purple-400" />
            Certificates Management
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Manage professional certifications, licenses, and credentials.
          </p>
        </div>
        <button
          onClick={() => handleOpenForm()}
          disabled={isPending}
          className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg text-sm font-medium transition-colors disabled:opacity-60"
        >
          <Plus className="w-4 h-4" /> Add Certificate
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSave} className="p-6 rounded-2xl bg-slate-900/40 border border-white/10 space-y-4 max-w-3xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1 sm:col-span-2">
              <label className="text-xs font-semibold text-slate-300 block">Certificate Title / Name</label>
              <input required value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs font-mono" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300 block">Issuing Organization</label>
              <input required value={formData.issuer} onChange={(e) => setFormData({ ...formData, issuer: e.target.value })} className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs font-mono" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300 block">Issue Date</label>
              <input required type="date" value={formData.issue_date} onChange={(e) => setFormData({ ...formData, issue_date: e.target.value })} className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs font-mono" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300 block">Credential URL (optional)</label>
              <input type="url" value={formData.credential_url} onChange={(e) => setFormData({ ...formData, credential_url: e.target.value })} className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs font-mono" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300 block">Certificate Image URL (optional)</label>
              <input type="url" value={formData.image_url} onChange={(e) => setFormData({ ...formData, image_url: e.target.value })} className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs font-mono" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300 block">Skills Associated (optional)</label>
            <div className="flex gap-2">
              <input value={skillInput} onChange={(e) => setSkillInput(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addSkill(); } }} placeholder="e.g. AWS Cloud Practitioner" className="flex-1 px-4 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs font-mono" />
              <button type="button" onClick={addSkill} className="px-4 py-2.5 rounded-xl bg-slate-800 text-white text-xs border border-white/10">Add</button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.skills_associated.map((s) => (
                <span key={s} className="px-2.5 py-1 rounded-lg bg-purple-500/15 border border-purple-500/30 text-xs text-purple-300 flex items-center gap-1.5">
                  {s}
                  <button type="button" onClick={() => setFormData({ ...formData, skills_associated: formData.skills_associated.filter((x) => x !== s) })} className="text-purple-400 hover:text-rose-400">×</button>
                </span>
              ))}
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-2 border-t border-white/10">
            <button type="button" onClick={() => setShowForm(false)} className="px-5 py-2.5 rounded-xl bg-slate-800 text-slate-300 text-xs border border-white/10">Cancel</button>
            <button type="submit" disabled={isPending} className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold flex items-center gap-2 disabled:opacity-60">
              {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
              {isPending ? "Saving..." : "Save Certificate"}
            </button>
          </div>
        </form>
      )}

      {loading ? (
        <div className="p-12 text-center text-slate-400 text-sm flex items-center justify-center gap-2">
          <Loader2 className="w-5 h-5 animate-spin" />
          Loading certificates...
        </div>
      ) : certificates.length === 0 ? (
        <div className="p-8 rounded-2xl bg-slate-900/40 border border-white/10 backdrop-blur-xl text-center">
          <div className="w-12 h-12 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mx-auto mb-3">
            <Award className="w-6 h-6 text-purple-400" />
          </div>
          <h2 className="text-lg font-semibold text-white">No Certificates Yet</h2>
          <p className="text-slate-400 text-sm mt-1 max-w-md mx-auto">
            Add your first verified technical certification above.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {certificates.map((cert) => (
            <div key={cert.id} className="p-5 rounded-2xl bg-slate-900/40 border border-white/10 space-y-3 relative group">
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                <button onClick={() => handleOpenForm(cert)} className="p-1.5 rounded-lg bg-slate-900 border border-white/10 text-slate-300 hover:text-purple-300 hover:border-purple-500/30">
                  <Plus className="w-3.5 h-3.5 rotate-45" />
                </button>
                <button onClick={() => handleDelete(cert.id)} disabled={isPending} className="p-1.5 rounded-lg bg-slate-900 border border-white/10 text-slate-400 hover:text-rose-400 hover:border-rose-500/30 disabled:opacity-50">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
              {cert.image_url ? (
                <div className="aspect-video w-full rounded-lg bg-slate-900 border border-white/5 overflow-hidden relative">
                  <Image src={cert.image_url} alt={cert.name} fill className="object-contain" unoptimized />
                </div>
              ) : (
                <div className="aspect-video w-full rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                  <Award className="w-10 h-10 text-purple-400" />
                </div>
              )}
              <div className="space-y-1.5 pt-1">
                <h3 className="text-sm font-bold text-white leading-tight">{cert.name}</h3>
                <p className="text-xs text-purple-400 font-mono">{cert.issuer}</p>
                <p className="text-[10px] text-slate-500 font-mono">{cert.issue_date}</p>
                {cert.credential_url && (
                  <a href={cert.credential_url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-xs text-purple-400 hover:text-purple-300">
                    Verify credential <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
