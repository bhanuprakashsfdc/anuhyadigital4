import React from 'react';
import { FaMobileAlt, FaTachometerAlt, FaSearch, FaArrowsAlt, FaServer, FaTools, FaBolt, FaCode, FaUserCheck, FaLock, FaCheckCircle, FaLaptopCode, FaChartLine, FaPaintBrush, FaFont, FaShareAlt } from 'react-icons/fa';

const ingredients = [
  { name: 'Responsive', description: 'Ensures the website adapts to different devices for a consistent user experience.', icon: <FaMobileAlt /> },
  { name: 'Loading Time', description: 'Duration for webpage to fully display content after user request.', icon: <FaTachometerAlt /> },
  { name: 'SEO Friendly', description: 'Optimizes website for better visibility and ranking in search results.', icon: <FaSearch /> },
  { name: 'Proper Navigation', description: 'Facilitates seamless movement across the website for user convenience.', icon: <FaArrowsAlt /> },
  { name: 'GT Matrix', description: 'Analyzes website speed and offers improvement suggestions.', icon: <FaServer /> },
  { name: 'Google Speed Test', description: 'Assesses website performance and suggests speed enhancements.', icon: <FaBolt /> },
  { name: 'Clean Designing', description: 'Emphasises simplicity and clarity in web design for better user experience.', icon: <FaPaintBrush /> },
  { name: 'Functionality', description: 'Ensures smooth user interaction and operational features on the website.', icon: <FaTools /> },
  { name: 'Usability', description: 'Measures ease of user navigation and interaction on website or app.', icon: <FaUserCheck /> },
  { name: 'Call to Action', description: 'Prompts users to take specific actions on website.', icon: <FaCheckCircle /> },
  { name: 'Multi-Browser', description: 'Ensures the website functions well across different web browsers.', icon: <FaCode /> },
  { name: 'Social Media', description: 'Integrates social media platforms for an expanded online presence.', icon: <FaShareAlt /> },
  { name: 'Secured HTTPS', description: 'Enhances website security and safeguards user data with HTTPS protocol.', icon: <FaLock /> },
  { name: 'Console Verification', description: 'Validates website ownership for credibility.', icon: <FaCheckCircle /> },
  { name: 'Google Analytics', description: 'Tracks and analyses website traffic and user behaviour.', icon: <FaChartLine /> },
  { name: 'Original Content', description: 'Provides unique and valuable content to engage visitors.', icon: <FaLaptopCode /> },
  { name: 'Online Fonts', description: 'Enhances website aesthetics with diverse online font options.', icon: <FaFont /> },
  { name: 'Color Scheme', description: 'Creates a cohesive colour palette reflecting brand identity.', icon: <FaPaintBrush /> }
];

const VitalIngredients = ({ city }) => {
  return (
    <section className="py-16 md:py-24 bg-surface-high/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="section-heading text-2xl md:text-3xl font-bold text-on-surface font-headline">
            Vital Ingredients for <span className="neon-gradient-text">{city}</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {ingredients.map((ingredient, index) => (
            <div key={index} className="card-glass p-5 flex items-start gap-4 group">
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-background transition-all duration-300">
                {ingredient.icon}
              </div>
              <div>
                <h3 className="font-semibold text-on-surface text-sm font-headline">{ingredient.name}</h3>
                <p className="text-xs text-on-surface-variant mt-1">{ingredient.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default VitalIngredients;
