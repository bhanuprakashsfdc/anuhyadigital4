# Anuhya Digital — Master Task Plan

> **Product Vision:** Transform Anuhya Digital's website from a functional prototype into a world-class, conversion-optimized digital experience indistinguishable from industry leaders like Stripe, Linear, and Notion. Every interaction should communicate precision, authority, and trust.

---

## 1. Project Overview & Success Criteria

### What We're Building
A premium corporate website for Anuhya Digital — a Salesforce consulting and high-performance web engineering firm. The site must serve as both a credibility engine and a lead-generation machine, converting visitors into qualified prospects.

### Success Criteria

| Metric | Current State | Target |
|--------|--------------|--------|
| Page Load (LCP) | Unknown | < 2.0s |
| First Contentful Paint | Unknown | < 1.2s |
| Cumulative Layout Shift | Unknown | < 0.05 |
| Lighthouse Performance | Unknown | 95+ |
| Lighthouse Accessibility | Unknown | 95+ |
| Lighthouse SEO | Unknown | 100 |
| Contact Form Conversion | 0% (non-functional) | 5%+ |
| Bounce Rate | Unknown | < 35% |
| Mobile Usability | Broken fonts, no ARIA | Perfect score |
| Brand Consistency | Inconsistent addresses/emails | Single source of truth |

---

## 2. Target Audience & User Personas

### Primary Persona: Enterprise Decision Maker — "Sarah"
- **Role:** VP of Operations / CTO at mid-to-large enterprise
- **Age:** 35-50
- **Goal:** Find a reliable Salesforce partner for a complex migration or optimization project
- **Pain Points:** Distinguishing real expertise from marketing fluff; needs proof of enterprise-grade delivery
- **Behavior:** Scans hero section in 5 seconds, looks for case studies and social proof, checks "About" for team credibility
- **Conversion Path:** Hero → Case Studies → Contact Form

### Secondary Persona: Technical Lead — "Marcus"
- **Role:** Salesforce Architect / Engineering Manager
- **Age:** 28-42
- **Goal:** Evaluate technical depth and methodology before recommending to leadership
- **Pain Points:** Generic agency sites with no technical substance; wants to see code-level thinking
- **Behavior:** Reads blog posts in detail, evaluates service descriptions for technical accuracy, checks team credentials
- **Conversion Path:** Blog → Services → Contact Form

### Tertiary Persona: Startup Founder — "Priya"
- **Role:** Founder/CEO of a Series A-B startup
- **Age:** 28-38
- **Goal:** Find a full-stack partner who can handle both Salesforce and custom web development
- **Pain Points:** Budget-conscious, needs transparent pricing signals, wants speed
- **Behavior:** Compares multiple agencies, responds to clear CTAs, values modern design as a proxy for competence
- **Conversion Path:** Portfolio → About → Get a Quote

---

## 3. Core Features & User Stories (Prioritized)

### P0 — Must Ship (Launch Blockers)

| ID | Feature | User Story |
|----|---------|------------|
| F-01 | Font Loading | As a visitor, I see the correct brand typography on every page |
| F-02 | Working Contact Form | As a prospect, I can submit an inquiry and receive confirmation |
| F-03 | Proper 404 Page | As a visitor who hits a broken link, I see a helpful error page |
| F-04 | Mobile Responsiveness | As a mobile user, every page is fully usable on my device |
| F-05 | SEO Meta Tags | As a search engine, I can index every page with correct titles/descriptions |
| F-06 | Functional Navigation Links | As a visitor, every link in the navbar and footer takes me to a real page |
| F-07 | Brand Consistency | As a visitor, all contact information is consistent site-wide |
| F-08 | Material Symbols Loading | As a visitor, all icons render correctly (Services page) |
| F-09 | Favicon Fix | As a visitor, the browser tab shows a green brand-consistent favicon |
| F-10 | Page Title Fix | As a visitor, the browser tab reads "Anuhya Digital" not "react-vite-app" |

### P1 — Should Ship (Week 1-2)

