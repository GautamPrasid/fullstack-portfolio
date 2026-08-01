"use client";

import React, { useEffect, useState, useTransition } from "react";
import Image from "next/image";
import AdminHeader from "@/components/admin/AdminHeader";
import ImageUploader from "@/components/admin/ImageUploader";
import { Trash2, Copy, Check, Loader2, Plus } from "lucide-react";
import { fetchAdminGallery, upsertGalleryItem, deleteGalleryItem } from "./actions";
import type { GalleryRecord } from "./actions";

export default function AdminGalleryPage() {
  const [gallery, setGallery] = useState<GalleryRecord[]>([]);
  const [newUrl, setNewUrl] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState("screenshots");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [isPending, startTransition] = useTransition();

  const loadData = async () => {
    setLoading(true);
    const data = await fetchAdminGallery();
    setGallery(data ?? []);
    setLoading(false);
  };

  useEffect(() => {
    queueMicrotask(() => {
      loadData();
    });
  }, []);

  const handleAdd = () => {
    if (!newUrl.trim()) return;
    startTransition(async () => {
      const res = await upsertGalleryItem({
        title: newTitle || null,
        image_url: newUrl,
        category: newCategory,
      });
      if (res.success) {
        setNewUrl("");
        setNewTitle("");
        setNewCategory("screenshots");
        loadData();
      }
    });
  };

  const handleCopy = (id: string, url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDelete = (id: string) => {
    startTransition(async () => {
      const res = await deleteGalleryItem(id);
      if (res.success) loadData();
    });
  };

  return (
    <div className="flex-1 flex flex-col min-w-0">
      <AdminHeader
        title="Image Gallery &amp; Storage Manager"
        subtitle="Manage uploaded project screenshots, profile pictures &amp; asset links"
      />

      <main className="flex-1 p-6 md:p-8 space-y-6 overflow-y-auto">
        <div className="p-6 rounded-2xl bg-slate-900/40 border border-white/10 space-y-4 max-w-2xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="sm:col-span-2 space-y-1">
              <label className="text-xs font-semibold text-slate-300 block">Asset Title (optional)</label>
              <input value={newTitle} onChange={(e) => setNewTitle(e.target.value)} placeholder="e.g. Project Alpha Screenshot" className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs font-mono" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300 block">Category</label>
              <select value={newCategory} onChange={(e) => setNewCategory(e.target.value)} className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs font-mono">
                <option value="screenshots">Project Screenshots</option>
                <option value="profile">Profile / Avatar</option>
                <option value="brand">Brand / Logos</option>
                <option value="cv">CV / Resume Preview</option>
                <option value="other">Other Assets</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300 block">Asset URL</label>
              <input value={newUrl} onChange={(e) => setNewUrl(e.target.value)} placeholder="https://..." className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs font-mono" />
            </div>
          </div>
          <ImageUploader value={newUrl} onChange={setNewUrl} label="Or Upload New Asset" />
          <div className="flex justify-end">
            {newUrl && (
              <button
                onClick={handleAdd}
                disabled={isPending}
                className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold flex items-center gap-2 disabled:opacity-60"
              >
                {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                {isPending ? "Adding..." : "Add to Asset Gallery"}
              </button>
            )}
          </div>
        </div>

        {loading ? (
          <div className="p-12 text-center text-slate-400 text-xs flex items-center justify-center gap-2">
            <Loader2 className="w-4 h-4 animate-spin" />
            Loading gallery...
          </div>
        ) : gallery.length === 0 ? (
          <div className="p-12 rounded-2xl bg-slate-900/40 border border-white/10 text-center text-slate-400 text-xs">
            No assets in gallery yet. Upload or add your first asset above.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {gallery.map((item) => (
              <div key={item.id} className="p-4 rounded-2xl bg-slate-900/40 border border-white/10 space-y-3 group">
                <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden bg-slate-900">
                  <Image src={item.image_url} alt={item.title ?? item.image_url} fill className="object-cover" unoptimized />
                </div>
                <div className="flex items-center justify-between gap-2">
                  <div className="min-w-0 flex-1 space-y-0.5">
                    <span className="text-xs font-semibold text-white truncate block">{item.title ?? "Untitled Asset"}</span>
                    <span className="text-[10px] text-purple-400 font-mono truncate block">{item.category}</span>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={() => handleCopy(item.id, item.image_url)}
                      className="p-1.5 rounded-lg bg-slate-900 border border-white/10 text-slate-300 hover:text-white"
                      title="Copy URL"
                    >
                      {copiedId === item.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      disabled={isPending}
                      className="p-1.5 rounded-lg bg-slate-900 border border-white/10 text-slate-400 hover:text-rose-400 hover:border-rose-500/30 disabled:opacity-50"
                      title="Delete Asset"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
