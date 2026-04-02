import React from 'react';
import { Helmet } from 'react-helmet';

const SEOHead = ({ title, description, path = '' }) => {
  const baseUrl = 'https://anuhyadigital4.netlify.app';
  const fullTitle = title
    ? `${title} | Anuhya Digital`
    : 'Anuhya Digital | Salesforce Consulting & Web Engineering';
  const desc = description || 'Anuhya Digital: 10+ years of expert Salesforce consulting and high-performance web development. Trusted by businesses across India, UK, Australia & EMEA.';
  const url = `${baseUrl}/${path}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={desc} />
    </Helmet>
  );
};

export default SEOHead;
