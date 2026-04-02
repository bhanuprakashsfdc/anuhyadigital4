import React from 'react';
import { Routes, Route } from 'react-router-dom';
import cities from '../data/cites.js';
import keywords from '../data/webkeywords.js';
import Layout from '../layouts/Layout.jsx';
import Home from '../pages/Homepage.jsx';
import AboutPage from '../pages/AboutPage.jsx';
import TeamPage from '../pages/TeamPage.jsx';
import ServicePage from '../pages/ServicePage.jsx';
import ProjectPage from '../pages/ProjectPage.jsx';
import BlogPage from '../pages/BlogPage.jsx';
import ContactPage from '../pages/ContactPage.jsx';
import PrivacyPolicyPage from '../pages/PrivacyPolicyPage.jsx';
import TermsConditionsPage from '../pages/TermsConditionsPage.jsx';
import SEOPage from '../components/SEO/Website/SEOPage.jsx';
import SalesforceConsulting from '../components/SEO/SalesforceConsulting.jsx';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/index.html" element={<Home />} />
        <Route path="/about-us.html" element={<AboutPage />} />
        <Route path="/team.html" element={<TeamPage />} />
        <Route path="/services.html" element={<ServicePage />} />
        <Route path="/projects.html" element={<ProjectPage />} />
        <Route path="/blogs.html" element={<BlogPage />} />
        <Route path="/contact.html" element={<ContactPage />} />
        <Route path="/privacy-policy.html" element={<PrivacyPolicyPage />} />
        <Route path="/terms-conditions.html" element={<TermsConditionsPage />} />

        {cities.map(city => {
          const formattedCity = city.toLowerCase().replace(/ /g, '-');

          return (
            <React.Fragment key={city}>
              {keywords.map(keyword => {
                const formattedKeyword = keyword.toLowerCase().replace(/ /g, '-');
                const path = `/${formattedKeyword}-${formattedCity}.html`;
                const title = `${keyword} ${city} | Anuhya Digital`;
                const description = `We are providing our Salesforce consulting and implementation services to various Clients. Working through-out APAC, India, US, and other regions. We are also working on product development for Retail Industry based on Salesforce product and have sold this idea to a big Retail Client and working on MVP.`;
                const keywords = `${keyword} ${city}, web design, web development, ${city}, Anuhya Digital`;
                return (
                  <Route
                    key={path}
                    path={path}
                    element={<SEOPage city={city} keyword={keyword} title={title} description={description} keywords={keywords} />}
                  />
                );
              })}
            </React.Fragment>
          );
        })}

        {cities.map(city => {
          const formattedCity = city.toLowerCase().replace(/ /g, '-');
          const path = `/salesforce-consulting-company-${formattedCity}.html`;
          return (
            <Route
              key={`salesforce-${city}`}
              path={path}
              element={<SalesforceConsulting city={city} />}
            />
          );
        })}
      </Route>
    </Routes>
  );
};

export default AppRoutes;
