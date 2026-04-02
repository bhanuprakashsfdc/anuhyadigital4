import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Calendar, Clock, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

const posts = [
  { id: 'aura-component-performance', title: "Aura Component Performance in Large-Scale Orgs", category: "Special Report", readTime: "12 MIN READ", author: "Raghav Anuhya", role: "Principal Architect", date: "OCT 24, 2023", excerpt: "Navigating the complexities of legacy Aura components in high-traffic environments. We break down memory leak patterns and DOM optimization strategies used by elite Salesforce Architects.", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAr-dRTZC8d_OCOYQsDG3F7sPnasNA_EAv58Ngz6vknvkkaDuDx-m4DNFtRIkf1rsAh16fmLAyRWH6BYjMcNUUIPEmI39bb1TYXSTHCAIkvVyUhA5CRuBoerXTeJ19lfApWhHK8u8b-SpVqHDYa6Q4mjgozOuGXH1KugZ9yMww3ZH3shb0s3X8oivpLzLW8HVtaXM-phrnOLnU6-PCRRRdMRX4zq1iO7tlgFc8bn1BF5XgQYzVP44Zg7oOuTiaaT2zQPFPKu5EelnI", featured: true },
  { id: 'salesforce-lightning-web-components', title: "Salesforce Lightning Web Components: The Shadow DOM Revolution", category: "LWC DEVELOPMENT", readTime: "10 MIN READ", date: "OCT 24, 2023", excerpt: "Why standardizing on web standards isn't just about code portability—it's about future-proofing your entire enterprise stack.", wide: true },
  { id: 'shield-platform-encryption', title: "Shield Platform Encryption Decoded", category: "Security", readTime: "4 MIN READ", date: "OCT 12, 2023", excerpt: "Protecting PII without sacrificing searchability. A technical deep dive into deterministic encryption patterns.", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBmQHaNdM2n98GvtgV_PfXhz8gXMeJg3K3KoEMpFkGem4r9MdZQRMtUgSUvwDco50hasyAY9H3WCOSwcBLAVHIUMzpQrkHNKUqBGWa8t6fkLPkOGSSQb5GSoltPO6pV8rh7-80DcD07njrOzFFZ_Ke74nvN0RegiW49cixE_r0dAtJikDnu0gYdnAMXMLi4E77oDfIpmlZJlFe36MjJfn7tbFek7XY1UVjVzzU5pY0kcuRn8NunRPzh_7f9ulZRptSVvCa-VSC5LMQ" },
  { id: 'salesforce-dx-beyond-basics', title: "Salesforce DX: Beyond the Basics", category: "DevOps", readTime: "8 MIN READ", date: "SEP 28, 2023", excerpt: "Transitioning to package-based development. Why your source-of-truth needs to live outside of your sandbox." },
  { id: 'event-driven-architectures', title: "Event-Driven Architectures with Platform Events", category: "Integration", readTime: "6 MIN READ", date: "SEP 15, 2023", excerpt: "Reducing coupled dependencies using pub/sub patterns within the Salesforce ecosystem." },
  { id: 'multi-org-dilemma', title: "The Multi-Org Dilemma: Consolidation vs. Coexistence", category: "Architecture", readTime: "10 MIN READ", date: "AUG 30, 2023", excerpt: "When to merge and when to manage. A strategic framework for global enterprise deployments." }
];

const Blog = () => {
  return (
    <>
      <Helmet>
        <title>Knowledge Hub | Architecting Insights | Anuhya Digital</title>
        <meta name="description" content="Deep dives into Salesforce architecture, performance tuning, and the future of enterprise cloud development." />
      </Helmet>

      <section className="px-8 py-24 md:py-40 max-w-screen-2xl mx-auto space-y-24">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-10">
          <div className="max-w-3xl space-y-6">
            <span className="font-mono text-primary text-xs tracking-[0.4em] uppercase mb-4 block">Knowledge Hub</span>
            <h1 className="text-6xl md:text-8xl font-bold font-headline tracking-tighter leading-[0.85]">
              Architecting <br /> <span className="neon-gradient-text italic">Insights.</span>
            </h1>
            <p className="text-on-surface-variant text-xl md:text-2xl font-light max-w-xl leading-relaxed">
              Deep dives into Salesforce architecture, performance tuning, and the future of enterprise cloud development.
            </p>
          </div>
          <div className="flex gap-4 items-center pb-2 opacity-50">
            <div className="w-12 h-[1px] bg-outline-variant" />
            <span className="font-mono text-[0.6rem] tracking-widest uppercase">v2.0_STABLE</span>
          </div>
        </header>

        {posts.filter(p => p.featured).map(post => (
          <Link key={post.id} to={`/blog/${post.id}`}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="relative group cursor-pointer overflow-hidden rounded-2xl surface-low h-[600px] flex items-center border border-outline-variant/10"
            >
              <div className="absolute inset-0 opacity-40 group-hover:scale-105 transition-transform duration-1000">
                <img src={post.img} alt={post.title} className="w-full h-full object-cover grayscale" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-surface via-surface/80 to-transparent" />
              <div className="relative z-10 p-12 md:p-24 max-w-3xl space-y-10">
                <div className="flex items-center gap-4">
                  <span className="bg-primary/10 text-primary text-[0.65rem] font-black px-4 py-1.5 rounded tracking-widest uppercase border border-primary/20">{post.category}</span>
                  <span className="text-on-surface-variant/50 font-mono text-[0.65rem] tracking-widest uppercase flex items-center gap-2"><Clock size={12} /> {post.readTime}</span>
                </div>
                <h2 className="text-5xl md:text-6xl font-headline font-bold leading-[0.9] tracking-tighter group-hover:text-primary transition-colors">{post.title}</h2>
                <p className="text-on-surface-variant text-lg font-light leading-relaxed max-w-xl">{post.excerpt}</p>
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 rounded-full border border-primary/30 overflow-hidden surface-high">
                    <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAoKUJr8vg5_sJ0QeImgkHXsEl4TzRgP6Yklta2a3yfnmedvHeKlZ3w2nHflh-IzP5RwcNPV_5SWHUwxJXWhKa5n0taau5TYkx2G7ZMevnHC2tWYRfWbMdwgHVibiMoRqEu-sPOqF1D7B8lp7Pq-8ZMDyyReIj_H7Zf6CozWO3dNPR0RVZ22O_noO0xafeUvvspyf-Q7flaDQtcN8WsVQ2w-ubdt3rEHPQQ_6AruE2DVAKhfV_Uy7yOPR9P06LBpuKS01MDzYloSdo" alt={post.author} className="w-full h-full object-cover grayscale" />
                  </div>
                  <div>
                    <p className="text-lg font-bold font-headline">{post.author}</p>
                    <p className="text-xs text-on-surface-variant font-mono uppercase tracking-widest">{post.role}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </Link>
        ))}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {posts.filter(p => !p.featured).map((post, i) => (
            <Link key={post.id} to={`/blog/${post.id}`}>
              <motion.article
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`group relative surface-high rounded-xl p-10 flex flex-col justify-between border border-outline-variant/10 hover:border-primary/30 transition-all duration-500 cursor-pointer ${post.wide ? 'md:col-span-2' : ''}`}
              >
                <div className="space-y-8">
                  {post.img && (
                    <div className="mb-6 h-48 rounded-lg overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700 surface-highest">
                      <img src={post.img} alt={post.title} className="w-full h-full object-cover" />
                    </div>
                  )}
                  <div className="flex justify-between items-start">
                    <span className="font-mono text-[0.65rem] font-bold tracking-[0.2em] text-primary uppercase">{post.category}</span>
                    <span className="font-mono text-[0.6rem] text-on-surface-variant/40">#INSIGHT_0{post.id}</span>
                  </div>
                  <h3 className={`font-headline font-bold leading-tight group-hover:translate-x-2 transition-transform duration-500 ${post.wide ? 'text-4xl' : 'text-2xl'}`}>{post.title}</h3>
                  <p className="text-on-surface-variant font-body text-sm leading-relaxed line-clamp-3">{post.excerpt}</p>
                </div>
                <div className="mt-12 pt-8 border-t border-outline-variant/10 flex justify-between items-center">
                  <div className="flex items-center gap-3 text-[0.65rem] font-mono text-on-surface-variant/60 uppercase tracking-widest">
                    <Calendar size={12} />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center gap-2 group-hover:text-primary transition-colors text-[0.65rem] font-black uppercase tracking-widest text-on-surface-variant">
                    Read More
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </motion.article>
            </Link>
          ))}
        </div>

        <div className="flex justify-center items-center gap-6 pt-10">
          <button aria-label="Previous page" disabled className="w-14 h-14 rounded-full border border-outline-variant/30 flex items-center justify-center text-on-surface-variant/40 cursor-not-allowed transition-all"><ChevronLeft size={24} /></button>
          <div className="flex items-center gap-4">
            <span className="font-headline text-2xl font-black text-primary border-b-2 border-primary pb-1">01</span>
          </div>
          <button aria-label="Next page" disabled className="w-14 h-14 rounded-full border border-outline-variant/30 flex items-center justify-center text-on-surface-variant/40 cursor-not-allowed transition-all"><ChevronRight size={24} /></button>
        </div>
      </section>
    </>
  );
};

export default Blog;
