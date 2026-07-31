import React from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";

export const metadata = {
  title: "Admin CMS Studio | Prasid Gautam Portfolio",
  description: "Protected Admin CMS Dashboard for Prasid Gautam Portfolio",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#090a0f] text-slate-100 flex overflow-x-hidden">
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        {children}
      </div>
    </div>
  );
}
