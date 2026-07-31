"use client";

import { motion, type Variants } from "framer-motion";
import {
  Rocket,
  Layers,
  Users,
  Award,
  Coffee,
  Zap,
  HeartHandshake,
  Globe,
} from "lucide-react";
import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import Card from "@/components/ui/Card";

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const STATS = [
  { value: "2+", label: "Years of Experience", icon: Coffee },
  { value: "10+", label: "Projects Shipped", icon: Rocket },
  { value: "8+", label: "Tech Stack", icon: Layers },
  { value: "5K+", label: "Content Views", icon: Globe },
];

const TRAITS = [
  {
    icon: Zap,
    title: "Fast Learner",
    description: "Adapting quickly to emerging frameworks and continuous industry shifts.",
    iconColor: "text-amber-400",
  },
  {
    icon: HeartHandshake,
    title: "Team Player",
    description: "Thriving in collaborative environments with clear communication.",
    iconColor: "text-rose-400",
  },
  {
    icon: Award,
    title: "Quality-Focused",
    description: "Writing clean, maintainable code with strict attention to detail.",
    iconColor: "text-purple-400",
  },
  {
    icon: Users,
    title: "User-Centric",
    description: "Designing intuitive user experiences backed by accessibility.",
    iconColor: "text-cyan-400",
  },
];

export default function About() {
  return (
    <Section id="about" watermark="ABOUT ME" ariaLabel="About me">
      <Container>
        {/* Section Header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="text-center"
        >
          <motion.span variants={itemVariants} className="text-xs uppercase tracking-widest text-purple-400 font-semibold text-center block mb-2">
            ✦ About Me
          </motion.span>
          <motion.h2 variants={itemVariants} className="text-2xl sm:text-4xl lg:text-5xl font-bold text-center text-white tracking-tight mb-3">
            The Person Behind the{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400">
              Code
            </span>
          </motion.h2>
          <motion.p variants={itemVariants} className="text-slate-400 text-xs sm:text-sm md:text-base text-center max-w-2xl mx-auto leading-relaxed">
            A software developer from Pokhara, Nepal who blends technical
            precision with minimalist user experience design.
          </motion.p>
        </motion.div>

        {/* Stats Grid: grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
        >
          {STATS.map(({ value, label, icon: Icon }) => (
            <motion.div key={label} variants={itemVariants}>
              <Card className="flex flex-col items-center justify-center text-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 shrink-0">
                  <Icon className="w-5 h-5" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 leading-tight">
                    {value}
                  </p>
                  <p className="text-xs text-slate-400 mt-1 font-medium">{label}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* About Split: grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 items-start">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="lg:col-span-7"
          >
            <Card className="space-y-6">
              <motion.p variants={itemVariants} className="text-slate-300 text-sm md:text-base leading-relaxed">
                I&apos;m <strong className="text-white font-semibold">Prasid Gautam</strong>, a Full-Stack Software Developer &amp; <strong className="text-purple-300 font-semibold">BCA Student at LA GRANDEE International College in Pokhara, Nepal 🇳🇵</strong>.
              </motion.p>
              <motion.p variants={itemVariants} className="text-slate-300 text-sm md:text-base leading-relaxed">
                My engineering growth spans from low-level <strong className="text-cyan-300 font-medium">C systems programming</strong> and desktop application development with <strong className="text-purple-300 font-medium">Java &amp; JavaFX</strong> (StudyBuddy) to modern full-stack web platforms built with <strong className="text-pink-300 font-medium">Next.js 16 (App Router), React 19, TypeScript, and Tailwind CSS v4</strong>.
              </motion.p>
              <motion.p variants={itemVariants} className="text-slate-300 text-sm md:text-base leading-relaxed">
                I prioritize clean architecture, performance, accessibility, and visual elegance across desktop and web mediums.
              </motion.p>
            </Card>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="lg:col-span-5"
          >
            <Card className="space-y-4">
              <h3 className="text-lg font-bold text-white mb-3">Current Technical Focus</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {[
                  "Next.js 16 & React Ecosystem",
                  "TypeScript & Full-Stack Architecture",
                  "REST APIs & Authentication",
                  "Performance Optimization & UI/UX",
                ].map((focus) => (
                  <div
                    key={focus}
                    className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-200 text-xs font-semibold flex items-center gap-2"
                  >
                    <span className="text-purple-400">✦</span>
                    <span>{focus}</span>
                  </div>
                ))}
              </div>

              <h3 className="text-lg font-bold text-white pt-3 mb-2 border-t border-white/5">Milestones &amp; Education</h3>
              {[
                { year: "2025", event: "Enrolled in BCA at LA GRANDEE International College; built C CLI projects" },
                { year: "2025 Late", event: "Developed object-oriented systems & relational database integrations (SQL)" },
                { year: "2026 Early", event: "Architected StudyBuddy desktop application (JavaFX, MSSQL, JDBC)" },
                { year: "2026 Present", event: "Engineering full-stack Next.js 16 web applications & Resend API integrations" },
              ].map(({ year, event }) => (
                <div key={year} className="flex gap-3 items-center border-b border-white/5 pb-2.5 last:border-none last:pb-0">
                  <span className="text-xs font-bold text-purple-300 bg-purple-500/15 border border-purple-500/30 rounded-lg px-2.5 py-1 font-mono shrink-0">
                    {year}
                  </span>
                  <p className="text-slate-300 text-xs leading-snug">{event}</p>
                </div>
              ))}
            </Card>
          </motion.div>
        </div>

        {/* Values Grid: grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
        >
          {TRAITS.map(({ icon: Icon, title, description, iconColor }) => (
            <motion.div key={title} variants={itemVariants}>
              <Card className="flex flex-col justify-between h-full group">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center mb-5 group-hover:scale-105 transition-transform duration-300">
                    <Icon className={`w-5 h-5 ${iconColor}`} aria-hidden="true" />
                  </div>
                  <h3 className="font-bold text-white text-base mb-2">{title}</h3>
                  <p className="text-slate-300 text-xs md:text-sm leading-relaxed">{description}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </Section>
  );
}
