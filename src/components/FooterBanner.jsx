import React from 'react';
import { WEBSITE_PHONETag } from '../constants/constants';

const FooterBanner = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/10 rounded-full blur-[150px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="glass-panel rounded-3xl p-8 md:p-12 lg:p-16 border border-primary/10 text-center">
          <h3 className="section-heading text-2xl md:text-3xl lg:text-4xl font-bold text-on-surface mb-4">
            Enhance Your Business with<br />
            <span className="neon-gradient-text">Our Expert Services</span>
          </h3>
          <p className="text-on-surface-variant max-w-2xl mx-auto mb-8 leading-relaxed">
            Our dedicated team of experts is here to guide you through every step of your digital transformation journey, ensuring you succeed.
          </p>
          <a href={WEBSITE_PHONETag} className="btn-primary inline-flex items-center gap-2 text-base px-8 py-4">
            Call Us
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default FooterBanner;
