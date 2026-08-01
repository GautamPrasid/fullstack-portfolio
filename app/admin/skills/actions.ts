"use server";

import { createClient } from "@/lib/supabase/server";
import type { Database } from "@/lib/supabase/database.types";
import { revalidatePath } from "next/cache";

export type SkillRecord = Database["public"]["Tables"]["skills"]["Row"];

export async function fetchAdminSkills() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("skills")
    .select("*")
    .order("sort_order", { ascending: true });
  if (error) return [];
  return data;
}

export async function upsertSkill(formData: {
  id?: string;
  name: string;
  category: string;
  proficiency_percentage: number;
  color_hex?: string;
  sort_order?: number;
  is_visible?: boolean;
}) {
  const supabase = await createClient();
  const payload: Database["public"]["Tables"]["skills"]["Insert"] = {
    id: formData.id,
    name: formData.name,
    category: formData.category,
    percentage: formData.proficiency_percentage,
    color: formData.color_hex ?? null,
    sort_order: formData.sort_order ?? null,
    is_visible: formData.is_visible ?? true,
  };
  const { error } = await supabase.from("skills").upsert(payload as never);
  if (error) return { success: false, error: error.message };

  revalidatePath("/");
  revalidatePath("/admin/skills");
  return { success: true };
}

export async function deleteSkill(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("skills").delete().eq("id", id);
  if (error) return { success: false, error: error.message };

  revalidatePath("/");
  revalidatePath("/admin/skills");
  return { success: true };
}
