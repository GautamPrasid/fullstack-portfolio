import { createClient } from "@/lib/supabase/server";
import type { Database } from "@/lib/supabase/database.types";

type SiteSettingsRow = Database["public"]["Tables"]["site_settings"]["Row"];
type ProfileRow = Database["public"]["Tables"]["profile"]["Row"];
type ProjectRow = Database["public"]["Tables"]["projects"]["Row"];
type SkillRow = Database["public"]["Tables"]["skills"]["Row"];
type ServiceRow = Database["public"]["Tables"]["services"]["Row"];
type SocialLinkRow = Database["public"]["Tables"]["social_links"]["Row"];
type ResumeRow = Database["public"]["Tables"]["resume"]["Row"];
type ExperienceRow = Database["public"]["Tables"]["experiences"]["Row"];
type EducationRow = Database["public"]["Tables"]["education"]["Row"];
type ContentCreatorRow = Database["public"]["Tables"]["content_creator"]["Row"];
type CertificateRow = Database["public"]["Tables"]["certificates"]["Row"];
type GalleryRow = Database["public"]["Tables"]["gallery"]["Row"];
type ContactMessageRow = Database["public"]["Tables"]["contact_messages"]["Row"];

// ============================================================
// SITE SETTINGS
// ============================================================
export async function getSiteSettings(): Promise<SiteSettingsRow | null> {
  try {
    const supabase = await createClient();
    const { data } = await supabase.from("site_settings").select("*").maybeSingle();
    return (data ?? null) as SiteSettingsRow | null;
  } catch {
    return null;
  }
}

// ============================================================
// PROFILE & HERO
// ============================================================
export async function getProfileData(): Promise<ProfileRow | null> {
  try {
    const supabase = await createClient();
    const { data } = await supabase.from("profile").select("*").maybeSingle();
    return (data ?? null) as ProfileRow | null;
  } catch {
    return null;
  }
}

// ============================================================
// PROJECTS
// ============================================================
export async function getPublishedProjects(): Promise<ProjectRow[]> {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("projects")
      .select("*")
      .eq("is_published", true)
      .eq("is_archived", false)
      .order("sort_order", { ascending: true });
    return (data ?? []) as ProjectRow[];
  } catch {
    return [];
  }
}

// ============================================================
// SKILLS
// ============================================================
export async function getActiveSkills(): Promise<SkillRow[]> {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("skills")
      .select("*")
      .eq("is_visible", true)
      .order("sort_order", { ascending: true });
    return (data ?? []) as SkillRow[];
  } catch {
    return [];
  }
}

// ============================================================
// SERVICES
// ============================================================
export async function getServices(): Promise<ServiceRow[]> {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("services")
      .select("*")
      .eq("is_visible", true)
      .order("sort_order", { ascending: true });
    return (data ?? []) as ServiceRow[];
  } catch {
    return [];
  }
}

// ============================================================
// SOCIAL LINKS
// ============================================================
export async function getSocialLinks(): Promise<SocialLinkRow[]> {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("social_links")
      .select("*")
      .eq("is_visible", true)
      .order("sort_order", { ascending: true });
    return (data ?? []) as SocialLinkRow[];
  } catch {
    return [];
  }
}

// ============================================================
// RESUME
// ============================================================
export async function getActiveResume(): Promise<ResumeRow | null> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("resume")
      .select("*")
      .order("updated_at", { ascending: false });

    if (error || !data || data.length === 0) return null;
    const rows: ResumeRow[] = data;
    const active: ResumeRow | undefined = rows.find(
      (r: ResumeRow) => r.is_active === true
    );
    return active ?? rows[0] ?? null;
  } catch {
    return null;
  }
}

// ============================================================
// EXPERIENCES
// ============================================================
export async function getExperiences(): Promise<ExperienceRow[]> {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("experiences")
      .select("*")
      .order("sort_order", { ascending: true });
    return (data ?? []) as ExperienceRow[];
  } catch {
    return [];
  }
}

// ============================================================
// EDUCATION
// ============================================================
export async function getEducation(): Promise<EducationRow[]> {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("education")
      .select("*")
      .order("sort_order", { ascending: true });
    return (data ?? []) as EducationRow[];
  } catch {
    return [];
  }
}

// ============================================================
// CONTENT CREATOR
// ============================================================
export async function getContentCreator(): Promise<ContentCreatorRow[]> {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("content_creator")
      .select("*")
      .order("created_at", { ascending: false });
    return (data ?? []) as ContentCreatorRow[];
  } catch {
    return [];
  }
}

// ============================================================
// CERTIFICATES
// ============================================================
export async function getCertificates(): Promise<CertificateRow[]> {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("certificates")
      .select("*")
      .order("issue_date", { ascending: false });
    return (data ?? []) as CertificateRow[];
  } catch {
    return [];
  }
}

// ============================================================
// GALLERY
// ============================================================
export async function getGallery(): Promise<GalleryRow[]> {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("gallery")
      .select("*")
      .order("sort_order", { ascending: true });
    return (data ?? []) as GalleryRow[];
  } catch {
    return [];
  }
}

// ============================================================
// CONTACT MESSAGES (Admin)
// ============================================================
export async function getContactMessages(): Promise<ContactMessageRow[]> {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("contact_messages")
      .select("*")
      .order("created_at", { ascending: false });
    return (data ?? []) as ContactMessageRow[];
  } catch {
    return [];
  }
}
