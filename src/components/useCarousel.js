import React, { useState, useEffect, useCallback } from 'react';

const useCarousel = (itemCount, { slidesToShow = 1, autoplaySpeed = 0, infinite = true } = {}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = useCallback(() => {
    setCurrentIndex(prev => {
      if (infinite) return (prev + 1) % itemCount;
      return Math.min(prev + 1, itemCount - slidesToShow);
    });
  }, [itemCount, slidesToShow, infinite]);

  const prev = useCallback(() => {
    setCurrentIndex(prev => {
      if (infinite) return (prev - 1 + itemCount) % itemCount;
      return Math.max(prev - 1, 0);
    });
  }, [itemCount, slidesToShow, infinite]);

  const goTo = useCallback((index) => {
    setCurrentIndex(index);
  }, []);

  useEffect(() => {
    if (!autoplaySpeed) return;
    const timer = setInterval(next, autoplaySpeed);
    return () => clearInterval(timer);
  }, [next, autoplaySpeed]);

  return { currentIndex, next, prev, goTo };
};

export default useCarousel;
