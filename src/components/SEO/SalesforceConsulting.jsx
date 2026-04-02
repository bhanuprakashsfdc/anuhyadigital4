import React from 'react';
import { WEBSITE_NAME, WEBSITE_EMAILTag, WEBSITE_PHONETag } from '../../constants/constants';
import { Link } from 'react-router-dom';
import Hero from '../Hero';
import cities from '../../data/cites';
import keywords from '../../data/webkeywords';

const SalesforceConsulting = () => {
  return (
    <div className="pt-24">
      {cities.map((city) => {
        const formattedCity = city.toLowerCase().replace(/ /g, '-');
        const url = `/salesforce-consulting-company-${formattedCity}.html`;
        return (
          <div key={city} className="py-12">
            <Hero
              heading={`Transform Your Business in ${city}`}
              subheading={`Your Reliable Digital<br /><span>Partner & Guide in ${city}</span>`}
              description="Our dedicated team of experts is here to guide you through every step of your digital transformation journey, ensuring you make informed choices."
              phoneLink={WEBSITE_PHONETag}
              emailLink={WEBSITE_EMAILTag}
            />
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-2xl font-bold text-on-surface mb-4 font-headline">Welcome to {WEBSITE_NAME} Consulting Company in {city}</h2>
              <p className="text-on-surface-variant mb-4">Expert Salesforce consulting services in {city}</p>
              <Link to={url} className="text-primary hover:underline inline-flex items-center gap-2">
                Learn more about our services in {city}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        );
      })}
      {keywords.map((keyword, index) => (
        <meta key={index} name="keywords" content={keyword} />
      ))}
    </div>
  );
}

export default SalesforceConsulting;
