import type { Metadata } from "next";
import { Inter, Fira_Code } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const firaCode = Fira_Code({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fira-code",
});

export const metadata: Metadata = {
  title: "Alex Poudel — Full Stack Developer & Content Creator",
  description:
    "Personal portfolio of Alex Poudel — Full Stack Developer, Video Editor, and Content Creator. Specializing in React, Next.js, Node.js, and creative digital experiences.",
  keywords: [
    "Full Stack Developer",
    "Next.js",
    "React",
    "TypeScript",
    "Video Editor",
    "Content Creator",
    "Portfolio",
  ],
  authors: [{ name: "Alex Poudel" }],
  creator: "Alex Poudel",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Alex Poudel — Full Stack Developer & Content Creator",
    description:
      "Personal portfolio of Alex Poudel — Full Stack Developer, Video Editor, and Content Creator.",
    siteName: "Alex Poudel Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Alex Poudel — Full Stack Developer & Content Creator",
    description:
      "Personal portfolio of Alex Poudel — Full Stack Developer, Video Editor, and Content Creator.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${firaCode.variable} scroll-smooth`}
    >
      <body className="min-h-screen bg-[#050508] text-[#f0f0ff] antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
