"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const profileSchema = z.object({
  id: z.string().uuid().optional(),
  full_name: z.string().min(2),
  subtitle: z.string().min(2),
  profession: z.string().min(2),
  typing_roles: z.array(z.string()),
  bio: z.string(),
  about_description: z.string(),
  location: z.string(),
  availability: z.string(),
  profile_image_url: z.string().url().optional().or(z.literal("")),
  hero_image_url: z.string().url().optional().or(z.literal("")),
  hero_headline: z.string(),
  hero_subheadline: z.string(),
  cta_primary_text: z.string(),
  cta_primary_url: z.string(),
  cta_secondary_text: z.string(),
  cta_secondary_url: z.string(),
  years_experience: z.number().int().nonnegative(),
  projects_completed: z.number().int().nonnegative(),
  monthly_views: z.number().int().nonnegative(),
  total_downloads: z.number().int().nonnegative(),
});

export type ProfileFormValues = z.infer<typeof profileSchema>;

export async function updateProfile(formData: ProfileFormValues) {
  const validated = profileSchema.safeParse(formData);

  if (!validated.success) {
    return { success: false, error: validated.error.issues[0]?.message };
  }

  const supabase = await createClient();
  const payload = validated.data;

  const { error } = await supabase
    .from("profile")
    .upsert({ ...payload, updated_at: new Date().toISOString() });

  if (error) {
    console.error("Profile update failed:", error.message);
    return { success: false, error: error.message };
  }

  // Instant cache revalidation across entire site
  revalidatePath("/", "layout");
  revalidatePath("/admin", "layout");

  return { success: true };
}
