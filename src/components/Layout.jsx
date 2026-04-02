import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from './Navbar';
import Footer from './Footer';
import LoadingScreen from './LoadingScreen';

const Layout = ({ children }) => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [pathname]);

  return (
    <div className="min-h-screen bg-surface flex flex-col selection:bg-primary/30">
      <a href="#main-content" className="skip-to-content">
        Skip to main content
      </a>
      <LoadingScreen />
      <Navbar />
      <main id="main-content" role="main" className="flex-grow pt-24 md:pt-32">
        <motion.div
          key={pathname}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          {children}
        </motion.div>
      </main>
      <Footer />

      <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden" aria-hidden="true">
        <div className="absolute top-0 right-0 w-1/3 h-1/2 bg-primary/5 blur-[120px] rounded-full translate-x-1/4 -translate-y-1/4" />
        <div className="absolute bottom-0 left-0 w-1/4 h-1/3 bg-secondary/5 blur-[100px] rounded-full -translate-x-1/4 translate-y-1/4" />
      </div>
    </div>
  );
};

export default Layout;
