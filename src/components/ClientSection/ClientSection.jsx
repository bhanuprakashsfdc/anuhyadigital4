import React, { useState, useEffect } from 'react';

const ClientSection = () => {
  const [current, setCurrent] = useState(0);
  const clients = [
    "assets/images/clients/ajanu.png",
    "assets/images/clients/aarun.png",
    "assets/images/clients/asfdemo.png",
    "assets/images/clients/ags7.png",
    "assets/images/clients/ajb.png",
    "assets/images/clients/ajk.png",
    "assets/images/clients/asgic.png",
    "assets/images/clients/adisricargo.png",
    "assets/images/clients/srichad.png"
  ];

  const slidesToShow = 5;
  const totalSlides = Math.ceil(clients.length / slidesToShow);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % totalSlides);
    }, 2000);
    return () => clearInterval(timer);
  }, [totalSlides]);

  const getVisibleClients = () => {
    const start = current * slidesToShow;
    return clients.slice(start, start + slidesToShow);
  };

  return (
    <section className="py-16 md:py-24 relative overflow-hidden border-y border-outline-variant/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="w-8 h-0.5 bg-primary"></span>
            <span className="text-sm font-semibold text-primary font-label tracking-widest uppercase">Our Clients</span>
            <span className="w-8 h-0.5 bg-primary"></span>
          </div>
          <h2 className="section-heading text-2xl md:text-3xl font-bold text-on-surface">
            Trusted by <span className="neon-gradient-text">Industry Leaders</span>
          </h2>
        </div>

        <div className="relative overflow-hidden">
          <div className="flex items-center justify-center gap-8 md:gap-12 transition-all duration-500">
            {getVisibleClients().map((client, index) => (
              <div key={`${current}-${index}`} className="flex-shrink-0 grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300">
                <img src={client} className="h-12 md:h-16 w-auto object-contain" alt={`client-${index + 1}`} />
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === current ? 'bg-primary w-6' : 'bg-outline-variant/30 hover:bg-outline-variant/50'
              }`}
              aria-label={`Slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientSection;
