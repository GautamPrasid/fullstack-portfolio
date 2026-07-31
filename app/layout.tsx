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
  title: "Prasid Gautam | Software & Frontend Developer",
  description:
    "Personal portfolio of Prasid Gautam, a BCA student, software and frontend developer from Pokhara, Nepal. Explore my projects, skills, and content creation work.",
  keywords: [
    "Software Developer",
    "Frontend Developer",
    "BCA Student",
    "Next.js",
    "React",
    "TypeScript",
    "Portfolio",
    "Pokhara",
    "Nepal",
    "Prasid Gautam",
  ],
  authors: [{ name: "Prasid Gautam", url: "https://prasidgautam.com.np" }],
  creator: "Prasid Gautam",
  metadataBase: new URL("https://prasidgautam.com.np"),
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
    shortcut: "/logo.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://prasidgautam.com.np/",
    title: "Prasid Gautam | Software & Frontend Developer",
    description:
      "Personal portfolio of Prasid Gautam, a BCA student, software and frontend developer from Pokhara, Nepal.",
    siteName: "Prasid Gautam Portfolio",
    images: [
      {
        url: "https://prasidgautam.com.np/logo.png",
        width: 400,
        height: 400,
        alt: "Prasid Gautam",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Prasid Gautam | Software & Frontend Developer",
    description:
      "Personal portfolio of Prasid Gautam, a BCA student, software and frontend developer from Pokhara, Nepal.",
    images: ["https://prasidgautam.com.np/logo.png"],
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
