"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  FolderKanban,
  Wrench,
  User,
  History,
  GraduationCap,
  Tv,
  Image,
  Inbox,
  Globe,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
} from "lucide-react";

const SIDEBAR_ITEMS = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Projects", href: "/admin/projects", icon: FolderKanban },
  { label: "Skills", href: "/admin/skills", icon: Wrench },
  { label: "About Bio", href: "/admin/about", icon: User },
  { label: "Experience", href: "/admin/experience", icon: History },
  { label: "Education", href: "/admin/education", icon: GraduationCap },
  { label: "Media & Content", href: "/admin/content", icon: Tv },
  { label: "Image Gallery", href: "/admin/gallery", icon: Image },
  { label: "Contact Inbox", href: "/admin/messages", icon: Inbox },
  { label: "SEO & Metadata", href: "/admin/seo", icon: Globe },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  const handleLogout = async () => {
    document.cookie = "admin_session=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    window.location.href = "/admin/login";
  };

  return (
    <motion.aside
      animate={{ width: collapsed ? 80 : 260 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="relative flex flex-col justify-between h-screen sticky top-0 bg-[#090a0f] border-r border-white/10 p-4 z-30 shrink-0 select-none"
    >
      <div>
        {/* Brand Logo & Collapse Toggle */}
        <div className="flex items-center justify-between pb-6 border-b border-white/10 mb-4 px-2">
          {!collapsed && (
            <Link href="/admin" className="flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-xl bg-purple-600/20 border border-purple-500/40 flex items-center justify-center text-purple-400 font-extrabold text-sm">
                P
              </span>
              <span className="font-bold text-base text-white tracking-tight">
                CMS<span className="text-purple-400">.Studio</span>
              </span>
            </Link>
          )}

          <button
            onClick={() => setCollapsed(!collapsed)}
            className="w-8 h-8 rounded-xl bg-slate-900 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-colors focus-ring"
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="space-y-1.5 overflow-y-auto max-h-[calc(100vh-180px)] pr-1 custom-scrollbar">
          {SIDEBAR_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 focus-ring ${
                  isActive
                    ? "text-white bg-purple-600/20 border border-purple-500/40"
                    : "text-slate-400 hover:text-white hover:bg-slate-900/60"
                }`}
                title={collapsed ? item.label : undefined}
              >
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? "text-purple-400" : "text-slate-400"}`} />
                {!collapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Logout Button */}
      <div className="pt-4 border-t border-white/10 px-2">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold text-rose-400 hover:bg-rose-500/10 hover:border-rose-500/20 border border-transparent transition-all duration-200 focus-ring"
          title={collapsed ? "Logout" : undefined}
        >
          <LogOut className="w-4 h-4 shrink-0" />
          {!collapsed && <span>Logout Session</span>}
        </button>
      </div>
    </motion.aside>
  );
}
