"use client";

import React from "react";
import { type LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  icon: LucideIcon;
  color?: string;
}

export default function StatCard({
  title,
  value,
  change,
  changeType = "positive",
  icon: Icon,
  color = "purple",
}: StatCardProps) {
  const colorMap: Record<string, { bg: string; border: string; text: string }> = {
    purple: {
      bg: "bg-purple-500/10",
      border: "border-purple-500/20",
      text: "text-purple-400",
    },
    cyan: {
      bg: "bg-cyan-500/10",
      border: "border-cyan-500/20",
      text: "text-cyan-400",
    },
    amber: {
      bg: "bg-amber-500/10",
      border: "border-amber-500/20",
      text: "text-amber-400",
    },
    emerald: {
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/20",
      text: "text-emerald-400",
    },
  };

  const scheme = colorMap[color] || colorMap.purple;

  return (
    <div className="p-6 rounded-2xl bg-slate-900/40 border border-white/10 backdrop-blur-xl flex flex-col justify-between hover:border-purple-500/30 transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          {title}
        </span>
        <div className={`w-10 h-10 rounded-xl ${scheme.bg} border ${scheme.border} flex items-center justify-center ${scheme.text}`}>
          <Icon className="w-5 h-5" aria-hidden="true" />
        </div>
      </div>

      <div>
        <h4 className="text-3xl font-extrabold text-white font-mono tracking-tight">
          {value}
        </h4>
        {change && (
          <p
            className={`text-xs font-mono mt-1 ${
              changeType === "positive"
                ? "text-emerald-400"
                : changeType === "negative"
                ? "text-rose-400"
                : "text-slate-400"
            }`}
          >
            {change}
          </p>
        )}
      </div>
    </div>
  );
}
