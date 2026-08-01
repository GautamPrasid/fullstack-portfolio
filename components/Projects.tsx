"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Section from "./ui/Section";
import Container from "./ui/Container";
import type { Database } from "@/lib/supabase/database.types";

type ProjectRow = Database["public"]["Tables"]["projects"]["Row"];

interface ProjectsProps {
  projects?: ProjectRow[];
}

type CategoryFilter =
  | "featured"
  | "all"
  | "web-nextjs"
  | "java-desktop"
  | "c-systems"
  | "media-legacy";

export default function Projects({ projects }: ProjectsProps) {
  const [activeFilter, setActiveFilter] = useState<CategoryFilter>("featured");
  const [showAllExpanded, setShowAllExpanded] = useState(false);

  // Map Supabase projects to display format
  const projectsList = (projects && projects.length > 0)
    ? projects.map((p) => ({
        id: p.id,
        title: p.title,
        description: p.description,
        category: p.category,
        tech: p.tech ?? [],
        highlights: p.highlights ?? [],
        date: p.created_at ? p.created_at.slice(0, 4) : "2026",
        isFeatured: Boolean(p.is_featured),
        github: p.github_url ?? "",
        demo: p.demo_url ?? "",
        badge: p.badge ?? "",
        image: p.image_url ?? "",
      }))
    : [];

  const filterTabs: { id: CategoryFilter; label: string }[] = [
    { id: "all", label: "All" },
    { id: "featured", label: "Featured" },
    { id: "web-nextjs", label: "Web & Next.js" },
    { id: "java-desktop", label: "Java Desktop" },
    { id: "c-systems", label: "C Systems" },
    { id: "media-legacy", label: "Media" },
  ];

  // Filtering Logic
  const filteredProjects = projectsList.filter((project) => {
    if (activeFilter === "featured") return project.isFeatured;
    if (activeFilter === "all") return true;
    return project.category === activeFilter;
  });

  // Limit displayed projects if not expanded
  const visibleProjects =
    !showAllExpanded && (activeFilter === "featured" || activeFilter === "all")
      ? filteredProjects.slice(0, 6)
      : filteredProjects;

  if (projectsList.length === 0) return null;

  return (
    <Section id="projects" watermark="FEATURED WORK" ariaLabel="My projects catalog">
      <Container>
        {/* Header */}
        <div className="flex flex-col items-center text-center space-y-4 mb-10">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Featured <span className="text-purple-400">Projects</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl">
            A complete trajectory of software built across my full-stack development journey—from foundational C programs and JavaFX desktop suites to modern Next.js web platforms.
          </p>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-2 pt-4">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveFilter(tab.id);
                  if (tab.id !== "all") setShowAllExpanded(false);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-300 border focus-ring ${
                  activeFilter === tab.id
                    ? "bg-purple-600 text-white border-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.4)]"
                    : "bg-slate-900/60 text-slate-400 border-white/10 hover:border-white/20 hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          <AnimatePresence mode="popLayout">
            {visibleProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className={`group relative flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-slate-900/40 border ${
                  project.badge
                    ? "border-purple-500/40 shadow-[0_0_20px_rgba(168,85,247,0.1)]"
                    : "border-white/10"
                } hover:border-purple-500/60 hover:bg-slate-900/70 transition-all duration-300 hover:-translate-y-1`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono text-purple-400 bg-purple-500/10 px-2.5 py-1 rounded-md border border-purple-500/20">
                      {project.tech[0]}
                    </span>
                    {project.badge && (
                      <span className="text-[10px] font-bold tracking-wider uppercase text-amber-300 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/30">
                        {project.badge}
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-slate-400 text-xs leading-relaxed">
                    {project.description}
                  </p>

                  {/* Highlights Bullet List */}
                  {project.highlights && project.highlights.length > 0 && (
                    <div className="pt-2">
                      <p className="text-[11px] font-semibold text-slate-300 mb-1">Key Features:</p>
                      <ul className="grid grid-cols-2 gap-1 text-[10px] text-slate-400">
                        {project.highlights.map((hl: string) => (
                          <li key={hl} className="flex items-center gap-1">
                            <span className="text-purple-400">•</span> {hl}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <div className="pt-6 mt-4 border-t border-white/5 flex items-center justify-between">
                  <div className="flex flex-wrap gap-1">
                    {project.tech.map((t: string) => (
                      <span key={t} className="text-[10px] text-slate-300 bg-white/5 px-2 py-0.5 rounded border border-white/10">
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-3 ml-2 shrink-0">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-400 hover:text-white transition-colors text-xs font-semibold focus-ring rounded"
                        title="View Code on GitHub"
                      >
                        GitHub ↗
                      </a>
                    )}
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-purple-400 hover:text-purple-300 transition-colors text-xs font-semibold focus-ring rounded"
                        title="Live Preview"
                      >
                        Live ↗
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* "Show All Projects" Toggle Button */}
        {(activeFilter === "featured" || activeFilter === "all") && filteredProjects.length > 6 && (
          <div className="flex justify-center mt-10">
            <button
              onClick={() => {
                if (!showAllExpanded) {
                  setActiveFilter("all");
                  setShowAllExpanded(true);
                } else {
                  setActiveFilter("featured");
                  setShowAllExpanded(false);
                }
              }}
              className="px-6 py-3 rounded-xl bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/40 text-purple-300 font-medium text-sm transition-all duration-300 hover:scale-[1.02] focus-ring"
            >
              {showAllExpanded
                ? "Show Featured Only"
                : `Show All Projects (${projectsList.length})`}
            </button>
          </div>
        )}
      </Container>
    </Section>
  );
}
