"use server";

import { createClient } from "@/lib/supabase/server";
import type { Database } from "@/lib/supabase/database.types";
import { revalidatePath } from "next/cache";

export type EducationRecord = Database["public"]["Tables"]["education"]["Row"];

export async function fetchAdminEducation() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("education")
    .select("*")
    .order("sort_order", { ascending: true });
  if (error) return [];
  return data;
}

export async function upsertEducation(formData: {
  id?: string;
  institution: string;
  degree: string;
  start_date: string;
  end_date?: string | null;
  description?: string;
  logo_url?: string;
  sort_order?: number;
}) {
  const supabase = await createClient();
  const payload: Database["public"]["Tables"]["education"]["Insert"] = {
    id: formData.id,
    institute: formData.institution,
    degree: formData.degree,
    year: formData.start_date,
    description: formData.description ?? null,
    logo_url: formData.logo_url ?? null,
    sort_order: formData.sort_order ?? null,
  };
  const { error } = await supabase.from("education").upsert(payload as never);
  if (error) return { success: false, error: error.message };

  revalidatePath("/");
  revalidatePath("/admin/education");
  return { success: true };
}

export async function deleteEducation(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("education").delete().eq("id", id);
  if (error) return { success: false, error: error.message };

  revalidatePath("/");
  revalidatePath("/admin/education");
  return { success: true };
}
