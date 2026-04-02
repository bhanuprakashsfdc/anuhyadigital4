import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LoadingScreen = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // 1 second loading
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-surface"
        >
          <div className="relative mb-8">
            <motion.div
              animate={{
                rotate: 360,
                borderRadius: ["30%", "50%", "30%"],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "linear"
              }}
              className="w-24 h-24 border border-primary/30"
            />
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute inset-0 m-auto w-12 h-12 bg-primary blur-xl rounded-full"
            />
          </div>
          
          <div className="overflow-hidden">
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-primary font-headline text-lg tracking-[0.2em] uppercase"
            >
              Thinking <span className="animate-pulse">...</span>
            </motion.p>
          </div>
          
          <div className="mt-12 w-48 h-[1px] bg-outline-variant/20 relative overflow-hidden">
            <motion.div
              animate={{
                x: ["-100%", "100%"]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute inset-0 w-1/2 h-full bg-primary"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
