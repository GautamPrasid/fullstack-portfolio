import { z } from "zod";
import type { Database } from "@/lib/supabase/database.types";

export const resumeSchema = z.object({
  id: z.string().uuid().optional(),
  version: z.string().min(1, "Version string is required").max(50, "Version is too long"),
  pdf_url: z.string().url("Please provide a valid PDF URL"),
  cv_image_url: z.string().url("Please provide a valid CV image URL").optional().or(z.literal("")),
  is_active: z.boolean().default(true),
  download_count: z.number().int().nonnegative().default(0),
});

export type ResumeFormData = z.infer<typeof resumeSchema>;

export type ResumeRecord = Database["public"]["Tables"]["resume"]["Row"];
