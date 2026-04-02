import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, ArrowUpRight, Calendar, Clock, CheckCircle } from 'lucide-react';

const projects = {
  'nexus-core-optimization': {
    id: 1,
    title: "Nexus Core Optimization",
    category: "Salesforce",
    tag: "FINTECH",
    client: "Global Financial Corp",
    year: "2023",
    description: "A full-scale architecture redesign for a global financial firm, increasing processing speed by 40%.",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAxVxEdAiNClSGcLhaBxJLzzZYLAFcySoJQ2p1RGm8jpIxZOKULJp5c74QW_wnef-mdxWaLCsNfVVom-cj4gU4T4o4irlMmZuUnaHHP7KRi4AeaXMSidoQpOZpseFiFTEVe5iuku3fE7ul3Yq38fT_0I8yps5X0EaZnUMtYNAULuAFMGkO_yRGLhbXZ4reKVaQz-nyZU6ikd1dZHmsv7fcjnVH77LIsTFSpkKeucJ6M_9Q9ktr5MEj03Y6aonL-OAcxwpRBjfgimMg",
    overview: "Global Financial Corp faced critical performance bottlenecks in their Salesforce instance, processing over 2 million transactions daily. We undertook a complete architectural redesign, migrating from legacy Apex triggers to an event-driven microservices pattern using Platform Events and Change Data Capture.",
    challenges: [
      "Legacy Apex triggers causing 12-second page load times",
      "Governor limit exceptions during peak trading hours",
      "Data inconsistency across 14 integrated systems",
      "Zero-downtime migration requirement for 24/7 trading operations"
    ],
    solutions: [
      "Implemented event-driven architecture with Platform Events",
      "Designed custom caching layer reducing SOQL queries by 70%",
      "Built automated regression testing suite with 95% coverage",
      "Deployed blue-green deployment strategy for zero-downtime releases"
    ],
    results: [
      "40% improvement in transaction processing speed",
      "99.99% uptime achieved during migration",
      "Reduced governor limit exceptions by 95%",
      "Annual infrastructure cost savings of $2.4M"
    ]
  },
  'aura-saas-platform': {
    id: 2,
    title: "Aura SaaS Platform",
    category: "Web",
    tag: "WEB DESIGN",
    client: "TechVenture Inc",
    year: "2023",
    description: "Modern minimalist website landing page layout with sleek typography and glassmorphic elements.",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAyAKpmqFuVhWo-ZZJeuES2p0_HUn-qKu6ZqCCoMkenU3ArYCDkXxc0yHMsU1YOILSQIGqxQ-iGYN1v853FV_1J3BBoQGJWrwokgrWFaJzClJfQZqfqHTWXgDDeGU-6r_tlTRNrX-ke8QVRWNm0ntT1Cjnn7Hq3pb832r_7s0cfe3w8nbwCagj31zO6v80bYQ6xQRArGjGgy4SGhp_p7Z_acVVl3Drc9S46LscfB7gCP-nAtPichfpyAYRPorDN1zuKCNGU4CviHLI",
    overview: "TechVenture Inc needed a high-converting landing page for their new SaaS product. We designed a modern, minimalist interface featuring glassmorphic cards, smooth micro-interactions, and a conversion-optimized layout that increased sign-up rates by 65%.",
    challenges: [
      "Low conversion rate on existing landing page (1.2%)",
      "Slow page load times affecting SEO rankings",
      "Inconsistent brand identity across digital touchpoints",
      "Mobile experience causing 70% bounce rate"
    ],
    solutions: [
      "Designed glassmorphic UI system with consistent visual language",
      "Implemented lazy loading and image optimization (WebP/AVIF)",
      "Built responsive component library with Tailwind CSS",
      "Created A/B testing framework for continuous optimization"
    ],
    results: [
      "65% increase in sign-up conversion rate",
      "Page load time reduced from 4.2s to 1.1s",
      "Mobile bounce rate decreased by 45%",
      "Average session duration increased by 3 minutes"
    ]
  },
  'velocity-campaign-flow': {
    id: 3,
    title: "Velocity Campaign Flow",
    category: "Marketing",
    tag: "MARKETING",
    client: "Nexus Digital Agency",
    year: "2023",
    description: "Abstract visualization of network nodes connecting with neon green light paths.",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuA2mLEop8uKCtQaAq3WCYDMLAebtqgFj8RU1i2y04DySf6ZKf3qMtou8UxWBvsw19phvuIuGvskjw4ES2eRf4V5OeYrx7iI02SHCpZHnL26LrpBdQ8581RIJWgAJdvF9IVVgtzi9UjLLxcfGeEAnmpvCwOYBN4_QDMNLf-70zmFKs8wRJEK2M8lw-kRPpu1LKmocoZ3iMAIACwr78yXF9LOFvBQ0YugQo6MyVcWZkyHFPUWZOqAs_Xd-KWfzhr3RyhKTeKPq84x2E",
    overview: "Nexus Digital Agency required an automated marketing campaign management system integrated with Salesforce Marketing Cloud. We built a visual campaign flow builder with drag-and-drop functionality, real-time analytics, and multi-channel orchestration.",
    challenges: [
      "Manual campaign setup taking 8+ hours per campaign",
      "No real-time visibility into campaign performance",
      "Siloed data between email, social, and web channels",
      "Compliance requirements for GDPR and CAN-SPAM"
    ],
    solutions: [
      "Built visual drag-and-drop campaign flow designer",
      "Integrated real-time analytics dashboard with Salesforce",
      "Created unified customer data platform across channels",
      "Implemented automated compliance checking engine"
    ],
    results: [
      "Campaign setup time reduced from 8 hours to 45 minutes",
      "360-degree view of customer journey across all channels",
      "Email deliverability improved to 98.5%",
      "ROI tracking automated with Salesforce attribution"
    ]
  },
  'enterprise-hub-integration': {
    id: 4,
    title: "Enterprise Hub Integration",
    category: "Salesforce",
    tag: "ECOSYSTEM",
    client: "Meridian Holdings",
    year: "2022",
    description: "Unifying 14 disparate business units into a singular, high-performance Salesforce instance.",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDLDY7DUr03zGHFj37Vv5_84QQ-eZnXUjLWSU4HxlCe70ZU0pMp-jymQrsoFhk_AxBtJ25xJhi86v2u1OUVtkAdoFcGdHKFFjNyhuUUf2uxZ6FoKj3dEhsaB15qDs67Lunf8Gm5MHX5KsePzGiNXrPDnPYjHAnOJK4PAPhvrYGjwGdpbOysqzQyicAL29ZeOBgDuMYGKXHhyr-j7ceOanZE0Vc8bDZmz_EXwgLj5qSdfNYqOusBFbxCneVJkezBAaIydW9P7sEP49I",
    overview: "Meridian Holdings operated 14 separate Salesforce orgs across different business units, leading to data silos and inconsistent customer experiences. We designed and executed a comprehensive org consolidation strategy, merging all units into a single multi-org architecture.",
    challenges: [
      "14 separate Salesforce orgs with conflicting data models",
      "Duplicate customer records across 200,000+ accounts",
      "Inconsistent business processes across divisions",
      "Complex regulatory requirements across multiple jurisdictions"
    ],
    solutions: [
      "Designed unified data model accommodating all business units",
      "Built automated data deduplication engine using ML",
      "Created configurable business process framework",
      "Implemented field-level security for regulatory compliance"
    ],
    results: [
      "Single source of truth for 200,000+ customer accounts",
      "Cross-sell revenue increased by 28% in first year",
      "IT operational costs reduced by $1.8M annually",
      "Customer NPS improved by 15 points"
    ]
  },
  'fluid-interface-design': {
    id: 5,
    title: "Fluid Interface Design",
    category: "Web",
    tag: "UI/UX",
    client: "Quantum Labs",
    year: "2023",
    description: "Macro photo of liquid glass textures flowing smoothly with reflected green accents.",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDjwtlnSdJekjrwfc3CodhnED13UeGnOKPjUKhGeP5LqNjz0gpelb61e6COPtT7Nr_cLshHaD5V9Ypb1O0xCsVivCv6B7wykRVDDyzgGQ354xJGi_AOu2lCKYf2t7r0hxOgRudHaf4A1ex2k_InyGGTudjfth1z94KSfGSxMiaehyKDGbZORmGcK6lKl29MzPCdIDVId8DHtzHxiH09OpWfINj4k5dWnnu0ZG7fZ5S1YmyzjyHHDjNS9HZOVAMqoBYVIm1QemEa8H4",
    overview: "Quantum Labs needed a complete UI/UX overhaul for their quantum computing dashboard. We designed a fluid, liquid-glass inspired interface that makes complex quantum state visualizations intuitive and accessible to researchers.",
    challenges: [
      "Complex quantum data visualization requirements",
      "Accessibility needs for researchers with varying technical backgrounds",
      "Real-time data rendering with sub-millisecond latency",
      "Cross-browser compatibility for WebGL visualizations"
    ],
    solutions: [
      "Designed fluid glass-morphism design system",
      "Built WebGL-powered 3D quantum state visualizer",
      "Implemented WCAG 2.2 AA compliant accessible components",
      "Created responsive canvas rendering with Web Workers"
    ],
    results: [
      "User task completion rate improved from 45% to 92%",
      "Average research workflow time reduced by 60%",
      "Accessibility audit score: 98/100",
      "Adopted by 3 national research laboratories"
    ]
  },
  'strategic-cloud-roadmap': {
    id: 6,
    title: "Strategic Cloud Roadmap",
    category: "Consulting",
    tag: "CONSULTING",
    client: "Atlas Enterprise Group",
    year: "2023",
    description: "A futuristic workspace with multiple monitors displaying lines of code and architectural blueprints.",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDey1sX7U_PHRbOqGnN5PgruTg9p0GDHYWDY0adJxE5FgEXXU-cjKtPdrVETqvzAxovazhWF4QkXID-SfhvjlwA1G04L7nfG_u5v7_gI94w4tUNBykcc_WLSa1TiCJ_xFN6u-Awiutjx51cuE_jXVUtiqXxh6k69JsgeUw9hEHZZ2VHRleeauW-fr9ryraVs7MjjMO_r2CtpijBsbxkqFj52-uIuLSVQmRxopXvtTbKFbdXf0lv6u4Qf8TKPAvjUIyX2SoHIK1QTtg",
    overview: "Atlas Enterprise Group engaged us to develop a 3-year cloud transformation roadmap. We conducted a comprehensive assessment of their current technology landscape, identified optimization opportunities, and delivered a phased migration strategy aligned with business objectives.",
    challenges: [
      "Legacy on-premise infrastructure reaching end-of-life",
      "Lack of cloud expertise within internal IT teams",
      "Complex compliance requirements across healthcare and finance",
      "Budget constraints requiring phased approach"
    ],
    solutions: [
      "Conducted comprehensive technology and process audit",
      "Designed 3-phase migration roadmap with clear milestones",
      "Created cloud center of excellence framework",
      "Developed ROI model and budget forecasting tool"
    ],
    results: [
      "3-year transformation roadmap delivered on schedule",
      "Projected $5.2M cost savings over 3 years",
      "Internal team cloud competency increased by 300%",
      "Zero compliance gaps identified in roadmap review"
    ]
  }
};

