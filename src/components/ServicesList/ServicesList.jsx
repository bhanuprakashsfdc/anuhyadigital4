import React from 'react';
import { WEBSITE_NAME } from '../../constants/constants';
import { FaGlobe, FaCogs, FaLandmark, FaBuilding, FaCode, FaBlogger, FaShopify, FaProjectDiagram, FaTools, FaWordpress, FaRegCreditCard, FaAws, FaGlobeAmericas, FaServer, FaEnvelope, FaRedo, FaCertificate } from 'react-icons/fa';

const services = [
  { name: "Static Website", icon: <FaGlobe /> },
  { name: "Dynamic Website", icon: <FaCogs /> },
  { name: "Landing Website", icon: <FaLandmark /> },
  { name: "Corporate Website", icon: <FaBuilding /> },
  { name: "Customized Website", icon: <FaCode /> },
  { name: "Blogging Website", icon: <FaBlogger /> },
  { name: "Shopify Development", icon: <FaShopify /> },
  { name: "Portal Development", icon: <FaProjectDiagram /> },
  { name: "Website Maintenance", icon: <FaTools /> },
  { name: "WordPress Development", icon: <FaWordpress /> },
  { name: "WooCommerce", icon: <FaRegCreditCard /> },
  { name: "AWS Management", icon: <FaAws /> },
  { name: "Domain", icon: <FaGlobeAmericas /> },
  { name: "Hosting", icon: <FaServer /> },
  { name: "Business Email", icon: <FaEnvelope /> },
  { name: "Website Renewal", icon: <FaRedo /> },
  { name: "SSL Certificate", icon: <FaCertificate /> },
];

const ServicesList = ({ city }) => {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="section-heading text-2xl md:text-3xl font-bold text-on-surface font-headline">
            List of Services {WEBSITE_NAME} Provides in <span className="neon-gradient-text">{city}</span>
          </h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {services.map((service, index) => (
            <div key={index} className="card-glass p-4 text-center group">
              <div className="text-primary text-2xl mb-2 group-hover:scale-110 transition-transform duration-300">{service.icon}</div>
              <p className="text-sm text-on-surface font-medium">{service.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ServicesList;
