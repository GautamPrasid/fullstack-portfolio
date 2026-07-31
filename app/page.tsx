import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import ExperienceTimeline from "@/components/ExperienceTimeline";
import Skills from "@/components/Skills";
import GithubStats from "@/components/GithubStats";
import Projects from "@/components/Projects";
import SocialStats from "@/components/SocialStats";
import ContentWork from "@/components/ContentWork";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

import {
  getSiteSettings,
  getProfileData,
  getPublishedProjects,
  getActiveSkills,
  getServices,
  getSocialLinks,
  getActiveResume,
  getExperiences,
  getContentCreator,
} from "@/lib/data";

export default async function Home() {
  // Fetch all data from Supabase in parallel
  const [settings, profile, projects, skills, services, socialLinks, activeResume, experiences, contentItems] =
    await Promise.all([
      getSiteSettings(),
      getProfileData(),
      getPublishedProjects(),
      getActiveSkills(),
      getServices(),
      getSocialLinks(),
      getActiveResume(),
      getExperiences(),
      getContentCreator(),
    ]);

  return (
    <>
      <Navbar settings={settings} />
      <main className="w-full min-h-screen bg-[#090a0f] text-slate-100 overflow-x-hidden">
        <Hero profile={profile} socialLinks={socialLinks} activeResume={activeResume} />
        <About profile={profile} />
        <Services services={services} />
        <ExperienceTimeline experiences={experiences} />
        <Skills skills={skills} />
        <GithubStats profile={profile} socialLinks={socialLinks} />
        <Projects projects={projects} />
        <SocialStats socialLinks={socialLinks} />
        <ContentWork contentItems={contentItems} socialLinks={socialLinks} />
        <Contact profile={profile} socialLinks={socialLinks} />
      </main>
      <Footer settings={settings} profile={profile} socialLinks={socialLinks} />
    </>
  );
}
