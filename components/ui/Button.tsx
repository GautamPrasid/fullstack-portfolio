import { ReactNode, ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  children: ReactNode;
  className?: string;
}

export default function Button({
  variant = "primary",
  children,
  className = "",
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center gap-2 h-12 px-6 rounded-2xl font-semibold text-sm transition-all duration-300 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed focus-ring";

  const variants = {
    primary:
      "text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 shadow-[0_0_20px_rgba(168,85,247,0.25)] hover:shadow-[0_0_30px_rgba(168,85,247,0.45)]",
    secondary:
      "text-slate-200 bg-slate-900/40 hover:bg-slate-800/60 border border-white/10 hover:border-purple-500/30",
    outline:
      "text-purple-300 border border-purple-500/30 bg-purple-500/10 hover:bg-purple-500/20",
    ghost: "text-slate-300 hover:text-white hover:bg-white/5",
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}
