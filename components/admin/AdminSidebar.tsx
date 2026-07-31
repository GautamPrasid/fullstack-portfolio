"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
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

const navigationItems = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Projects", href: "/admin/projects", icon: FolderKanban },
  { name: "Skills", href: "/admin/skills", icon: Wrench },
  { name: "About Me", href: "/admin/about", icon: User },
  { name: "Experience", href: "/admin/experience", icon: Briefcase },
  { name: "Education", href: "/admin/education", icon: GraduationCap },
  { name: "Certificates", href: "/admin/certificates", icon: Award },
  { name: "Social Links", href: "/admin/socials", icon: Share2 },
  { name: "Content Creator", href: "/admin/content", icon: Video },
  { name: "Gallery", href: "/admin/gallery", icon: ImageIcon },
  { name: "Resume CMS", href: "/admin/resume", icon: FileText },
  { name: "Messages", href: "/admin/messages", icon: Mail },
  { name: "SEO Panel", href: "/admin/seo", icon: Search },
  { name: "Site Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminSidebar() {
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
      {/* Mobile Drawer Trigger */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 rounded-xl bg-slate-900 border border-white/10 text-white shadow-lg"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>

      {/* Fixed Sidebar */}
      <aside
        className={`w-64 h-screen fixed left-0 top-0 z-40 bg-slate-950/80 border-r border-white/10 backdrop-blur-xl flex flex-col justify-between transition-transform duration-300 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Top Header */}
        <div>
          <div className="h-16 px-6 flex items-center justify-between border-b border-white/10">
            <Link href="/admin" className="flex items-center gap-2 font-bold text-lg text-white">
              <span className="text-purple-400">Prasid</span>.CMS
            </Link>
            <button className="p-1.5 text-slate-400 hover:text-white rounded-lg bg-slate-900 border border-white/10 transition-colors">
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>

          {/* Scrollable Navigation Menu */}
          <nav className="p-4 space-y-1 overflow-y-auto max-h-[calc(100vh-140px)] custom-scrollbar">
            {navigationItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
                    isActive
                      ? "bg-purple-600 text-white shadow-lg shadow-purple-500/25 border border-purple-400/30"
                      : "text-slate-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-slate-400"}`} />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Sign Out Area */}
        <div className="p-4 border-t border-white/10 bg-slate-950/50">
          <button
            onClick={handleLogout}
            type="button"
            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors border border-red-500/20"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>
    </>
  );
}
