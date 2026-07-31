# PROJECT HANDOFF — Prasid Gautam Portfolio

> **Prepared:** 2026-07-31  
> **Prepared by:** Antigravity (AI Architect)  
> **Repository:** https://github.com/GautamPrasid/fullstack-portfolio  
> **Purpose:** Technical handoff documentation for continued development.

---

## 1. Project Overview

- **Project Name:** Prasid Gautam — Personal Portfolio (`fullstack-portfolio`)
- **Repository:** `https://github.com/GautamPrasid/fullstack-portfolio`
- **Version:** `0.1.0`
- **Tech Stack:** Next.js `16.2.12`, React `19.2.4`, TypeScript `5.x`, Tailwind CSS `v4`, Framer Motion `12.43.0`, lucide-react `1.28.0`, react-icons `5.7.0`
- **Architecture:** Single-Page Application using Next.js App Router with smooth anchor scrolling (`#home`, `#about`, `#skills`, `#projects`, `#content`, `#contact`).

---

## 2. Completed Features & Recent Updates

1. **Repository & Package Updates**:
   - `package.json`: Configured package name (`fullstack-portfolio`), author, homepage, and Git repository URL (`https://github.com/GautamPrasid/fullstack-portfolio.git`).
   - `data/projects.json`: Added "Fullstack Portfolio" entry referencing `https://github.com/GautamPrasid/fullstack-portfolio`.

2. **SEO Infrastructure**:
   - `app/sitemap.ts`: Dynamic sitemap generation pointing to `https://prasidgautam.com.np`.
   - `app/robots.ts`: Search engine crawling rules and sitemap integration.
   - `app/manifest.ts`: Web App Manifest configuration for PWA & mobile shortcuts.

3. **Contact API Route**:
   - Created `app/api/contact/route.ts` to handle POST requests for contact form submissions.
   - Updated `components/Contact.tsx` to handle real API requests cleanly with loading and success/error status UI.

4. **Accessibility Improvements**:
   - Added Escape key handler to `components/Navbar.tsx` for closing mobile menu.
   - Added `@media (prefers-reduced-motion: reduce)` rule in `app/globals.css` to respect user motion preferences.

5. **Codebase Cleanup**:
   - Cleaned unreferenced CSS rules (`.input-field`, `.noise`, `@keyframes shimmer`).
   - Verified icon imports across all components (`CircleAlert`, `CircleCheck`, `FaGithub`, `FaLinkedin`, `FaYoutube`, `FaInstagram`, `FaFacebook`).

---

## 3. Project Structure

```
fullstack-portfolio/
├── app/
│   ├── api/contact/route.ts    # Contact form API handler
│   ├── globals.css             # Main stylesheet & Tailwind v4 design tokens
│   ├── layout.tsx              # Root layout with fonts, metadata & SEO icons
│   ├── manifest.ts             # Dynamic PWA web app manifest
│   ├── page.tsx                # Main single-page portfolio layout
│   ├── robots.ts               # Robots.txt generator
│   └── sitemap.ts              # Sitemap.xml generator
├── components/
│   ├── About.tsx               # Bio, timeline, stats & traits
│   ├── Contact.tsx             # Contact details & validated form
│   ├── ContentWork.tsx         # YouTube embed & social platform cards
│   ├── Footer.tsx              # Footer with quick links & social icons
│   ├── Hero.tsx                # Hero banner with typewriter & profile photo
│   ├── Navbar.tsx              # Responsive navbar & mobile menu
│   ├── Projects.tsx            # JSON-driven project showcase & category filter
│   └── Skills.tsx              # Categorized skills grid & proficiency dots
├── data/
│   └── projects.json           # Projects metadata & repository links
└── public/
    ├── logo.png                # Brand logo asset
    ├── profile.JPG             # Profile photo asset
    └── Prasid_Gautam_Resume.pdf# Downloadable resume PDF
```

---

## 4. Claude / Developer Guidelines

- **Repository**: `https://github.com/GautamPrasid/fullstack-portfolio`
- **Icons**:
  - UI icons: import from `lucide-react`. Use `CircleAlert` / `CircleCheck` (not `AlertCircle` / `CheckCircle`).
  - Social icons: ALWAYS import from `react-icons/fa6` (`FaGithub`, `FaLinkedin`, `FaYoutube`, `FaInstagram`, `FaFacebook`).
- **Framer Motion**: Always specify `ease: [...] as const` for bezier transitions.
- **Path Aliases**: `@/*` maps to project root.

---

## 5. GitHub Profile Clean-up Checklist (`GautamPrasid`)

To present a cohesive, high-impact GitHub profile to recruiters:

1. **Pinned Repositories (Top 6)**:
   - 📌 `StudyBuddy` *(Java Desktop Flagship)*
   - 📌 `fullstack-portfolio` *(Next.js 16 & TypeScript)*
   - 📌 `QR-code-generator` *(JavaScript Web Utility)*
   - 📌 `Bank-Management-System` *(C Systems Engineering)*
   - 📌 `Student-Management-System` *(C Systems Engineering)*
   - 📌 `Pac-Man-Game` *(C Logic & Graphics)*

2. **Repository Topics & Tagging**:
   - `StudyBuddy`: `java`, `javafx`, `mssql`, `jdbc`, `fxml`, `desktop-app`
   - `fullstack-portfolio`: `nextjs`, `react`, `typescript`, `tailwind-css`, `framer-motion`, `portfolio`
   - `QR-code-generator`: `javascript`, `html5`, `css3`, `qr-code`
   - `Bank-Management-System`: `c-programming`, `file-handling`, `data-structures`, `cli`
   - `Student-Management-System`: `c-programming`, `crud`, `file-storage`
   - `Pac-Man-Game`: `c-programming`, `game-loop`, `collision-detection`
