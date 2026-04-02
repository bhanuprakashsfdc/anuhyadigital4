import React from 'react';
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
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-surface/40 backdrop-blur-[2px]" />
          <img 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBSu3MXtIREmbgLMt0YLKFN7h-VQ6v24UOSa74FIl86iusk8vW_7iHGEoHO7YrStBU_er0E1Mgvu4dlczgc5dAQf5Ei-jjAwHJybEo_G4DQjvPLUaC96grq8ZU0BvLpeQDTyAmGL7hePcRXqDky3eIjIxjbBx2Gp93s9OgSvnlnklB9tAlo5_wKCPFMyrltL1Bkyk2e9YlWPlfaoukBLTqikgoA9_G7sSetYQ1-K7OFXCjFiIDlm8uiuCcZarKmL3gFav89E6vVLHc" 
            alt="Anuhya Digital Background" 
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
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-[0.65rem] font-bold font-label uppercase tracking-[0.2em] text-on-surface/70">Salesforce Certified Partner</span>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-bold font-headline leading-[0.85] tracking-tighter">
              Transform <br /> Your <span className="neon-gradient-text italic">Business</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-on-surface-variant font-body font-light max-w-xl leading-relaxed">
              Precision engineering for the digital age. 10 years of Salesforce mastery and high-performance ecosystems.
            </p>
            
            <div className="flex flex-wrap gap-6 pt-6">
              <button className="px-10 py-5 bg-gradient-to-br from-primary to-[#2a7302] text-[#062100] font-label font-black uppercase text-sm tracking-widest rounded-md hover:scale-105 transition-all shadow-[0_0_30px_rgba(173,255,133,0.3)] active:scale-95">
                Start Your Journey
              </button>
              <button className="px-10 py-5 border border-outline-variant/30 text-primary font-label font-black uppercase text-sm tracking-widest rounded-md hover:bg-primary/10 transition-all">
                View Showcase
              </button>
            </div>
          </motion.div>

          {/* Abstract Glass Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, rotate: 5 }}
            animate={{ opacity: 1, scale: 1, rotate: 3 }}
            whileHover={{ rotate: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="hidden lg:block relative"
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
      <section className="py-20 surface-low">
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
            <button className="group flex items-center gap-3 text-primary font-black uppercase tracking-widest text-xs hover:gap-5 transition-all">
              Explore All Capabilities
              <ArrowRight size={18} />
            </button>
          </div>

          <div className="grid md:grid-cols-12 gap-8">
            {/* Salesforce Card */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="md:col-span-8 surface-high p-12 rounded-xl border border-outline-variant/10 group transition-all"
            >
              <div className="flex flex-col h-full gap-12">
                <Cpu size={48} className="text-primary group-hover:scale-110 transition-transform" strokeWidth={1} />
                <div className="space-y-4">
                  <h3 className="text-4xl font-bold">Salesforce Consulting</h3>
                  <p className="text-on-surface-variant max-w-xl leading-relaxed">
                    End-to-end implementation and optimization. Masterful Apex development, LWC components, and seamless Flow automation.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4 text-xs font-black uppercase tracking-widest text-on-surface-variant pt-8 border-t border-outline-variant/10">
                  <div className="flex items-center gap-3"><CheckCircle2 size={16} className="text-primary" /> CPQ & Billing</div>
                  <div className="flex items-center gap-3"><CheckCircle2 size={16} className="text-primary" /> Health Cloud</div>
                  <div className="flex items-center gap-3"><CheckCircle2 size={16} className="text-primary" /> Marketing Cloud</div>
                  <div className="flex items-center gap-3"><CheckCircle2 size={16} className="text-primary" /> Experience Cloud</div>
                </div>
              </div>
            </motion.div>

            {/* Web Dev Card */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="md:col-span-4 surface-high p-12 rounded-xl border border-outline-variant/10 group flex flex-col justify-between"
            >
              <Zap size={48} className="text-primary group-hover:scale-110 transition-transform" strokeWidth={1} />
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
              <Globe size={48} className="text-primary group-hover:scale-110 transition-transform" strokeWidth={1} />
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
                <ShieldCheck size={48} className="text-primary" strokeWidth={1} />
                <div className="space-y-4">
                  <h3 className="text-3xl font-bold">Modern Marketing Ops</h3>
                  <p className="text-on-surface-variant text-sm leading-relaxed">
                    Integrating your marketing stack directly with Salesforce for 360-degree visibility into ROI and customer journeys.
                  </p>
                </div>
              </div>
              <div className="hidden lg:block w-1/3 aspect-video bg-surface-container-highest rounded-lg overflow-hidden grayscale brightness-50 group-hover:grayscale-0 transition-all duration-700">
                <div className="w-full h-full bg-gradient-to-br from-primary/20 to-transparent flex items-center justify-center">
                  <div className="w-16 h-[2px] bg-primary/30 rotate-45" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-32 surface-low">
        <div className="max-w-screen-2xl mx-auto px-8 space-y-20">
          <div className="text-center space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold">Voices of <span className="text-primary">Precision</span></h2>
            <div className="w-20 h-1 cyber-gradient mx-auto opacity-30" />
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                text: "Anuhya Digital transformed our Salesforce mess into a streamlined engine. Their technical depth in Apex is unmatched.",
                author: "Sarah Jenkins",
                role: "CTO, CloudScale Systems",
                img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDOjNRVQna52E1jc8BX7k79FSDeYbkvU7ILRuMo_9VztIh2KCmwDsx8QYAMgvDs75_ItJbYJGrkdETnctKEmmg3HKyUEJDo-An50fysiDqogWpDtThYy4ojvpAukRThi9LrgmCkhmlnZWxIOrBjBBeNRzHluXpHcSrzHPybI7BZJT1g3WOQMkikyE8wntLCMGBNRry-sMFKCIp-8t2zlTBMDWXGVSu-CMO-y1QpfuZ6pfKJXmwQQtA-ERGRUOGnoo9UJGCTXjDaXuE"
              },
              {
                text: "Their web team built us a storefront that increased mobile conversions by 140%. True architects of the digital space.",
                author: "Marcus Chen",
                role: "Founder, Nexus Retail",
                img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDvnyGuvs-JJL3lfgQXFtf_dOtbOtfvtpc2mClWTLb0oSfeID3Zb4YAJUIpe4K6wvm14XUQKec27FKs-P09yOzDKtyliwETH-N9iss5tLk75-1eOCHlocDjR57AGLqM7fzZ_Z6BhX-WIWtqk4i7LomCnw5QVc47Y79mgZeeWgiDjn2buglUR2kX1OJpEnXWLZP-JnpfxHuLM6Ps85BSQqQyVViqTdkHdLQ5yBQtlAKmIFwpQ0d5_zhV1gS6pfpAImIoMc4kZinFkko"
              },
              {
                text: "The SEO strategy wasn't just keywords; it was authority. 300% growth in organic traffic over the last year.",
                author: "David Miller",
                role: "Head of Growth, FinTech Hub",
                img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC8lhJbxhbNVUwQotx6VbxCM-tTuxokT9uA6VhPlSViWjEMEK3TJjCov2jU8Uakigib273--4b8LM-ZM0lFNlSHAbYSbtxO3G_pz7hj7uksLmLZHXPWiGlz6ijCXJEncMU8c0vQ6K2ijkbaNC5ojsoGRH66Ck39mOnAylt5eeEPibnq1GHwJypgdVxM8SS-VXsxLEFROIyPPdxd0A6GRVm4rgJm7ZgifEuD8DTUz0tH6dLY6kAfMqTrO2LB5lf2pdUHfcwY9T8BhLs"
              }
            ].map((t, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -5 }}
                className="glass-panel p-10 rounded-xl border border-outline-variant/10 space-y-10 relative"
              >
                <div className="absolute top-6 right-8 opacity-10">
                  <Zap size={64} className="text-primary" />
                </div>
                <p className="text-on-surface-variant italic leading-relaxed text-lg">"{t.text}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full border-2 border-primary/20 overflow-hidden">
                    <img src={t.img} alt={t.author} className="w-full h-full object-cover" />
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
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5" />
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
            <button className="px-14 py-6 cyber-gradient text-[#062100] font-label font-black uppercase text-lg tracking-[0.15em] rounded-md hover:scale-105 transition-all shadow-[0_0_60px_rgba(173,255,133,0.2)]">
              Transform Now
            </button>
            <div className="flex items-center gap-4 text-on-surface-variant/40">
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
