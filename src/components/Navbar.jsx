import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Rocket } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Services', path: '/services' },
    { name: 'About', path: '/about' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'Blog', path: '/blog' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${
      scrolled ? 'bg-surface/80 backdrop-blur-xl border-b border-outline-variant/15 py-3' : 'bg-transparent py-5'
    }`}>
      <div className="max-w-screen-2xl mx-auto px-8 flex justify-between items-center">
        <NavLink to="/" className="flex items-center gap-3 group">
          <div className="relative">
            <div className="w-8 h-8 rotate-45 border border-primary group-hover:rotate-90 transition-transform duration-500" />
            <div className="absolute inset-0 m-auto w-1 h-1 bg-primary rounded-full group-hover:scale-[3] transition-transform" />
          </div>
          <span className="text-2xl font-bold tracking-tighter text-on-surface font-headline uppercase">
            Anuhya <span className="text-primary italic">Digital</span>
          </span>
        </NavLink>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-10 items-center">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) => `
                font-headline tracking-tighter text-sm uppercase transition-all relative group
                ${isActive ? 'text-primary' : 'text-on-surface hover:text-primary'}
              `}
            >
              {link.name}
              <span className={`absolute -bottom-1 left-0 h-[1.5px] bg-primary transition-all duration-300 ${
                location.pathname === link.path ? 'w-full' : 'w-0 group-hover:w-full'
              }`} />
            </NavLink>
          ))}
          <NavLink 
            to="/contact" 
            className="ml-4 px-6 py-2.5 bg-gradient-to-br from-primary to-[#2a7302] text-[#062100] font-label text-xs font-black uppercase tracking-widest rounded-md hover:scale-[1.03] transition-all shadow-[0_0_20px_rgba(173,255,133,0.15)] active:scale-95"
          >
            Get a Quote
          </NavLink>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-primary p-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-surface-container-high border-b border-outline-variant/15 md:hidden"
          >
            <div className="flex flex-col p-8 gap-6 shadow-2xl">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className="font-headline text-2xl font-bold border-b border-outline-variant/5 pb-4 last:border-0"
                >
                  {link.name}
                </NavLink>
              ))}
              <NavLink
                to="/contact"
                onClick={() => setIsOpen(false)}
                className="mt-4 px-8 py-4 bg-primary text-[#062100] text-center font-bold font-label uppercase text-sm tracking-widest rounded-md shadow-lg"
              >
                Inquiry
              </NavLink>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
