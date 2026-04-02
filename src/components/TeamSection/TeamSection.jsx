import React, { useState, useEffect } from 'react';

const TeamSection = () => {
  const [current, setCurrent] = useState(0);
  const teamMembers = [
    {
      imgSrc: "assets/images/img/team1.png",
      role: "CONSULTANT",
      name: "Jane Cooper",
      socialLinks: { instagram: "#", linkedin: "#", twitter: "#", facebook: "#" }
    },
    {
      imgSrc: "assets/images/img/team2.png",
      role: "CONSULTANT",
      name: "Jane Cooper",
      socialLinks: { instagram: "#", linkedin: "#", twitter: "#", facebook: "#" }
    },
    {
      imgSrc: "assets/images/img/team3.png",
      role: "CONSULTANT",
      name: "Cameron Williamson",
      socialLinks: { instagram: "#", linkedin: "#", twitter: "#", facebook: "#" }
    },
    {
      imgSrc: "assets/images/img/team1.png",
      role: "CONSULTANT",
      name: "Jane Cooper",
      socialLinks: { instagram: "#", linkedin: "#", twitter: "#", facebook: "#" }
    }
  ];

  const slidesToShow = 3;
  const totalSlides = Math.ceil(teamMembers.length / slidesToShow);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % totalSlides);
    }, 3000);
    return () => clearInterval(timer);
  }, [totalSlides]);

  const getVisibleMembers = () => {
    const start = current * slidesToShow;
    return teamMembers.slice(start, start + slidesToShow);
  };

  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-primary/5 rounded-full blur-[120px]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="w-8 h-0.5 bg-primary"></span>
            <span className="text-sm font-semibold text-primary font-label tracking-widest uppercase">Our Specialist</span>
            <span className="w-8 h-0.5 bg-primary"></span>
          </div>
          <h2 className="section-heading text-3xl md:text-4xl lg:text-5xl font-bold text-on-surface leading-tight">
            Let's Introduce Our Expert<br />
            <span className="neon-gradient-text">Team Members</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {getVisibleMembers().map((member, index) => (
            <div key={`${current}-${index}`} className="group relative rounded-2xl overflow-hidden border border-outline-variant/20 hover:border-primary/30 transition-all duration-300">
              <div className="aspect-[3/4] overflow-hidden">
                <img
                  src={member.imgSrc}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  alt={member.name}
                />
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background via-background/80 to-transparent p-6">
                <p className="text-xs text-primary font-label tracking-widest uppercase mb-1">{member.role}</p>
                <h5 className="text-lg font-semibold text-on-surface font-headline">{member.name}</h5>
                <div className="flex gap-3 mt-3">
                  {Object.entries(member.socialLinks).map(([platform, link]) => (
                    <a key={platform} href={link} className="w-8 h-8 rounded-lg bg-surface-high/50 border border-outline-variant/20 flex items-center justify-center text-on-surface-variant hover:text-primary hover:border-primary/30 transition-all duration-300">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                      </svg>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          ))}
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

export default TeamSection;
