import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import logo from '../assets/images/logo/adlogo.png';
import { WEBSITE_PHONE, WEBSITE_EMAIL, WEBSITE_PHONETag, WEBSITE_EMAILTag } from '../constants/constants';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Top bar */}
      <div className="bg-surface-high/80 backdrop-blur-xl border-b border-outline-variant/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="hidden md:flex items-center justify-between py-2 text-sm">
            <div className="flex items-center gap-6">
              <a href={WEBSITE_EMAILTag} className="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors duration-300">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                {WEBSITE_EMAIL}
              </a>
              <a href="https://maps.app.goo.gl/EgZcvjErs5Rjx1jH6" className="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors duration-300">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                Tirupati, India
              </a>
            </div>
            <a href={WEBSITE_PHONETag} className="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors duration-300">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
              {WEBSITE_PHONE}
            </a>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <nav className="bg-background/90 backdrop-blur-xl border-b border-outline-variant/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <Link to="/" className="flex items-center">
              <img src={logo} className="h-8 lg:h-10 w-auto" alt="Anuhya Digital" />
            </Link>

            {/* Desktop nav */}
            <div className="hidden lg:flex items-center gap-1">
              {[
                { label: 'Home', to: '/' },
                { label: 'About', to: '/about-us.html' },
                { label: 'Services', to: '/services.html' },
                { label: 'Projects', to: '/projects.html' },
                { label: 'Blog', to: '/blogs.html' },
                { label: 'Contact', to: '/contact.html' },
              ].map((item) => (
                <NavLink
                  key={item.label}
                  to={item.to}
                  className={({ isActive }) =>
                    `px-4 py-2 text-sm font-medium transition-colors duration-300 font-label tracking-wide ${
                      isActive ? 'text-primary' : 'text-on-surface-variant hover:text-primary'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
              <Link
                to="/contact.html"
                className="ml-4 btn-primary text-sm"
              >
                Get A Quote
              </Link>
            </div>

            {/* Mobile toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-on-surface-variant hover:text-primary transition-colors"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-surface-high/95 backdrop-blur-xl border-t border-outline-variant/10">
            <div className="px-4 py-4 space-y-1">
              {[
                { label: 'Home', to: '/' },
                { label: 'About', to: '/about-us.html' },
                { label: 'Services', to: '/services.html' },
                { label: 'Projects', to: '/projects.html' },
                { label: 'Blog', to: '/blogs.html' },
                { label: 'Contact', to: '/contact.html' },
              ].map((item) => (
                <NavLink
                  key={item.label}
                  to={item.to}
                  onClick={() => setIsMenuOpen(false)}
                  className={({ isActive }) =>
                    `block px-4 py-3 rounded-lg transition-all duration-300 font-label ${
                      isActive ? 'text-primary bg-surface-highest/50' : 'text-on-surface-variant hover:text-primary hover:bg-surface-highest/50'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
              <Link to="/contact.html" onClick={() => setIsMenuOpen(false)} className="block mt-4 btn-primary text-center text-sm">
                Get A Quote
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
