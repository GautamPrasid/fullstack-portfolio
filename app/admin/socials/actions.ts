"use server";

import { createClient } from "@/lib/supabase/server";
import type { Database } from "@/lib/supabase/database.types";
import { revalidatePath } from "next/cache";

export type SocialLinkRecord = Database["public"]["Tables"]["social_links"]["Row"];

export async function fetchAdminSocialLinks(): Promise<SocialLinkRecord[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("social_links")
      .select("*")
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false });

    if (error || !data) return [];
    return data;
  } catch (err) {
    console.error("Error fetching social links from Supabase:", err);
    return [];
  }
}

export async function createOrUpdateSocialLink(
  link: Partial<SocialLinkRecord> & { platform: string; url: string; handle: string }
): Promise<{ success: boolean; message: string }> {
  try {
    const supabase = await createClient();
    const payload: Database["public"]["Tables"]["social_links"]["Insert"] = {
      platform: link.platform,
      url: link.url,
      handle: link.handle,
      description: link.description ?? null,
      follower_count: link.follower_count ?? null,
      is_visible: link.is_visible ?? true,
      sort_order: link.sort_order ?? null,
    };

    if (link.id) {
      const { error } = await supabase
        .from("social_links")
        .update(payload as never)
        .eq("id", link.id);
      if (error) throw error;
    } else {
      const { error } = await supabase
        .from("social_links")
        .insert([payload as never]);
      if (error) throw error;
    }

    revalidatePath("/");
    revalidatePath("/admin/socials");
    return { success: true, message: `Social link "${link.platform}" saved successfully!` };
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Failed to save social link.";
    console.error("Error saving social link:", error);
    return { success: false, message: msg };
  }
}

export async function deleteSocialLink(id: string): Promise<{ success: boolean; message: string }> {
  try {
    const supabase = await createClient();
    const { error } = await supabase.from("social_links").delete().eq("id", id);
    if (error) throw error;

    revalidatePath("/");
    revalidatePath("/admin/socials");
    return { success: true, message: `Social link ${id} deleted successfully!` };
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Failed to delete social link.";
    console.error("Error deleting social link:", error);
    return { success: false, message: msg };
  }
}

export const upsertSocialLink = createOrUpdateSocialLink;
