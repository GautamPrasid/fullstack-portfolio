"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Upload, X, Check, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface ImageUploaderProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
}

export default function ImageUploader({
  value,
  onChange,
  label = "Project Banner / Media Image",
}: ImageUploaderProps) {
  const [inputUrl, setInputUrl] = useState(value);
  const [uploading, setUploading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleApply = () => {
    onChange(inputUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const supabase = createClient();
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `uploads/${fileName}`;

      const { error } = await supabase.storage
        .from("portfolio-media")
        .upload(filePath, file);

      if (error) {
        console.error("Storage upload error:", error);
      } else {
        const { data } = supabase.storage
          .from("portfolio-media")
          .getPublicUrl(filePath);
        if (data?.publicUrl) {
          setInputUrl(data.publicUrl);
          onChange(data.publicUrl);
        }
      }
    } catch (err) {
      console.error("Failed to upload image:", err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      <label className="text-xs font-semibold text-slate-300 block">{label}</label>

      {/* File Upload Dropzone */}
      <label className="flex flex-col items-center justify-center w-full py-4 border-2 border-dashed border-white/10 hover:border-purple-500/40 rounded-xl cursor-pointer bg-slate-950/40 hover:bg-slate-900/60 transition-colors">
        <div className="flex items-center justify-center gap-2 text-slate-400 text-xs font-medium">
          {uploading ? (
            <Loader2 className="w-4 h-4 animate-spin text-purple-400" />
          ) : (
            <Upload className="w-4 h-4 text-purple-400" />
          )}
          <span>{uploading ? "Uploading to Supabase Storage..." : "Upload File to Supabase Storage"}</span>
        </div>
        <input type="file" accept="image/*" onChange={handleFileUpload} disabled={uploading} className="hidden" />
      </label>

      <div className="flex gap-2">
        <input
          type="text"
          value={inputUrl}
          onChange={(e) => setInputUrl(e.target.value)}
          placeholder="https://example.com/image.png or Supabase Storage URL"
          className="flex-1 px-4 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs font-mono focus:border-purple-500 focus:outline-none"
        />
        <button
          type="button"
          onClick={handleApply}
          className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors focus-ring"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Upload className="w-4 h-4" />}
          <span>{copied ? "Applied" : "Set URL"}</span>
        </button>
      </div>

      {value && (
        <div className="relative aspect-[16/9] w-full max-w-sm rounded-xl overflow-hidden border border-white/10 bg-slate-900 mt-3 group">
          <Image src={value} alt="Media Preview" fill className="object-cover" unoptimized />
          <button
            type="button"
            onClick={() => {
              setInputUrl("");
              onChange("");
            }}
            className="absolute top-2 right-2 w-7 h-7 rounded-full bg-slate-900/80 border border-white/20 text-white flex items-center justify-center hover:bg-rose-600 transition-colors"
            title="Remove Image"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
