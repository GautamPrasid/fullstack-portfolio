import { createClient } from "@/lib/supabase/server";

// ============================================================
// SITE SETTINGS
// ============================================================
export async function getSiteSettings() {
  try {
    const supabase = await createClient();
    const { data } = await supabase.from("site_settings").select("*").single();
    return data;
  } catch {
    return null;
  }
}

// ============================================================
// PROFILE & HERO
// ============================================================
export async function getProfileData() {
  try {
    const supabase = await createClient();
    const { data } = await supabase.from("profile").select("*").single();
    return data;
  } catch {
    return null;
  }
}

// ============================================================
// PROJECTS
// ============================================================
export async function getPublishedProjects() {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("projects")
      .select("*")
      .eq("is_published", true)
      .eq("is_archived", false)
      .order("sort_order", { ascending: true });
    return data || [];
  } catch {
    return [];
  }
}

// ============================================================
// SKILLS
// ============================================================
export async function getActiveSkills() {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("skills")
      .select("*")
      .eq("is_visible", true)
      .order("sort_order", { ascending: true });
    return data || [];
  } catch {
    return [];
  }
}

// ============================================================
// SERVICES
// ============================================================
export async function getServices() {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("services")
      .select("*")
      .eq("is_visible", true)
      .order("sort_order", { ascending: true });
    return data || [];
  } catch {
    return [];
  }
}

// ============================================================
// SOCIAL LINKS
// ============================================================
export async function getSocialLinks() {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("social_links")
      .select("*")
      .eq("is_visible", true)
      .order("sort_order", { ascending: true });
    return data || [];
  } catch {
    return [];
  }
}

// ============================================================
// RESUME
// ============================================================
export async function getActiveResume() {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("resume")
      .select("*")
      .eq("is_active", true)
      .single();
    return data;
  } catch {
    return null;
  }
}

// ============================================================
// EXPERIENCES
// ============================================================
export async function getExperiences() {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("experiences")
      .select("*")
      .order("sort_order", { ascending: true });
    return data || [];
  } catch {
    return [];
  }
}

// ============================================================
// EDUCATION
// ============================================================
export async function getEducation() {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("education")
      .select("*")
      .order("sort_order", { ascending: true });
    return data || [];
  } catch {
    return [];
  }
}

// ============================================================
// CONTENT CREATOR
// ============================================================
export async function getContentCreator() {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("content_creator")
      .select("*")
      .order("published_at", { ascending: false });
    return data || [];
  } catch {
    return [];
  }
}

// ============================================================
// CERTIFICATES
// ============================================================
export async function getCertificates() {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("certificates")
      .select("*")
      .order("issue_date", { ascending: false });
    return data || [];
  } catch {
    return [];
  }
}

// ============================================================
// GALLERY
// ============================================================
export async function getGallery() {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("gallery")
      .select("*")
      .order("sort_order", { ascending: true });
    return data || [];
  } catch {
    return [];
  }
}

// ============================================================
// CONTACT MESSAGES (Admin)
// ============================================================
export async function getContactMessages() {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("contact_messages")
      .select("*")
      .order("created_at", { ascending: false });
    return data || [];
  } catch {
    return [];
  }
}
