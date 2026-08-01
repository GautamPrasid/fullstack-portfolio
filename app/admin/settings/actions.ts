"use server";

import { createClient } from "@/lib/supabase/server";
import type { Database } from "@/lib/supabase/database.types";
import { revalidatePath } from "next/cache";

export type SiteSettingsRecord = Database["public"]["Tables"]["site_settings"]["Row"];

export async function fetchSiteSettings(): Promise<SiteSettingsRecord | null> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.from("site_settings").select("*").limit(1).maybeSingle();

    if (error || !data) return null;
    return data;
  } catch (err) {
    console.error("Error fetching site settings from Supabase:", err);
    return null;
  }
}

export async function createOrUpdateSiteSettings(
  settings: Partial<SiteSettingsRecord>
): Promise<{ success: boolean; message: string }> {
  try {
    const supabase = await createClient();
    const payload: Database["public"]["Tables"]["site_settings"]["Insert"] = {
      site_name: settings.site_name ?? null,
      accent_color: settings.accent_color ?? null,
      google_analytics_id: settings.google_analytics_id ?? null,
      google_search_console_id: settings.google_search_console_id ?? null,
      maintenance_mode: settings.maintenance_mode ?? false,
      primary_color: settings.primary_color ?? null,
      theme: settings.theme ?? null,
    };

    if (settings.id) {
      const { error } = await supabase
        .from("site_settings")
        .update(payload as never)
        .eq("id", settings.id);
      if (error) throw error;
    } else {
      const { error } = await supabase
        .from("site_settings")
        .insert([payload as never]);
      if (error) throw error;
    }

    revalidatePath("/", "layout");
    revalidatePath("/admin/settings");
    return { success: true, message: "Site settings saved successfully!" };
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Failed to save site settings.";
    console.error("Error saving site settings:", error);
    return { success: false, message: msg };
  }
}
