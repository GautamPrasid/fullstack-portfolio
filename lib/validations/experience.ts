export interface ExperienceFormData {
  id?: string;
  period: string;
  role: string;
  institution: string;
  description: string;
  skills: string[];
  icon: string;
  is_highlight: boolean;
}

export function validateExperience(data: Partial<ExperienceFormData>): { success: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {};

  if (!data.period || data.period.trim().length === 0) {
    errors.period = "Period is required.";
  }
  if (!data.role || data.role.trim().length === 0) {
    errors.role = "Role title is required.";
  }
  if (!data.institution || data.institution.trim().length === 0) {
    errors.institution = "Institution is required.";
  }
  if (!data.description || data.description.trim().length < 10) {
    errors.description = "Description must be at least 10 characters.";
  }

  return {
    success: Object.keys(errors).length === 0,
    errors,
  };
}
