"use client";

import React, { useState } from "react";
import Image from "next/image";
import AdminHeader from "@/components/admin/AdminHeader";
import ImageUploader from "@/components/admin/ImageUploader";
import { Image as ImageIcon, Trash2, Copy, Check } from "lucide-react";

interface GalleryItem {
  id: string;
  name: string;
  url: string;
}

const initialGallery: GalleryItem[] = [
  { id: "g1", name: "Brand Logo", url: "/logo.png" },
  { id: "g2", name: "Profile Photo", url: "/profile.JPG" },
  { id: "g3", name: "StudyBuddy Screenshot", url: "https://placehold.co/800x450/0d0d1a/7c3aed?text=StudyBuddy" },
  { id: "g4", name: "Portfolio Screenshot", url: "https://placehold.co/800x450/0d0d1a/8b5cf6?text=FullStack+Portfolio" },
];

export default function AdminGalleryPage() {
  const [gallery, setGallery] = useState<GalleryItem[]>(initialGallery);
  const [newUrl, setNewUrl] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleAdd = () => {
    if (!newUrl.trim()) return;
    setGallery([
      ...gallery,
      { id: `asset-${Date.now()}`, name: `Asset ${gallery.length + 1}`, url: newUrl },
    ]);
    setNewUrl("");
  };

  const handleCopy = (id: string, url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="flex-1 flex flex-col min-w-0">
      <AdminHeader
        title="Image Gallery &amp; Storage Manager"
        subtitle="Manage uploaded project screenshots, profile pictures &amp; asset links"
      />

      <main className="flex-1 p-6 md:p-8 space-y-6 overflow-y-auto">
        <div className="p-6 rounded-2xl bg-slate-900/40 border border-white/10 space-y-4 max-w-2xl">
          <ImageUploader value={newUrl} onChange={setNewUrl} label="Add Asset to Gallery" />
          {newUrl && (
            <button
              onClick={handleAdd}
              className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold"
            >
              Add to Asset Gallery
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {gallery.map((item) => (
            <div key={item.id} className="p-4 rounded-2xl bg-slate-900/40 border border-white/10 space-y-3 group">
              <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden bg-slate-900">
                <Image src={item.url} alt={item.name} fill className="object-cover" unoptimized />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-white truncate max-w-[120px]">{item.name}</span>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleCopy(item.id, item.url)}
                    className="p-1.5 rounded-lg bg-slate-900 border border-white/10 text-slate-300 hover:text-white"
                    title="Copy URL"
                  >
                    {copiedId === item.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                  <button
                    onClick={() => setGallery(gallery.filter((g) => g.id !== item.id))}
                    className="p-1.5 rounded-lg bg-slate-900 border border-white/10 text-slate-400 hover:text-rose-400"
                    title="Delete Asset"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
