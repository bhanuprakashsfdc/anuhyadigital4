import React from 'react';
import { FaMobileAlt, FaShareAlt, FaCommentDots, FaUserAlt, FaPhotoVideo, FaBook, FaListUl, FaWindowMaximize, FaFont, FaRegHandPointer, FaChartLine, FaCog, FaCode, FaTachometerAlt, FaCreditCard, FaLink, FaLock, FaFileAlt, FaKey, FaCar } from 'react-icons/fa';

const CreativeWebDesignFeatures = () => {
  const features = [
    { name: 'Responsive Design', icon: <FaMobileAlt /> },
    { name: 'Social Media Integration', icon: <FaShareAlt /> },
    { name: 'Live Chat & Chatbot', icon: <FaCommentDots /> },
    { name: 'User Friendly', icon: <FaUserAlt /> },
    { name: 'Carousel Rotations', icon: <FaPhotoVideo /> },
    { name: 'CMS', icon: <FaBook /> },
    { name: 'Blog & RSS Feeds', icon: <FaListUl /> },
    { name: 'Drop Down List', icon: <FaWindowMaximize /> },
    { name: 'Pop Up Animations', icon: <FaWindowMaximize /> },
    { name: 'Presentation Link', icon: <FaLink /> },
    { name: 'Attractive Fonts', icon: <FaFont /> },
    { name: 'CTA Button', icon: <FaRegHandPointer /> },
    { name: 'Standard JS/CSS', icon: <FaCode /> },
    { name: 'Attractive Sliders', icon: <FaPhotoVideo /> },
    { name: 'Charts & Graphs', icon: <FaChartLine /> },
    { name: 'Customized Design', icon: <FaCog /> },
    { name: 'Unique Page Design', icon: <FaCode /> },
    { name: 'Clean Code', icon: <FaCode /> },
    { name: 'Light Code', icon: <FaCode /> },
    { name: 'Loading Speed 3 Sec', icon: <FaTachometerAlt /> },
    { name: 'Payment Gateway', icon: <FaCreditCard /> },
    { name: 'URL Friendly', icon: <FaLink /> },
    { name: 'Navigation', icon: <FaCar /> },
    { name: 'SSL Encryption', icon: <FaLock /> },
    { name: 'Fresh Content', icon: <FaFileAlt /> },
    { name: 'Custom 404 Page', icon: <FaKey /> },
    { name: 'Captcha', icon: <FaKey /> },
    { name: 'Browser Compatibility', icon: <FaCode /> },
  ];

  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="w-8 h-0.5 bg-primary"></span>
            <span className="text-sm font-semibold text-primary font-label tracking-widest uppercase">Features</span>
            <span className="w-8 h-0.5 bg-primary"></span>
          </div>
          <h2 className="section-heading text-2xl md:text-3xl font-bold text-on-surface font-headline">
            Features That Enhance <span className="neon-gradient-text">Customer Engagement</span>
          </h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
          {features.map((feature, index) => (
            <div key={index} className="card-glass p-3 text-center group">
              <div className="text-primary text-xl mb-1 group-hover:scale-110 transition-transform duration-300">{feature.icon}</div>
              <p className="text-xs text-on-surface font-medium">{feature.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CreativeWebDesignFeatures;