| ID | Feature | User Story |
|----|---------|------------|
| F-11 | Skip-to-Content Link | As a screen reader user, I can skip navigation to main content |
| F-12 | ARIA Labels & Roles | As an assistive technology user, all interactive elements are properly labeled |
| F-13 | Image Optimization | As a visitor on slow connections, images load fast with proper formats |
| F-14 | Error Boundaries | As a visitor, a broken component doesn't crash the entire site |
| F-15 | CTA Button Functionality | As a visitor, every CTA button navigates to the correct destination |
| F-16 | Blog Pagination | As a reader, I can paginate through blog posts |
| F-17 | Scroll-to-Top on Navigation | As a visitor, page navigation always starts at the top (verify it works) |
| F-18 | Local Image Assets | As a visitor, images load reliably without dependency on external Google-hosted URLs |

### P2 — Nice to Have (Week 3-4)

| ID | Feature | User Story |
|----|---------|------------|
| F-19 | Newsletter Signup | As a visitor, I can subscribe to updates via email |
| F-20 | Social Media Links | As a visitor, I can follow Anuhya Digital on real social platforms |
| F-21 | Search Functionality | As a visitor, I can search blog posts by keyword |
| F-22 | Dark/Light Mode Toggle | As a visitor, I can switch between dark and light themes |
| F-23 | Animated Stats Counter | As a visitor, I see animated metrics (years of experience, projects delivered, etc.) |
| F-24 | Client Logo Carousel | As a visitor, I see a smooth auto-scrolling logo carousel |
| F-25 | Structured Data (JSON-LD) | As Google, I can extract rich snippets from the site's structured data |

---

## 4. Recommended Tech Stack with Justification

| Layer | Technology | Justification |
|-------|-----------|---------------|
| **Framework** | React 19 | Already in place. Latest stable React with concurrent features. |
| **Build Tool** | Vite 8 | Already in place. Fastest HMR and build times in the ecosystem. |
| **Routing** | React Router 7 | Already in place. Industry standard for SPA routing. |
| **Styling** | Tailwind CSS 4 | Already in place. CSS-first config via `@theme` is clean and maintainable. |
| **Animation** | Framer Motion 12 | Already in place. Best-in-class for React animations. |
| **Icons** | Lucide React | Already in place. Clean, consistent, tree-shakeable icon set. |
| **SEO** | React Helmet Async | Already in place. Works well for per-page meta tags. |
| **Fonts** | Google Fonts (CDN) | Free, fast, and includes all 4 required families. |
| **Analytics** | Plausible or Vercel Analytics | Privacy-first, lightweight (< 1KB), no cookie banners needed. |
| **Forms** | Formspree or Resend | Zero-backend form submission with email notifications. |
| **Hosting** | Vercel or Cloudflare Pages | Edge-deployed, automatic SSL, preview deployments per PR. |
| **Images** | Local `/public/images/` + WebP/AVIF | Eliminate Google-hosted dependency; serve modern formats. |
| **Testing** | Vitest + React Testing Library | Native Vite integration, fast execution. |
| **Linting** | ESLint (already in place) | Extend with accessibility plugin `eslint-plugin-jsx-a11y`. |

### Dependencies to Remove
| Package | Reason |
|---------|--------|
| `tailwind-merge` | Unused. Tailwind v4 handles specificity natively. |
| `clsx` | Unused. No className merging needed. |
| `react-icons` | Unused. Lucide React is the sole icon library. Adds ~50KB to bundle. |

### Dependencies to Add
| Package | Reason |
|---------|--------|
| `@vercel/analytics` | Privacy-first page view and event tracking. |
| `vitest` + `@testing-library/react` | Unit and integration testing. |
| `eslint-plugin-jsx-a11y` | Accessibility linting at build time. |
| `sharp` | Image optimization during build. |

---

## 5. Design System & UI/UX Guidelines

### Design Direction: "Kinetic Architect"
Inspired by Stripe's precision, Linear's minimalism, and Notion's warmth — combined with a distinctive cyber-lime accent that makes Anuhya Digital unmistakable.

### Color System
```
Background:       #0c1517 (Deep Obsidian)
Surface L0:       #0c1517 (Base)
Surface L1:       #141d1f (Sections)
Surface L2:       #222b2e (Cards)
Surface L3:       #2d3638 (Floating)
Primary:          #ADFF85 (Cyber Lime — accents, CTAs, hover states)
Primary Dark:     #2a7302 (gradient endpoint, text on primary buttons)
Secondary:        #ffb4aa (Muted Coral — alerts, secondary accents)
On Surface:       #dae4e7 (Primary text)
On Surface Var:   #c0cab6 (Secondary text)
Outline Variant:  #41493a (Ghost borders at 15% opacity)
Error:            #ffb4ab (Error states)
```

