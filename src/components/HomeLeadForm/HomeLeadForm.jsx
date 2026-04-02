import React from 'react';
import { WEBSITE_SALESFORCE_OID } from '../../constants/constants';

const HomeLeadForm = () => {
  return (
    <section id="lead-form" className="py-16 md:py-24 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-primary/8 rounded-full blur-[120px]"></div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="card-glass p-6 md:p-10">
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-bold text-on-surface mb-2 font-headline">
              Get a <span className="neon-gradient-text">Free Consultation</span>
            </h3>
            <p className="text-sm text-on-surface-variant">
              Tell us about your project. We respond within 24 hours.
            </p>
          </div>

          <form action={`https://webto.salesforce.com/servlet/servlet.WebToLead?encoding=UTF-8&orgId=${WEBSITE_SALESFORCE_OID}`} method="POST">
            <input type="hidden" name="oid" value={WEBSITE_SALESFORCE_OID} />
            <input type="hidden" name="retURL" value={window.location.origin} />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <input
                  type="text"
                  name="first_name"
                  className="input-field"
                  placeholder="Full Name *"
                  maxLength={40}
                  required
                />
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  className="input-field"
                  placeholder="Email *"
                  maxLength={80}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <input
                  type="tel"
                  name="phone"
                  className="input-field"
                  placeholder="Phone *"
                  maxLength={40}
                  required
                />
              </div>
              <div>
                <input
                  type="text"
                  name="company"
                  className="input-field"
                  placeholder="Company *"
                  maxLength={40}
                  required
                />
              </div>
            </div>

            <div className="mb-4">
              <select name="00N2x000006WIXH" className="input-field">
                <option value="">What service do you need?</option>
                <option value="Salesforce Consulting">Salesforce Consulting</option>
                <option value="Web Development">Web Development</option>
                <option value="SEO Services">SEO Services</option>
                <option value="Social Media Marketing">Social Media Marketing</option>
                <option value="Mobile App Development">Mobile App Development</option>
                <option value="E-commerce Solutions">E-commerce Solutions</option>
                <option value="Digital Strategy">Digital Strategy</option>
              </select>
            </div>

            <button type="submit" className="btn-primary w-full text-center text-base py-4">
              Get Free Consultation
            </button>
          </form>

          <p className="text-xs text-on-surface-variant text-center mt-4">
            No spam. We respond within 24 hours on business days.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HomeLeadForm;
