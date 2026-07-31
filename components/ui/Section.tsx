import { ReactNode } from "react";

interface SectionProps {
  id: string;
  children: ReactNode;
  className?: string;
  watermark?: string;
  ariaLabel?: string;
}

export default function Section({
  id,
  children,
  className = "",
  watermark,
  ariaLabel,
}: SectionProps) {
  return (
    <section
      id={id}
      className={`w-full relative py-20 md:py-28 lg:py-32 overflow-hidden scroll-mt-20 ${className}`}
      aria-label={ariaLabel || id}
    >
      {watermark && (
        <span className="absolute top-12 md:top-16 left-1/2 -translate-x-1/2 text-white/[0.015] text-6xl sm:text-8xl lg:text-[11rem] font-black tracking-widest select-none pointer-events-none -z-10 whitespace-nowrap">
          {watermark}
        </span>
      )}
      {children}
    </section>
  );
}
