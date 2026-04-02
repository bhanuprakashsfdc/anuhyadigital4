import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, CheckCircle2, Cpu, Globe, Zap, ShieldCheck } from 'lucide-react';

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Anuhya Digital | Premier Salesforce & Web Consulting</title>
        <meta name="description" content="Anuhya Digital: 10 years of expert Salesforce consulting and high-performance web development. Your reliable digital partner for transformation." />
      </Helmet>

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0" aria-hidden="true">
          <div className="absolute inset-0 bg-surface/40 backdrop-blur-[2px]" />
          <img 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBSu3MXtIREmbgLMt0YLKFN7h-VQ6v24UOSa74FIl86iusk8vW_7iHGEoHO7YrStBU_er0E1Mgvu4dlczgc5dAQf5Ei-jjAwHJybEo_G4DQjvPLUaC96grq8ZU0BvLpeQDTyAmGL7hePcRXqDky3eIjIxjbBx2Gp93s9OgSvnlnklB9tAlo5_wKCPFMyrltL1Bkyk2e9YlWPlfaoukBLTqikgoA9_G7sSetYQ1-K7OFXCjFiIDlm8uiuCcZarKmL3gFav89E6vVLHc" 
            alt="" 
            loading="lazy"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-surface via-transparent to-surface" />
        </div>

        <div className="max-w-screen-2xl mx-auto px-8 relative z-10 grid lg:grid-cols-2 gap-20 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-10"
          >
            <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-surface-container-low border border-outline-variant/15 rounded-full hover:border-primary/40 transition-colors cursor-default">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" aria-hidden="true" />
              <span className="text-[0.65rem] font-bold font-label uppercase tracking-[0.2em] text-on-surface/70">Salesforce Certified Partner</span>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-bold font-headline leading-[0.85] tracking-tighter">
              Transform <br /> Your <span className="neon-gradient-text italic">Business</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-on-surface-variant font-body font-light max-w-xl leading-relaxed">
              Precision engineering for the digital age. 10 years of Salesforce mastery and high-performance ecosystems.
            </p>
            
            <div className="flex flex-wrap gap-6 pt-6">
              <Link to="/contact" className="px-10 py-5 bg-gradient-to-br from-primary to-[#2a7302] text-[#062100] font-label font-black uppercase text-sm tracking-widest rounded-md hover:scale-105 transition-all shadow-[0_0_30px_rgba(173,255,133,0.3)] active:scale-95 inline-flex items-center min-h-[44px]">
                Start Your Journey
              </Link>
              <Link to="/portfolio" className="px-10 py-5 border border-outline-variant/30 text-primary font-label font-black uppercase text-sm tracking-widest rounded-md hover:bg-primary/10 transition-all inline-flex items-center min-h-[44px]">
                View Showcase
              </Link>
            </div>
          </motion.div>

          {/* Abstract Glass Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, rotate: 5 }}
            animate={{ opacity: 1, scale: 1, rotate: 3 }}
            whileHover={{ rotate: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="hidden lg:block relative"
            aria-hidden="true"
          >
            <div className="glass-panel border border-outline-variant/20 rounded-xl p-10 shadow-2xl space-y-8">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-error" />
                <div className="w-3 h-3 rounded-full bg-secondary" />
                <div className="w-3 h-3 rounded-full bg-primary" />
              </div>
              <div className="font-mono text-sm leading-relaxed text-on-surface/80">
                <p className="text-primary"><span className="text-secondary">const</span> innovation = <span className="text-secondary">true</span>;</p>
                <p className="ml-4">if (innovation) {'{'}</p>
                <p className="ml-8 text-primary">optimizeSystems();</p>
                <p className="ml-8 text-primary">scaleImpact();</p>
                <p className="ml-4">{'}'}</p>
              </div>
              <div className="h-[1px] bg-outline-variant/10" />
              <div className="flex justify-between items-center text-[0.6rem] uppercase tracking-widest font-black text-on-surface-variant">
                <span>Status: Optimal</span>
                <span>Latency: 14ms</span>
              </div>
            </div>
            
            <div className="absolute -top-10 -right-10 w-40 h-40 opacity-10 pointer-events-none">
              <div className="grid grid-cols-4 gap-4">
                {[...Array(16)].map((_, i) => (
                  <div key={i} className={`w-2 h-2 rounded-full ${i % 3 === 0 ? 'bg-primary' : 'bg-outline-variant'}`} />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trusted By */}
      <section className="py-20 surface-low" aria-label="Trusted by">
        <div className="max-w-screen-2xl mx-auto px-8">
          <p className="text-center font-headline font-bold text-[0.65rem] uppercase tracking-[0.4em] text-on-surface-variant mb-12">Engineered solutions for market leaders</p>
          <div className="flex flex-wrap justify-around items-center gap-16 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-700">
            {['CloudCore', 'Vertex', 'Nexus.io', 'Quantum', 'Flux'].map((brand) => (
              <span key={brand} className="text-3xl font-black font-headline tracking-tighter cursor-default">{brand}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid (Bento Style) */}
      <section className="py-32 bg-surface">
        <div className="max-w-screen-2xl mx-auto px-8 space-y-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">
            <div className="max-w-2xl space-y-6">
              <h2 className="text-5xl md:text-6xl font-bold font-headline">Precision <span className="text-primary italic">Specialization</span></h2>
              <p className="text-lg text-on-surface-variant font-body">Architecting digital futures with the most robust tools in the technology ecosystem.</p>
            </div>
            <Link to="/services" className="group flex items-center gap-3 text-primary font-black uppercase tracking-widest text-xs hover:gap-5 transition-all min-h-[44px]">
              Explore All Capabilities
              <ArrowRight size={18} />
            </Link>
          </div>

          <div className="grid md:grid-cols-12 gap-8">
            {/* Salesforce Card */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="md:col-span-8 surface-high p-12 rounded-xl border border-outline-variant/10 group transition-all"
            >
              <div className="flex flex-col h-full gap-12">
                <Cpu size={48} className="text-primary group-hover:scale-110 transition-transform" strokeWidth={1} aria-hidden="true" />
                <div className="space-y-4">
                  <h3 className="text-4xl font-bold">Salesforce Consulting</h3>
                  <p className="text-on-surface-variant max-w-xl leading-relaxed">
                    End-to-end implementation and optimization. Masterful Apex development, LWC components, and seamless Flow automation.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4 text-xs font-black uppercase tracking-widest text-on-surface-variant pt-8 border-t border-outline-variant/10">
                  <div className="flex items-center gap-3"><CheckCircle2 size={16} className="text-primary" aria-hidden="true" /> CPQ & Billing</div>
                  <div className="flex items-center gap-3"><CheckCircle2 size={16} className="text-primary" aria-hidden="true" /> Health Cloud</div>
                  <div className="flex items-center gap-3"><CheckCircle2 size={16} className="text-primary" aria-hidden="true" /> Marketing Cloud</div>
                  <div className="flex items-center gap-3"><CheckCircle2 size={16} className="text-primary" aria-hidden="true" /> Experience Cloud</div>
                </div>
              </div>
            </motion.div>

            {/* Web Dev Card */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="md:col-span-4 surface-high p-12 rounded-xl border border-outline-variant/10 group flex flex-col justify-between"
            >
              <Zap size={48} className="text-primary group-hover:scale-110 transition-transform" strokeWidth={1} aria-hidden="true" />
              <div className="space-y-4 mt-12">
                <h3 className="text-3xl font-bold">Web Mastery</h3>
                <p className="text-on-surface-variant text-sm leading-relaxed">
                  Headless architectures and custom SaaS applications built for extreme speed and infinite scalability.
                </p>
              </div>
              <div className="pt-8 mt-8 border-t border-outline-variant/10">
                <span className="font-mono text-[0.6rem] text-primary uppercase tracking-[0.2em]">Next.js / AWS / GraphQL</span>
              </div>
            </motion.div>

            {/* SEO Card */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="md:col-span-4 surface-high p-12 rounded-xl border border-outline-variant/10 group flex flex-col justify-between"
            >
              <Globe size={48} className="text-primary group-hover:scale-110 transition-transform" strokeWidth={1} aria-hidden="true" />
              <div className="space-y-4 mt-12">
                <h3 className="text-3xl font-bold">SEO Authority</h3>
                <p className="text-on-surface-variant text-sm leading-relaxed">
                  Technical SEO that prioritizes core vitals and semantic relevance to dominate organic search.
                </p>
              </div>
              <div className="pt-8 mt-8 border-t border-outline-variant/10">
                <span className="font-mono text-[0.6rem] text-primary uppercase tracking-[0.2em]">Data-Driven Strategy</span>
              </div>
            </motion.div>

            {/* Strategy Card */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="md:col-span-8 surface-low p-12 rounded-xl border border-outline-variant/10 group flex items-start justify-between gap-12"
            >
              <div className="space-y-8 flex-1">
                <ShieldCheck size={48} className="text-primary" strokeWidth={1} aria-hidden="true" />
                <div className="space-y-4">
                  <h3 className="text-3xl font-bold">Modern Marketing Ops</h3>
                  <p className="text-on-surface-variant text-sm leading-relaxed">
                    Integrating your marketing stack directly with Salesforce for 360-degree visibility into ROI and customer journeys.
                  </p>
                </div>
              </div>
              <div className="hidden lg:block w-1/3 aspect-video bg-surface-container-highest rounded-lg overflow-hidden grayscale brightness-50 group-hover:grayscale-0 transition-all duration-700" aria-hidden="true">
                <div className="w-full h-full bg-gradient-to-br from-primary/20 to-transparent flex items-center justify-center">
                  <div className="w-16 h-[2px] bg-primary/30 rotate-45" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-32 surface-low" aria-label="Testimonials">
        <div className="max-w-screen-2xl mx-auto px-8 space-y-20">
          <div className="text-center space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold">Voices of <span className="text-primary">Precision</span></h2>
            <div className="w-20 h-1 cyber-gradient mx-auto opacity-30" aria-hidden="true" />
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                text: "Anuhya Digital transformed our Salesforce mess into a streamlined engine. Their technical depth in Apex is unmatched.",
                author: "Sarah Jenkins",
                role: "CTO, CloudScale Systems"
              },
              {
                text: "Their web team built us a storefront that increased mobile conversions by 140%. True architects of the digital space.",
                author: "Marcus Chen",
                role: "Founder, Nexus Retail"
              },
              {
                text: "The SEO strategy wasn't just keywords; it was authority. 300% growth in organic traffic over the last year.",
                author: "David Miller",
                role: "Head of Growth, FinTech Hub"
              }
            ].map((t, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -5 }}
                className="glass-panel p-10 rounded-xl border border-outline-variant/10 space-y-10 relative"
              >
                <div className="absolute top-6 right-8 opacity-10" aria-hidden="true">
                  <Zap size={64} className="text-primary" />
                </div>
                <blockquote className="text-on-surface-variant italic leading-relaxed text-lg">"{t.text}"</blockquote>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full border-2 border-primary/20 overflow-hidden surface-highest flex items-center justify-center">
                    <span className="text-primary font-headline font-bold text-lg">{t.author.split(' ').map(n => n[0]).join('')}</span>
                  </div>
                  <div>
                    <h4 className="font-headline font-bold text-sm tracking-tight">{t.author}</h4>
                    <p className="text-[0.65rem] font-black uppercase tracking-widest text-on-surface-variant/70">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-40 relative overflow-hidden bg-surface">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5" aria-hidden="true" />
        <div className="max-w-screen-2xl mx-auto px-8 relative z-10 text-center space-y-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-8xl font-bold font-headline tracking-tighter"
          >
            Ready to <span className="neon-gradient-text italic">Evolve?</span>
          </motion.h2>
          <p className="text-xl text-on-surface-variant max-w-2xl mx-auto font-body">
            Leveraging Salesforce expertise and digital precision to lead your market. No obligations, just growth.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-10">
            <Link to="/contact" className="px-14 py-6 cyber-gradient text-[#062100] font-label font-black uppercase text-lg tracking-[0.15em] rounded-md hover:scale-105 transition-all shadow-[0_0_60px_rgba(173,255,133,0.2)] inline-flex items-center min-h-[44px]">
              Transform Now
            </Link>
            <div className="flex items-center gap-4 text-on-surface-variant/40" aria-hidden="true">
              <div className="w-12 h-[1px] bg-outline-variant" />
              <span className="font-mono text-xs uppercase tracking-widest">v2.0.44 Stable</span>
              <div className="w-12 h-[1px] bg-outline-variant" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
