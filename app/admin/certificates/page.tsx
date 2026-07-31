import { Award, Plus } from "lucide-react";

export default function CertificatesAdminPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            <Award className="w-6 h-6 text-purple-400" />
            Certificates Management
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Manage professional certifications, licenses, and credentials.
          </p>
        </div>
        <button
          disabled
          className="flex items-center gap-2 px-4 py-2 bg-purple-600/50 text-slate-300 rounded-lg text-sm font-medium cursor-not-allowed border border-purple-500/20 opacity-70"
        >
          <Plus className="w-4 h-4" /> Add Certificate
        </button>
      </div>

      <div className="p-8 rounded-2xl bg-slate-900/40 border border-white/10 backdrop-blur-xl text-center">
        <div className="w-12 h-12 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mx-auto mb-3">
          <Award className="w-6 h-6 text-purple-400" />
        </div>
        <h2 className="text-lg font-semibold text-white">Certificates Module Placeholder</h2>
        <p className="text-slate-400 text-sm mt-1 max-w-md mx-auto">
          This module will handle adding, updating, and displaying your verified technical certifications and badges.
        </p>
      </div>
    </div>
  );
}
