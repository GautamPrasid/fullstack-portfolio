import Sidebar from "@/components/admin/Sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#050508] text-[#f0f0ff] flex flex-row relative overflow-x-hidden">
      {/* Fixed Desktop Sidebar */}
      <Sidebar />

      {/* Main Content Workspace */}
      <main className="flex-1 pl-64 min-w-0 transition-all duration-300">
        <div className="p-8 max-w-7xl mx-auto space-y-8">
          {children}
        </div>
      </main>
    </div>
  );
}
