"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Section from "./ui/Section";
import Container from "./ui/Container";

const roles = [
  "Full-Stack Developer",
  "BCA Student @ LA GRANDEE",
  "Java & Next.js Creator",
  "UI/UX Enthusiast",
];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);

  // Rotating role text animation
  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Section
      id="home"
      watermark="SOFTWARE DEV"
      className="min-h-screen flex flex-col justify-between pt-32 pb-12 lg:pt-40 lg:pb-16 bg-[#090a0f]"
    >

      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none -z-10" />

      <Container className="my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* LEFT COLUMN: HERO TEXT & CONTENT (lg:col-span-7) */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-6 text-left">
            
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Available for work
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15]">
              Hi, I'm{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400">
                Prasid Gautam
              </span>
            </h1>

            {/* Sub-headline / Role Badge Line */}
            <div className="flex flex-wrap items-center gap-3 text-lg sm:text-xl font-medium text-slate-300">
              <span>I am a</span>
              <span className="px-3 py-1 rounded-lg bg-purple-500/15 border border-purple-500/30 text-purple-300 font-semibold min-w-[140px] text-center transition-all duration-500">
                {roles[roleIndex]}
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs font-normal text-slate-400 bg-slate-900/80 px-3 py-1.5 rounded-full border border-white/10">
                📍 Pokhara, Nepal
              </span>
            </div>

            {/* Bio Paragraph */}
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl">
              I build responsive web applications, desktop software, and modern user interfaces using Java, React, Next.js, and TypeScript.
            </p>

            {/* CTA Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2 w-full sm:w-auto">
              <a
                href="#projects"
                className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-medium text-sm sm:text-base shadow-[0_0_25px_rgba(168,85,247,0.4)] transition-all duration-300 focus-ring active:scale-[0.98]"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                View My Work
              </a>

              <a
                href="/Prasid_Gautam_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-xl bg-slate-900/80 border border-white/15 hover:border-purple-400/50 text-slate-200 hover:text-white font-medium text-sm sm:text-base transition-all duration-300 focus-ring active:scale-[0.98]"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download Resume
              </a>
            </div>

            {/* Bottom Row: Social Icons + Stats Divider */}
            <div className="pt-8 border-t border-white/10 w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              
              {/* Social Icons Group */}
              <div className="flex items-center gap-3">
                <a
                  href="https://github.com/GautamPrasid"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="w-10 h-10 rounded-xl bg-slate-900/80 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-purple-500/50 hover:bg-purple-500/10 transition-all duration-300 focus-ring"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                  </svg>
                </a>
                <a
                  href="https://www.linkedin.com/in/prasid-gautam/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="w-10 h-10 rounded-xl bg-slate-900/80 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-purple-500/50 hover:bg-purple-500/10 transition-all duration-300 focus-ring"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.74a1.62 1.62 0 1 0 0 3.24 1.62 1.62 0 0 0 0-3.24z" />
                  </svg>
                </a>
                <a
                  href="https://www.youtube.com/@deeeznotfound"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  className="w-10 h-10 rounded-xl bg-slate-900/80 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-purple-500/50 hover:bg-purple-500/10 transition-all duration-300 focus-ring"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>
              </div>

              <div className="hidden sm:block h-8 w-[1px] bg-white/10" />

              {/* Stats Numbers */}
              <div className="grid grid-cols-3 gap-6 sm:gap-8">
                <div>
                  <p className="text-xl sm:text-2xl font-extrabold text-white">2+</p>
                  <p className="text-[11px] text-slate-400 uppercase tracking-wider font-medium">Years Coding</p>
                </div>
                <div>
                  <p className="text-xl sm:text-2xl font-extrabold text-white">10+</p>
                  <p className="text-[11px] text-slate-400 uppercase tracking-wider font-medium">Projects Built</p>
                </div>
                <div>
                  <p className="text-xl sm:text-2xl font-extrabold text-white">5K+</p>
                  <p className="text-[11px] text-slate-400 uppercase tracking-wider font-medium">Views</p>
                </div>
              </div>

            </div>

          </div>

          {/* RIGHT COLUMN: PROFILE CARD WITH FLOATING BADGE (lg:col-span-5) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-sm aspect-[4/5] sm:aspect-square rounded-3xl bg-slate-900/50 border border-white/15 p-3 backdrop-blur-xl shadow-2xl">
              
              {/* Profile Image Frame */}
              <div className="relative w-full h-full rounded-2xl overflow-hidden bg-slate-800">
                <Image
                  src="/profile.JPG"
                  alt="Prasid Gautam"
                  fill
                  priority
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 420px"
                  className="object-cover object-center"
                />
              </div>

              {/* Floating Tech Badge (Bottom-Left Overlap) */}
              <div className="absolute -bottom-4 -left-3 sm:-left-6 bg-[#090a0f]/90 backdrop-blur-md border border-white/15 p-3 rounded-2xl shadow-xl flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-300">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-bold text-white leading-tight">Next.js &amp; JavaFX Developer</p>
                  <p className="text-[10px] font-medium text-purple-300">Full-Stack Tech Stack</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </Container>

      {/* Bottom Scroll Indicator */}
      <div className="w-full flex justify-center pt-8">
        <a
          href="#about"
          className="flex flex-col items-center gap-1 text-[10px] font-semibold tracking-widest text-slate-400 hover:text-white uppercase transition-colors"
        >
          <span>Scroll</span>
          <svg className="w-4 h-4 animate-bounce text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </a>
      </div>
    </Section>
  );
}

