import React from 'react';

const PromoSection = () => {
  const promos = [
    {
      value: '30+',
      label: 'Successful Projects',
      description: 'Our dedicated team ensures the success of your projects with expertise in Salesforce, web development, SEO, and SMM.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      ),
    },
    {
      value: '12+',
      label: 'Expert Consultants',
      description: 'Our team of expert consultants provides top-notch Salesforce and digital marketing solutions tailored to your needs.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
    },
    {
      value: '95%',
      label: 'Client Satisfaction',
      description: 'We pride ourselves on our high client satisfaction rate, delivering exceptional results for every project.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
  ];

  return (
    <section className="relative -mt-10 z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {promos.map((promo, index) => (
            <div
              key={index}
              className="card-glass p-6 md:p-8 group"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:bg-primary/20 transition-all duration-300">
                  {promo.icon}
                </div>
                <div>
                  <div className="text-3xl font-bold neon-gradient-text font-headline">{promo.value}</div>
                  <h4 className="text-lg font-semibold text-on-surface mt-1 font-headline">{promo.label}</h4>
                  <p className="text-sm text-on-surface-variant mt-2 leading-relaxed">{promo.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PromoSection;
