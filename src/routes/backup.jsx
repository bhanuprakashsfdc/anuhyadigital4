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

import WebDesignCompany from '../components/SEO/WebDesignCompany.jsx';
import SalesforceConsulting from '../components/SEO/SalesforceConsulting.jsx';

const AppRoutes = () => {
  const generateRoutes = (Component, keyword) => {
    return cities.map(city => {
      const formattedCity = city.toLowerCase().replace(/ /g, '-');
      const formattedKeyword = keyword.toLowerCase().replace(/ /g, '-');
      const path = `/${formattedKeyword}-${formattedCity}.html`;
      console.log(`Generating URL: ${path}`);  // Debug log
      return (
        <Route key={`${formattedKeyword}-${city}`} path={path} element={<Component city={city} />} />
      );
    });
  };

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
        <Route path="/terms-condtions.html" element={<TermsConditionsPage />} />
          {/* 
          {cities.map(city => {
          const formattedCity = city.toLowerCase().replace(/ /g, '-');
          const path = `/web-design-company-${formattedCity}.html`;
          const path1 = `/web-design-company-in-${formattedCity}.html`;
          return (
            <React.Fragment key={city}>
              <Route path={path} element={<WebDesignCompany city={city} />} />
              <Route path={path1} element={<WebDesignCompany city={city} />} />
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
          */}
           {keywords.map(keyword => generateRoutes(WebDesignCompany, keyword))}
      </Route>
    </Routes>
  );
};

export default AppRoutes;
