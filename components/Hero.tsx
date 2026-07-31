"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin, Youtube, Download, Eye } from "lucide-react";

const ROLES = ["Full Stack Developer", "Video Editor", "Content Creator", "UI/UX Enthusiast"];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
  }),
};

const SOCIAL_LINKS = [
  { icon: Github, href: "https://github.com/alexpoudel", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com/in/alexpoudel", label: "LinkedIn" },
  { icon: Youtube, href: "https://youtube.com/@alexpoudel", label: "YouTube" },
];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayedRole, setDisplayedRole] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const typingRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Typewriter effect
  useEffect(() => {
    const currentRole = ROLES[roleIndex];

    if (!isDeleting && displayedRole === currentRole) {
      // Pause before deleting
      typingRef.current = setTimeout(() => setIsDeleting(true), 2000);
      return;
    }

    if (isDeleting && displayedRole === "") {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
      return;
    }

    const speed = isDeleting ? 40 : 70;
    typingRef.current = setTimeout(() => {
      setDisplayedRole((prev) =>
        isDeleting
          ? prev.slice(0, prev.length - 1)
          : currentRole.slice(0, prev.length + 1)
      );
    }, speed);

    return () => {
      if (typingRef.current) clearTimeout(typingRef.current);
    };
  }, [displayedRole, isDeleting, roleIndex]);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      aria-label="Hero section"
    >
      {/* Mesh gradient background */}
      <div className="mesh-gradient" aria-hidden="true">
        <div className="mesh-orb mesh-orb-1" />
        <div className="mesh-orb mesh-orb-2" />
        <div className="mesh-orb mesh-orb-3" />
      </div>

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(139,92,246,1) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="container-custom relative z-10 pt-24 pb-16 text-center">
        {/* Badge */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.1}
          className="flex justify-center mb-6"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-violet-500/25 text-sm font-medium text-[#c4b5fd]">
            <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)] animate-pulse" aria-hidden="true" />
            Available for work
          </span>
        </motion.div>

        {/* Name */}
        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.2}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold leading-none tracking-tight mb-4"
        >
          <span className="text-[#f0f0ff]">Hi, I&apos;m </span>
          <span className="gradient-text glow-text">Alex Poudel</span>
        </motion.h1>

        {/* Typewriter Role */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.35}
          className="flex items-center justify-center gap-2 text-2xl sm:text-3xl md:text-4xl font-semibold mb-6 h-12"
          aria-live="polite"
          aria-label={`Current role: ${displayedRole}`}
        >
          <span className="text-[#a0a0c0]">I am a </span>
          <span className="gradient-text min-w-0">
            {displayedRole}
          </span>
          <span className="cursor-blink text-violet-400 font-light">|</span>
        </motion.div>

        {/* Bio */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.5}
          className="max-w-2xl mx-auto text-[#a0a0c0] text-lg leading-relaxed mb-10"
        >
          I craft fast, beautiful, and accessible web experiences — from scalable
          backend APIs to pixel-perfect frontends. Beyond code, I create engaging
          video content that connects with audiences.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.65}
          className="flex flex-wrap items-center justify-center gap-4 mb-12"
        >
          <button
            onClick={() => scrollToSection("projects")}
            className="btn-primary"
            aria-label="View my work"
          >
            <Eye className="w-4 h-4" aria-hidden="true" />
            View My Work
          </button>
          <a
            href="/cv.pdf"
            download
            className="btn-secondary"
            aria-label="Download CV"
          >
            <Download className="w-4 h-4" aria-hidden="true" />
            Download CV
          </a>
        </motion.div>

        {/* Social Links */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.75}
          className="flex items-center justify-center gap-4 mb-16"
        >
          {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              whileHover={{ scale: 1.12, y: -3 }}
              whileTap={{ scale: 0.95 }}
              className="w-11 h-11 glass rounded-xl flex items-center justify-center text-[#a0a0c0] hover:text-white hover:border-violet-500/40 hover:shadow-[0_0_20px_rgba(139,92,246,0.3)] transition-all duration-300 border border-white/5"
            >
              <Icon className="w-5 h-5" aria-hidden="true" />
            </motion.a>
          ))}
        </motion.div>

        {/* Stats Row */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.85}
          className="flex items-center justify-center gap-8 sm:gap-16"
        >
          {[
            { value: "3+", label: "Years Coding" },
            { value: "20+", label: "Projects Built" },
            { value: "10K+", label: "Content Views" },
          ].map(({ value, label }) => (
            <div key={label} className="text-center">
              <p className="text-2xl sm:text-3xl font-bold gradient-text">{value}</p>
              <p className="text-xs sm:text-sm text-[#5a5a8a] mt-1">{label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        onClick={() => scrollToSection("about")}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#5a5a8a] hover:text-[#a0a0c0] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 rounded-lg p-2"
        aria-label="Scroll to about section"
      >
        <span className="text-xs font-medium tracking-widest uppercase">Scroll</span>
        <div className="scroll-indicator w-5 h-5 flex items-center justify-center">
          <ArrowDown className="w-4 h-4" aria-hidden="true" />
        </div>
      </motion.button>
    </section>
  );
}
