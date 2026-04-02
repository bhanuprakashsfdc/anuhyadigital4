import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Cloud, Terminal, Bolt, BarChart, Shield, ArrowRight, CheckCircle } from 'lucide-react';

const Services = () => {
  const coreCompetencies = [
    {
      title: "Salesforce Consulting",
      icon: Cloud,
      color: "primary",
      services: [
        {
          title: "Implementation & Strategy",
          text: "Strategic setup of Sales Cloud, Service Cloud, and Industry-specific solutions tailored to your unique business flows."
        },
        {
          title: "Managed Support",
          text: "Ongoing administration, security audits, and feature enhancements to maximize your CRM investment."
        },
        {
          title: "Lightning Web Components",
          text: "Custom high-performance UI components built on modern standards for a seamless user experience."
        }
      ]
    },
    {
      title: "Web Development",
      icon: Terminal,
      color: "secondary",
      services: [
        {
          title: "MERN Stack Mastery",
          text: "End-to-end fullstack development using MongoDB, Express, React, and Node.js for scalable web applications."
        },
        {
          title: "Cloud Solutions",
          text: "Architecting resilient infrastructure on AWS and Azure with a focus on high availability and microservices."
        },
        {
          title: "Performance Optimization",
          text: "Auditing legacy systems to reduce latency and technical debt, ensuring your platform stays competitive."
        }
      ]
    }
  ];

  const advantages = [
    {
      title: "Decade of Experience",
      text: "Our lead architects bring 10+ years of Salesforce expertise to every project, ensuring you avoid pitfalls.",
      icon: "history_edu",
      wide: true
    },
    {
      title: "Agile Precision",
      text: "Rapid deployment cycles without compromising on the integrity of your codebase.",
      icon: "bolt"
    },
    {
      title: "System Interoperability",
      text: "We specialize in making disparate systems talk to each other through robust API architecture.",
      icon: "hub"
    },
    {
      title: "Future-Proofed Tech",
      text: "Our solutions are architected to evolve with Salesforce releases and cloud advancements.",
      icon: "auto_awesome",
      wide: true
    }
  ];

  const caseStudies = [
    {
      client: "FinTech Global",
      title: "Enterprise Salesforce Migration",
      text: "Successfully migrated 4.5M records from legacy systems to Salesforce with 0% data loss.",
      tags: ["Apex", "LWC", "ETL"],
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAjNHxxajp9K9ot2RB407CBvJUsa7-5q_EutxcZ9t4P-YIEPjo9W6NGbaApYlXaMxvOjN-xYRALdRxO7dZgv3UCBTEc7WUq4w9iAllTWir-IkVnmnrK9WqJ8gpEcVeLnMeafFGpfuR2cKu0iXi102A6iuW4bWZeHi-5Q1ueWAryXOmP4Qyi3uRAF2TE2lyPchgUoAEipMCSMGdoXv9V9R7y-WoYOpQ69PCfEF0-3S-D7rqZQvY7AX0lFHSpbQaZkFIMgpCDW-cRcII"
    },
    {
      client: "RetailX",
      title: "Custom MERN Marketplace",
      text: "Designed a hyper-scalable vendor marketplace handling 10k+ concurrent sessions.",
      tags: ["React", "Node.js", "MongoDB"],
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCvbv-5da3TnJFUGJLpGNykNec_oGZKegzvExDJVVE2oeZizD7GiICZlSs352H8J4Pi22kHwI8jHSuHylUmsZW0s-wwx9K7GBGzmGbszAGOtXA7bCWNMrXs10-3MXmY5jCjZtdmvGauOP1R4wPwbQL3BBmdzmEqwou7zAalIOelqmtGbrIdRdVvVhov4a1059OdQhiXJBdXJpZSU_lHJsJhmIsSry4T-fjKeZEP_eTSFAb09n6gOxWFVcOU9GViWpjMsDE0oydIpEc"
    }
  ];

  return (
    <>
      <Helmet>
        <title>Our Services | Salesforce Consulting & Web Engineering | Anuhya Digital</title>
        <meta name="description" content="Explore Anuhya Digital's core services: Salesforce consulting, LWC development, MERN stack web engineering, and technical SEO strategy." />
      </Helmet>

      {/* Hero */}
      <section className="relative px-8 py-24 md:py-40 overflow-hidden max-w-screen-2xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="z-10 space-y-8"
          >
            <span className="font-mono text-primary text-xs tracking-[0.4em] uppercase mb-4 block">Precision Architecture</span>
            <h1 className="font-headline text-6xl md:text-8xl font-bold tracking-tighter leading-[0.85] mb-8">
              Precision-Engineered <br />
              <span className="text-on-surface-variant italic underline decoration-primary/30 underline-offset-8">Digital Systems.</span>
            </h1>
            <p className="text-xl md:text-2xl text-on-surface-variant max-w-lg mb-10 leading-relaxed font-light">
              We specialize in complex Salesforce implementations and modern cloud solutions designed for high-velocity growth.
            </p>
            <div className="flex flex-wrap gap-6">
              <button className="cyber-gradient text-[#062100] px-10 py-5 rounded-md font-label font-black uppercase text-sm tracking-widest hover:scale-105 transition-all shadow-[0_0_40px_rgba(173,255,133,0.2)]">
                View Tech Stack
              </button>
              <button className="border border-outline-variant hover:bg-surface-high px-10 py-5 rounded-md font-label font-black uppercase text-sm tracking-widest text-primary transition-all">
                Our Methodology
              </button>
            </div>
          </motion.div>
          <div className="relative hidden lg:block">
            <div className="absolute -top-20 -right-20 w-96 h-96 bg-primary/10 rounded-full blur-[100px]" />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="relative rounded-xl overflow-hidden border border-outline-variant/20 shadow-2xl surface-high aspect-[4/3]"
            >
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBW1WhA4NnNbpPz7VJnVOv53iwZBrI1LItennJVUu4dYkAFZhAeLbF2mEJfgpbBY07891tGyF6ZiWe32OqF8j5IVXyXmqZsRiVakUnxppkv_OObsvoBmOAvRlIT0PI84pCnmmNHNW0g-6jtPxM2T8OL9jztMc1NO-kM_P1Z0kaVvNFAa6QJA8rFIYZFIWB2Bi8aMNXlWRnQMTjmoWkVo6aRZyKQMOQey_0NaRqRvmNzlTjeyHI09BSM5psU4bfJ2WfakJIbm5105Ro" 
                alt="Digital Engineering" 
                className="w-full h-full object-cover grayscale brightness-50 hover:grayscale-0 transition-all duration-1000"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Competencies */}
      <section className="px-8 py-32 surface-low">
        <div className="max-w-screen-2xl mx-auto space-y-24">
          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold font-headline">Core <span className="text-primary italic">Competencies</span></h2>
            <div className="h-1 w-24 cyber-gradient rounded-full" />
          </div>

          <div className="grid lg:grid-cols-2 gap-10">
            {coreCompetencies.map((comp, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="surface-high p-10 md:p-14 rounded-xl border-l-[6px] border-primary group hover:shadow-[0_0_50px_-20px_rgba(173,255,133,0.15)] transition-all duration-500"
              >
                <div className="flex items-center gap-6 mb-12">
                  <comp.icon size={48} className="text-primary group-hover:scale-110 transition-transform" strokeWidth={1} />
                  <h3 className="text-3xl md:text-4xl font-bold font-headline">{comp.title}</h3>
                </div>
                <div className="space-y-12">
                  {comp.services.map((service, j) => (
                    <div key={j} className="flex gap-6 group/item">
                      <span className="font-mono text-primary/50 text-sm mt-1">0{j+1}</span>
                      <div className="space-y-3">
                        <h4 className="text-xl font-bold font-headline group-hover/item:text-primary transition-colors">{service.title}</h4>
                        <p className="text-on-surface-variant leading-relaxed text-sm max-w-sm">
                          {service.text}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="px-8 py-32 bg-surface">
        <div className="max-w-screen-2xl mx-auto space-y-20">
          <div className="text-center space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold">The <span className="text-primary italic">Kinetic Advantage</span></h2>
            <p className="text-on-surface-variant max-w-xl mx-auto leading-relaxed">Why global leaders trust Anuhya Digital with their most critical systems.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {advantages.map((adv, i) => (
              <div 
                key={i}
                className={`surface-high p-12 rounded-xl group relative overflow-hidden flex flex-col justify-between ${adv.wide ? 'md:col-span-2' : ''}`}
              >
                <div className="space-y-8 relative z-10">
                  <span className="material-symbols-outlined text-5xl text-primary opacity-40 group-hover:opacity-100 transition-opacity">
                    {adv.icon}
                  </span>
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold font-headline">{adv.title}</h3>
                    <p className="text-on-surface-variant leading-relaxed text-sm max-w-md">{adv.text}</p>
                  </div>
                </div>
                <div className="absolute -right-10 -bottom-10 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
                  <span className="material-symbols-outlined text-[200px]">
                    {adv.icon}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies Preview */}
      <section className="px-8 py-32 surface-low/50">
        <div className="max-w-screen-2xl mx-auto space-y-20">
          <div className="flex justify-between items-end gap-10">
            <div className="space-y-4">
              <h2 className="text-4xl font-bold font-headline">Impact in <span className="text-primary italic">Action</span></h2>
              <p className="text-on-surface-variant text-lg">Real-world transformations for our partners.</p>
            </div>
            <button className="group flex items-center gap-3 text-primary font-black uppercase text-xs tracking-widest">
              See All Case Studies
              <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
            </button>
          </div>

          <div className="grid lg:grid-cols-2 gap-16">
            {caseStudies.map((caseStudy, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10 }}
                className="group cursor-pointer space-y-8"
              >
                <div className="relative aspect-video rounded-xl overflow-hidden surface-highest shadow-2xl">
                  <img src={caseStudy.img} alt={caseStudy.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" />
                  <div className="absolute inset-0 bg-surface/30 group-hover:bg-transparent transition-colors" />
                </div>
                <div className="space-y-6">
                  <div className="flex justify-between items-start">
                    <div className="space-y-2">
                      <span className="font-mono text-primary text-[0.65rem] uppercase tracking-[0.3em] font-black">{caseStudy.client}</span>
                      <h3 className="text-3xl font-bold font-headline tracking-tight">{caseStudy.title}</h3>
                    </div>
                  </div>
                  <p className="text-on-surface-variant leading-relaxed text-lg">{caseStudy.text}</p>
                  <div className="flex gap-4">
                    {caseStudy.tags.map(tag => (
                      <span key={tag} className="px-3 py-1 border border-outline-variant/30 text-[0.6rem] font-mono uppercase tracking-widest text-on-surface-variant rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-8 py-32">
        <div className="max-w-4xl mx-auto p-16 md:p-24 rounded-3xl cyber-gradient relative overflow-hidden group">
          <div className="absolute -top-10 -right-10 opacity-10 rotate-12 group-hover:rotate-0 transition-transform duration-1000">
            <Terminal size={300} strokeWidth={1} className="text-[#062100]" />
          </div>
          <div className="relative z-10 text-center space-y-10">
            <h2 className="text-4xl md:text-6xl font-bold font-headline text-[#062100] tracking-tighter">Ready to architect your success?</h2>
            <p className="text-[#062100] font-body text-xl md:text-2xl font-medium max-w-xl mx-auto opacity-80 leading-relaxed">
              Let's discuss how our precision-led approach can transform your core operations.
            </p>
            <button className="bg-surface text-on-surface px-14 py-6 rounded-md font-label font-black uppercase text-base tracking-widest hover:scale-105 active:scale-95 transition-all shadow-2xl">
              Schedule Architecture Review
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Services;
