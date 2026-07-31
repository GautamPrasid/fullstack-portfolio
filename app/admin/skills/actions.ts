"use server";

import { revalidatePath } from "next/cache";
import { DbSkill } from "@/lib/types/database";

export async function fetchAdminSkills(): Promise<DbSkill[]> {
  return [
    { id: "s1", name: "HTML5 / CSS3", level: 95, category: "Frontend", sort_order: 1, created_at: new Date().toISOString() },
    { id: "s2", name: "Tailwind CSS", level: 90, category: "Frontend", sort_order: 2, created_at: new Date().toISOString() },
    { id: "s3", name: "Responsive Design & UI/UX", level: 90, category: "Design", sort_order: 3, created_at: new Date().toISOString() },
    { id: "s4", name: "JavaScript (ES6+)", level: 88, category: "Language", sort_order: 4, created_at: new Date().toISOString() },
    { id: "s5", name: "Java", level: 88, category: "Backend", sort_order: 5, created_at: new Date().toISOString() },
    { id: "s6", name: "JavaFX & FXML", level: 86, category: "Desktop", sort_order: 6, created_at: new Date().toISOString() },
    { id: "s7", name: "React", level: 85, category: "Frontend", sort_order: 7, created_at: new Date().toISOString() },
    { id: "s8", name: "Git & GitHub", level: 85, category: "Tools", sort_order: 8, created_at: new Date().toISOString() },
    { id: "s9", name: "TypeScript", level: 82, category: "Language", sort_order: 9, created_at: new Date().toISOString() },
    { id: "s10", name: "Next.js", level: 82, category: "Framework", sort_order: 10, created_at: new Date().toISOString() },
    { id: "s11", name: "SQL (MSSQL / MySQL)", level: 82, category: "Database", sort_order: 11, created_at: new Date().toISOString() },
  ];
}

export async function createOrUpdateSkill(skill: Partial<DbSkill>): Promise<{ success: boolean; message: string }> {
  try {
    revalidatePath("/");
    revalidatePath("/admin/skills");
    return { success: true, message: `Skill ${skill.name} saved successfully!` };
  } catch (error) {
    console.error("Error saving skill:", error);
    return { success: false, message: "Failed to save skill." };
  }
}

export async function deleteSkill(id: string): Promise<{ success: boolean; message: string }> {
  try {
    revalidatePath("/");
    revalidatePath("/admin/skills");
    return { success: true, message: `Skill ${id} deleted successfully!` };
  } catch (error) {
    console.error("Error deleting skill:", error);
    return { success: false, message: "Failed to delete skill." };
  }
}
