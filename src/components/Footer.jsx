import React from 'react';
import { Link } from 'react-router-dom';
import { WEBSITE_NAME, WEBSITE_ADDRESS, WEBSITE_PHONE, WEBSITE_EMAIL, WEBSITE_LOCATION, WEBSITE_PHONETag, WEBSITE_EMAILTag, WEBSITE_FB, WEBSITE_Insta, WEBSITE_Linkedin, WEBSITE_X } from '../constants/constants';
import Minifooter from './Minifooter';
import FooterBanner from './FooterBanner';

const Footer = () => {
  return (
    <footer>
      <FooterBanner />

      <div className="border-t border-outline-variant/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* Brand */}
            <div>
              <img src="assets/images/logo/adlogo.png" loading="lazy" className="h-10 w-auto mb-4" alt="Anuhya Digital" />
              <p className="text-sm text-on-surface-variant leading-relaxed mb-6">
                Welcome to {WEBSITE_NAME}, where your digital transformation is our priority. As a leading player in software consulting, we provide top-notch Salesforce consulting, web development, SEO, and SMM services.
              </p>
              <div className="flex gap-3">
                {[
                  { href: WEBSITE_FB, icon: 'M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z' },
                  { href: WEBSITE_X, icon: 'M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z' },
                  { href: WEBSITE_Linkedin, icon: 'M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 2a2 2 0 110 4 2 2 0 010-4z' },
                  { href: WEBSITE_Insta, icon: 'M16 4H8a4 4 0 00-4 4v8a4 4 0 004 4h8a4 4 0 004-4V8a4 4 0 00-4-4zm-4 11a3 3 0 110-6 3 3 0 010 6zm4.5-7.5a1 1 0 110-2 1 1 0 010 2z' },
                ].map((social, i) => (
                  <a key={i} href={social.href} className="w-10 h-10 rounded-lg bg-surface-high border border-outline-variant/20 flex items-center justify-center text-on-surface-variant hover:text-primary hover:border-primary/30 transition-all duration-300">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={social.icon} />
                    </svg>
                  </a>
                ))}
              </div>
            </div>

            {/* Explore */}
            <div>
              <h3 className="text-lg font-semibold text-on-surface mb-4 font-headline">Explore</h3>
              <div className="w-8 h-0.5 bg-primary mb-4"></div>
              <ul className="space-y-3">
                {[
                  { label: 'About Company', to: '/about-us.html' },
                  { label: 'Meet the Team', to: '/team.html' },
                  { label: 'News & Media', to: '/blogs.html' },
                  { label: 'Our Projects', to: '/projects.html' },
                ].map((link) => (
                  <li key={link.label}>
                    <Link to={link.to} className="text-sm text-on-surface-variant hover:text-primary transition-colors duration-300">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* More */}
            <div>
              <h3 className="text-lg font-semibold text-on-surface mb-4 font-headline">More</h3>
              <div className="w-8 h-0.5 bg-primary mb-4"></div>
              <ul className="space-y-3">
                {[
                  { label: 'Contact Us', to: '/contact.html' },
                  { label: 'Terms And Conditions', to: '/terms-conditions.html' },
                  { label: 'Privacy Policy', to: '/privacy-policy.html' },
                ].map((link) => (
                  <li key={link.label}>
                    <Link to={link.to} className="text-sm text-on-surface-variant hover:text-primary transition-colors duration-300">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-lg font-semibold text-on-surface mb-4 font-headline">Contact</h3>
              <div className="w-8 h-0.5 bg-primary mb-4"></div>
              <ul className="space-y-4">
                <li>
                  <a href={WEBSITE_LOCATION} className="flex items-start gap-3 text-sm text-on-surface-variant hover:text-primary transition-colors duration-300">
                    <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>Flat No 401, Sri Pradha Hills, Thimmanaidupalem, Tirupati 517501, India</span>
                  </a>
                </li>
                <li>
                  <a href={WEBSITE_PHONETag} className="flex items-center gap-3 text-sm text-on-surface-variant hover:text-primary transition-colors duration-300">
                    <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    {WEBSITE_PHONE}
                  </a>
                </li>
                <li>
                  <a href={WEBSITE_EMAILTag} className="flex items-center gap-3 text-sm text-on-surface-variant hover:text-primary transition-colors duration-300">
                    <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    {WEBSITE_EMAIL}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <Minifooter />
    </footer>
  );
};

export default Footer;
