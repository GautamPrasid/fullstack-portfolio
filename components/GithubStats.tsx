"use client";

import React from "react";
import { motion } from "framer-motion";
import Section from "./ui/Section";
import Container from "./ui/Container";

/* eslint-disable @typescript-eslint/no-explicit-any */
interface GithubStatsProps {
  profile?: any;
  socialLinks?: any[];
}

export default function GithubStats({ profile, socialLinks }: GithubStatsProps) {
  const githubLink = socialLinks?.find((s: any) => s.platform?.toLowerCase() === "github");
  const githubUrl = githubLink?.url || "https://github.com/GautamPrasid";
  const githubHandle = githubLink?.handle || "github.com/GautamPrasid";

  const yearsExp = profile?.years_experience ?? 2;
  const projectsCount = profile?.projects_completed ?? 10;

  const githubStats = [
    { label: "Public Repositories", value: `${projectsCount}+`, icon: "📦" },
    { label: "Core Languages", value: "5", detail: "Java, TS, JS, C, Python", icon: "💻" },
    { label: "Years Coding", value: `${yearsExp}+`, detail: "2025 – Present", icon: "⚡" },
    { label: "Primary Focus", value: "Full-Stack", detail: profile?.subtitle || "Next.js 16 & JavaFX", icon: "🚀" },
  ];

  const languageDistribution = [
    { name: "Java & JavaFX", percentage: 35, color: "bg-amber-500" },
    { name: "TypeScript & Next.js", percentage: 30, color: "bg-blue-500" },
    { name: "JavaScript & HTML/CSS", percentage: 20, color: "bg-yellow-400" },
    { name: "C Language", percentage: 10, color: "bg-slate-400" },
    { name: "Python", percentage: 5, color: "bg-emerald-400" },
  ];

  const openSourceHighlights = [
    {
      name: "StudyBuddy",
      role: "Maintainer / Creator",
      description: "Open-source JavaFX desktop application for peer-to-peer academic resource sharing and study tracking.",
      stars: "⭐ Featured",
      tech: ["Java", "JavaFX", "MSSQL", "JDBC"],
      link: "https://github.com/GautamPrasid/StudyBuddy",
    },
    {
      name: "fullstack-portfolio",
      role: "Maintainer / Creator",
      description: "Production Next.js portfolio architecture built in public featuring dynamic JSON project routing and Resend API.",
      stars: "⭐ Featured",
      tech: ["Next.js", "TypeScript", "Tailwind CSS"],
      link: githubUrl,
    },
  ];

  return (
    <Section id="github" watermark="OPEN SOURCE" ariaLabel="GitHub statistics and activity">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-150 h-75 bg-purple-600/5 rounded-full blur-[150px] pointer-events-none -z-10" />

      <Container>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center text-center space-y-4 mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-mono">
            <span>🐙</span> {githubHandle}
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            GitHub Activity &amp; <span className="text-purple-400">Open Source</span>
          </h2>

          <p className="text-slate-400 text-sm sm:text-base max-w-2xl">
            Building in public and contributing clean, well-documented code across desktop software, web applications, and low-level systems algorithms.
          </p>
        </motion.div>

        {/* 1. Quick Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12">
          {githubStats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="p-5 sm:p-6 rounded-2xl bg-slate-900/40 border border-white/10 backdrop-blur-xl flex flex-col justify-between hover:border-purple-500/40 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-slate-400 text-xs font-medium">{stat.label}</span>
                <span className="text-lg">{stat.icon}</span>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-white font-mono">{stat.value}</p>
                {stat.detail && <p className="text-[11px] text-purple-400 mt-1 font-mono">{stat.detail}</p>}
              </div>
            </motion.div>
          ))}
        </div>

        {/* 2. Language Breakdown & Open Source Highlights */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Language Breakdown */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 p-6 sm:p-8 rounded-2xl bg-slate-900/40 border border-white/10 backdrop-blur-xl space-y-6"
          >
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <span>📊</span> Codebase Language Breakdown
            </h3>

            {/* Stacked Progress Bar */}
            <div className="w-full h-3 rounded-full bg-slate-800 overflow-hidden flex">
              {languageDistribution.map((lang) => (
                <div
                  key={lang.name}
                  style={{ width: `${lang.percentage}%` }}
                  className={`h-full ${lang.color} transition-all duration-500`}
                  title={`${lang.name}: ${lang.percentage}%`}
                />
              ))}
            </div>

            {/* Language Legend */}
            <div className="space-y-3 pt-2">
              {languageDistribution.map((lang) => (
                <div key={lang.name} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2.5">
                    <span className={`w-2.5 h-2.5 rounded-full ${lang.color}`} />
                    <span className="text-slate-300 font-medium">{lang.name}</span>
                  </div>
                  <span className="text-slate-400 font-mono">{lang.percentage}%</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Open Source Featured Repositories */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 space-y-4"
          >
            <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-2">
              <span>⭐</span> Featured Open-Source Repositories
            </h3>

            {openSourceHighlights.map((repo) => (
              <a
                key={repo.name}
                href={repo.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group block p-6 rounded-2xl bg-slate-900/40 border border-white/10 backdrop-blur-xl hover:border-purple-500/50 hover:bg-slate-900/70 transition-all duration-300 hover:-translate-y-0.5 focus-ring"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-purple-400 font-mono text-sm">📁</span>
                    <h4 className="text-base font-bold text-white group-hover:text-purple-300 transition-colors">
                      {repo.name}
                    </h4>
                  </div>
                  <span className="text-[10px] font-mono font-semibold text-amber-300 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/20">
                    {repo.stars}
                  </span>
                </div>

                <p className="text-xs text-slate-400 mb-4 leading-relaxed">
                  {repo.description}
                </p>

                <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-white/5">
                  <div className="flex flex-wrap gap-1.5">
                    {repo.tech.map((t) => (
                      <span key={t} className="text-[10px] font-mono text-slate-300 bg-white/5 px-2 py-0.5 rounded border border-white/10">
                        {t}
                      </span>
                    ))}
                  </div>
                  <span className="text-xs text-purple-400 font-medium group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                    View Repository ↗
                  </span>
                </div>
              </a>
            ))}
          </motion.div>
        </div>

        {/* GitHub Call to Action */}
        <div className="mt-12 text-center">
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 border border-white/10 hover:border-purple-500/50 text-slate-200 hover:text-white font-medium text-xs transition-all duration-300 hover:shadow-[0_0_20px_rgba(168,85,247,0.2)] focus-ring"
          >
            <span>🐙</span> Follow on GitHub
          </a>
        </div>
      </Container>
    </Section>
  );
}
