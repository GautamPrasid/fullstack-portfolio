"use server";

import { createClient } from "@/lib/supabase/server";
import { resumeSchema, type ResumeFormData } from "@/lib/validations/resume";
import { revalidatePath } from "next/cache";

/**
 * Fetch all resume records sorted by creation date
 */
export async function fetchAdminResumes() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("resume")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching resumes:", error.message);
    return [];
  }

  return data;
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

  // If this record is being set to active, deactivate all other resume records first
  if (record.is_active) {
    await supabase
      .from("resume")
      .update({ is_active: false })
      .neq("id", record.id || "00000000-0000-0000-0000-000000000000");
  }

  const payload = {
    ...(record.id ? { id: record.id } : {}),
    title: record.title,
    file_url: record.file_url,
    version: record.version,
    is_active: record.is_active,
    updated_at: new Date().toISOString(),
  };

  const { error } = await supabase.from("resume").upsert(payload);

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

  const { data } = await supabase.from("resume").select("download_count").eq("id", id).single();

  if (data) {
    await supabase
      .from("resume")
      .update({ download_count: (data.download_count || 0) + 1 })
      .eq("id", id);

    revalidatePath("/admin/resume");
  }
}
