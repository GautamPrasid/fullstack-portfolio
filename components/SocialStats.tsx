"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Section from "./ui/Section";
import Container from "./ui/Container";

interface SocialMetrics {
  youtube: number;
  instagram: number;
  facebook: number;
  tiktok: number;
}

export default function SocialStats() {
  const [metrics, setMetrics] = useState<SocialMetrics>({
    youtube: 5000,
    instagram: 2500,
    facebook: 1200,
    tiktok: 3400,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch("/api/socials");
        if (res.ok) {
          const data = await res.json();
          if (data.stats) {
            setMetrics(data.stats);
          }
        }
      } catch (err) {
        console.error("Failed to load real-time social stats:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  const socialPlatforms = [
    {
      name: "YouTube",
      handle: "@deeeznotfound",
      followers: metrics.youtube,
      unit: "Subscribers",
      color: "from-red-500/20 to-rose-600/10",
      borderColor: "border-red-500/30",
      badgeColor: "bg-red-500/10 text-red-400 border-red-500/20",
      icon: "🎥",
      link: "https://www.youtube.com/@deeeznotfound",
    },
    {
      name: "Instagram",
      handle: "@user_on_break__",
      followers: metrics.instagram,
      unit: "Followers",
      color: "from-pink-500/20 to-purple-600/10",
      borderColor: "border-pink-500/30",
      badgeColor: "bg-pink-500/10 text-pink-400 border-pink-500/20",
      icon: "📸",
      link: "https://www.instagram.com/user_on_break__/",
    },
    {
      name: "TikTok",
      handle: "@prasid_gautam",
      followers: metrics.tiktok,
      unit: "Followers",
      color: "from-cyan-500/20 to-slate-900/40",
      borderColor: "border-cyan-500/30",
      badgeColor: "bg-cyan-500/10 text-cyan-300 border-cyan-500/20",
      icon: "🎵",
      link: "https://tiktok.com",
    },
    {
      name: "Facebook",
      handle: "Prasid Gautam",
      followers: metrics.facebook,
      unit: "Followers / Likes",
      color: "from-blue-600/20 to-indigo-600/10",
      borderColor: "border-blue-500/30",
      badgeColor: "bg-blue-500/10 text-blue-400 border-blue-500/20",
      icon: "📘",
      link: "https://www.facebook.com/prashidgautam/",
    },
  ];

  return (
    <Section id="social-stats" watermark="REACH & AUDIENCE" ariaLabel="Real-time social reach metrics">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center text-center space-y-3 mb-10"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> Live Stats Sync
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Audience &amp; <span className="text-purple-400">Social Reach</span>
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm md:text-base max-w-lg">
            Real-time metric breakdown across video production, photography, and digital content platforms.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {socialPlatforms.map((platform, idx) => (
            <motion.a
              key={platform.name}
              href={platform.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className={`group relative p-6 rounded-2xl bg-gradient-to-br ${platform.color} border ${platform.borderColor} backdrop-blur-xl hover:-translate-y-1 transition-all duration-300 shadow-lg focus-ring`}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl">{platform.icon}</span>
                <span className={`text-[10px] font-mono font-semibold px-2.5 py-0.5 rounded-full border ${platform.badgeColor}`}>
                  {platform.name}
                </span>
              </div>

              <div className="space-y-1">
                <p className="text-3xl font-extrabold text-white font-mono tracking-tight">
                  {loading ? "..." : platform.followers.toLocaleString()}
                </p>
                <p className="text-xs text-slate-300 font-medium">{platform.unit}</p>
              </div>

              <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                <span>{platform.handle}</span>
                <span className="text-purple-400 group-hover:translate-x-0.5 transition-transform">↗</span>
              </div>
            </motion.a>
          ))}
        </div>
      </Container>
    </Section>
  );
}
