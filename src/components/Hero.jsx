import React from 'react';
import PropTypes from 'prop-types';
import { WEBSITE_EMAILTag, WEBSITE_PHONETag } from '../constants/constants';

const Hero = ({
  heading,
  subheading,
  description,
}) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32 pb-20">
      {/* Background glow effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary-dark/10 rounded-full blur-[100px]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px]"></div>
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: 'radial-gradient(circle at 1px 1px, #adff85 1px, transparent 0)',
        backgroundSize: '40px 40px'
      }}></div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 mb-8">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
          <span className="text-sm font-medium text-primary font-label tracking-wider uppercase">Salesforce Consulting & Web Engineering</span>
        </div>

        <h1 className="section-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-on-surface leading-tight mb-6">
          {heading}
          <br />
          <span className="neon-gradient-text" dangerouslySetInnerHTML={{ __html: subheading }}></span>
        </h1>

        <p className="text-lg md:text-xl text-on-surface-variant max-w-3xl mx-auto mb-10 leading-relaxed" dangerouslySetInnerHTML={{ __html: description }}></p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href={WEBSITE_PHONETag} className="btn-primary text-base px-8 py-4">
            Call Us
          </a>
          <a href={WEBSITE_EMAILTag} className="btn-outline text-base px-8 py-4">
            Drop a Mail
          </a>
        </div>

        {/* Stats bar */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
          {[
            { value: '10+', label: 'Years Experience' },
            { value: '30+', label: 'Projects Delivered' },
            { value: '12+', label: 'Expert Consultants' },
            { value: '95%', label: 'Client Satisfaction' },
          ].map((stat) => (
            <div key={stat.label} className="glass-card rounded-xl p-4 text-center">
              <div className="text-2xl md:text-3xl font-bold neon-gradient-text font-headline">{stat.value}</div>
              <div className="text-xs md:text-sm text-on-surface-variant mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

Hero.propTypes = {
  heading: PropTypes.string.isRequired,
  subheading: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default Hero;
