import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import cities from '../data/cites.js';
import keywords from '../data/webkeywords.js';
import Layout from '../layouts/Layout.jsx';
import ErrorPage from '../pages/ErrorPage.jsx';

const Home = lazy(() => import('../pages/Homepage.jsx'));
const AboutPage = lazy(() => import('../pages/AboutPage.jsx'));
const TeamPage = lazy(() => import('../pages/TeamPage.jsx'));
const ServicePage = lazy(() => import('../pages/ServicePage.jsx'));
const ProjectPage = lazy(() => import('../pages/ProjectPage.jsx'));
const BlogPage = lazy(() => import('../pages/BlogPage.jsx'));
const ContactPage = lazy(() => import('../pages/ContactPage.jsx'));
const PrivacyPolicyPage = lazy(() => import('../pages/PrivacyPolicyPage.jsx'));
const TermsConditionsPage = lazy(() => import('../pages/TermsConditionsPage.jsx'));
const SEOPage = lazy(() => import('../components/SEO/Website/SEOPage.jsx'));
const SalesforceConsulting = lazy(() => import('../components/SEO/SalesforceConsulting.jsx'));

const PageLoader = () => (
  <div className="min-h-screen flex flex-col items-center justify-center gap-4">
    <div className="page-loader"></div>
    <p className="text-sm text-on-surface-variant font-label tracking-wider animate-pulse">thinking...</p>
  </div>
);

const AppRoutes = () => {
  return (
    <Suspense fallback={<PageLoader />}>
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

          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
