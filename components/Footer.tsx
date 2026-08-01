"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Container from "./ui/Container";

/* eslint-disable @typescript-eslint/no-explicit-any */
interface FooterProps {
  settings?: any;
  profile?: any;
  socialLinks?: any[];
}

const quickLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Services", href: "#services" },
  { name: "Timeline", href: "#timeline" },
  { name: "Skills", href: "#skills" },
  { name: "GitHub", href: "#github" },
  { name: "Projects", href: "#projects" },
  { name: "Content", href: "#content" },
  { name: "Contact", href: "#contact" },
];

export default function Footer({ settings, profile, socialLinks }: FooterProps) {
  const [year, setYear] = useState(2026);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const logoUrl = settings?.logo_url || "/logo.png";
  const siteName = settings?.site_name || "Prasid";
  const fullName = profile?.full_name || "Prasid Gautam";
  const email = profile?.email || "gprasid10@gmail.com";
  const location = profile?.location || "Pokhara, Nepal";
  const availability = profile?.availability || "Available for hire";

  const gh = socialLinks?.find((s: any) => s.platform?.toLowerCase() === "github");
  const li = socialLinks?.find((s: any) => s.platform?.toLowerCase() === "linkedin");
  const yt = socialLinks?.find((s: any) => s.platform?.toLowerCase() === "youtube");
  const ig = socialLinks?.find((s: any) => s.platform?.toLowerCase() === "instagram");
  const fb = socialLinks?.find((s: any) => s.platform?.toLowerCase() === "facebook");

  const links = [
    {
      name: "GitHub",
      href: gh?.url || "https://github.com/GautamPrasid",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
        </svg>
      ),
    },
    {
      name: "LinkedIn",
      href: li?.url || "https://www.linkedin.com/in/prasid-gautam/",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.74a1.62 1.62 0 1 0 0 3.24 1.62 1.62 0 0 0 0-3.24z" />
        </svg>
      ),
    },
    {
      name: "YouTube",
      href: yt?.url || "https://www.youtube.com/@deeeznotfound",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      ),
    },
    {
      name: "Instagram",
      href: ig?.url || "https://www.instagram.com/user_on_break__/",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      ),
    },
    {
      name: "Facebook",
      href: fb?.url || "https://www.facebook.com/prashidgautam/",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path fillRule="evenodd" clipRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
        </svg>
      ),
    },
  ];

  return (
    <footer className="relative w-full bg-[#090a0f] border-t border-white/10 pt-16 pb-12 overflow-hidden">
      {/* Top Ambient Glow Line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 max-w-4xl h-[1px] bg-gradient-to-r from-transparent via-purple-500/40 to-transparent" />

      <Container className="space-y-12">
        {/* Main Footer Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12">
          
          {/* Column 1: Brand & Tagline (lg:col-span-5) */}
          <div className="lg:col-span-5 space-y-4">
            <a href="#home" className="inline-flex items-center gap-2.5 group focus-ring rounded-lg">
              <Image
                src={logoUrl}
                alt={`${siteName} Logo`}
                width={36}
                height={36}
                className="w-9 h-9 object-contain transition-transform duration-300 group-hover:scale-110"
              />
              <span className="text-2xl font-bold tracking-tight text-white">
                {siteName}<span className="text-purple-400">.dev</span>
              </span>
            </a>

            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              Software &amp; Full-Stack Developer based in <strong className="text-slate-200 font-medium">{location} 🇳🇵</strong>. Building high-performance, beautiful, and accessible software experiences.
            </p>

            {/* Live Availability Status Pill */}
            <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-slate-900/80 border border-white/10 text-xs text-slate-300 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              {availability}
            </div>
          </div>

          {/* Column 2: Quick Links (lg:col-span-3) */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-purple-400">
              Quick Links
            </h3>
            <ul className="grid grid-cols-2 gap-2.5 text-sm">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="inline-flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors duration-200 group focus-ring rounded"
                  >
                    <span className="text-purple-400 opacity-0 -ml-2 transition-all duration-200 group-hover:opacity-100 group-hover:ml-0">
                      ›
                    </span>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Connect & Social Cards (lg:col-span-4) */}
          <div className="lg:col-span-4 space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-purple-400">
              Connect
            </h3>
            <p className="text-xs text-slate-400">
              Feel free to reach out across any of these platforms or via email.
            </p>
            
            {/* Social Grid */}
            <div className="flex flex-wrap items-center gap-3">
              {links.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit ${social.name}`}
                  className="w-11 h-11 rounded-xl bg-slate-900/60 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-purple-500/50 hover:bg-purple-500/10 hover:shadow-[0_0_20px_rgba(168,85,247,0.25)] transition-all duration-300 focus-ring"
                >
                  {social.icon}
                </a>
              ))}
            </div>

            <div className="pt-1">
              <a
                href={`mailto:${email}`}
                className="text-xs font-mono text-slate-400 hover:text-purple-300 transition-colors"
              >
                ✉️ {email}
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar Divider */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          
          {/* Copyright Notice */}
          <p className="text-center sm:text-left">
            © {year} <strong className="text-slate-200 font-medium">{fullName}</strong>. All rights reserved. Built with{" "}
            <span className="text-purple-400 font-medium">Next.js</span> &amp;{" "}
            <span className="text-cyan-400 font-medium">Tailwind CSS</span>.
          </p>

          {/* Interactive Back To Top Button */}
          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-900/80 border border-white/10 text-slate-300 hover:text-white hover:border-purple-500/40 hover:bg-white/5 transition-all duration-300 focus-ring group"
          >
            <span>Back to top</span>
            <svg
              className="w-4 h-4 text-purple-400 transition-transform duration-300 group-hover:-translate-y-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </button>

        </div>
      </Container>
    </footer>
  );
}
