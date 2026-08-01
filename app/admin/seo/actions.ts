"use server";

import { createClient } from "@/lib/supabase/server";
import type { Database } from "@/lib/supabase/database.types";
import { revalidatePath } from "next/cache";

export type SeoSettingsRecord = Database["public"]["Tables"]["seo_settings"]["Row"];

export async function fetchSeoSettings(): Promise<SeoSettingsRecord | null> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.from("seo_settings").select("*").limit(1).maybeSingle();

    if (error || !data) return null;
    return data;
  } catch (err) {
    console.error("Error fetching SEO settings from Supabase:", err);
    return null;
  }
}

export async function createOrUpdateSeoSettings(
  seo: Partial<SeoSettingsRecord> & { site_title: string; meta_description: string }
): Promise<{ success: boolean; message: string }> {
  try {
    const supabase = await createClient();
    const payload: Database["public"]["Tables"]["seo_settings"]["Insert"] = {
      site_title: seo.site_title,
      meta_description: seo.meta_description,
      keywords: seo.keywords ?? null,
      favicon_url: seo.favicon_url ?? null,
      og_image_url: seo.og_image_url ?? null,
      robots: seo.robots ?? null,
      twitter_card: seo.twitter_card ?? null,
    };

    if (seo.id) {
      const { error } = await supabase
        .from("seo_settings")
        .update(payload as never)
        .eq("id", seo.id);
      if (error) throw error;
    } else {
      const { error } = await supabase
        .from("seo_settings")
        .insert([payload as never]);
      if (error) throw error;
    }

    revalidatePath("/", "layout");
    revalidatePath("/admin/seo");
    return { success: true, message: "SEO settings saved successfully!" };
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Failed to save SEO settings.";
    console.error("Error saving SEO settings:", error);
    return { success: false, message: msg };
  }
}
