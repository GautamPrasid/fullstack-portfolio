"use server";

import { createClient } from "@/lib/supabase/server";
import type { Database } from "@/lib/supabase/database.types";
import { revalidatePath } from "next/cache";

export type GalleryRecord = Database["public"]["Tables"]["gallery"]["Row"];

export async function fetchAdminGallery(): Promise<GalleryRecord[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("gallery")
      .select("*")
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false });

    if (error || !data) return [];
    return data;
  } catch (err) {
    console.error("Error fetching gallery from Supabase:", err);
    return [];
  }
}

export async function createOrUpdateGalleryItem(
  item: Partial<GalleryRecord> & { category: string; image_url: string }
): Promise<{ success: boolean; message: string }> {
  try {
    const supabase = await createClient();
    const payload: Database["public"]["Tables"]["gallery"]["Insert"] = {
      title: item.title ?? null,
      image_url: item.image_url,
      category: item.category,
      sort_order: item.sort_order ?? null,
    };

    if (item.id) {
      const { error } = await supabase
        .from("gallery")
        .update(payload as never)
        .eq("id", item.id);
      if (error) throw error;
    } else {
      const { error } = await supabase
        .from("gallery")
        .insert([payload as never]);
      if (error) throw error;
    }

    revalidatePath("/");
    revalidatePath("/admin/gallery");
    return { success: true, message: `Gallery item saved successfully!` };
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Failed to save gallery item.";
    console.error("Error saving gallery item:", error);
    return { success: false, message: msg };
  }
}

export async function deleteGalleryItem(id: string): Promise<{ success: boolean; message: string }> {
  try {
    const supabase = await createClient();
    const { error } = await supabase.from("gallery").delete().eq("id", id);
    if (error) throw error;

    revalidatePath("/");
    revalidatePath("/admin/gallery");
    return { success: true, message: `Gallery item ${id} deleted successfully!` };
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Failed to delete gallery item.";
    console.error("Error deleting gallery item:", error);
    return { success: false, message: msg };
  }
}

export const upsertGalleryItem = createOrUpdateGalleryItem;
