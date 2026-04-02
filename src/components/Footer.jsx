import React from 'react';
import { NavLink } from 'react-router-dom';
import { Mail, MapPin, Share2 } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const expertiseLinks = [
    { label: 'Salesforce Automation', path: '/services' },
    { label: 'Bespoke Development', path: '/services' },
    { label: 'CPQ & Billing', path: '/services' },
    { label: 'Performance SEO', path: '/services' },
  ];

  const resourceLinks = [
    { label: 'Services', path: '/services' },
    { label: 'Portfolio', path: '/portfolio' },
    { label: 'About Us', path: '/about' },
    { label: 'Blog', path: '/blog' },
  ];

  return (
    <footer className="bg-surface border-t border-outline-variant/10 transition-colors duration-500" role="contentinfo">
      <div className="max-w-screen-2xl mx-auto px-12 py-16 grid grid-cols-1 md:grid-cols-4 gap-16">
        <div className="space-y-8">
          <NavLink to="/" className="flex items-center gap-3 group" aria-label="Anuhya Digital - Home">
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
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Anuhya Digital on LinkedIn"
              className="w-10 h-10 flex items-center justify-center rounded-md border border-outline-variant/20 text-on-surface-variant hover:bg-primary/10 hover:text-primary transition-all active:scale-95 min-w-[44px] min-h-[44px]"
            >
              <Share2 size={18} strokeWidth={1.5} />
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-headline font-bold text-xs uppercase tracking-[0.25em] text-on-surface mb-8">Expertise</h4>
          <ul className="space-y-4 font-body text-sm font-medium">
            {expertiseLinks.map((item, i) => (
              <li key={i}>
                <NavLink to={item.path} className="text-on-surface-variant hover:text-primary transition-all flex items-center gap-2 group">
                  <span className="w-1.5 h-[1.5px] bg-primary scale-x-0 group-hover:scale-x-100 origin-left transition-all duration-300" aria-hidden="true" />
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-headline font-bold text-xs uppercase tracking-[0.25em] text-on-surface mb-8">Resources</h4>
          <ul className="space-y-4 font-body text-sm font-medium">
            {resourceLinks.map((item, i) => (
              <li key={i}>
                <NavLink to={item.path} className="text-on-surface-variant hover:text-primary transition-all flex items-center gap-2 group">
                  <span className="w-1.5 h-[1.5px] bg-primary scale-x-0 group-hover:scale-x-100 origin-left transition-all duration-300" aria-hidden="true" />
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-8">
          <h4 className="font-headline font-bold text-xs uppercase tracking-[0.25em] text-on-surface mb-8">Contact</h4>
          <ul className="space-y-6 font-body text-sm font-medium">
            <li className="flex items-start gap-4">
              <MapPin size={18} className="text-primary mt-1 shrink-0" aria-hidden="true" />
              <span className="text-on-surface-variant leading-relaxed">
                1200 Tech Plaza, Innovation District<br />
                San Francisco, CA 94105
              </span>
            </li>
            <li className="flex items-center gap-4">
              <Mail size={18} className="text-primary shrink-0" aria-hidden="true" />
              <a href="mailto:hello@anuhya.digital" className="text-on-surface-variant hover:text-primary transition-all">
                hello@anuhya.digital
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="px-12 py-10 border-t border-outline-variant/10 max-w-screen-2xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-[0.7rem] uppercase tracking-widest text-on-surface-variant font-label">
          &copy; {currentYear} Anuhya Digital. All Rights Reserved. Precisely engineered.
        </p>
        <div className="flex gap-10 text-[0.65rem] uppercase tracking-widest font-black text-on-surface-variant">
          <NavLink to="/contact" className="hover:text-primary transition-all">Privacy</NavLink>
          <NavLink to="/contact" className="hover:text-primary transition-all">Terms</NavLink>
          <NavLink to="/blog" className="hover:text-primary transition-all">Blog</NavLink>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
