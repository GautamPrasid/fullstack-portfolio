"use client";

import React from "react";
import { motion, type Variants } from "framer-motion";
import {
  Globe,
  Monitor,
  Cpu,
  Palette,
  Camera,
  ArrowRight,
  Code,
  Database,
  Smartphone,
  Server,
  Layout,
} from "lucide-react";
import Section from "./ui/Section";
import Container from "./ui/Container";
import Card from "./ui/Card";

/* eslint-disable @typescript-eslint/no-explicit-any */
interface ServicesProps {
  services?: any[];
}

// Map icon name strings to Lucide components
const ICON_MAP: Record<string, typeof Globe> = {
  Globe, Monitor, Cpu, Palette, Camera, Code, Database,
  Smartphone, Server, Layout,
};

interface ServiceItemDefault {
  icon: typeof Globe;
  title: string;
  category: string;
  description: string;
  features: string[];
  gradient: string;
  iconBg: string;
  iconColor: string;
}

const DEFAULT_SERVICES: ServiceItemDefault[] = [
  {
    icon: Globe,
    title: "Frontend Development",
    category: "React & Next.js",
    description:
      "Crafting high-performance, interactive user interfaces with React 19, Next.js 16 (App Router), TypeScript, and Tailwind CSS v4.",
    features: ["React 19 & Next.js 16", "Tailwind CSS v4", "TypeScript Type-Safety", "Framer Motion Animations"],
    gradient: "from-purple-500/20 via-pink-500/10 to-transparent",
    iconBg: "bg-purple-500/15 border-purple-500/30",
    iconColor: "text-purple-400",
  },
  {
    icon: Globe,
    title: "Full-Stack Web Development",
    category: "End-to-End Apps",
    description:
      "Building complete web applications with serverless API routes, database connectivity, Resend email dispatching, and deployment.",
    features: ["End-to-End Architecture", "Serverless API Routes", "Database Integration", "Resend API Integration"],
    gradient: "from-pink-500/20 via-purple-500/10 to-transparent",
    iconBg: "bg-pink-500/15 border-pink-500/30",
    iconColor: "text-pink-400",
  },
  {
    icon: Monitor,
    title: "Java Desktop Applications",
    category: "JavaFX & MSSQL",
    description:
      "Building cross-platform desktop applications (like StudyBuddy) with Java, JavaFX, FXML, MSSQL, and JDBC database architecture.",
    features: ["JavaFX & FXML GUI", "MSSQL / MySQL Integration", "JDBC Data Access Layer", "Authentication & Admin"],
    gradient: "from-amber-500/20 via-orange-500/10 to-transparent",
    iconBg: "bg-amber-500/15 border-amber-500/30",
    iconColor: "text-amber-400",
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    category: "Design Systems",
    description:
      "Designing modern, intuitive user interfaces with dark mode aesthetics, glassmorphism, responsive layouts, and accessibility.",
    features: ["Responsive Layouts", "Clean Interface Design", "Glassmorphism Aesthetic", "Accessibility (WCAG)"],
    gradient: "from-cyan-500/20 via-blue-500/10 to-transparent",
    iconBg: "bg-cyan-500/15 border-cyan-500/30",
    iconColor: "text-cyan-400",
  },
  {
    icon: Cpu,
    title: "Responsive Website Development",
    category: "Mobile-First",
    description:
      "Developing pixel-perfect, mobile-first websites optimized for fast loading and seamless performance across all device viewports.",
    features: ["Mobile-First Approach", "Cross-Browser Support", "Pixel-Perfect Layouts", "Fast Load Optimization"],
    gradient: "from-emerald-500/20 via-teal-500/10 to-transparent",
    iconBg: "bg-emerald-500/15 border-emerald-500/30",
    iconColor: "text-emerald-400",
  },
  {
    icon: Camera,
    title: "Portfolio Website Development",
    category: "Custom Showcases",
    description:
      "Creating bespoke personal portfolio and showcase websites tailored for developers, creators, and visual storytellers.",
    features: ["Custom Showcase Sites", "Dynamic JSON Workflow", "Smooth Framer Motion", "Vercel Deployment"],
    gradient: "from-rose-500/20 via-pink-500/10 to-transparent",
    iconBg: "bg-rose-500/15 border-rose-500/30",
    iconColor: "text-rose-400",
  },
];

