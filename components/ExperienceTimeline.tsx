"use client";

import { motion, type Variants } from "framer-motion";
import { GraduationCap, Code2, Cpu, Sparkles, Database, Layers } from "lucide-react";
import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import Card from "@/components/ui/Card";

interface TimelineItem {
  period: string;
  role: string;
  institution: string;
  description: string;
  skills: string[];
  icon: typeof Code2;
  highlight?: boolean;
}

const TIMELINE_EVENTS: TimelineItem[] = [
  {
    period: "2026 — Present",
    role: "Full-Stack Web & Next.js Architecture",
    institution: "LA GRANDEE International College · Pokhara",
    description:
      "Engineering modern full-stack web applications using Next.js 16 (App Router), React 19, TypeScript, and Tailwind CSS v4. Integrated serverless contact handlers with Resend API.",
    skills: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS v4", "Resend API", "Framer Motion"],
    icon: Sparkles,
    highlight: true,
  },
  {
    period: "2026 Early",
    role: "Desktop App & Database Engineering (StudyBuddy)",
    institution: "LA GRANDEE International College · Pokhara",
    description:
      "Built StudyBuddy, a flagship desktop learning platform utilizing Java, JavaFX, FXML, JDBC, and MSSQL. Developed user authentication, community Q&A, and notes management modules.",
    skills: ["Java", "JavaFX", "MSSQL", "JDBC", "FXML", "Desktop UI"],
    icon: Database,
    highlight: true,
  },
  {
    period: "2025 Mid — Late",
    role: "BCA Core Computer Science & Web Fundamentals",
    institution: "LA GRANDEE International College · Pokhara",
    description:
      "Deepened software foundations in object-oriented programming, relational database management systems, and dynamic web interfaces (JavaScript, QR Code Generator, Media portfolio).",
    skills: ["JavaScript", "HTML5/CSS3", "SQL", "OOP", "UI Design"],
    icon: GraduationCap,
  },
  {
    period: "2025 Early",
    role: "Systems Engineering & C Logic Foundations",
    institution: "Software Developer Journey",
    description:
      "Mastered low-level C programming, file I/O operations, custom data structures, game loops (Pac-Man), and banking & student record management CLI systems.",
    skills: ["C", "File Handling", "Data Structures", "CLI Systems", "Algorithm Logic"],
    icon: Cpu,
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function ExperienceTimeline() {
  return (
    <Section id="timeline" watermark="JOURNEY" ariaLabel="Experience & academic timeline">
      <Container>
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
          className="text-center"
        >
          <motion.span variants={itemVariants} className="text-xs uppercase tracking-widest text-purple-400 font-semibold text-center block mb-2">
            ✦ Engineering Journey
          </motion.span>
          <motion.h2 variants={itemVariants} className="text-2xl sm:text-4xl lg:text-5xl font-bold text-center text-white tracking-tight mb-3">
            Academic &amp; Technical{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400">
              Progression
            </span>
          </motion.h2>
          <motion.p variants={itemVariants} className="text-slate-400 text-xs sm:text-sm md:text-base text-center max-w-2xl mx-auto leading-relaxed">
            From low-level C systems to JavaFX desktop software and modern Next.js 16 full-stack web applications at LA GRANDEE International College.
          </motion.p>
        </motion.div>

        {/* Timeline List */}
        <div className="relative max-w-4xl mx-auto mt-6">
          {/* Vertical Center Line */}
          <div
            className="absolute left-4 md:left-1/2 top-4 bottom-4 w-0.5 -translate-x-1/2 bg-gradient-to-b from-purple-500/50 via-pink-500/30 to-cyan-500/10 pointer-events-none"
            aria-hidden="true"
          />

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={containerVariants}
            className="space-y-8 md:space-y-12"
          >
            {TIMELINE_EVENTS.map((event, index) => {
              const Icon = event.icon;
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={event.role}
                  variants={itemVariants}
                  className={`relative flex flex-col md:flex-row items-start ${
                    isEven ? "md:flex-row-reverse" : ""
                  } gap-6 md:gap-12`}
                >
                  {/* Timeline Dot Icon */}
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 z-20 flex items-center justify-center w-9 h-9 rounded-xl bg-[#090a0f] border border-purple-500/40 text-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.3)] shrink-0">
                    <Icon className="w-4 h-4" aria-hidden="true" />
                  </div>

                  {/* Card Content */}
                  <div className="ml-12 md:ml-0 md:w-1/2 w-full">
                    <Card
                      className={`h-full ${
                        event.highlight
                          ? "border-purple-500/30 shadow-[0_0_20px_rgba(168,85,247,0.12)]"
                          : ""
                      }`}
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                        <span className="text-xs font-bold font-mono text-purple-300 bg-purple-500/15 border border-purple-500/30 rounded-lg px-2.5 py-1">
                          {event.period}
                        </span>
                        {event.highlight && (
                          <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                            Key Milestone
                          </span>
                        )}
                      </div>

                      <h3 className="text-lg md:text-xl font-bold text-white mb-1 leading-snug">
                        {event.role}
                      </h3>
                      <p className="text-xs text-slate-400 font-medium mb-3">
                        📍 {event.institution}
                      </p>

                      <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-4">
                        {event.description}
                      </p>

                      <div className="flex flex-wrap gap-1.5 pt-1 border-t border-white/5">
                        {event.skills.map((skill) => (
                          <span
                            key={skill}
                            className="px-2.5 py-0.5 rounded-full bg-slate-800/80 border border-white/10 text-slate-300 text-[11px] font-medium"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </Card>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}
