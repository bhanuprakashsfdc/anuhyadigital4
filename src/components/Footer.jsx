import React from 'react';
import { NavLink } from 'react-router-dom';
import { Share2, GitBranch, Bird, Mail, MapPin, Phone } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-surface border-t border-outline-variant/10 transition-colors duration-500">
      <div className="max-w-screen-2xl mx-auto px-12 py-16 grid grid-cols-1 md:grid-cols-4 gap-16">
        <div className="space-y-8">
          <NavLink to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="w-6 h-6 rotate-45 border border-primary/50 group-hover:bg-primary transition-all duration-500" />
            </div>
            <span className="text-xl font-bold tracking-tighter text-on-surface font-headline uppercase leading-none">
              Anuhya <span className="text-primary italic">Digital</span>
            </span>
          </NavLink>
          <p className="text-on-surface-variant font-body text-sm leading-relaxed max-w-xs">
            A decade of precision in Salesforce consulting and bespoke high-performance web engineering. Optimized for the kinetic enterprise.
          </p>
          <div className="flex gap-3">
            {[Share2, GitBranch, Bird].map((Icon, i) => (
              <a 
                key={i}
                href="#" 
                className="w-10 h-10 flex items-center justify-center rounded-md border border-outline-variant/20 text-on-surface-variant hover:bg-primary/10 hover:text-primary transition-all active:scale-95"
              >
                <Icon size={18} strokeWidth={1.5} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-headline font-bold text-xs uppercase tracking-[0.25em] text-on-surface mb-8">Expertise</h4>
          <ul className="space-y-4 font-body text-sm font-medium">
            {['Salesforce Automation', 'Bespoke Development', 'CPQ & Billing', 'Performance SEO'].map((item, i) => (
              <li key={i}>
                <a href="#" className="text-on-surface-variant hover:text-primary transition-all flex items-center gap-2 group">
                  <span className="w-1.5 h-[1.5px] bg-primary scale-x-0 group-hover:scale-x-100 origin-left transition-all duration-300" />
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-headline font-bold text-xs uppercase tracking-[0.25em] text-on-surface mb-8">Resources</h4>
          <ul className="space-y-4 font-body text-sm font-medium">
            {['Services', 'Portfolio', 'Mission', 'Company History'].map((item, i) => (
              <li key={i}>
                <a href="#" className="text-on-surface-variant hover:text-primary transition-all flex items-center gap-2 group">
                  <span className="w-1.5 h-[1.5px] bg-primary scale-x-0 group-hover:scale-x-100 origin-left transition-all duration-300" />
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-8">
          <h4 className="font-headline font-bold text-xs uppercase tracking-[0.25em] text-on-surface mb-8">Contact</h4>
          <ul className="space-y-6 font-body text-sm font-medium">
            <li className="flex items-start gap-4">
              <MapPin size={18} className="text-primary mt-1 shrink-0" />
              <span className="text-on-surface-variant leading-relaxed">
                Innovation Hub, Suite 404<br />
                Financial District, HYD 500032
              </span>
            </li>
            <li className="flex items-center gap-4">
              <Mail size={18} className="text-primary shrink-0" />
              <a href="mailto:hello@anuhyadigital.com" className="text-on-surface-variant hover:text-primary transition-all">
                hello@anuhyadigital.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="px-12 py-10 border-t border-outline-variant/10 max-w-screen-2xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-[0.7rem] uppercase tracking-widest text-on-surface-variant font-label">
          © {currentYear} Anuhya Digital. All Rights Reserved. Precisely engineered.
        </p>
        <div className="flex gap-10 text-[0.65rem] uppercase tracking-widest font-black text-on-surface-variant">
          <a href="#" className="hover:text-primary transition-all">Privacy</a>
          <a href="#" className="hover:text-primary transition-all">Terms</a>
          <a href="#" className="hover:text-primary transition-all">Sitemap</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
