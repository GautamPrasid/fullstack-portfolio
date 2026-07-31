"use client";

import { motion, type Variants } from "framer-motion";
import { ExternalLink, Users, Play } from "lucide-react";
import { FaYoutube, FaFacebook, FaInstagram } from "react-icons/fa6";

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const PLATFORMS = [
  {
    name: "YouTube",
    handle: "@deeeznotfound",
    description: "Tutorials on web development, productivity, and tech career advice.",
    stat: "5K+ Views",
    statIcon: Play,
    href: "https://www.youtube.com/@deeeznotfound",
    icon: FaYoutube,
    color: "from-red-500/20 to-orange-500/5",
    border: "border-red-500/20",
    iconBg: "bg-red-500/10",
    iconColor: "text-red-400",
    buttonColor: "bg-red-500/80 hover:bg-red-500",
  },
  {
    name: "Facebook",
    handle: "Prasid Gautam",
    description: "Sharing tech insights, project updates, and coding tips with the community.",
    stat: "500+ Followers",
    statIcon: Users,
    href: "https://www.facebook.com/prashidgautam/",
    icon: FaFacebook,
    color: "from-blue-500/20 to-indigo-500/5",
    border: "border-blue-500/20",
    iconBg: "bg-blue-500/10",
    iconColor: "text-blue-400",
    buttonColor: "bg-blue-600/80 hover:bg-blue-600",
  },
  {
    name: "Instagram",
    handle: "@user_on_break__",
    description: "Behind-the-scenes of my dev journey — setups, travels, and creative process.",
    stat: "500+ Followers",
    statIcon: Users,
    href: "https://www.instagram.com/user_on_break__/",
    icon: FaInstagram,
    color: "from-pink-500/20 to-rose-500/5",
    border: "border-pink-500/20",
    iconBg: "bg-pink-500/10",
    iconColor: "text-pink-400",
    buttonColor: "bg-gradient-to-r from-pink-500/80 to-orange-500/80 hover:from-pink-500 hover:to-orange-500",
  },
];

// YouTube Video Embed ID — replace with actual video ID
// Replace with an actual video ID from https://www.youtube.com/@deeeznotfound
const YOUTUBE_VIDEO_ID = "dQw4w9WgXcQ"; // TODO: update with your real video ID

export default function ContentWork() {
  return (
    <section
      id="content"
      className="section-padding relative overflow-hidden"
      aria-label="Content creation work"
    >
      {/* BG orb */}
      <div
        className="absolute top-1/2 right-0 -translate-y-1/2 w-[450px] h-[450px] rounded-full opacity-[0.06] pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(239,68,68,1) 0%, transparent 70%)",
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
          <motion.p variants={itemVariants} className="section-label">
            <span aria-hidden="true">✦</span> Content Creation
          </motion.p>
          <motion.h2 variants={itemVariants} className="section-title">
            Beyond the{" "}
            <span className="gradient-text">Code</span>
          </motion.h2>
          <motion.p variants={itemVariants} className="section-subtitle mx-auto">
            I create educational and inspirational content for developers and
            creative minds across multiple platforms.
          </motion.p>
        </motion.div>

        {/* Two-column layout: Video + Description */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* YouTube Embed */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div
              className="relative rounded-2xl overflow-hidden border border-violet-500/15 shadow-[0_8px_64px_rgba(0,0,0,0.5)]"
              style={{ paddingBottom: "56.25%" }}
            >
              <iframe
                className="absolute inset-0 w-full h-full"
                src={`https://www.youtube-nocookie.com/embed/${YOUTUBE_VIDEO_ID}?rel=0&modestbranding=1`}
                title="Featured YouTube video by Prasid Gautam"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
              />
            </div>
            <p className="text-xs text-center text-[#5a5a8a] mt-3 font-mono">
              Featured video — replace with your latest upload
            </p>
          </motion.div>

          {/* Creator Description */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
            className="space-y-6"
          >
            <motion.h3
              variants={itemVariants}
              className="text-2xl lg:text-3xl font-bold text-[#f0f0ff] leading-snug"
            >
              Developer by day.{" "}
              <span className="gradient-text">Creator by passion.</span>
            </motion.h3>
            <motion.p
              variants={itemVariants}
              className="text-[#a0a0c0] leading-relaxed"
            >
              I believe that sharing knowledge multiplies its value. That&apos;s
              why I create content that helps developers upskill, stay motivated,
              and enjoy the journey of continuous learning.
            </motion.p>
            <motion.p
              variants={itemVariants}
              className="text-[#a0a0c0] leading-relaxed"
            >
              My content covers web development tutorials, BCA study tips, tech
              gear reviews, and day-in-the-life vlogs from a developer&apos;s
              perspective. I&apos;m just getting started and growing every day.
            </motion.p>
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-3"
            >
              {["Web Dev Tutorials", "Career Tips", "Code Reviews", "Tech Vlogs"].map((tag) => (
                <span
                  key={tag}
                  className="skill-badge"
                >
                  {tag}
                </span>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Platform Cards */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={containerVariants}
          className="grid sm:grid-cols-3 gap-5"
        >
          {PLATFORMS.map(
            ({
              name,
              handle,
              description,
              stat,
              statIcon: StatIcon,
              href,
              icon: PlatformIcon,
              color,
              border,
              iconBg,
              iconColor,
              buttonColor,
            }) => (
              <motion.div
                key={name}
                variants={itemVariants}
                whileHover={{ y: -6, scale: 1.02 }}
                className={`glass-card p-6 bg-gradient-to-br ${color} border ${border} flex flex-col gap-4`}
              >
                {/* Icon + Name */}
                <div className="flex items-center gap-3">
                  <div
                    className={`w-12 h-12 ${iconBg} rounded-xl flex items-center justify-center`}
                  >
                    <PlatformIcon className={`w-6 h-6 ${iconColor}`} aria-hidden="true" />
                  </div>
                  <div>
                    <p className="font-bold text-[#f0f0ff]">{name}</p>
                    <p className="text-xs text-[#5a5a8a]">{handle}</p>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-[#a0a0c0] leading-relaxed flex-1">
                  {description}
                </p>

                {/* Stat */}
                <div className="flex items-center gap-2 text-sm font-semibold text-[#f0f0ff]">
                  <StatIcon className="w-4 h-4 text-[#5a5a8a]" aria-hidden="true" />
                  {stat}
                </div>

                {/* CTA */}
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Follow on ${name}`}
                  className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-300 ${buttonColor} shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500`}
                >
                  <ExternalLink className="w-4 h-4" aria-hidden="true" />
                  Follow on {name}
                </a>
              </motion.div>
            )
          )}
        </motion.div>
      </div>
    </section>
  );
}
