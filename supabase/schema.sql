-- PostgreSQL Database Migration Schema for Prasid Gautam Portfolio CMS

-- Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. PROJECTS TABLE
CREATE TABLE IF NOT EXISTS public.projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  badge TEXT,
  is_featured BOOLEAN DEFAULT false,
  is_published BOOLEAN DEFAULT true,
  highlights TEXT[] DEFAULT '{}',
  tech TEXT[] DEFAULT '{}',
  github_url TEXT,
  demo_url TEXT,
  image_url TEXT,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. SKILLS TABLE
CREATE TABLE IF NOT EXISTS public.skills (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  category TEXT NOT NULL, -- e.g., 'frontend', 'backend', 'media'
  icon TEXT,
  percentage INT CHECK (percentage >= 0 AND percentage <= 100),
  color TEXT DEFAULT '#a855f7',
  sort_order INT DEFAULT 0,
  is_hidden BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. ABOUT ME TABLE
CREATE TABLE IF NOT EXISTS public.about_me (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  photo_url TEXT,
  headline TEXT NOT NULL,
  description TEXT NOT NULL,
  bio TEXT NOT NULL,
  location TEXT DEFAULT 'Pokhara, Nepal',
  availability TEXT DEFAULT 'Available for Work',
  experience_years INT DEFAULT 2,
  projects_count INT DEFAULT 10,
  current_learning TEXT[] DEFAULT '{}',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. EXPERIENCES TABLE
CREATE TABLE IF NOT EXISTS public.experiences (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company TEXT NOT NULL,
  position TEXT NOT NULL,
  location TEXT,
  start_date DATE NOT NULL,
  end_date DATE,
  is_current BOOLEAN DEFAULT false,
  description TEXT NOT NULL,
  technologies TEXT[] DEFAULT '{}',
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. EDUCATION TABLE
CREATE TABLE IF NOT EXISTS public.education (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  institute TEXT NOT NULL,
  degree TEXT NOT NULL,
  year TEXT NOT NULL,
  logo_url TEXT,
  description TEXT,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. CERTIFICATES TABLE
CREATE TABLE IF NOT EXISTS public.certificates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  issuer TEXT NOT NULL,
  issue_date DATE NOT NULL,
  credential_url TEXT,
  image_url TEXT,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. SOCIAL LINKS TABLE
CREATE TABLE IF NOT EXISTS public.social_links (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  platform TEXT NOT NULL,
  url TEXT NOT NULL,
  handle TEXT NOT NULL,
  follower_count INT DEFAULT 0,
  is_visible BOOLEAN DEFAULT true,
  sort_order INT DEFAULT 0
);

-- 8. CONTENT CREATOR TABLE
CREATE TABLE IF NOT EXISTS public.content_creator (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  platform TEXT NOT NULL, -- 'youtube', 'instagram', 'facebook', 'tiktok'
  title TEXT NOT NULL,
  url TEXT NOT NULL,
  thumbnail_url TEXT,
  views INT DEFAULT 0,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. GALLERY TABLE
CREATE TABLE IF NOT EXISTS public.gallery (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT,
  category TEXT NOT NULL,
  image_url TEXT NOT NULL,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. RESUME TABLE
CREATE TABLE IF NOT EXISTS public.resume (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  pdf_url TEXT NOT NULL,
  cv_image_url TEXT,
  download_count INT DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 11. CONTACT MESSAGES TABLE
CREATE TABLE IF NOT EXISTS public.contact_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'unread' CHECK (status IN ('unread', 'read', 'replied')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 12. SEO SETTINGS TABLE
CREATE TABLE IF NOT EXISTS public.seo_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  site_title TEXT NOT NULL,
  meta_description TEXT NOT NULL,
  keywords TEXT[] DEFAULT '{}',
  og_image_url TEXT,
  twitter_card TEXT DEFAULT 'summary_large_image',
  favicon_url TEXT,
  robots TEXT DEFAULT 'index, follow',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 13. SITE SETTINGS TABLE
CREATE TABLE IF NOT EXISTS public.site_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  site_name TEXT DEFAULT 'Prasid Gautam Portfolio',
  primary_color TEXT DEFAULT '#a855f7',
  accent_color TEXT DEFAULT '#ec4899',
  theme TEXT DEFAULT 'dark',
  maintenance_mode BOOLEAN DEFAULT false,
  google_analytics_id TEXT,
  google_search_console_id TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

------------------------------------------------------------------
-- ROW LEVEL SECURITY (RLS) POLICIES
------------------------------------------------------------------

DO $$
DECLARE
  t text;
BEGIN
  FOR t IN SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' LOOP
    EXECUTE format('ALTER TABLE public.%I ENABLE ROW LEVEL SECURITY;', t);
  END LOOP;
END $$;

-- Public Read Policies
CREATE POLICY "Public Read Projects" ON public.projects FOR SELECT USING (is_published = true OR auth.role() = 'authenticated');
CREATE POLICY "Public Read Skills" ON public.skills FOR SELECT USING (is_hidden = false OR auth.role() = 'authenticated');
CREATE POLICY "Public Read About" ON public.about_me FOR SELECT USING (true);
CREATE POLICY "Public Read Experiences" ON public.experiences FOR SELECT USING (true);
CREATE POLICY "Public Read Education" ON public.education FOR SELECT USING (true);
CREATE POLICY "Public Read Certificates" ON public.certificates FOR SELECT USING (true);
CREATE POLICY "Public Read Socials" ON public.social_links FOR SELECT USING (is_visible = true OR auth.role() = 'authenticated');
CREATE POLICY "Public Read Content" ON public.content_creator FOR SELECT USING (true);
CREATE POLICY "Public Read Gallery" ON public.gallery FOR SELECT USING (true);
CREATE POLICY "Public Read Resume" ON public.resume FOR SELECT USING (true);
CREATE POLICY "Public Read SEO" ON public.seo_settings FOR SELECT USING (true);
CREATE POLICY "Public Read Settings" ON public.site_settings FOR SELECT USING (true);

-- Public Write Policy (Allow visitors to submit contact messages)
CREATE POLICY "Public Insert Messages" ON public.contact_messages FOR INSERT WITH CHECK (true);

-- Admin Full Write Policies
DO $$
DECLARE
  t text;
BEGIN
  FOR t IN SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' LOOP
    EXECUTE format('CREATE POLICY "Admin Full Access %I" ON public.%I FOR ALL TO authenticated USING (true) WITH CHECK (true);', t, t);
  END LOOP;
END $$;

------------------------------------------------------------------
-- SUPABASE STORAGE BUCKET CONFIGURATION
------------------------------------------------------------------
INSERT INTO storage.buckets (id, name, public) 
VALUES ('portfolio-media', 'portfolio-media', true)
ON CONFLICT (id) DO NOTHING;

-- Storage RLS Policies
CREATE POLICY "Public Read Storage" ON storage.objects FOR SELECT USING (bucket_id = 'portfolio-media');
CREATE POLICY "Admin Upload Storage" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'portfolio-media');
CREATE POLICY "Admin Delete Storage" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'portfolio-media');
