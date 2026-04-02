import React, { useState } from 'react';
import { WEBSITE_NAME } from '../../constants/constants';
import { FaReact, FaHtml5, FaCss3Alt, FaWordpress, FaDrupal, FaJoomla, FaDatabase, FaLaravel, FaAngular, FaNodeJs, FaShopify, FaMagento, FaAws, FaBootstrap } from 'react-icons/fa';
import { SiJquery, SiWoocommerce, SiMariadb, SiSqlite } from 'react-icons/si';

const technologies = {
  FrontEnd: [
    { name: 'Angular.JS', icon: <FaAngular /> },
    { name: 'React JS', icon: <FaReact /> },
    { name: 'HTML5', icon: <FaHtml5 /> },
    { name: 'CSS 3', icon: <FaCss3Alt /> },
    { name: 'jQuery', icon: <SiJquery /> },
    { name: 'Bootstrap', icon: <FaBootstrap /> },
    { name: 'Node.JS', icon: <FaNodeJs /> }
  ],
  CMS: [
    { name: 'Shopify', icon: <FaShopify /> },
    { name: 'Magento', icon: <FaMagento /> },
    { name: 'WordPress', icon: <FaWordpress /> },
    { name: 'Woo Commerce', icon: <SiWoocommerce /> },
    { name: 'Drupal', icon: <FaDrupal /> },
    { name: 'Joomla', icon: <FaJoomla /> }
  ],
  Database: [
    { name: 'MariaDB', icon: <SiMariadb /> },
    { name: 'MongoDB', icon: <FaDatabase /> },
    { name: 'MySQL', icon: <FaDatabase /> },
    { name: 'Oracle', icon: <FaDatabase /> },
    { name: 'SQLite', icon: <SiSqlite /> },
    { name: 'AWS-RDS', icon: <FaAws /> }
  ],
  Framework: [
    { name: 'Laravel', icon: <FaLaravel /> },
    { name: 'CodeIgniter', icon: <FaReact /> }
  ]
};

const Technologies = () => {
  const [activeTab, setActiveTab] = useState('FrontEnd');

  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="section-heading text-2xl md:text-3xl font-bold text-on-surface font-headline">
            Technologies <span className="neon-gradient-text">We Work With</span>
          </h2>
          <p className="text-on-surface-variant mt-4 max-w-3xl mx-auto">
            {WEBSITE_NAME} provides expert services in website development with cutting-edge technologies including Node JS, Laravel, Bootstrap, HTML5, Shopify, and more.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {Object.keys(technologies).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2.5 rounded-lg text-sm font-medium font-label tracking-wide transition-all duration-300 ${
                activeTab === tab
                  ? 'cyber-gradient text-background shadow-[0_0_20px_rgba(173,255,133,0.2)]'
                  : 'border border-outline-variant/30 text-on-surface-variant hover:border-primary/30 hover:text-primary'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {technologies[activeTab].map((tech, index) => (
            <div key={index} className="card-glass p-4 text-center group">
              <div className="text-primary text-2xl mb-2 group-hover:scale-110 transition-transform duration-300">{tech.icon}</div>
              <p className="text-xs text-on-surface font-medium">{tech.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Technologies;
