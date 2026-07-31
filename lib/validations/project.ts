export interface ProjectFormData {
  id?: string;
  title: string;
  description: string;
  category: string;
  tech: string[];
  highlights: string[];
  date: string;
  is_featured: boolean;
  github: string;
  demo: string;
  badge: string;
  image: string;
}

export function validateProject(data: Partial<ProjectFormData>): { success: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {};

  if (!data.title || data.title.trim().length < 2) {
    errors.title = "Project title must be at least 2 characters.";
  }
  if (!data.description || data.description.trim().length < 10) {
    errors.description = "Description must be at least 10 characters.";
  }
  if (!data.category || data.category.trim().length === 0) {
    errors.category = "Category is required.";
  }

  return {
    success: Object.keys(errors).length === 0,
    errors,
  };
}
