"use server";

import { createClient } from "@/lib/supabase/server";
import type { Database } from "@/lib/supabase/database.types";
import { revalidatePath } from "next/cache";

export type ContactMessageRecord = Database["public"]["Tables"]["contact_messages"]["Row"];

export async function fetchAdminMessages() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("contact_messages")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) return [];
  return data;
}

export async function toggleMessageRead(id: string, is_read: boolean) {
  const supabase = await createClient();
  const payload: Database["public"]["Tables"]["contact_messages"]["Update"] = {
    status: is_read ? "read" : "unread",
  };
  const { error } = await supabase
    .from("contact_messages")
    .update(payload as never)
    .eq("id", id);
  if (error) return { success: false, error: error.message };

  revalidatePath("/admin/messages");
  return { success: true };
}

export async function deleteMessage(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("contact_messages").delete().eq("id", id);
  if (error) return { success: false, error: error.message };

  revalidatePath("/admin/messages");
  return { success: true };
}
