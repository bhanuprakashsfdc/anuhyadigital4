import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const Breadcrumbs = ({ items }) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "name": item.name,
      "item": item.url
    }))
  };

  return (
    <>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>
      <nav aria-label="Breadcrumb" className="pt-28 pb-2 px-4 max-w-7xl mx-auto">
        <ol className="flex items-center gap-2 text-sm text-on-surface-variant">
          {items.map((item, i) => (
            <li key={i} className="flex items-center gap-2">
              {i > 0 && (
                <svg className="w-3 h-3 text-outline-variant/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              )}
              {i < items.length - 1 ? (
                <Link to={item.url} className="hover:text-primary transition-colors">{item.name}</Link>
              ) : (
                <span className="text-on-surface font-medium">{item.name}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
};

export default Breadcrumbs;