### Typography Scale
```
Display XL:  Space Grotesk, 72px/0.85, -0.03 tracking  (Hero headlines)
Display LG:  Space Grotesk, 56px/0.9,  -0.02 tracking  (Section headlines)
Display MD:  Space Grotesk, 40px/1.0,  -0.02 tracking  (Card headlines)
Title LG:    Manrope,       22px/1.3,   0 tracking      (Reading hooks)
Body LG:     Manrope,       18px/1.6,   0 tracking      (Body text)
Body MD:     Manrope,       14px/1.6,   0 tracking      (Dense text)
Label LG:    Be Vietnam Pro,14px/1.0,   0.1 tracking    (Button text)
Label MD:    Be Vietnam Pro,12px/1.0,   0.15 tracking   (Metadata)
Mono:        Roboto Mono,   12px/1.0,   0.05 tracking   (Technical strings)
```

### Spacing System (8px base)
```
1 = 4px   (micro)
2 = 8px   (tight)
3 = 12px  (compact)
4 = 16px  (default)
6 = 24px  (comfortable)
8 = 32px  (spacious)
10 = 40px (section gap)
12 = 48px (large section)
16 = 64px (hero padding)
20 = 80px (page padding)
```

### Border Radius
```
sm:  4px   (tags, badges)
md:  6px   (buttons, inputs)
lg:  12px  (cards)
xl:  16px  (large containers)
2xl: 24px  (hero cards, modals)
full: 9999px (avatars, pills)
```

### Component Patterns
- **Buttons:** Primary = cyber gradient fill + dark text + hover scale 1.02 + neon glow. Secondary = ghost border + primary text + hover fill 10% primary.
- **Cards:** Tonal surface L2 + ghost border + hover lift to L3 + primary border glow on hover. NO solid dividers — use spacing.
- **Inputs:** Underline-only using outline-variant. Focus = center-out animation to full-width primary line.
- **Navigation:** Glass panel (L3 at 60% opacity + backdrop-blur-24px). Fixed position. Shrink on scroll.
- **Page Transitions:** AnimatePresence with opacity + 10px Y translate, 400ms ease-out.

### Interaction Principles
1. **Every click has feedback.** Button scale, color shift, or glow — no dead zones.
2. **Scroll-triggered reveals.** All sections fade-in on viewport entry using Framer Motion `whileInView`.
3. **No spinners.** Use skeleton screens or animated brand elements for loading states.
4. **Hover states tell a story.** Cards lift, images un-grayscale, text shifts, borders glow.

---

## 6. Comprehensive Task Breakdown

### Phase 0: Foundation Fixes (Days 1-2)

