import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { ArrowUpRight, Filter } from 'lucide-react';

const projects = [
  { id: 'nexus-core-optimization', title: "Nexus Core Optimization", category: "Salesforce", tag: "FINTECH", description: "A full-scale architecture redesign for a global financial firm, increasing processing speed by 40%.", size: "large", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAxVxEdAiNClSGcLhaBxJLzzZYLAFcySoJQ2p1RGm8jpIxZOKULJp5c74QW_wnef-mdxWaLCsNfVVom-cj4gU4T4o4irlMmZuUnaHHP7KRi4AeaXMSidoQpOZpseFiFTEVe5iuku3fE7ul3Yq38fT_0I8yps5X0EaZnUMtYNAULuAFMGkO_yRGLhbXZ4reKVaQz-nyZU6ikd1dZHmsv7fcjnVH77LIsTFSpkKeucJ6M_9Q9ktr5MEj03Y6aonL-OAcxwpRBjfgimMg" },
  { id: 'aura-saas-platform', title: "Aura SaaS Platform", category: "Web", tag: "WEB DESIGN", description: "Modern minimalist website landing page layout with sleek typography and glassmorphic elements.", size: "small", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAyAKpmqFuVhWo-ZZJeuES2p0_HUn-qKu6ZqCCoMkenU3ArYCDkXxc0yHMsU1YOILSQIGqxQ-iGYN1v853FV_1J3BBoQGJWrwokgrWFaJzClJfQZqfqHTWXgDDeGU-6r_tlTRNrX-ke8QVRWNm0ntT1Cjnn7Hq3pb832r_7s0cfe3w8nbwCagj31zO6v80bYQ6xQRArGjGgy4SGhp_p7Z_acVVl3Drc9S46LscfB7gCP-nAtPichfpyAYRPorDN1zuKCNGU4CviHLI" },
  { id: 'velocity-campaign-flow', title: "Velocity Campaign Flow", category: "Marketing", tag: "MARKETING", description: "Abstract visualization of network nodes connecting with neon green light paths.", size: "small", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuA2mLEop8uKCtQaAq3WCYDMLAebtqgFj8RU1i2y04DySf6ZKf3qMtou8UxWBvsw19phvuIuGvskjw4ES2eRf4V5OeYrx7iI02SHCpZHnL26LrpBdQ8581RIJWgAJdvF9IVVgtzi9UjLLxcfGeEAnmpvCwOYBN4_QDMNLf-70zmFKs8wRJEK2M8lw-kRPpu1LKmocoZ3iMAIACwr78yXF9LOFvBQ0YugQo6MyVcWZkyHFPUWZOqAs_Xd-KWfzhr3RyhKTeKPq84x2E" },
  { id: 'enterprise-hub-integration', title: "Enterprise Hub Integration", category: "Salesforce", tag: "ECOSYSTEM", description: "Unifying 14 disparate business units into a singular, high-performance Salesforce instance.", size: "large", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDLDY7DUr03zGHFj37Vv5_84QQ-eZnXUjLWSU4HxlCe70ZU0pMp-jymQrsoFhk_AxBtJ25xJhi86v2u1OUVtkAdoFcGdHKFFjNyhuUUf2uxZ6FoKj3dEhsaB15qDs67Lunf8Gm5MHX5KsePzGiNXrPDnPYjHAnOJK4PAPhvrYGjwGdpbOysqzQyicAL29ZeOBgDuMYGKXHhyr-j7ceOanZE0Vc8bDZmz_EXwgLj5qSdfNYqOusBFbxCneVJkezBAaIydW9P7sEP49I" },
  { id: 'fluid-interface-design', title: "Fluid Interface Design", category: "Web", tag: "UI/UX", description: "Macro photo of liquid glass textures flowing smoothly with reflected green accents.", size: "medium", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDjwtlnSdJekjrwfc3CodhnED13UeGnOKPjUKhGeP5LqNjz0gpelb61e6COPtT7Nr_cLshHaD5V9Ypb1O0xCsVivCv6B7wykRVDDyzgGQ354xJGi_AOu2lCKYf2t7r0hxOgRudHaf4A1ex2k_InyGGTudjfth1z94KSfGSxMiaehyKDGbZORmGcK6lKl29MzPCdIDVId8DHtzHxiH09OpWfINj4k5dWnnu0ZG7fZ5S1YmyzjyHHDjNS9HZOVAMqoBYVIm1QemEa8H4" },
  { id: 'strategic-cloud-roadmap', title: "Strategic Cloud Roadmap", category: "Consulting", tag: "CONSULTING", description: "A futuristic workspace with multiple monitors displaying lines of code and architectural blueprints.", size: "medium", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDey1sX7U_PHRbOqGnN5PgruTg9p0GDHYWDY0adJxE5FgEXXU-cjKtPdrVETqvzAxovazhWF4QkXID-SfhvjlwA1G04L7nfG_u5v7_gI94w4tUNBykcc_WLSa1TiCJ_xFN6u-Awiutjx51cuE_jXVUtiqXxh6k69JsgeUw9hEHZZ2VHRleeauW-fr9ryraVs7MjjMO_r2CtpijBsbxkqFj52-uIuLSVQmRxopXvtTbKFbdXf0lv6u4Qf8TKPAvjUIyX2SoHIK1QTtg" }
];

const Portfolio = () => {
  const [filter, setFilter] = useState('All');
  const categories = ['All', 'Salesforce', 'Web', 'Marketing', 'Consulting'];
  const filteredProjects = filter === 'All' ? projects : projects.filter(p => p.category === filter);

  return (
    <>
      <Helmet>
        <title>Portfolio | Selected Innovations | Anuhya Digital</title>
        <meta name="description" content="Explore Anuhya Digital's portfolio of selected innovations." />
      </Helmet>

      <section className="px-8 py-24 md:py-40 max-w-screen-2xl mx-auto space-y-20">
        <header className="space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">
            <div className="max-w-2xl space-y-6">
              <span className="font-mono text-primary text-xs tracking-[0.4em] uppercase mb-4 block">Case Studies & Craft</span>
              <h1 className="text-6xl md:text-8xl font-bold font-headline tracking-tighter leading-[0.85]">
                Selected <br /> <span className="neon-gradient-text italic">Innovations</span>
              </h1>
            </div>
            <p className="text-on-surface-variant max-w-md text-xl font-light leading-relaxed border-l border-outline-variant/30 pl-8">
              A decade of precision in Salesforce cloud solutions, high-performance web platforms, and automated marketing ecosystems.
            </p>
          </div>

          <div className="flex flex-wrap gap-4 items-center pt-8 border-t border-outline-variant/10">
            <Filter size={16} className="text-primary/50 mr-4" />
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-8 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-all duration-300 ${filter === cat ? 'bg-primary text-[#062100] shadow-[0_0_20px_rgba(173,255,133,0.3)]' : 'bg-surface-high text-on-surface-variant hover:bg-surface-highest hover:text-primary border border-outline-variant/20'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </header>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className={`group relative overflow-hidden rounded-xl bg-surface-high border border-outline-variant/10 ${project.size === 'large' ? 'md:col-span-8' : project.size === 'medium' ? 'md:col-span-6' : 'md:col-span-4'}`}
              >
                <Link to={`/portfolio/${project.id}`} className="block">
                  <div className={`w-full overflow-hidden ${project.size === 'large' ? 'aspect-[16/9]' : project.size === 'medium' ? 'aspect-video' : 'aspect-[4/5]'}`}>
                    <img src={project.img} alt={project.title} className="w-full h-full object-cover grayscale brightness-50 group-hover:grayscale-0 group-hover:brightness-100 group-hover:scale-105 transition-all duration-1000" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                  <div className="absolute bottom-0 left-0 p-10 w-full space-y-4 transform transition-transform duration-500 group-hover:translate-y-[-10px]">
                    <div className="flex gap-2">
                      <span className="bg-primary/10 text-primary text-[0.6rem] px-3 py-1 rounded border border-primary/20 font-mono tracking-widest uppercase font-black">{project.category}</span>
                      <span className="bg-surface-highest/60 text-on-surface-variant text-[0.6rem] px-3 py-1 rounded border border-outline-variant/20 font-mono tracking-widest uppercase font-black">{project.tag}</span>
                    </div>
                    <h3 className="text-3xl font-bold font-headline">{project.title}</h3>
                    <p className="text-on-surface-variant text-sm max-w-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 leading-relaxed font-body">{project.description}</p>
                  </div>
                  <motion.div initial={{ opacity: 0, x: 10, y: -10 }} whileHover={{ opacity: 1, x: 0, y: 0 }} className="absolute top-8 right-8">
                    <div className="w-14 h-14 rounded-full cyber-gradient text-[#062100] flex items-center justify-center shadow-2xl">
                      <ArrowUpRight size={24} />
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>
    </>
  );
};

export default Portfolio;
