import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

export default function Card({
  children,
  className = "",
  hoverEffect = true,
}: CardProps) {
  return (
    <div
      className={`bg-slate-900/40 backdrop-blur-md border border-white/10 rounded-2xl p-6 md:p-8 transition-all duration-300 ${
        hoverEffect
          ? "hover:border-purple-500/30 hover:shadow-[0_0_25px_rgba(168,85,247,0.15)]"
          : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}
