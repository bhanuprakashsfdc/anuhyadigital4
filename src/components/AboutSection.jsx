import React from 'react';
import { WEBSITE_NAME } from '../constants/constants';

const AboutSection = () => {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[120px]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left - Images */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="rounded-2xl overflow-hidden border border-outline-variant/20">
                  <img src="assets/images/img/about1.png" className="w-full h-48 md:h-56 object-cover" alt="About Anuhya Digital" />
                </div>
                <div className="rounded-2xl overflow-hidden border border-outline-variant/20">
                  <img src="assets/images/img/about3.png" className="w-full h-40 md:h-48 object-cover" alt="Our Team" />
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="rounded-2xl overflow-hidden border border-outline-variant/20">
                  <img src="assets/images/img/about2.png" className="w-full h-40 md:h-48 object-cover" alt="Our Work" />
                </div>
                <div className="rounded-2xl overflow-hidden border border-outline-variant/20">
                  <img src="assets/images/img/about4.png" className="w-full h-48 md:h-56 object-cover" alt="Our Office" />
                </div>
              </div>
            </div>

            {/* Experience badge */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="cyber-gradient rounded-2xl p-6 text-center shadow-[0_0_40px_rgba(173,255,133,0.2)]">
                <div className="text-4xl md:text-5xl font-bold text-background font-headline">10+</div>
                <div className="text-sm font-medium text-background/80 mt-1">Years of<br />Experience</div>
              </div>
            </div>
          </div>

          {/* Right - Content */}
          <div>
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 mb-4">
                <span className="w-8 h-0.5 bg-primary"></span>
                <span className="text-sm font-semibold text-primary font-label tracking-widest uppercase">About {WEBSITE_NAME}</span>
              </div>
              <h2 className="section-heading text-3xl md:text-4xl lg:text-5xl font-bold text-on-surface leading-tight">
                Delivering Excellence in<br />
                <span className="neon-gradient-text">Software Consulting Services</span>
              </h2>
            </div>

            <p className="text-on-surface-variant leading-relaxed mb-8">
              At {WEBSITE_NAME}, we specialize in Salesforce consulting, web development, SEO, and SMM services.
              Our expert team ensures that your business achieves its goals with tailored solutions and dedicated support.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              {['Salesforce Consulting', 'Web Development', 'SEO Services', 'SMM Services'].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <svg className="w-3 h-3 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-sm text-on-surface font-medium">{item}</span>
                </div>
              ))}
            </div>

            <a href="/about-us.html" className="btn-primary inline-flex items-center gap-2">
              Learn More
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
