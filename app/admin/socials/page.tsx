"use client";

import React, { useEffect, useState, useTransition } from "react";
import { Share2, Plus, Loader2, Trash2, Eye, EyeOff, ExternalLink } from "lucide-react";
import { fetchAdminSocialLinks, upsertSocialLink, deleteSocialLink } from "./actions";
import type { SocialLinkRecord } from "./actions";

export default function SocialsAdminPage() {
  const [links, setLinks] = useState<SocialLinkRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [isPending, startTransition] = useTransition();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | undefined>(undefined);
  const [formData, setFormData] = useState({
    platform: "",
    url: "",
    handle: "",
    description: "",
    follower_count: 0,
    is_visible: true,
    sort_order: 0,
  });

  const loadData = async () => {
    setLoading(true);
    const data = await fetchAdminSocialLinks();
    setLinks(data ?? []);
    setLoading(false);
  };

  useEffect(() => {
    queueMicrotask(() => {
      loadData();
    });
  }, []);

  const handleOpenForm = (link?: SocialLinkRecord) => {
    if (link) {
      setEditingId(link.id);
      setFormData({
        platform: link.platform,
        url: link.url,
        handle: link.handle,
        description: link.description ?? "",
        follower_count: link.follower_count ?? 0,
        is_visible: link.is_visible ?? true,
        sort_order: link.sort_order ?? 0,
      });
    } else {
      setEditingId(undefined);
      setFormData({
        platform: "",
        url: "",
        handle: "",
        description: "",
        follower_count: 0,
        is_visible: true,
        sort_order: 0,
      });
    }
    setShowForm(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      const res = await upsertSocialLink({
        id: editingId,
        platform: formData.platform,
        url: formData.url,
        handle: formData.handle,
        is_visible: formData.is_visible,
      });
      if (res.success) {
        setShowForm(false);
        loadData();
      }
    });
  };

  const handleDelete = (id: string) => {
    startTransition(async () => {
      const res = await deleteSocialLink(id);
      if (res.success) loadData();
    });
  };

  const toggleVisibility = (id: string, current: boolean | null) => {
    const record = links.find((l) => l.id === id);
    if (!record) return;
    startTransition(async () => {
      const res = await upsertSocialLink({
        id,
        platform: record.platform,
        url: record.url,
        handle: record.handle,
        is_visible: !current,
      });
      if (res.success) loadData();
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            <Share2 className="w-6 h-6 text-purple-400" />
            Social Links &amp; Profiles
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Manage external platform links, social handles, and visibility toggles.
          </p>
        </div>
        <button
          onClick={() => handleOpenForm()}
          disabled={isPending}
          className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg text-sm font-medium transition-colors disabled:opacity-60"
        >
          <Plus className="w-4 h-4" /> Add Social Link
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSave} className="p-6 rounded-2xl bg-slate-900/40 border border-white/10 space-y-4 max-w-3xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300 block">Platform</label>
              <select value={formData.platform} onChange={(e) => setFormData({ ...formData, platform: e.target.value })} className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs font-mono">
                <option value="">Select platform...</option>
                <option value="GitHub">GitHub</option>
                <option value="LinkedIn">LinkedIn</option>
                <option value="YouTube">YouTube</option>
                <option value="Instagram">Instagram</option>
                <option value="Facebook">Facebook</option>
                <option value="Twitter">Twitter / X</option>
                <option value="TikTok">TikTok</option>
                <option value="Email">Email</option>
                <option value="Website">Website</option>
                <option value="Other">Other</option>
              </select>
              {formData.platform === "" && (
                <input placeholder="Or type custom platform..." onChange={(e) => setFormData({ ...formData, platform: e.target.value })} className="w-full px-4 py-2.5 mt-2 rounded-xl bg-slate-900 border border-white/10 text-white text-xs font-mono" />
              )}
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300 block">Handle / Username</label>
              <input required value={formData.handle} onChange={(e) => setFormData({ ...formData, handle: e.target.value })} placeholder="e.g. @username" className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs font-mono" />
            </div>
            <div className="space-y-1 sm:col-span-2">
              <label className="text-xs font-semibold text-slate-300 block">Profile URL</label>
              <input required type="url" value={formData.url} onChange={(e) => setFormData({ ...formData, url: e.target.value })} placeholder="https://..." className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs font-mono" />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <input type="checkbox" id="social_visible" checked={formData.is_visible} onChange={(e) => setFormData({ ...formData, is_visible: e.target.checked })} className="w-4 h-4 accent-purple-600" />
            <label htmlFor="social_visible" className="text-xs text-slate-300">Visible on public site</label>
          </div>
          <div className="flex justify-end gap-2 pt-2 border-t border-white/10">
            <button type="button" onClick={() => setShowForm(false)} className="px-5 py-2.5 rounded-xl bg-slate-800 text-slate-300 text-xs border border-white/10">Cancel</button>
            <button type="submit" disabled={isPending} className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold flex items-center gap-2 disabled:opacity-60">
              {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
              {isPending ? "Saving..." : "Save Social Link"}
            </button>
          </div>
        </form>
      )}

      {loading ? (
        <div className="p-12 text-center text-slate-400 text-sm flex items-center justify-center gap-2">
          <Loader2 className="w-5 h-5 animate-spin" />
          Loading social links...
        </div>
      ) : links.length === 0 ? (
        <div className="p-8 rounded-2xl bg-slate-900/40 border border-white/10 backdrop-blur-xl text-center">
          <div className="w-12 h-12 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mx-auto mb-3">
            <Share2 className="w-6 h-6 text-purple-400" />
          </div>
          <h2 className="text-lg font-semibold text-white">No Social Links Yet</h2>
          <p className="text-slate-400 text-sm mt-1 max-w-md mx-auto">
            Add your first public profile link (GitHub, LinkedIn, YouTube, etc.) above.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {links.map((link) => (
            <div key={link.id} className="p-5 rounded-2xl bg-slate-900/40 border border-white/10 flex items-center justify-between gap-4 group">
              <div className="min-w-0 flex-1 space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-white">{link.platform}</h3>
                  {(link.is_visible ?? true) ? (
                    <Eye className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <EyeOff className="w-3.5 h-3.5 text-slate-500" />
                  )}
                </div>
                <p className="text-xs text-purple-400 font-mono truncate">{link.handle}</p>
                <a href={link.url} target="_blank" rel="noreferrer" className="text-[10px] text-slate-500 font-mono truncate block flex items-center gap-1 hover:text-slate-300">
                  <span className="truncate">{link.url}</span>
                  <ExternalLink className="w-3 h-3 shrink-0" />
                </a>
              </div>
              <div className="flex items-center gap-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => toggleVisibility(link.id, link.is_visible ?? true)} className="p-1.5 rounded-lg bg-slate-900 border border-white/10 text-slate-400 hover:text-white">
                  {(link.is_visible ?? true) ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                </button>
                <button onClick={() => handleOpenForm(link)} className="p-1.5 rounded-lg bg-slate-900 border border-white/10 text-slate-300 hover:text-purple-300 hover:border-purple-500/30">
                  <Plus className="w-3.5 h-3.5 rotate-45" />
                </button>
                <button onClick={() => handleDelete(link.id)} disabled={isPending} className="p-1.5 rounded-lg bg-slate-900 border border-white/10 text-slate-400 hover:text-rose-400 hover:border-rose-500/30 disabled:opacity-50">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
