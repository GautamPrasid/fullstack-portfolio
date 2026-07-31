-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ========================================================
-- 1. SITE SETTINGS & BRANDING (Logo, Favicon, Theme, Meta)
-- ========================================================
CREATE TABLE IF NOT EXISTS public.site_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    site_name TEXT NOT NULL DEFAULT 'Prasid Portfolio',
    site_title TEXT NOT NULL DEFAULT 'Prasid | Full Stack Developer & Visual Storyteller',
    site_description TEXT DEFAULT 'Full Stack Developer, Visual Storyteller, and Systems Engineer.',
    keywords TEXT[] DEFAULT ARRAY['Next.js', 'React', 'Supabase', 'TypeScript', 'TailwindCSS'],
    logo_url TEXT,
    favicon_url TEXT,
    accent_color TEXT DEFAULT '#9333ea',
    theme TEXT DEFAULT 'dark',
    maintenance_mode BOOLEAN DEFAULT false,
    google_analytics_id TEXT,
    google_site_verification TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ========================================================
-- 2. PROFILE & HERO MANAGEMENT (Bio, Hero text, Badges, Stats)
-- ========================================================
CREATE TABLE IF NOT EXISTS public.profile (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    full_name TEXT NOT NULL DEFAULT 'Prasid',
    subtitle TEXT DEFAULT 'Full Stack Software Engineer',
    profession TEXT DEFAULT 'Software Architect & Visual Storyteller',
    typing_roles TEXT[] DEFAULT ARRAY['Full Stack Engineer', 'Next.js Specialist', 'Database Architect', 'UI/UX Designer'],
    bio TEXT,
    about_description TEXT,
    location TEXT DEFAULT 'Pokhara, Nepal',
    availability TEXT DEFAULT 'Available for Hire',
    profile_image_url TEXT,
    hero_image_url TEXT,
    hero_headline TEXT DEFAULT 'Architecting Scalable Web Applications & Cinematic Visuals',
    hero_subheadline TEXT DEFAULT 'Building high-performance applications with Next.js, Supabase, and Modern UI Architectures.',
    cta_primary_text TEXT DEFAULT 'View Projects',
    cta_primary_url TEXT DEFAULT '#projects',
    cta_secondary_text TEXT DEFAULT 'Contact Me',
    cta_secondary_url TEXT DEFAULT '#contact',
    years_experience INT DEFAULT 3,
    projects_completed INT DEFAULT 24,
    monthly_views INT DEFAULT 5420,
    total_downloads INT DEFAULT 120,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ========================================================
-- 3. PROJECTS & GALLERY ATTACHMENTS
-- ========================================================
CREATE TABLE IF NOT EXISTS public.projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT NOT NULL,
    content TEXT,
    thumbnail_url TEXT NOT NULL,
    gallery_urls TEXT[] DEFAULT ARRAY[]::TEXT[],
    github_url TEXT,
    live_demo_url TEXT,
    tech_stack TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
    category TEXT NOT NULL DEFAULT 'Web Development',
    is_featured BOOLEAN DEFAULT false,
    is_published BOOLEAN DEFAULT true,
    is_archived BOOLEAN DEFAULT false,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ========================================================
-- 4. SKILLS MANAGEMENT
-- ========================================================
CREATE TABLE IF NOT EXISTS public.skills (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    category TEXT NOT NULL DEFAULT 'Frontend', -- Frontend, Backend, Database, DevOps, Tools
    icon_name TEXT DEFAULT 'Code',
    proficiency_percentage INT CHECK (proficiency_percentage BETWEEN 0 AND 100),
    color_hex TEXT DEFAULT '#9333ea',
    sort_order INT DEFAULT 0,
    is_visible BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ========================================================
-- 5. SERVICES MANAGEMENT
-- ========================================================
CREATE TABLE IF NOT EXISTS public.services (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    icon_name TEXT DEFAULT 'Layers',
    deliverables TEXT[] DEFAULT ARRAY[]::TEXT[],
    sort_order INT DEFAULT 0,
    is_visible BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ========================================================
-- 6. CONTENT CREATOR (YouTube, Media Metrics)
-- ========================================================
CREATE TABLE IF NOT EXISTS public.content_creator (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    platform TEXT NOT NULL, -- YouTube, Instagram, Facebook, Podcast
    embed_url TEXT NOT NULL,
    thumbnail_url TEXT,
    views_count INT DEFAULT 0,
    subscribers_count INT DEFAULT 0,
    is_featured BOOLEAN DEFAULT false,
    published_at TIMESTAMPTZ DEFAULT NOW()
);

-- ========================================================
-- 7. SOCIAL LINKS
-- ========================================================
CREATE TABLE IF NOT EXISTS public.social_links (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    platform TEXT NOT NULL UNIQUE,
    url TEXT NOT NULL,
    icon_name TEXT DEFAULT 'Share2',
    is_visible BOOLEAN DEFAULT true,
    sort_order INT DEFAULT 0
);

-- ========================================================
-- 8. RESUME MANAGEMENT
-- ========================================================
CREATE TABLE IF NOT EXISTS public.resume (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    file_url TEXT NOT NULL,
    version TEXT NOT NULL DEFAULT 'v1.0',
    is_active BOOLEAN DEFAULT true,
    download_count INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ========================================================
-- 9. CERTIFICATES
-- ========================================================
CREATE TABLE IF NOT EXISTS public.certificates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    issuer TEXT NOT NULL,
    issue_date DATE NOT NULL,
    credential_url TEXT,
    image_url TEXT,
    skills_associated TEXT[] DEFAULT ARRAY[]::TEXT[],
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ========================================================
-- 10. EXPERIENCE & EDUCATION
-- ========================================================
CREATE TABLE IF NOT EXISTS public.experiences (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company TEXT NOT NULL,
    position TEXT NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE,
    is_current BOOLEAN DEFAULT false,
    description TEXT NOT NULL,
    technologies TEXT[] DEFAULT ARRAY[]::TEXT[],
    sort_order INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS public.education (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    institution TEXT NOT NULL,
    degree TEXT NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE,
    description TEXT,
    logo_url TEXT,
    sort_order INT DEFAULT 0
);

-- ========================================================
-- 11. MEDIA GALLERY
-- ========================================================
CREATE TABLE IF NOT EXISTS public.gallery (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    image_url TEXT NOT NULL,
    category TEXT DEFAULT 'General',
    aspect_ratio TEXT DEFAULT '16/9',
    sort_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ========================================================
-- 12. CONTACT MESSAGES INBOX
-- ========================================================
CREATE TABLE IF NOT EXISTS public.contact_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    subject TEXT,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT false,
    replied BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ========================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ========================================================
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profile ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content_creator ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.social_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resume ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.education ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- PUBLIC READ POLICIES
CREATE POLICY "Public Read Settings" ON public.site_settings FOR SELECT USING (true);
CREATE POLICY "Public Read Profile" ON public.profile FOR SELECT USING (true);
CREATE POLICY "Public Read Projects" ON public.projects FOR SELECT USING (is_published = true AND is_archived = false);
CREATE POLICY "Public Read Skills" ON public.skills FOR SELECT USING (is_visible = true);
CREATE POLICY "Public Read Services" ON public.services FOR SELECT USING (is_visible = true);
CREATE POLICY "Public Read Content" ON public.content_creator FOR SELECT USING (true);
CREATE POLICY "Public Read Socials" ON public.social_links FOR SELECT USING (is_visible = true);
CREATE POLICY "Public Read Resume" ON public.resume FOR SELECT USING (is_active = true);
CREATE POLICY "Public Read Certificates" ON public.certificates FOR SELECT USING (true);
CREATE POLICY "Public Read Experiences" ON public.experiences FOR SELECT USING (true);
CREATE POLICY "Public Read Education" ON public.education FOR SELECT USING (true);
CREATE POLICY "Public Read Gallery" ON public.gallery FOR SELECT USING (true);

-- PUBLIC INSERT FOR CONTACT FORM
CREATE POLICY "Public Insert Messages" ON public.contact_messages FOR INSERT WITH CHECK (true);

-- AUTHENTICATED ADMIN FULL ACCESS POLICIES
CREATE POLICY "Admin Full Access Settings" ON public.site_settings FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin Full Access Profile" ON public.profile FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin Full Access Projects" ON public.projects FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin Full Access Skills" ON public.skills FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin Full Access Services" ON public.services FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin Full Access Content" ON public.content_creator FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin Full Access Socials" ON public.social_links FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin Full Access Resume" ON public.resume FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin Full Access Certificates" ON public.certificates FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin Full Access Experiences" ON public.experiences FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin Full Access Education" ON public.education FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin Full Access Gallery" ON public.gallery FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin Full Access Messages" ON public.contact_messages FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- ========================================================
-- STORAGE BUCKETS CONFIGURATION
-- ========================================================
INSERT INTO storage.buckets (id, name, public) VALUES ('portfolio-media', 'portfolio-media', true) ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Public Read Storage" ON storage.objects FOR SELECT USING (bucket_id = 'portfolio-media');
CREATE POLICY "Admin Storage Access" ON storage.objects FOR ALL TO authenticated USING (bucket_id = 'portfolio-media') WITH CHECK (bucket_id = 'portfolio-media');
