export interface AboutFormData {
  bio: string;
  focus_items: string[];
  location: string;
  education_institution: string;
  degree: string;
}

export function validateAbout(data: Partial<AboutFormData>): { success: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {};

  if (!data.bio || data.bio.trim().length < 20) {
    errors.bio = "Bio narrative must be at least 20 characters.";
  }
  if (!data.location || data.location.trim().length === 0) {
    errors.location = "Location is required.";
  }

  return {
    success: Object.keys(errors).length === 0,
    errors,
  };
}
