import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Prasid | Full Stack Developer & Visual Storyteller",
  description: "Portfolio and Admin CMS built with Next.js and Supabase",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className="min-h-screen bg-background text-[#f0f0ff] antialiased overflow-x-hidden"
      >
        {children}
      </body>
    </html>
  );
}
