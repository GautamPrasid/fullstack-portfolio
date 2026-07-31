-- PostgreSQL Database Migration Schema for Prasid Gautam Portfolio CMS

-- Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. PROJECTS TABLE
CREATE TABLE IF NOT EXISTS public.projects (
  id VARCHAR(100) PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  category VARCHAR(100) NOT NULL,
  tech TEXT[] NOT NULL DEFAULT '{}',
  highlights TEXT[] NOT NULL DEFAULT '{}',
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  is_featured BOOLEAN NOT NULL DEFAULT false,
  github VARCHAR(255) DEFAULT '',
  demo VARCHAR(255) DEFAULT '',
  badge VARCHAR(100) DEFAULT '',
  image TEXT NOT NULL DEFAULT '',
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. SKILLS TABLE
CREATE TABLE IF NOT EXISTS public.skills (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL,
  level INT NOT NULL CHECK (level >= 0 AND level <= 100),
  category VARCHAR(100) NOT NULL DEFAULT 'General',
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. ABOUT TABLE
CREATE TABLE IF NOT EXISTS public.about (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  bio TEXT NOT NULL,
  focus_items TEXT[] NOT NULL DEFAULT '{}',
  location VARCHAR(255) NOT NULL DEFAULT 'Pokhara, Nepal',
  education_institution VARCHAR(255) NOT NULL DEFAULT 'LA GRANDEE International College',
  degree VARCHAR(255) NOT NULL DEFAULT 'Bachelor of Computer Applications (BCA)',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. EXPERIENCE TABLE
CREATE TABLE IF NOT EXISTS public.experience (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  period VARCHAR(100) NOT NULL,
  role VARCHAR(255) NOT NULL,
  institution VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  skills TEXT[] NOT NULL DEFAULT '{}',
  icon VARCHAR(100) DEFAULT 'Sparkles',
  is_highlight BOOLEAN NOT NULL DEFAULT false,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 5. EDUCATION TABLE
CREATE TABLE IF NOT EXISTS public.education (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  degree VARCHAR(255) NOT NULL,
  institution VARCHAR(255) NOT NULL,
  period VARCHAR(100) NOT NULL,
  gpa VARCHAR(50) DEFAULT '',
  highlights TEXT[] DEFAULT '{}',
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 6. CONTENT WORK TABLE
CREATE TABLE IF NOT EXISTS public.content (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  platform VARCHAR(100) NOT NULL,
  handle VARCHAR(100) NOT NULL,
  description TEXT DEFAULT '',
  stat VARCHAR(100) DEFAULT '',
  link TEXT NOT NULL,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 7. MESSAGES INBOX TABLE
CREATE TABLE IF NOT EXISTS public.messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  is_read BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 8. SETTINGS TABLE
CREATE TABLE IF NOT EXISTS public.settings (
  key VARCHAR(100) PRIMARY KEY,
  value JSONB NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.about ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.experience ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.education ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;

-- Public Read Policies
CREATE POLICY "Public Read Projects" ON public.projects FOR SELECT USING (true);
CREATE POLICY "Public Read Skills" ON public.skills FOR SELECT USING (true);
CREATE POLICY "Public Read About" ON public.about FOR SELECT USING (true);
CREATE POLICY "Public Read Experience" ON public.experience FOR SELECT USING (true);
CREATE POLICY "Public Read Education" ON public.education FOR SELECT USING (true);
CREATE POLICY "Public Read Content" ON public.content FOR SELECT USING (true);
CREATE POLICY "Public Insert Messages" ON public.messages FOR INSERT WITH CHECK (true);

-- Authenticated Admin Policies (Full Access)
CREATE POLICY "Admin Full Projects" ON public.projects FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin Full Skills" ON public.skills FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin Full About" ON public.about FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin Full Experience" ON public.experience FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin Full Education" ON public.education FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin Full Content" ON public.content FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin Full Messages" ON public.messages FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin Full Settings" ON public.settings FOR ALL USING (auth.role() = 'authenticated');
