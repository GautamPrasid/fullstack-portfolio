"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Calendar, Tag } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import projectsData from "@/data/projects.json";

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  category: string;
  github: string;
  live: string;
  date: string;
  featured: boolean;
}

const ALL_LABEL = "All";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  },
  exit: {
    opacity: 0,
    y: -20,
    scale: 0.95,
    transition: { duration: 0.25, ease: "easeIn" },
  },
};

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
  });
}

export default function Projects() {
  const projects = projectsData as Project[];

  // Derive unique categories
  const categories = useMemo(() => {
    const cats = Array.from(new Set(projects.map((p) => p.category)));
    return [ALL_LABEL, ...cats];
  }, [projects]);

  const [activeCategory, setActiveCategory] = useState<string>(ALL_LABEL);

  // Sort by newest first, then filter
  const filtered = useMemo(() => {
    const sorted = [...projects].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    if (activeCategory === ALL_LABEL) return sorted;
    return sorted.filter((p) => p.category === activeCategory);
  }, [projects, activeCategory]);

  return (
    <section
      id="projects"
      className="section-padding relative overflow-hidden"
      aria-label="My projects"
    >
      {/* BG Orb */}
      <div
        className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full opacity-[0.06] pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(99,102,241,1) 0%, transparent 70%)",
          filter: "blur(70px)",
        }}
        aria-hidden="true"
      />

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
          className="text-center mb-12"
        >
          <motion.p variants={cardVariants} className="section-label">
            <span aria-hidden="true">✦</span> Portfolio
          </motion.p>
          <motion.h2 variants={cardVariants} className="section-title">
            Projects I&apos;ve{" "}
            <span className="gradient-text">Built</span>
          </motion.h2>
          <motion.p variants={cardVariants} className="section-subtitle mx-auto">
            A selection of my best work — from full-stack web apps to
            performance-focused frontends.
          </motion.p>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap justify-center gap-2 mb-10"
          role="tablist"
          aria-label="Filter projects by category"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              role="tab"
              aria-selected={activeCategory === cat}
              onClick={() => setActiveCategory(cat)}
              className={`relative px-5 py-2 rounded-full text-sm font-medium transition-all duration-250 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 ${
                activeCategory === cat
                  ? "text-white"
                  : "text-[#a0a0c0] hover:text-white glass border border-white/5 hover:border-violet-500/20"
              }`}
            >
              {activeCategory === cat && (
                <motion.span
                  layoutId="filter-pill"
                  className="absolute inset-0 gradient-bg rounded-full shadow-[0_0_24px_rgba(139,92,246,0.4)]"
                  transition={{ type: "spring", bounce: 0.25, duration: 0.4 }}
                />
              )}
              <span className="relative z-10">{cat}</span>
            </button>
          ))}
        </motion.div>

        {/* Project Cards Grid */}
        <motion.div
          layout
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          role="tabpanel"
          aria-label={`${activeCategory} projects`}
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <motion.article
                key={project.id}
                layout
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                whileHover={{ y: -6 }}
                className="glass-card group overflow-hidden flex flex-col"
                aria-label={`Project: ${project.title}`}
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden rounded-t-2xl bg-[#0d0d1a]">
                  <Image
                    src={project.image}
                    alt={`Screenshot of ${project.title}`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                    unoptimized
                  />
                  {/* Hover overlay with links */}
                  <div className="project-overlay flex items-end justify-end p-4 gap-2">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${project.title} GitHub repository`}
                      onClick={(e) => e.stopPropagation()}
                      className="w-9 h-9 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-violet-500/80 transition-colors duration-200"
                    >
                      <FaGithub className="w-4 h-4" aria-hidden="true" />
                    </a>
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${project.title} live demo`}
                      onClick={(e) => e.stopPropagation()}
                      className="w-9 h-9 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-cyan-500/80 transition-colors duration-200"
                    >
                      <ExternalLink className="w-4 h-4" aria-hidden="true" />
                    </a>
                  </div>

                  {/* Featured badge */}
                  {project.featured && (
                    <span className="absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full gradient-bg text-white shadow-lg">
                      Featured
                    </span>
                  )}
                </div>

                {/* Card Body */}
                <div className="flex flex-col flex-1 p-5 gap-3">
                  {/* Meta */}
                  <div className="flex items-center gap-3 text-xs text-[#5a5a8a]">
                    <span className="flex items-center gap-1">
                      <Tag className="w-3 h-3" aria-hidden="true" />
                      {project.category}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" aria-hidden="true" />
                      {formatDate(project.date)}
                    </span>
                  </div>

                  {/* Title + Description */}
                  <h3 className="font-bold text-lg text-[#f0f0ff] leading-snug group-hover:text-violet-300 transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-sm text-[#a0a0c0] leading-relaxed flex-1">
                    {project.description}
                  </p>

                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {project.technologies.slice(0, 5).map((tech) => (
                      <span
                        key={tech}
                        className="skill-badge text-xs"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 5 && (
                      <span className="skill-badge text-xs">
                        +{project.technologies.length - 5}
                      </span>
                    )}
                  </div>

                  {/* Footer Links */}
                  <div className="flex gap-3 pt-2 border-t border-white/5">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs font-medium text-[#a0a0c0] hover:text-violet-400 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 rounded"
                      aria-label={`View ${project.title} source code on GitHub`}
                    >
                      <FaGithub className="w-3.5 h-3.5" aria-hidden="true" />
                      Source
                    </a>
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs font-medium text-[#a0a0c0] hover:text-cyan-400 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 rounded"
                      aria-label={`View ${project.title} live demo`}
                    >
                      <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                      Live Demo
                    </a>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-[#5a5a8a] mt-8"
          >
            No projects in this category yet.
          </motion.p>
        )}
      </div>
    </section>
  );
}
