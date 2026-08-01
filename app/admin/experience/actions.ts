"use server";

import { createClient } from "@/lib/supabase/server";
import type { Database } from "@/lib/supabase/database.types";
import { revalidatePath } from "next/cache";

export type ExperienceRecord = Database["public"]["Tables"]["experiences"]["Row"];

export async function fetchAdminExperiences() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("experiences")
    .select("*")
    .order("sort_order", { ascending: true });
  if (error) return [];
  return data;
}

export async function upsertExperience(formData: {
  id?: string;
  company: string;
  position: string;
  start_date: string;
  end_date?: string | null;
  is_current: boolean;
  description: string;
  technologies: string[];
  sort_order?: number;
}) {
  const supabase = await createClient();
  const payload: Database["public"]["Tables"]["experiences"]["Insert"] = {
    id: formData.id,
    company: formData.company,
    position: formData.position,
    start_date: formData.start_date,
    end_date: formData.end_date ?? null,
    is_current: formData.is_current,
    description: formData.description,
    technologies: formData.technologies,
    sort_order: formData.sort_order ?? null,
  };
  const { error } = await supabase.from("experiences").upsert(payload as never);
  if (error) return { success: false, error: error.message };

  revalidatePath("/");
  revalidatePath("/admin/experience");
  return { success: true };
}

export async function deleteExperience(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("experiences").delete().eq("id", id);
  if (error) return { success: false, error: error.message };

  revalidatePath("/");
  revalidatePath("/admin/experience");
  return { success: true };
}
