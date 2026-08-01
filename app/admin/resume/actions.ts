"use server";

import { createClient } from "@/lib/supabase/server";
import type { Database } from "@/lib/supabase/database.types";
import { resumeSchema, type ResumeFormData, type ResumeRecord } from "@/lib/validations/resume";
import { revalidatePath } from "next/cache";

type ResumeTable = Database["public"]["Tables"]["resume"];

/**
 * Fetch all resume records sorted by creation date
 */
export async function fetchAdminResumes(): Promise<ResumeRecord[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("resume")
    .select("*")
    .order("updated_at", { ascending: false });

  if (error) {
    console.error("Error fetching resumes:", error.message);
    return [];
  }

  return data ?? [];
}

/**
 * Upsert (Create or Update) a resume record
 */
export async function createOrUpdateResume(formData: ResumeFormData) {
  const validated = resumeSchema.safeParse(formData);

  if (!validated.success) {
    return {
      success: false,
      error: validated.error.issues[0]?.message || "Invalid form data",
    };
  }

  const supabase = await createClient();
  const record = validated.data;

  if (record.is_active) {
    const deactivateUpdate: ResumeTable["Update"] = { is_active: false };
    await supabase
      .from("resume")
      .update(deactivateUpdate as never)
      .neq("id", record.id || "00000000-0000-0000-0000-000000000000");
  }

  const cvImageValue: string | null =
    record.cv_image_url && record.cv_image_url.length > 0 ? record.cv_image_url : null;

  const payload: ResumeTable["Insert"] = {
    ...(record.id ? { id: record.id } : {}),
    pdf_url: record.pdf_url,
    cv_image_url: cvImageValue,
    version: record.version,
    is_active: record.is_active,
    download_count: record.download_count,
    updated_at: new Date().toISOString(),
  };

  const { error } = await supabase.from("resume").upsert(payload as never);

  if (error) {
    console.error("Error saving resume record:", error.message);
    return { success: false, error: error.message };
  }

  revalidatePath("/");
  revalidatePath("/admin/resume");

  return { success: true };
}

/**
 * Delete a resume record by ID
 */
export async function deleteResume(id: string) {
  const supabase = await createClient();

  const { error } = await supabase.from("resume").delete().eq("id", id);

  if (error) {
    console.error("Error deleting resume:", error.message);
    return { success: false, error: error.message };
  }

  revalidatePath("/");
  revalidatePath("/admin/resume");

  return { success: true };
}

/**
 * Increment download counter for a resume
 */
export async function incrementResumeDownload(id: string) {
  const supabase = await createClient();

  const { data: resumeRow } = await supabase
    .from("resume")
    .select("download_count")
    .eq("id", id)
    .maybeSingle();

  const typedRow = resumeRow as
    | { download_count: number | null; id: string }
    | null;
  const currentCount: number = typedRow?.download_count ?? 0;

  if (resumeRow) {
    const incrementUpdate: ResumeTable["Update"] = {
      download_count: currentCount + 1,
    };
    await supabase
      .from("resume")
      .update(incrementUpdate as never)
      .eq("id", id);
    revalidatePath("/admin/resume");
  }
}
