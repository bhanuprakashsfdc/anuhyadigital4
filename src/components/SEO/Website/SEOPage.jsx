import React from 'react';
import { Helmet } from 'react-helmet';
import { useLocation } from 'react-router-dom';
import { WEBSITE_NAME, WEBSITE_EMAILTag, WEBSITE_PHONETag, WEBSITE_URL } from '../../../constants/constants';
import logo from '../../../assets/images/logo/OG.png'
import Hero from '../../Hero';
import ProjectSection from '../../ProjectSection';
import WorkingProcessSection from '../../WorkingProcessSection';
import ClientSection from '../../ClientSection/ClientSection';
import TestimonialsSection from '../../TestimonialsSection/TestimonialsSection';
import ServicesList from '../../ServicesList/ServicesList';
import Blogs from '../../Blogs';
import VitalIngredients from '../../VitalIngredients/VitalIngredients';
import Technologies from '../../Technologies/Technologies';
import IndustriesWeWorkFor from '../../IndustriesWeWorkFor/IndustriesWeWorkFor';
import CreativeWebDesignFeatures from '../../CreativeWebDesignFeatures/CreativeWebDesignFeatures';

const SEOPage = ({ city, type, title, description, keywords, author, publisher }) => {
  const location = useLocation();

  const defaultTitle = keywords;
  const defaultDescription = "Default description about Anuhya Digital.";
  const defaultKeywords = "web design, digital marketing, Anuhya Digital";
  const defaultAuthor = "Anuhya Digital";
  const defaultPublisher = "Anuhya Digital";
  const defaultLang = "en";
  const currentUrl = `https://anuhyadigital.com${location.pathname}`;

  const keyword = location.pathname
    .split('/')[1]
    .replace(/-/g, ' ')
    .replace('.html', '');

  const formattedCity = city.toLowerCase().replace(/ /g, '-');
  const url = `/${type}-${formattedCity}.html`;

  return (
    <div className="pt-24">
      <Helmet>
        <html lang={defaultLang} />
        <title>{title || defaultTitle}</title>
        <meta name="description" content={description || defaultDescription} />
        <meta name="keywords" content={keywords || defaultKeywords} />
        <meta name="author" content={author || defaultAuthor} />
        <meta name="publisher" content={publisher || defaultPublisher} />
        <link rel="canonical" href={currentUrl} />
        <meta name="robots" content="index,follow" />
        <meta property="og:url" content={WEBSITE_URL} />
        <meta property="og:type" content="website"/>
        <meta property="og:title" content={keyword}/>
        <meta property="og:description" content=""/>
        <meta property="og:image" content={logo}/>
        <meta name="twitter:card" content="summary_large_image"/>
        <meta property="twitter:domain" content="anuhyadigital.com"/>
        <meta property="twitter:url" content="https://anuhyadigital.com"/>
        <meta name="twitter:title" content={keyword}/>
        <meta name="twitter:description" content=""/>
        <meta name="twitter:image" content={logo}/>
      </Helmet>

      <Hero
        heading={`${keyword} in ${city}`}
        subheading={`Your Reliable Digital<br /><span>Partner & Guide in ${city}</span>`}
        description="Our dedicated team of experts is here to guide you through every step of your digital transformation journey, ensuring you make informed choices."
        phoneLink={WEBSITE_PHONETag}
        emailLink={WEBSITE_EMAILTag}
      />

      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="section-heading text-3xl md:text-4xl font-bold text-on-surface mb-6">{keyword}</h1>
          <div className="space-y-4 text-on-surface-variant leading-relaxed">
            <p>At <a href="/" className="text-primary hover:underline">{WEBSITE_NAME}</a>, we are dedicated to providing top-notch {keyword} in {city}. Our team of experienced designers and developers are passionate about creating beautiful, functional, and user-friendly websites that help businesses succeed online.</p>
            <p>With years of experience in the industry, we understand the unique needs of businesses in {city} and tailor our services to meet those needs.</p>
            <p>We take a human-centered approach to {keyword}, working closely with our clients to understand their goals and challenges.</p>
          </div>
          <a href={url} className="btn-primary inline-flex items-center gap-2 mt-8">
            Learn more about our services
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </section>

      <ServicesList city={city} />
      <VitalIngredients city={city}/>
      <Technologies />
      <IndustriesWeWorkFor />
      <CreativeWebDesignFeatures />
      <ProjectSection />
      <WorkingProcessSection />
      <ClientSection />
      <TestimonialsSection />
      <Blogs />
    </div>
  );
};

export default SEOPage;
