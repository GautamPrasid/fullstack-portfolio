"use server";

import { createClient } from "@/lib/supabase/server";
import type { Database } from "@/lib/supabase/database.types";
import { revalidatePath } from "next/cache";

export type CertificateRecord = Database["public"]["Tables"]["certificates"]["Row"];

export async function fetchAdminCertificates() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("certificates")
    .select("*")
    .order("issue_date", { ascending: false });
  if (error) return [];
  return data;
}

export async function upsertCertificate(formData: {
  id?: string;
  title: string;
  issuer: string;
  issue_date: string;
  credential_url?: string;
  image_url?: string;
  skills_associated?: string[];
}) {
  const supabase = await createClient();
  const payload: Database["public"]["Tables"]["certificates"]["Insert"] = {
    id: formData.id,
    name: formData.title,
    issuer: formData.issuer,
    issue_date: formData.issue_date,
    credential_url: formData.credential_url ?? null,
    image_url: formData.image_url ?? null,
  };
  const { error } = await supabase.from("certificates").upsert(payload as never);
  if (error) return { success: false, error: error.message };

  revalidatePath("/");
  revalidatePath("/admin/certificates");
  return { success: true };
}

export async function deleteCertificate(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("certificates").delete().eq("id", id);
  if (error) return { success: false, error: error.message };

  revalidatePath("/");
  revalidatePath("/admin/certificates");
  return { success: true };
}
