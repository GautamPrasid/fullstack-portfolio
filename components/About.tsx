"use client";

import { motion } from "framer-motion";
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

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const STATS = [
  { value: "3+", label: "Years of Experience", icon: Coffee },
  { value: "20+", label: "Projects Delivered", icon: Rocket },
  { value: "10+", label: "Technologies Mastered", icon: Layers },
  { value: "10K+", label: "Content Views", icon: Globe },
];

const TRAITS = [
  {
    icon: Zap,
    title: "Fast Learner",
    description: "I adapt quickly to new technologies and embrace challenges as opportunities to grow.",
    color: "from-amber-500/20 to-orange-500/10",
    border: "border-amber-500/20",
    iconColor: "text-amber-400",
  },
  {
    icon: HeartHandshake,
    title: "Team Player",
    description: "I thrive in collaborative environments and communicate clearly to keep projects on track.",
    color: "from-rose-500/20 to-pink-500/10",
    border: "border-rose-500/20",
    iconColor: "text-rose-400",
  },
  {
    icon: Award,
    title: "Quality-Focused",
    description: "I write clean, maintainable code and care deeply about the end-user experience.",
    color: "from-violet-500/20 to-purple-500/10",
    border: "border-violet-500/20",
    iconColor: "text-violet-400",
  },
  {
    icon: Users,
    title: "User-Centric",
    description: "I design and build with the user at the center — accessibility and UX are never afterthoughts.",
    color: "from-cyan-500/20 to-sky-500/10",
    border: "border-cyan-500/20",
    iconColor: "text-cyan-400",
  },
];

export default function About() {
  return (
    <section
      id="about"
      className="section-padding relative overflow-hidden"
      aria-label="About me"
    >
      {/* Subtle background orb */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-[0.06] pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(139,92,246,1) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
        aria-hidden="true"
      />

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-16"
        >
          <motion.p variants={itemVariants} className="section-label">
            <span aria-hidden="true">✦</span> About Me
          </motion.p>
          <motion.h2 variants={itemVariants} className="section-title">
            The Person Behind the{" "}
            <span className="gradient-text">Code</span>
          </motion.h2>
          <motion.p variants={itemVariants} className="section-subtitle mx-auto">
            A passionate developer from Nepal who blends technical expertise with
            creative storytelling.
          </motion.p>
        </motion.div>

        {/* Main Content — Two Column */}
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center mb-20">
          {/* Left: Text Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            className="space-y-6"
          >
            <motion.p
              variants={itemVariants}
              className="text-[#a0a0c0] text-lg leading-relaxed"
            >
              I&apos;m <strong className="text-[#f0f0ff] font-semibold">Alex Poudel</strong>, a full-stack
              developer and content creator based in Kathmandu, Nepal. I specialize in building
              production-grade web applications and creating digital content that resonates with audiences.
            </motion.p>
            <motion.p
              variants={itemVariants}
              className="text-[#a0a0c0] text-lg leading-relaxed"
            >
              My journey into tech started with curiosity — I wanted to know how websites worked.
              That curiosity turned into a passion, and today I work across the full stack, from
              designing APIs with Node.js and Express to building pixel-perfect UIs with React and Next.js.
            </motion.p>
            <motion.p
              variants={itemVariants}
              className="text-[#a0a0c0] text-lg leading-relaxed"
            >
              When I&apos;m not writing code, I&apos;m editing videos, creating content on YouTube, or
              exploring the intersection of technology and creativity. I believe the best products
              are built where engineering meets artistry.
            </motion.p>

            {/* Timeline milestones */}
            <motion.div variants={itemVariants} className="space-y-4 pt-2">
              {[
                { year: "2021", event: "Started learning web development — HTML, CSS, JavaScript" },
                { year: "2022", event: "Dove deep into React, Node.js, and databases" },
                { year: "2023", event: "Launched first SaaS product & started YouTube channel" },
                { year: "2024", event: "Full-time freelancing — 20+ projects shipped" },
              ].map(({ year, event }) => (
                <div key={year} className="flex gap-4 items-start">
                  <span className="text-xs font-bold text-violet-400 bg-violet-500/10 border border-violet-500/20 rounded-md px-2 py-1 mt-0.5 shrink-0 font-mono">
                    {year}
                  </span>
                  <p className="text-[#a0a0c0] text-sm leading-relaxed">{event}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: Stats Cards */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            className="grid grid-cols-2 gap-4"
          >
            {STATS.map(({ value, label, icon: Icon }) => (
              <motion.div
                key={label}
                variants={itemVariants}
                whileHover={{ scale: 1.04, y: -4 }}
                className="glass-card p-6 flex flex-col items-center text-center gap-3"
              >
                <div className="w-12 h-12 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center">
                  <Icon className="w-6 h-6 text-violet-400" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-3xl font-extrabold gradient-text">{value}</p>
                  <p className="text-xs text-[#5a5a8a] mt-1 font-medium">{label}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Trait Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {TRAITS.map(({ icon: Icon, title, description, color, border, iconColor }) => (
            <motion.div
              key={title}
              variants={itemVariants}
              whileHover={{ y: -6, scale: 1.02 }}
              className={`p-6 rounded-2xl border bg-gradient-to-br ${color} ${border} transition-all duration-300 group`}
            >
              <div
                className={`w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
              >
                <Icon className={`w-5 h-5 ${iconColor}`} aria-hidden="true" />
              </div>
              <h3 className="font-semibold text-[#f0f0ff] mb-2">{title}</h3>
              <p className="text-sm text-[#a0a0c0] leading-relaxed">{description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