const GRADIENTS = [
  { gradient: "from-purple-500/20 via-pink-500/10 to-transparent", iconBg: "bg-purple-500/15 border-purple-500/30", iconColor: "text-purple-400" },
  { gradient: "from-pink-500/20 via-purple-500/10 to-transparent", iconBg: "bg-pink-500/15 border-pink-500/30", iconColor: "text-pink-400" },
  { gradient: "from-amber-500/20 via-orange-500/10 to-transparent", iconBg: "bg-amber-500/15 border-amber-500/30", iconColor: "text-amber-400" },
  { gradient: "from-cyan-500/20 via-blue-500/10 to-transparent", iconBg: "bg-cyan-500/15 border-cyan-500/30", iconColor: "text-cyan-400" },
  { gradient: "from-emerald-500/20 via-teal-500/10 to-transparent", iconBg: "bg-emerald-500/15 border-emerald-500/30", iconColor: "text-emerald-400" },
  { gradient: "from-rose-500/20 via-pink-500/10 to-transparent", iconBg: "bg-rose-500/15 border-rose-500/30", iconColor: "text-rose-400" },
];

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Services({ services }: ServicesProps) {
  const serviceItems = services && services.length > 0
    ? services.map((s, idx) => {
        const style = GRADIENTS[idx % GRADIENTS.length];
        const IconComponent = ICON_MAP[s.icon_name] || Globe;
        return {
          icon: IconComponent,
          title: s.title,
          category: s.category || "",
          description: s.description || "",
          features: s.features || [],
          ...style,
        };
      })
    : DEFAULT_SERVICES;

  return (
    <Section id="services" watermark="SERVICES" ariaLabel="Core services offered">
      <Container>
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
          className="text-center"
        >
          <motion.span variants={cardVariants} className="text-xs uppercase tracking-widest text-purple-400 font-semibold text-center block mb-2">
            ✦ Core Competencies
          </motion.span>
          <motion.h2 variants={cardVariants} className="text-2xl sm:text-4xl lg:text-5xl font-bold text-center text-white tracking-tight mb-3">
            Services &amp;{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400">
              Solutions
            </span>
          </motion.h2>
          <motion.p variants={cardVariants} className="text-slate-400 text-xs sm:text-sm md:text-base text-center max-w-2xl mx-auto leading-relaxed">
            Delivering end-to-end software development, desktop GUI applications, low-level systems programming, and high-impact visual media.
          </motion.p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {serviceItems.map((service) => {
            const Icon = service.icon;

            return (
              <motion.div key={service.title} variants={cardVariants}>
                <Card className="relative overflow-hidden flex flex-col justify-between h-full p-6 md:p-8 group hover:-translate-y-1 transition-all duration-300">
                  {/* Card Background Gradient Tint */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
                    aria-hidden="true"
                  />

                  <div className="relative z-10 space-y-4">
                    {/* Header Row */}
                    <div className="flex items-center justify-between">
                      <div className={`w-12 h-12 rounded-2xl ${service.iconBg} border flex items-center justify-center shrink-0`}>
                        <Icon className={`w-6 h-6 ${service.iconColor}`} aria-hidden="true" />
                      </div>
                      <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-slate-400 bg-slate-900/80 px-2.5 py-1 rounded-md border border-white/10">
                        {service.category}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors">
                      {service.title}
                    </h3>

                    <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                      {service.description}
                    </p>

                    {/* Features List */}
                    <div className="pt-2 space-y-1.5">
                      {service.features.map((feat: string) => (
                        <div key={feat} className="flex items-center gap-2 text-xs text-slate-300">
                          <span className="text-purple-400 text-sm">✓</span>
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Card Footer Link */}
                  <div className="relative z-10 pt-6 mt-4 border-t border-white/5 flex items-center justify-between">
                    <a
                      href="#contact"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-purple-400 hover:text-purple-300 transition-colors focus-ring rounded"
                    >
                      <span>Discuss Project</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </Container>
    </Section>
  );
}
