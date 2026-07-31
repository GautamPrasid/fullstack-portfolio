"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  FolderKanban,
  Wrench,
  User,
  Briefcase,
  GraduationCap,
  Award,
  Share2,
  Video,
  Image as ImageIcon,
  FileText,
  Mail,
  Search,
  Settings,
  LogOut,
  ChevronLeft,
  Menu,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";

const navItems = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Projects", href: "/admin/projects", icon: FolderKanban },
  { label: "Skills", href: "/admin/skills", icon: Wrench },
  { label: "About Me", href: "/admin/about", icon: User },
  { label: "Experience", href: "/admin/experience", icon: Briefcase },
  { label: "Education", href: "/admin/education", icon: GraduationCap },
  { label: "Certificates", href: "/admin/certificates", icon: Award },
  { label: "Social Links", href: "/admin/socials", icon: Share2 },
  { label: "Content Creator", href: "/admin/content", icon: Video },
  { label: "Gallery", href: "/admin/gallery", icon: ImageIcon },
  { label: "Resume CMS", href: "/admin/resume", icon: FileText },
  { label: "Messages", href: "/admin/messages", icon: Mail },
  { label: "SEO Panel", href: "/admin/seo", icon: Search },
  { label: "Site Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
    } catch {
      // Ignored if offline
    }
    document.cookie = "admin_session=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    router.push("/admin/login");
  };

  return (
    <>
      {/* Mobile Menu Trigger */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2.5 rounded-xl bg-slate-900 border border-white/10 text-white shadow-lg"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>

      {/* Desktop & Mobile Sidebar Wrapper */}
      <motion.aside
        animate={{ width: collapsed ? 80 : 260 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 h-screen bg-slate-950/95 border-r border-white/10 backdrop-blur-xl z-40 flex flex-col justify-between transition-transform duration-300 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div>
          {/* Header Branding */}
          <div className="h-16 flex items-center justify-between px-5 border-b border-white/5">
            {!collapsed && (
              <span className="text-sm font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                Prasid.CMS
              </span>
            )}
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="hidden lg:flex p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
            >
              <ChevronLeft className={`w-4 h-4 transition-transform ${collapsed ? "rotate-180" : ""}`} />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-1 max-h-[calc(100vh-140px)] overflow-y-auto custom-scrollbar">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-purple-600 text-white shadow-lg shadow-purple-600/20 font-semibold"
                      : "text-slate-400 hover:bg-slate-900 hover:text-white"
                  }`}
                  title={collapsed ? item.label : undefined}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  {!collapsed && <span>{item.label}</span>}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User Footer & Logout */}
        <div className="p-3 border-t border-white/5">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium text-rose-400 hover:bg-rose-500/10 transition-colors"
          >
            <LogOut className="w-4 h-4 shrink-0" />
            {!collapsed && <span>Sign Out</span>}
          </button>
        </div>
      </motion.aside>
    </>
  );
}