| Task | Owner | Files | Description |
|------|-------|-------|-------------|
| T-001 | Developer | `index.html` | Add Google Fonts CDN link for Space Grotesk, Manrope, Be Vietnam Pro, Roboto Mono |
| T-002 | Developer | `index.html` | Change `<title>` from "react-vite-app" to "Anuhya Digital" |
| T-003 | Developer | `index.html` | Add Google Material Symbols CDN link |
| T-004 | Developer | `public/favicon.svg` | Replace purple favicon with green (#ADFF85) brand mark |
| T-005 | Developer | `src/App.css` | Delete unused App.css file |
| T-006 | Developer | `src/assets/react.svg`, `vite.svg` | Delete unused Vite template assets |
| T-007 | Developer | `package.json` | Remove `tailwind-merge`, `clsx`, `react-icons` from dependencies |
| T-008 | Developer | `src/components/Footer.jsx` | Fix email to "hello@anuhya.digital" (match Contact page) |
| T-009 | Developer | `src/components/Footer.jsx` | Fix address to match Contact page (San Francisco) |
| T-010 | Developer | All pages | Verify all `Helmet` meta descriptions are unique and < 160 chars |

**Tester Tasks:**
| Task | Owner | Description |
|------|-------|-------------|
| T-011 | Tester | Verify all 4 font families render correctly on Chrome, Firefox, Safari |
| T-012 | Tester | Verify Material Symbols icons render on Services page |
| T-013 | Tester | Verify favicon shows green in browser tab |
| T-014 | Tester | Verify page title reads "Anuhya Digital" on initial load and all routes |

**SEO Agent Tasks:**
| Task | Owner | Description |
|------|-------|-------------|
| T-015 | SEO Agent | Audit all page titles for keyword optimization (primary keyword + brand) |
| T-016 | SEO Agent | Audit all meta descriptions for click-through optimization |
| T-017 | SEO Agent | Verify canonical URLs are set on all pages |

---

### Phase 1: Critical Functionality (Days 3-5)

| Task | Owner | Files | Description |
|------|-------|-------|-------------|
| T-018 | Developer | `src/pages/Contact.jsx` | Integrate contact form with Formspree or Resend API |
| T-019 | Developer | `src/pages/Contact.jsx` | Add form validation (required fields, email format) |
| T-020 | Developer | `src/pages/Contact.jsx` | Add loading state during submission + success/error UI |
| T-021 | Developer | `src/pages/NotFound.jsx` | Create dedicated 404 page with brand design + navigation |
| T-022 | Developer | `src/App.jsx` | Add NotFound route for `path="*"` |
| T-023 | Developer | `src/components/Navbar.jsx` | Make "Start Your Journey" and "View Showcase" buttons functional Links |
| T-024 | Developer | `src/pages/Home.jsx` | Wire all CTA buttons to correct routes |
| T-025 | Developer | `src/pages/Services.jsx` | Wire "See All Case Studies" CTA to /portfolio |
| T-026 | Developer | `src/components/Footer.jsx` | Replace `href="#"` with real routes for all links |
| T-027 | Developer | `src/components/Footer.jsx` | Add real social media URLs (or remove non-functional icons) |
| T-028 | Developer | `src/components/Navbar.jsx` | Remove unused `Rocket` import |
| T-029 | Developer | `src/components/Navbar.jsx` | Add `aria-expanded`, `aria-label` to mobile menu toggle |
| T-030 | Developer | `src/components/Navbar.jsx` | Add keyboard navigation support (Escape to close) |

**Tester Tasks:**
| Task | Owner | Description |
|------|-------|-------------|
| T-031 | Tester | Test contact form: valid submission, invalid email, empty fields, loading state |
| T-032 | Tester | Test 404 page: direct URL, broken link, shows navigation options |
| T-033 | Tester | Test all navbar links navigate correctly (desktop + mobile) |
| T-034 | Tester | Test all footer links navigate correctly |
| T-035 | Tester | Test all CTA buttons on every page navigate to correct destinations |
| T-036 | Tester | Test mobile menu: open, close, keyboard escape, focus trap |

**SEO Agent Tasks:**
| Task | Owner | Description |
|------|-------|-------------|
| T-037 | SEO Agent | Add `robots.txt` to `/public/` with correct sitemap reference |
| T-038 | SEO Agent | Generate `sitemap.xml` with all routes |
| T-039 | SEO Agent | Add Open Graph and Twitter Card meta tags to all pages |

---

### Phase 2: Accessibility & Performance (Days 6-8)

| Task | Owner | Files | Description |
|------|-------|-------|-------------|
| T-040 | Developer | `src/components/Layout.jsx` | Add skip-to-content link as first focusable element |
| T-041 | Developer | `index.css` | Add `.sr-only` utility class for screen-reader-only content |
| T-042 | Developer | `src/pages/Contact.jsx` | Add `htmlFor`/`id` associations to all form inputs |
| T-043 | Developer | `src/pages/Contact.jsx` | Add `aria-describedby` for error messages |
| T-044 | Developer | All image elements | Add meaningful `alt` text (not empty, not filename) |
| T-045 | Developer | All pages | Add `role="main"` to `<main>` in Layout, `<nav>` to Navbar |
| T-046 | Developer | `src/components/Layout.jsx` | Add React Error Boundary wrapping children |
| T-047 | Developer | `index.css` | Add focus-visible styles (outline-offset + primary color) |
| T-048 | Developer | `vite.config.js` | Add image optimization config (WebP/AVIF output) |
| T-049 | Developer | All external images | Download and serve from `/public/images/` as WebP |
| T-050 | Developer | `src/pages/Home.jsx` | Add `loading="lazy"` to below-fold images |
| T-051 | Developer | `src/pages/Portfolio.jsx` | Add `loading="lazy"` to portfolio card images |

**Tester Tasks:**
| Task | Owner | Description |
|------|-------|-------------|
| T-052 | Tester | Run axe-core audit on all pages, log all violations |
| T-053 | Tester | Test keyboard-only navigation through entire site |
| T-054 | Tester | Test with VoiceOver/NVDA: skip link, form labels, image alt text |
| T-055 | Tester | Test responsive layout at 320px, 375px, 768px, 1024px, 1440px, 1920px |
| T-056 | Tester | Run Lighthouse performance audit on all pages |
| T-057 | Tester | Test error boundary: inject error, verify graceful fallback |
| T-058 | Tester | Verify CLS score with Web Vitals extension |

**SEO Agent Tasks:**
| Task | Owner | Description |
|------|-------|-------------|
| T-059 | SEO Agent | Add `alt` text audit — ensure all images have descriptive alt attributes |
| T-060 | SEO Agent | Add heading hierarchy audit (single H1 per page, logical H2→H3 nesting) |
| T-061 | SEO Agent | Add hreflang tags if multi-language is planned |
| T-062 | SEO Agent | Verify all pages have unique canonical URLs |

---

### Phase 3: Content & Polish (Days 9-12)

| Task | Owner | Files | Description |
|------|-------|-------|-------------|
| T-063 | Developer | `src/pages/Home.jsx` | Add animated stats counter section (Years, Projects, Clients, Certifications) |
| T-064 | Developer | `src/pages/Home.jsx` | Replace static logo strip with auto-scrolling carousel |
| T-065 | Developer | `src/pages/Home.jsx` | Add "How We Work" process section (3-4 step animated flow) |
| T-066 | Developer | `src/pages/About.jsx` | Add real team photos or use high-quality stock placeholders |
| T-067 | Developer | `src/pages/Blog.jsx` | Implement functional pagination with page state |
| T-068 | Developer | `src/pages/BlogDetail.jsx` | Improve markdown renderer to handle code blocks, blockquotes, links |
| T-069 | Developer | `src/pages/Services.jsx` | Add pricing signals (e.g., "Starting at $X" or "Custom Quote" badges) |
| T-070 | Developer | `src/pages/Services.jsx` | Replace Material Symbols with Lucide icons for consistency |
| T-071 | Developer | `src/components/Footer.jsx` | Add newsletter signup input with email validation |
| T-072 | Developer | `src/components/Layout.jsx` | Add cookie consent banner if analytics requires it |
| T-073 | Developer | `src/components/LoadingScreen.jsx` | Reduce loading time from 2s to 1s or remove entirely |
| T-074 | Developer | All pages | Add structured data JSON-LD (Organization, Article, BreadcrumbList) |
| T-075 | Developer | `src/pages/Contact.jsx` | Add FAQ section above the fold to reduce support inquiries |

**Tester Tasks:**
| Task | Owner | Description |
|------|-------|-------------|
| T-076 | Tester | Test blog pagination: forward, backward, boundary conditions |
| T-077 | Tester | Test newsletter signup: valid email, invalid email, duplicate |
| T-078 | Tester | Test loading screen behavior across slow 3G, fast 3G, WiFi |
| T-079 | Tester | Verify JSON-LD with Google Rich Results Test tool |
| T-080 | Tester | Cross-browser testing: Chrome, Firefox, Safari, Edge |
| T-081 | Tester | Test all animated interactions for motion sickness (prefers-reduced-motion) |

**SEO Agent Tasks:**
| Task | Owner | Description |
|------|-------|-------------|
| T-082 | SEO Agent | Add FAQ schema markup to Contact page FAQ section |
| T-083 | SEO Agent | Add Organization schema to homepage |
| T-084 | SEO Agent | Add Article schema to all blog posts |
| T-085 | SEO Agent | Add BreadcrumbList schema to detail pages |
| T-086 | SEO Agent | Create internal linking strategy between blog posts and services |

---

### Phase 4: Testing & Quality Assurance (Days 13-15)

| Task | Owner | Files | Description |
|------|-------|-------|-------------|
| T-087 | Developer | `vitest.config.js` | Set up Vitest with React Testing Library |
| T-088 | Developer | `src/__tests__/` | Write unit tests for: form validation, slug resolution, filter logic |
| T-089 | Developer | `src/__tests__/` | Write integration tests for: navigation flow, contact form submission |
| T-090 | Developer | `src/__tests__/` | Write component tests for: Navbar, Footer, Portfolio filter |
| T-091 | Developer | `package.json` | Add `test` and `test:coverage` scripts |
| T-092 | Developer | `eslint.config.js` | Add `eslint-plugin-jsx-a11y` for accessibility linting |
| T-093 | Developer | `.github/workflows/` | Add CI pipeline: lint → test → build → deploy preview |

**Tester Tasks:**
| Task | Owner | Description |
|------|-------|-------------|
| T-094 | Tester | Full regression test across all pages and routes |
| T-095 | Tester | Performance profiling: identify largest JS bundles, unused CSS |
| T-096 | Tester | Security audit: check for XSS, CSP headers, dependency vulnerabilities |
| T-097 | Tester | Load testing: verify site handles concurrent users |
| T-098 | Tester | Final Lighthouse audit: Performance, Accessibility, Best Practices, SEO all 95+ |

**SEO Agent Tasks:**
| Task | Owner | Description |
|------|-------|-------------|
| T-099 | SEO Agent | Submit sitemap to Google Search Console |
| T-100 | SEO Agent | Verify Core Web Vitals pass in Search Console |
| T-101 | SEO Agent | Audit for orphan pages and broken internal links |

---

## 7. Milestones & Deliverables

### Milestone 1: Foundation (End of Day 2)
- [ ] Fonts loading correctly across all browsers
- [ ] Brand-consistent favicon and page titles
- [ ] All dead code removed (App.css, unused imports, unused deps)
- [ ] Contact information consistent site-wide
- [ ] All icons rendering correctly

### Milestone 2: Functionality (End of Day 5)
- [ ] Contact form submitting and sending emails
- [ ] 404 page live and styled
- [ ] Every button and link functional
- [ ] Mobile navigation fully accessible
- [ ] SEO meta tags and sitemap in place

### Milestone 3: Accessibility & Performance (End of Day 8)
- [ ] Lighthouse Accessibility score 95+
- [ ] Lighthouse Performance score 95+
- [ ] Skip navigation, ARIA labels, focus styles
- [ ] Error boundaries preventing full-app crashes
- [ ] Images optimized and locally served

### Milestone 4: Content & Polish (End of Day 12)
- [ ] Animated stats and process sections
- [ ] Functional blog pagination
- [ ] Newsletter signup
- [ ] Structured data on all pages
- [ ] All animations respect `prefers-reduced-motion`

### Milestone 5: Launch Ready (End of Day 15)
- [ ] Full test suite passing with 80%+ coverage
- [ ] CI/CD pipeline configured
- [ ] Lighthouse scores 95+ across all categories
- [ ] Google Search Console configured
- [ ] Final cross-browser and device QA complete

---

## 8. Non-Functional Requirements

### Performance
- **LCP** < 2.0s on 4G connection
- **FID** < 100ms
- **CLS** < 0.05
- **Total JS bundle** < 250KB gzipped (currently ~77KB — maintain this)
- **Image formats**: WebP with AVIF fallback where supported
- **Font loading**: `font-display: swap` to prevent FOIT (Flash of Invisible Text)
- **Code splitting**: All pages lazy-loaded via `React.lazy` (already in place — maintain)

### Accessibility (WCAG 2.2 AA)
- **Color contrast**: All text meets 4.5:1 ratio (primary on surface = 12.5:1, passes)
- **Keyboard navigation**: All interactive elements reachable and operable via keyboard
- **Screen reader**: All images have alt text, all forms have labels, all landmarks are defined
- **Motion**: All animations respect `prefers-reduced-motion: reduce`
- **Focus indicators**: Visible focus ring on all interactive elements using `focus-visible`
- **Skip navigation**: Skip-to-content link as first focusable element

### Mobile-First Design
- **Breakpoints**: 320px (min), 375px (mobile), 768px (tablet), 1024px (laptop), 1440px (desktop), 1920px (wide)
- **Touch targets**: Minimum 44x44px for all interactive elements
- **Viewport**: No horizontal scroll at any breakpoint
- **Typography**: Fluid scaling using `clamp()` between mobile and desktop sizes
- **Navigation**: Hamburger menu on mobile, full nav on desktop

### SEO Readiness
- **Meta tags**: Unique title and description per page
- **Open Graph**: og:title, og:description, og:image on all pages
- **Twitter Cards**: summary_large_image on all pages
- **Structured Data**: Organization, Article, BreadcrumbList, FAQ JSON-LD
- **Sitemap**: Auto-generated XML sitemap at `/sitemap.xml`
- **Robots.txt**: Properly configured at `/robots.txt`
- **Canonical URLs**: Self-referencing canonical on every page
- **Heading hierarchy**: Single H1 per page, logical H2-H6 nesting
- **Internal linking**: Cross-links between related content (blog ↔ services ↔ portfolio)
- **Core Web Vitals**: All pages pass in Google Search Console

### Security
- **CSP**: Content Security Policy headers configured
- **Dependencies**: `npm audit` clean, no known vulnerabilities
- **Form validation**: Client-side AND server-side (Formspree handles server-side)
- **No secrets in code**: Environment variables for all API keys

---

## 9. Open Questions & Assumptions

### Open Questions

| # | Question | Impact | Owner |
|---|----------|--------|-------|
| Q-1 | Will Anuhya Digital use a real email service (Formspree, Resend, custom backend)? | Blocks T-018 (Contact form) | Product |
| Q-2 | What are the actual social media URLs (LinkedIn, Twitter/X, GitHub)? | Blocks T-027 (Social links) | Marketing |
| Q-3 | Is the company address Hyderabad (India) or San Francisco (USA)? | Blocks T-009 (Brand consistency) | Leadership |
| Q-4 | Are the team members (Arun Varma, Deepa Rao, Vikram Sethi) real people with real photos? | Blocks T-066 (Team photos) | Leadership |
| Q-5 | Is the blog authored by "Raghav Anuhya" or "Editorial Team"? | Blocks content consistency | Marketing |
| Q-6 | Will the site support multiple languages (English + Hindi/Telugu)? | Impacts T-061 (hreflang) | Product |
| Q-7 | Is a CMS planned (Contentful, Sanity, WordPress headless)? | Impacts architecture for blog/portfolio data | Product |
| Q-8 | What is the deployment target (Vercel, Cloudflare Pages, AWS, custom)? | Blocks T-093 (CI/CD) | DevOps |
| Q-9 | Should the loading screen be removed entirely or shortened? | Blocks T-073 | Product |
| Q-10 | Is dark/light mode toggling in scope? | Blocks T-22 (nice-to-have) | Product |

### Assumptions

| # | Assumption | Risk if Wrong |
|---|-----------|---------------|
| A-1 | The site is a single-language (English) SPA. No SSR/SSG planned. | Would require Next.js migration if SEO demands SSR |
| A-2 | All Google-hosted images can be downloaded and served locally. | Some images may have licensing restrictions |
| A-3 | The green (#ADFF85) cyber-lime brand color is final. | Late-stage rebrand would require updating all gradient/hover states |
| A-4 | Formspree free tier (50 submissions/month) is sufficient. | May need paid tier or custom backend at scale |
| A-5 | No user authentication or dashboards are needed. | Would require significant architecture changes |
| A-6 | The portfolio and blog data will remain hardcoded (no CMS). | Content updates require developer intervention |
| A-7 | Tailwind v4 CSS-based config (`@theme`) is stable enough for production. | May need to pin versions if v4 introduces breaking changes |
| A-8 | The site targets modern browsers only (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+). | IE11 and older browsers will not work |

---

## Appendix: Files to Delete

These files are dead code and should be removed:

```
src/App.css                          — Legacy Vite template styles, never imported
src/assets/react.svg                 — Default Vite template logo, never used
src/assets/vite.svg                  — Default Vite template logo, never used
public/icons.svg                     — SVG sprite, never referenced
```

## Appendix: Dependencies to Remove

```bash
npm uninstall tailwind-merge clsx react-icons
```

## Appendix: Dependencies to Add

```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event
npm install -D eslint-plugin-jsx-a11y
npm install @vercel/analytics
```
