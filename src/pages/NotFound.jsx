import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { ArrowLeft, Home } from 'lucide-react';

const NotFound = () => {
  return (
    <>
      <Helmet>
        <title>Page Not Found | Anuhya Digital</title>
        <meta name="description" content="The page you are looking for does not exist. Return to Anuhya Digital's homepage." />
      </Helmet>

      <section className="min-h-[80vh] flex flex-col items-center justify-center px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <div className="relative inline-block">
            <span className="text-[10rem] font-bold font-headline tracking-tighter text-surface-container-high select-none" aria-hidden="true">404</span>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 rotate-45 border-2 border-primary animate-[spin_8s_linear_infinite]" aria-hidden="true" />
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold font-headline tracking-tighter">Page Not Found</h1>
          <p className="text-on-surface-variant text-xl max-w-md mx-auto leading-relaxed">
            The page you're looking for doesn't exist or has been moved.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 pt-4">
            <Link
              to="/"
              className="cyber-gradient text-[#062100] px-10 py-4 rounded-md font-label font-black uppercase text-sm tracking-widest flex items-center gap-3 hover:scale-105 active:scale-95 transition-all shadow-[0_0_30px_rgba(173,255,133,0.2)] min-h-[44px]"
            >
              <Home size={18} />
              Go Home
            </Link>
            <Link
              to="/"
              className="border border-outline-variant/30 text-on-surface-variant px-10 py-4 rounded-md font-label font-black uppercase text-sm tracking-widest flex items-center gap-3 hover:border-primary hover:text-primary transition-all active:scale-95 min-h-[44px]"
            >
              <ArrowLeft size={18} />
              Go Back
            </Link>
          </div>
        </motion.div>
      </section>
    </>
  );
};

export default NotFound;
