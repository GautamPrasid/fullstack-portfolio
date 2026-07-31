export interface SkillFormData {
  id?: string;
  name: string;
  level: number;
  category: string;
  sort_order?: number;
}

export function validateSkill(data: Partial<SkillFormData>): { success: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {};

  if (!data.name || data.name.trim().length === 0) {
    errors.name = "Skill name is required.";
  }
  if (data.level === undefined || data.level < 0 || data.level > 100) {
    errors.level = "Skill level must be between 0 and 100.";
  }
  if (!data.category || data.category.trim().length === 0) {
    errors.category = "Category is required.";
  }

  return {
    success: Object.keys(errors).length === 0,
    errors,
  };
}
