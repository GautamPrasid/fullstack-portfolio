"use client";

import { useState, useEffect } from "react";
import { motion, type Variants } from "framer-motion";
import { ExternalLink, Users, Play } from "lucide-react";
import { FaYoutube, FaFacebook, FaInstagram } from "react-icons/fa6";
import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import Card from "@/components/ui/Card";

/* eslint-disable @typescript-eslint/no-explicit-any */
interface ContentWorkProps {
  contentItems?: any[];
  socialLinks?: any[];
}

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function ContentWork({ contentItems, socialLinks }: ContentWorkProps) {
  const [socialStats, setSocialStats] = useState<{
    youtube?: { views: string; subscribers: string };
    instagram?: { followers: string };
  }>({});

  useEffect(() => {
    fetch("/api/social-stats")
      .then((res) => res.json())
      .then((data) => setSocialStats(data))
      .catch((err) => console.error("Failed to load social stats:", err));
  }, []);

  // Get dynamic links from database
  const ytLink = socialLinks?.find((s: any) => s.platform?.toLowerCase() === "youtube");
  const fbLink = socialLinks?.find((s: any) => s.platform?.toLowerCase() === "facebook");
  const igLink = socialLinks?.find((s: any) => s.platform?.toLowerCase() === "instagram");

  // Get featured video from content items
  const featuredVideo = contentItems?.find((c: any) => c.is_featured && c.platform === "youtube");
  const videoId = featuredVideo?.embed_url || featuredVideo?.video_id || "dQw4w9WgXcQ";

  const platforms = [
    {
      name: "YouTube",
      handle: ytLink?.handle || "@deeeznotfound",
      description: ytLink?.description || "Tutorials on web development, productivity, and tech career advice.",
      stat: socialStats.youtube?.views ? `${socialStats.youtube.views} Views` : `${ytLink?.follower_count || "5K+"} Views`,
      statIcon: Play,
      href: ytLink?.url || "https://www.youtube.com/@deeeznotfound",
      icon: FaYoutube,
      iconBg: "bg-red-500/15",
      iconColor: "text-red-400",
      buttonColor: "bg-red-600 hover:bg-red-500 shadow-red-600/20",
    },
    {
      name: "Facebook",
      handle: fbLink?.handle || "Prasid Gautam",
      description: fbLink?.description || "Sharing tech insights, project updates, and coding tips with the community.",
      stat: `${fbLink?.follower_count || "500+"}  Followers`,
      statIcon: Users,
      href: fbLink?.url || "https://www.facebook.com/prashidgautam/",
      icon: FaFacebook,
      iconBg: "bg-blue-500/15",
      iconColor: "text-blue-400",
      buttonColor: "bg-blue-600 hover:bg-blue-500 shadow-blue-600/20",
    },
    {
      name: "Instagram",
      handle: igLink?.handle || "@user_on_break__",
      description: igLink?.description || "Behind-the-scenes of my dev journey — setups, travels, and creative process.",
      stat: socialStats.instagram?.followers ? `${socialStats.instagram.followers} Followers` : `${igLink?.follower_count || "500+"} Followers`,
      statIcon: Users,
      href: igLink?.url || "https://www.instagram.com/user_on_break__/",
      icon: FaInstagram,
      iconBg: "bg-pink-500/15",
      iconColor: "text-pink-400",
      buttonColor: "bg-gradient-to-r from-pink-600 to-orange-600 hover:from-pink-500 hover:to-orange-500 shadow-pink-600/20",
    },
  ];

  // Content tags from database or defaults
  const contentTags = contentItems?.length
    ? [...new Set(contentItems.map((c: any) => c.category).filter(Boolean))].slice(0, 4)
    : ["Web Dev Tutorials", "Career Tips", "Code Reviews", "Tech Vlogs"];

  return (
    <Section id="content" watermark="CREATIVE MEDIA" ariaLabel="Content creation work">
      <Container>
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
          className="text-center"
        >
          <motion.span variants={itemVariants} className="text-xs uppercase tracking-widest text-purple-400 font-semibold text-center block mb-2">
            ✦ Content Creation
          </motion.span>
          <motion.h2 variants={itemVariants} className="text-2xl sm:text-4xl lg:text-5xl font-bold text-center text-white tracking-tight mb-3">
            Beyond the <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400">Code</span>
          </motion.h2>
          <motion.p variants={itemVariants} className="text-slate-400 text-xs sm:text-sm md:text-base text-center max-w-2xl mx-auto leading-relaxed">
            Creating educational and inspirational content for developers across YouTube and social platforms.
          </motion.p>
        </motion.div>

        {/* Two-column layout: Video Showcase + Creator Description */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 items-center">
          {/* YouTube Embed Container */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-6"
          >
            <div
              className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-[#090a0f]"
              style={{ paddingBottom: "56.25%" }}
            >
              <iframe
                className="absolute inset-0 w-full h-full"
                src={`https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1`}
                title="Featured YouTube video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
              />
            </div>
            <p className="text-xs text-center text-slate-400 mt-3 font-mono">
              Featured video — {ytLink?.handle || "@deeeznotfound"}
            </p>
          </motion.div>

          {/* Creator Description Card */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
            className="lg:col-span-6"
          >
            <Card className="space-y-6">
              <motion.h3
                variants={itemVariants}
                className="text-2xl sm:text-3xl font-bold text-white leading-snug"
              >
                Developer by day.{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 block sm:inline">
                  Creator by passion.
                </span>
              </motion.h3>
              <motion.p
                variants={itemVariants}
                className="text-slate-300 text-sm md:text-base leading-relaxed"
              >
                Sharing knowledge multiplies its value. That&apos;s why I produce tutorials and insights to help developers upskill and enjoy continuous learning.
              </motion.p>
              <motion.div
                variants={itemVariants}
                className="flex flex-wrap gap-2.5 pt-2"
              >
                {contentTags.map((tag: string) => (
                  <span
                    key={tag}
                    className="px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-200 text-xs font-semibold"
                  >
                    {tag}
                  </span>
                ))}
              </motion.div>
            </Card>
          </motion.div>
        </div>

        {/* Platform Cards */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
        >
          {platforms.map(
            ({
              name,
              handle,
              description,
              stat,
              statIcon: StatIcon,
              href,
              icon: PlatformIcon,
              iconBg,
              iconColor,
              buttonColor,
            }) => (
              <motion.div key={name} variants={itemVariants}>
                <Card className="flex flex-col justify-between h-full gap-6">
                  <div className="space-y-4">
                    {/* Icon + Name */}
                    <div className="flex items-center gap-3.5">
                      <div
                        className={`w-11 h-11 ${iconBg} rounded-2xl flex items-center justify-center shrink-0 border border-white/10`}
                      >
                        <PlatformIcon className={`w-5 h-5 ${iconColor}`} aria-hidden="true" />
                      </div>
                      <div>
                        <p className="font-bold text-white text-base">{name}</p>
                        <p className="text-xs text-slate-400">{handle}</p>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-slate-300 text-sm md:text-base leading-relaxed">
                      {description}
                    </p>
                  </div>

                  <div className="space-y-4 pt-2 border-t border-white/5">
                    {/* Stat */}
                    <div className="flex items-center gap-2 text-xs font-semibold text-white">
                      <StatIcon className="w-4 h-4 text-purple-400" aria-hidden="true" />
                      {stat}
                    </div>

                    {/* CTA */}
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Follow on ${name}`}
                      className={`flex items-center justify-center gap-2 h-11 px-4 rounded-xl text-xs font-semibold text-white transition-all duration-300 ${buttonColor} shadow-lg focus-ring`}
                    >
                      <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                      Follow on {name}
                    </a>
                  </div>
                </Card>
              </motion.div>
            )
          )}
        </motion.div>
      </Container>
    </Section>
  );
}
