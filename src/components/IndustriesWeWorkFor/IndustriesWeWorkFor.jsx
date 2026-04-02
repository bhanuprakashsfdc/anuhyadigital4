import React from 'react';
import { FaHospital, FaIndustry, FaShoppingCart, FaMoneyBill, FaBookOpen, FaTruck, FaUtensils, FaCog, FaPlayCircle, FaShareAlt, FaPlane } from 'react-icons/fa';

const IndustriesWeWorkFor = () => {
  const industries = [
    { name: 'Healthcare', icon: <FaHospital /> },
    { name: 'Manufacturing', icon: <FaIndustry /> },
    { name: 'E-commerce', icon: <FaShoppingCart /> },
    { name: 'Finance', icon: <FaMoneyBill /> },
    { name: 'Education', icon: <FaBookOpen /> },
    { name: 'Supply Chain', icon: <FaTruck /> },
    { name: 'Restaurant', icon: <FaUtensils /> },
    { name: 'SaaS', icon: <FaCog /> },
    { name: 'Travel', icon: <FaPlane /> },
    { name: 'Entertainment', icon: <FaPlayCircle /> },
    { name: 'On-Demand', icon: <FaCog /> },
    { name: 'Social Media', icon: <FaShareAlt /> },
  ];

  return (
    <section className="py-16 md:py-24 bg-surface-high/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="w-8 h-0.5 bg-primary"></span>
            <span className="text-sm font-semibold text-primary font-label tracking-widest uppercase">Industries We Work For</span>
            <span className="w-8 h-0.5 bg-primary"></span>
          </div>
          <h2 className="section-heading text-2xl md:text-3xl font-bold text-on-surface font-headline">
            Serving a Wide Range of <span className="neon-gradient-text">Industries</span>
          </h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {industries.map((industry, index) => (
            <div key={index} className="card-glass p-4 text-center group">
              <div className="text-primary text-2xl mb-2 group-hover:scale-110 transition-transform duration-300">{industry.icon}</div>
              <p className="text-sm text-on-surface font-medium">{industry.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IndustriesWeWorkFor;
