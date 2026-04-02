import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Cpu, Terminal, BarChart3, Layout as LayoutIcon, Award, Users, Target } from 'lucide-react';

const About = () => {
  const timeline = [
    {
      year: "2014",
      title: "The Genesis",
      subtitle: "Foundation & First Deployment",
      text: "Anuhya Digital was founded with a focus on bringing software engineering rigor to the Salesforce ecosystem. Secured first Fortune 500 client within six months."
    },
    {
      year: "2018",
      title: "Scaling Up",
      subtitle: "Multi-Cloud Expansion",
      text: "Expanded into Full-stack Web development and SEO, recognizing that a CRM is only as powerful as the digital ecosystem feeding it."
    },
    {
      year: "2024",
      title: "The Kinetic Era",
      subtitle: "AI & Modern Architecture",
      text: "Leading with Salesforce Data Cloud and AI implementations, defining the next decade of kinetic digital architecture."
    }
  ];

  const leaders = [
    {
      name: "Arun Varma",
      role: "Founder & Lead Architect",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBO9WIi7ayQu6pOOAwFRIlSlE9Eg3O3SoSyquHVKr-DNbyZ-xRGEabZdOUxn2Y8Q21_Sx_2rmVa4AjiqtsqZhBY_eambwgn48Mw1EVzHpzlnHBn78e-VD54IFTtk1hYo4LBu1NNxPgVH2wthdFwGVArvKBMFYt3bTvjpimNSV5sv4FbFgVUuNApyu3cWHaCzM4ci4oLYzkJ0Fl8hU_B-gX_t4DVqQBQrdPDhbymb6DU-l7PHbWlL-V3nR5CNvJ7-gG1WS8Fm8X4w_0",
      description: "15+ years of Salesforce expertise and a passion for lean, high-performance systems."
    },
    {
      name: "Deepa Rao",
      role: "Director of Operations",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuACexQlG5fZ7-2eUsi-67nMGC3JDOKVOebjuP-_DicoOVV_Vw88AIL--hKYfhG4zdwGYQeUFA2nyw_oHWD_pK1Fy1pG04_rjF2qbumYWT-YE6qeSoxB5wK1RPbzoureo6zlOR6W4AH_fjNzqj0DQTEeO7oFCaeFyGp6OosaDp5fvar1SMDmnKE6S3T2x5d82otII1W_kqxmjJI8XjLKz6ESGpeVKeP9qcKGnaDxt3Qs-DkwVvHZTnLCUSvP0AQOlxaiqfxNS7t96F4",
      description: "Driving efficiency and operational excellence across global delivery centers."
    },
    {
      name: "Vikram Sethi",
      role: "Chief Technology Officer",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBfvBfeToWtx2FjWyftxVPmGjPGA4MDkUjRe1367Oi7xWNFzvIG8NsxMM75LmFPn6sdbIAD-wtiweMsSwz6owkr3u4VPBecmi-e6wHtw0wHV8ApZJISpK_2mhwVeyw94980coJnIW2utCydxcycP6nbis7IS0j9x5Fq7PnodSV5zkCPZ7oYBi9JL32CiPyXniTJBynsnhVIZkGINibM4Ra7EWuZWRKu19rHSF8c3UVP54u9cTnrz6ZRjpfkI9Acjgg7zvp3UvOW0-U",
      description: "A full-stack veteran bridging the gap between CRM and bespoke web technologies."
    }
  ];

  return (
    <>
      <Helmet>
        <title>About Us | Anuhya Digital | Our Story & Expertise</title>
        <meta name="description" content="Discover the story of Anuhya Digital. A decade of precision engineering, Salesforce mastery, and a vision for the kinetic digital future." />
      </Helmet>

      {/* Hero */}
      <section className="relative px-8 py-24 md:py-40 max-w-screen-2xl mx-auto overflow-hidden">
        <div className="absolute top-0 right-0 -z-10 w-2/3 h-full opacity-10">
          <div className="w-full h-full bg-[radial-gradient(circle_at_center,_#ADFF85_0%,_transparent_70%)] blur-[120px]" />
        </div>
        <div className="grid lg:grid-cols-12 gap-12 items-end">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-8 space-y-8"
          >
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-[0.9]">
              Precision in <span className="neon-gradient-text italic">Innovation</span>
            </h1>
            <p className="text-xl md:text-2xl font-light text-on-surface-variant max-w-2xl leading-relaxed">
              A decade of engineering digital ecosystems that bridge corporate reliability with futuristic fluidity.
            </p>
          </motion.div>
          <div className="lg:col-span-4 flex justify-end">
            <div className="font-mono text-[0.65rem] uppercase tracking-[0.3em] text-on-surface-variant/60 space-y-3 border-l border-outline-variant/30 pl-6 py-2">
              <p>EST. 2014</p>
              <p>HYDERABAD / GLOBAL</p>
              <p>SALESFORCE PARTNER</p>
            </div>
          </div>
        </div>
      </section>

      {/* Journey Timeline */}
      <section className="surface-low py-32">
        <div className="max-w-screen-2xl mx-auto px-8 grid lg:grid-cols-12 gap-20">
          <div className="lg:col-span-4 lg:sticky lg:top-40 h-fit space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold font-headline">Our 10-Year <br /> <span className="text-primary italic">Journey</span></h2>
            <div className="w-16 h-1 cyber-gradient rounded-full" />
            <p className="text-on-surface-variant leading-relaxed font-body">
              Since our inception, we've navigated the evolving landscape of enterprise technology, transforming from a boutique consultancy to a global innovation hub.
            </p>
          </div>
          
          <div className="lg:col-span-8 space-y-24">
            {timeline.map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex gap-10 group"
              >
                <div className="flex flex-col items-center">
                  <div className="w-5 h-5 rounded-full border-2 border-primary group-hover:bg-primary transition-all duration-500 shadow-[0_0_15px_rgba(173,255,133,0.3)]" />
                  {i !== timeline.length - 1 && <div className="w-px h-full bg-outline-variant/20 mt-4" />}
                </div>
                <div className="space-y-4 pb-12">
                  <span className="font-mono text-primary text-xs uppercase tracking-[0.3em]">{item.year} — {item.title}</span>
                  <h3 className="text-3xl font-bold font-headline">{item.subtitle}</h3>
                  <p className="text-on-surface-variant max-w-xl leading-relaxed text-lg">{item.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Expertise & Vision */}
      <section className="py-32 px-8 max-w-screen-2xl mx-auto space-y-32">
        <div>
          <div className="mb-16 space-y-4">
            <h2 className="text-4xl font-headline font-bold">Core Expertise</h2>
            <p className="text-on-surface-variant">The pillars of our technical architectural practice.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 surface-high p-12 rounded-xl group relative overflow-hidden">
              <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-primary/5 blur-[100px] rounded-full group-hover:bg-primary/10 transition-all duration-700" />
              <div className="relative z-10 space-y-8">
                <Cpu size={40} className="text-primary" strokeWidth={1.5} />
                <h3 className="text-3xl font-bold font-headline">Salesforce Mastery</h3>
                <p className="text-on-surface-variant max-w-lg text-lg leading-relaxed">
                  From complex Apex triggers to LWC and Einstein AI, we engineer Salesforce environments that redefine business efficiency.
                </p>
                <div className="flex flex-wrap gap-3">
                  {['LWC', 'Data Cloud', 'MuleSoft', 'Flow Automation'].map(tag => (
                    <span key={tag} className="px-4 py-1.5 bg-surface rounded-full text-[0.65rem] font-mono text-on-surface-variant uppercase tracking-widest border border-outline-variant/20">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="surface-high p-12 rounded-xl flex flex-col justify-between group">
              <Terminal size={40} className="text-primary" strokeWidth={1.5} />
              <div className="space-y-6">
                <h3 className="text-2xl font-bold font-headline">Full-stack Web</h3>
                <p className="text-on-surface-variant text-sm leading-relaxed">
                  High-performance React architectures designed for kinetic scalability.
                </p>
                <div className="h-32 bg-surface rounded-lg opacity-20 group-hover:opacity-40 transition-opacity overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-tr from-primary/20 to-transparent p-4">
                    <div className="w-full h-1 bg-primary/30 rounded mb-2" />
                    <div className="w-2/3 h-1 bg-primary/20 rounded mb-2" />
                    <div className="w-1/2 h-1 bg-primary/10 rounded" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mission / Vision */}
        <div className="grid md:grid-cols-2 gap-12">
          {[
            { 
              title: "Mission", 
              icon: Target,
              text: "To empower global enterprises by architecting Salesforce solutions that are as elegant in their code as they are powerful in their impact." 
            },
            { 
              title: "Vision", 
              icon: Award,
              text: "To define the standard for the Kinetic Architect—where technology is not a static tool, but a fluid, evolving ecosystem driving innovation." 
            }
          ].map((item, i) => (
            <div key={i} className="relative p-14 rounded-xl surface-high overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1 cyber-gradient scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
              <item.icon size={32} className="text-primary mb-8" strokeWidth={1.5} />
              <h3 className="text-3xl font-bold font-headline mb-6">{item.title}</h3>
              <p className="text-xl text-on-surface-variant font-light leading-relaxed">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Leadership */}
      <section className="py-32 surface-low">
        <div className="max-w-screen-2xl mx-auto px-8">
          <div className="text-center mb-24 space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold font-headline">The <span className="text-primary italic">Architects</span></h2>
            <p className="text-on-surface-variant uppercase tracking-[0.2em] text-xs font-black opacity-60">Leadership behind the digital precision</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {leaders.map((leader, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="group space-y-8"
              >
                <div className="relative aspect-[4/5] overflow-hidden rounded-xl grayscale hover:grayscale-0 transition-all duration-1000 surface-highest">
                  <img src={leader.img} alt={leader.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent opacity-60" />
                </div>
                <div className="space-y-3">
                  <h4 className="text-2xl font-bold font-headline tracking-tight">{leader.name}</h4>
                  <p className="text-primary font-mono text-[0.65rem] uppercase tracking-[0.3em] mb-4">{leader.role}</p>
                  <p className="text-on-surface-variant leading-relaxed text-sm">
                    {leader.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
