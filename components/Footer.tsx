"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Youtube, Instagram, ArrowUp, Code2 } from "lucide-react";

const SOCIAL_LINKS = [
  { icon: Github, href: "https://github.com/alexpoudel", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com/in/alexpoudel", label: "LinkedIn" },
  { icon: Youtube, href: "https://youtube.com/@alexpoudel", label: "YouTube" },
  { icon: Instagram, href: "https://instagram.com/alex.poudel", label: "Instagram" },
];

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Content", href: "#content" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToSection = (href: string) => {
    const id = href.replace("#", "");
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer
      className="relative overflow-hidden border-t border-violet-500/10"
      aria-label="Site footer"
    >
      {/* Top gradient separator */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(139,92,246,0.5), transparent)",
        }}
        aria-hidden="true"
      />

      {/* BG orb */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] opacity-[0.06] pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(139,92,246,1) 0%, transparent 70%)",
          filter: "blur(50px)",
        }}
        aria-hidden="true"
      />

      <div className="container-custom relative z-10 py-12">
        {/* Main footer content */}
        <div className="grid sm:grid-cols-3 gap-8 mb-10">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center">
                <Code2 className="w-4 h-4 text-white" aria-hidden="true" />
              </div>
              <span className="font-bold text-lg text-[#f0f0ff]">
                Alex<span className="gradient-text">.</span>
              </span>
            </div>
            <p className="text-sm text-[#5a5a8a] leading-relaxed max-w-xs">
              Full Stack Developer &amp; Content Creator based in Kathmandu, Nepal.
              Building great things one line of code at a time.
            </p>
          </div>

          {/* Quick Nav */}
          <div>
            <h3 className="text-sm font-semibold text-[#f0f0ff] mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2" role="list">
              {NAV_LINKS.map(({ label, href }) => (
                <li key={href}>
                  <button
                    onClick={() => scrollToSection(href)}
                    className="text-sm text-[#5a5a8a] hover:text-violet-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 rounded"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-sm font-semibold text-[#f0f0ff] mb-4">
              Connect
            </h3>
            <div className="flex flex-wrap gap-3">
              {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Follow on ${label}`}
                  whileHover={{ scale: 1.12, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 glass rounded-xl flex items-center justify-center text-[#5a5a8a] hover:text-violet-400 hover:border-violet-500/30 transition-all duration-300 border border-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
                >
                  <Icon className="w-4 h-4" aria-hidden="true" />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-white/5">
          <p className="text-xs text-[#5a5a8a] text-center sm:text-left">
            &copy; {new Date().getFullYear()}{" "}
            <span className="text-[#a0a0c0]">Alex Poudel</span>. All rights
            reserved. Built with{" "}
            <span className="gradient-text font-semibold">Next.js</span> &amp;{" "}
            <span className="gradient-text font-semibold">Tailwind CSS</span>.
          </p>

          {/* Back to top */}
          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.08, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 text-xs text-[#5a5a8a] hover:text-violet-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 rounded-lg p-1"
            aria-label="Back to top"
          >
            <span>Back to top</span>
            <div className="w-7 h-7 glass rounded-lg flex items-center justify-center border border-white/5">
              <ArrowUp className="w-3.5 h-3.5" aria-hidden="true" />
            </div>
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
