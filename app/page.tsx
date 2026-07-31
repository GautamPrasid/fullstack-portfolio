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

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="w-full min-h-screen bg-[#090a0f] text-slate-100 overflow-x-hidden">
        <Hero />
        <About />
        <Services />
        <ExperienceTimeline />
        <Skills />
        <GithubStats />
        <Projects />
        <SocialStats />
        <ContentWork />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

