"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export interface ProjectRecord {
  id?: string;
  title: string;
  slug?: string;
  description: string;
  category: string;
  tech: string[];
  highlights: string[];
  date?: string;
  isFeatured?: boolean;
  is_featured?: boolean;
  is_published?: boolean;
  github?: string;
  github_url?: string;
  demo?: string;
  demo_url?: string;
  badge?: string;
  image?: string;
  image_url?: string;
  sort_order?: number;
}

export async function fetchAdminProjects(): Promise<ProjectRecord[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false });

    if (error || !data) return [];
    return data as ProjectRecord[];
  } catch (err) {
    console.error("Error fetching projects from Supabase:", err);
    return [];
  }
}

export async function createOrUpdateProject(project: ProjectRecord): Promise<{ success: boolean; message: string }> {
  try {
    const supabase = await createClient();
    const payload = {
      title: project.title,
      slug: project.slug || project.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      description: project.description,
      category: project.category,
      badge: project.badge || "",
      is_featured: project.isFeatured ?? project.is_featured ?? false,
      is_published: project.is_published ?? true,
      highlights: project.highlights || [],
      tech: project.tech || [],
      github_url: project.github || project.github_url || "",
      demo_url: project.demo || project.demo_url || "",
      image_url: project.image || project.image_url || "",
    };

    if (project.id && !project.id.startsWith("project-")) {
      const { error } = await supabase.from("projects").update(payload).eq("id", project.id);
      if (error) throw error;
    } else {
      const { error } = await supabase.from("projects").insert([payload]);
      if (error) throw error;
    }

    revalidatePath("/");
    revalidatePath("/admin/projects");
    return { success: true, message: `Project ${project.title} saved successfully!` };
  } catch (error: any) {
    console.error("Error saving project:", error);
    return { success: false, message: error?.message || "Failed to save project." };
  }
}

export async function deleteProject(id: string): Promise<{ success: boolean; message: string }> {
  try {
    const supabase = await createClient();
    const { error } = await supabase.from("projects").delete().eq("id", id);
    if (error) throw error;

    revalidatePath("/");
    revalidatePath("/admin/projects");
    return { success: true, message: `Project ${id} deleted successfully!` };
  } catch (error: any) {
    console.error("Error deleting project:", error);
    return { success: false, message: error?.message || "Failed to delete project." };
  }
}