const slugMap = {
  1: 'nexus-core-optimization',
  2: 'aura-saas-platform',
  3: 'velocity-campaign-flow',
  4: 'enterprise-hub-integration',
  5: 'fluid-interface-design',
  6: 'strategic-cloud-roadmap'
};

const PortfolioDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const project = projects[id] || projects[slugMap[id]];

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-8 text-center">
        <h1 className="text-6xl font-bold font-headline tracking-tighter mb-6">Project Not Found</h1>
        <p className="text-on-surface-variant mb-10 text-lg">The requested project does not exist.</p>
        <Link to="/portfolio" className="cyber-gradient text-[#062100] px-10 py-4 rounded-md font-label font-black uppercase text-sm tracking-widest">
          Back to Portfolio
        </Link>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{project.title} | Portfolio | Anuhya Digital</title>
        <meta name="description" content={project.description} />
      </Helmet>

      <article className="px-8 py-24 md:py-40 max-w-screen-2xl mx-auto space-y-20">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-3 text-on-surface-variant hover:text-primary transition-all font-mono text-xs uppercase tracking-widest group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Back to Portfolio
        </button>

        <header className="space-y-8">
          <div className="flex flex-wrap gap-3">
            <span className="bg-primary/10 text-primary text-[0.65rem] px-4 py-1.5 rounded border border-primary/20 font-mono tracking-widest uppercase font-black">
              {project.category}
            </span>
            <span className="bg-surface-highest/60 text-on-surface-variant text-[0.65rem] px-4 py-1.5 rounded border border-outline-variant/20 font-mono tracking-widest uppercase font-black">
              {project.tag}
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold font-headline tracking-tighter leading-[0.9]">
            {project.title}
          </h1>
          <p className="text-on-surface-variant text-xl md:text-2xl font-light max-w-3xl leading-relaxed">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-8 pt-4 text-sm font-mono text-on-surface-variant/60 uppercase tracking-widest">
            <span>Client: {project.client}</span>
            <span>Year: {project.year}</span>
          </div>
        </header>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl overflow-hidden aspect-video"
        >
          <img
            src={project.img}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        </motion.div>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="max-w-4xl space-y-8"
        >
          <h2 className="text-3xl font-bold font-headline tracking-tight">Overview</h2>
          <p className="text-on-surface-variant text-lg leading-relaxed font-body">
            {project.overview}
          </p>
        </motion.section>

        <div className="grid md:grid-cols-3 gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <h3 className="text-xl font-bold font-headline text-primary uppercase tracking-wider">Challenges</h3>
            <ul className="space-y-4">
              {project.challenges.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-on-surface-variant text-sm font-body leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-6"
          >
            <h3 className="text-xl font-bold font-headline text-primary uppercase tracking-wider">Solutions</h3>
            <ul className="space-y-4">
              {project.solutions.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-on-surface-variant text-sm font-body leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            <h3 className="text-xl font-bold font-headline text-primary uppercase tracking-wider">Results</h3>
            <ul className="space-y-4">
              {project.results.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-on-surface-variant text-sm font-body leading-relaxed">
                  <CheckCircle size={16} className="text-primary mt-0.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <div className="pt-10 flex flex-col sm:flex-row gap-6">
          <Link
            to="/contact"
            className="cyber-gradient text-[#062100] px-12 py-5 rounded-md font-label font-black uppercase text-sm tracking-widest flex items-center justify-center gap-3 hover:scale-105 active:scale-95 transition-all shadow-[0_0_30px_rgba(173,255,133,0.2)]"
          >
            Start a Similar Project
            <ArrowUpRight size={18} />
          </Link>
          <Link
            to="/portfolio"
            className="border border-outline-variant/30 text-on-surface-variant px-12 py-5 rounded-md font-label font-black uppercase text-sm tracking-widest flex items-center justify-center gap-3 hover:border-primary hover:text-primary transition-all active:scale-95"
          >
            View All Projects
          </Link>
        </div>
      </article>
    </>
  );
};

export default PortfolioDetail;
