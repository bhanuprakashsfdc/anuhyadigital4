import React from 'react';
import { WEBSITE_NAME, WEBSITE_ADDRESS, WEBSITE_PHONE, WEBSITE_PHONETag, WEBSITE_EMAIL, WEBSITE_EMAILTag, WEBSITE_LOCATION } from '../../constants/constants';
import WebToLeadForm from '../WebToLeadForm/WebToLeadForm';

const ContactSection = () => {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary/5 rounded-full blur-[120px]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left */}
          <div>
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="w-8 h-0.5 bg-primary"></span>
              <span className="text-sm font-semibold text-primary font-label tracking-widest uppercase">Contact {WEBSITE_NAME}</span>
            </div>
            <h2 className="section-heading text-3xl md:text-4xl lg:text-5xl font-bold text-on-surface leading-tight mb-6">
              Get in Touch with<br />
              <span className="neon-gradient-text">Our Experts</span>
            </h2>
            <p className="text-on-surface-variant leading-relaxed mb-8">
              If you have any questions or need further information about our services, feel free to reach out to us. Our team is always ready to assist you.
            </p>

            <div className="space-y-6">
              {[
                {
                  icon: (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  ),
                  label: WEBSITE_PHONE,
                  href: WEBSITE_PHONETag,
                },
                {
                  icon: (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  ),
                  label: WEBSITE_EMAIL,
                  href: WEBSITE_EMAILTag,
                },
                {
                  icon: (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  ),
                  label: 'Flat No 401, Sri Pradha Hills, Tirupati',
                  href: WEBSITE_LOCATION,
                },
              ].map((item, i) => (
                <a key={i} href={item.href} className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-background transition-all duration-300">
                    {item.icon}
                  </div>
                  <span className="text-on-surface-variant group-hover:text-primary transition-colors duration-300">{item.label}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Right - Form */}
          <div>
            <div className="card-glass p-8">
              <WebToLeadForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
