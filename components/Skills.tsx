"use client";

import React from "react";
import { motion } from "framer-motion";
import Section from "./ui/Section";
import Container from "./ui/Container";
import type { Database } from "@/lib/supabase/database.types";

type SkillRow = Database["public"]["Tables"]["skills"]["Row"];

interface SkillsProps {
  skills?: SkillRow[];
}

const DEFAULT_SKILLS = [
  { name: "HTML5 / CSS3", level: 95 },
  { name: "Tailwind CSS", level: 90 },
  { name: "Responsive Design & UI/UX", level: 90 },
  { name: "JavaScript (ES6+)", level: 88 },
  { name: "Java", level: 88 },
  { name: "JavaFX & FXML", level: 86 },
  { name: "React", level: 85 },
  { name: "Git & GitHub", level: 85 },
  { name: "TypeScript", level: 82 },
  { name: "Next.js", level: 82 },
  { name: "SQL (MSSQL / MySQL)", level: 82 },
];

export default function Skills({ skills }: SkillsProps) {
  const skillData = skills && skills.length > 0
    ? skills.map((s) => ({ name: s.name, level: s.percentage ?? 50 }))
    : DEFAULT_SKILLS;

  return (
    <Section id="skills" watermark="MY SKILLS" ariaLabel="Technical skills proficiency">
      <Container>
        <div className="flex flex-col items-center text-center space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Technical <span className="text-purple-400">Proficiency</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl">
            A verified breakdown of technical skill levels built through BCA coursework at LA GRANDEE International College and practical software engineering.
          </p>
        </div>

        {/* Skill Progress Bars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 max-w-5xl mx-auto w-full">
          {skillData.map((skill, idx) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="space-y-2"
            >
              <div className="flex justify-between items-center text-xs font-semibold">
                <span className="text-slate-200">{skill.name}</span>
                <span className="text-purple-400 font-mono">{skill.level}%</span>
              </div>
              <div className="w-full h-2.5 rounded-full bg-slate-900 border border-white/10 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: idx * 0.05 }}
                  className="h-full bg-linear-to-r from-purple-600 to-pink-500 rounded-full"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
