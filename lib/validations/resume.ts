import { z } from "zod";

export const resumeSchema = z.object({
  id: z.string().uuid().optional(),
  title: z.string().min(2, "Title must be at least 2 characters").max(100, "Title is too long"),
  file_url: z.string().url("Please provide a valid file URL"),
  version: z.string().min(1, "Version string is required"), // e.g. "v2.1" or "2026-Q3"
  is_active: z.boolean().default(true),
  download_count: z.number().int().nonnegative().default(0),
});

export type ResumeFormData = z.infer<typeof resumeSchema>;

export interface ResumeRecord {
  id: string;
  title: string;
  file_url: string;
  version: string;
  is_active: boolean;
  download_count: number;
  created_at?: string;
  updated_at?: string;
}
