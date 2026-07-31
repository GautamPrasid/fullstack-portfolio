"use client";

import { motion } from "framer-motion";

interface Skill {
  name: string;
  level: number; // 1-5
}

interface SkillCategory {
  title: string;
  emoji: string;
  color: string;
  borderColor: string;
  badgeColor: string;
  skills: Skill[];
}

const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Frontend",
    emoji: "🎨",
    color: "from-violet-500/15 to-purple-500/5",
    borderColor: "border-violet-500/20",
    badgeColor: "bg-violet-500/10 border-violet-500/25 text-violet-300",
    skills: [
      { name: "HTML5", level: 5 },
      { name: "CSS3", level: 5 },
      { name: "JavaScript", level: 5 },
      { name: "TypeScript", level: 4 },
      { name: "React", level: 5 },
      { name: "Next.js", level: 4 },
      { name: "Tailwind CSS", level: 5 },
      { name: "Framer Motion", level: 3 },
    ],
  },
  {
    title: "Backend",
    emoji: "⚙️",
    color: "from-cyan-500/15 to-sky-500/5",
    borderColor: "border-cyan-500/20",
    badgeColor: "bg-cyan-500/10 border-cyan-500/25 text-cyan-300",
    skills: [
      { name: "Node.js", level: 4 },
      { name: "Express.js", level: 4 },
      { name: "REST APIs", level: 5 },
      { name: "JWT Auth", level: 4 },
    ],
  },
  {
    title: "Languages",
    emoji: "💻",
    color: "from-indigo-500/15 to-blue-500/5",
    borderColor: "border-indigo-500/20",
    badgeColor: "bg-indigo-500/10 border-indigo-500/25 text-indigo-300",
    skills: [
      { name: "Java", level: 4 },
      { name: "Python", level: 3 },
      { name: "C", level: 3 },
    ],
  },
  {
    title: "Databases",
    emoji: "🗄️",
    color: "from-emerald-500/15 to-green-500/5",
    borderColor: "border-emerald-500/20",
    badgeColor: "bg-emerald-500/10 border-emerald-500/25 text-emerald-300",
    skills: [
      { name: "SQL Server", level: 4 },
      { name: "MySQL", level: 4 },
      { name: "MongoDB", level: 4 },
    ],
  },
  {
    title: "Tools",
    emoji: "🛠️",
    color: "from-amber-500/15 to-orange-500/5",
    borderColor: "border-amber-500/20",
    badgeColor: "bg-amber-500/10 border-amber-500/25 text-amber-300",
    skills: [
      { name: "Git", level: 5 },
      { name: "GitHub", level: 5 },
      { name: "VS Code", level: 5 },
      { name: "Photoshop", level: 3 },
      { name: "Premiere Pro", level: 4 },
    ],
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

const badgeVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
  },
};

/** Dot indicators for skill level 1-5 */
function SkillDots({ level }: { level: number }) {
  return (
    <div
      className="flex gap-1"
      aria-label={`Skill level ${level} of 5`}
      role="img"
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className={`w-1.5 h-1.5 rounded-full transition-colors ${
            i < level ? "bg-current opacity-100" : "bg-current opacity-20"
          }`}
        />
      ))}
    </div>
  );
}

export default function Skills() {
  return (
    <section
      id="skills"
      className="section-padding relative overflow-hidden"
      aria-label="My skills"
    >
      {/* BG decoration */}
      <div
        className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full opacity-[0.05] pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(6,182,212,1) 0%, transparent 70%)",
          filter: "blur(60px)",
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
          className="text-center mb-16"
        >
          <motion.p variants={cardVariants} className="section-label">
            <span aria-hidden="true">✦</span> Technical Skills
          </motion.p>
          <motion.h2 variants={cardVariants} className="section-title">
            Tools I Work{" "}
            <span className="gradient-text">With</span>
          </motion.h2>
          <motion.p variants={cardVariants} className="section-subtitle mx-auto">
            A curated stack I rely on to build, ship, and maintain high-quality digital products.
          </motion.p>
        </motion.div>

        {/* Skill Category Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {SKILL_CATEGORIES.map((category) => (
            <motion.div
              key={category.title}
              variants={cardVariants}
              whileHover={{ y: -6, scale: 1.01 }}
              className={`glass-card p-6 bg-gradient-to-br ${category.color} border ${category.borderColor} transition-all duration-300`}
            >
              {/* Card Header */}
              <div className="flex items-center gap-3 mb-5">
                <span
                  className="text-2xl leading-none"
                  aria-hidden="true"
                >
                  {category.emoji}
                </span>
                <h3 className="font-bold text-lg text-[#f0f0ff]">
                  {category.title}
                </h3>
              </div>

              {/* Skill Badges */}
              <motion.div
                variants={containerVariants}
                className="flex flex-wrap gap-2"
              >
                {category.skills.map(({ name, level }) => (
                  <motion.div
                    key={name}
                    variants={badgeVariants}
                    whileHover={{ scale: 1.06 }}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-medium ${category.badgeColor} transition-all duration-200 cursor-default`}
                    title={`${name} — Level ${level}/5`}
                  >
                    <span>{name}</span>
                    <SkillDots level={level} />
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA nudge */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-center text-sm text-[#5a5a8a] mt-12"
        >
          Always learning · Currently exploring AI/ML integrations and Web3
        </motion.p>
      </div>
    </section>
  );
}
