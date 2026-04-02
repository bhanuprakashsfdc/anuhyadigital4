import React from 'react';

const WorkingProcessSection = () => {
  const steps = [
    {
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
      ),
      title: "Requirement Gathering",
      description: "Collaborate closely with clients to understand and document their project needs and objectives.",
      step: "01",
    },
    {
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      title: "Planning & Analysis",
      description: "Analyze client requirements to create a detailed project plan and define the project scope.",
      step: "02",
    },
    {
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
        </svg>
      ),
      title: "Design & Prototyping",
      description: "Develop design mockups and prototypes to visualize the solution and ensure alignment with client expectations.",
      step: "03",
    },
    {
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
      title: "Development",
      description: "Execute the project plan by coding and integrating various components of the solution.",
      step: "04",
    },
    {
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Testing & QA",
      description: "Conduct rigorous testing and quality assurance to ensure the solution is bug-free and meets all requirements.",
      step: "05",
    },
    {
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
        </svg>
      ),
      title: "Deployment",
      description: "Deploy the solution to the production environment and ensure a smooth launch.",
      step: "06",
    },
    {
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      title: "Support & Maintenance",
      description: "Provide ongoing support and maintenance to ensure the solution continues to meet client needs.",
      step: "07",
    },
  ];

  return (
    <section className="py-24 md:py-32 relative overflow-hidden bg-surface-high/30">
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/5 rounded-full blur-[120px]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="w-8 h-0.5 bg-primary"></span>
            <span className="text-sm font-semibold text-primary font-label tracking-widest uppercase">Our Approach</span>
            <span className="w-8 h-0.5 bg-primary"></span>
          </div>
          <h2 className="section-heading text-3xl md:text-4xl lg:text-5xl font-bold text-on-surface leading-tight">
            Understanding the Mechanics<br />
            <span className="neon-gradient-text">Of Our Workflow</span>
          </h2>
        </div>

        {/* Steps grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.slice(0, 4).map((step, index) => (
            <div
              key={index}
              className="card-glass p-6 relative group"
            >
              <div className="absolute top-4 right-4 text-4xl font-bold text-primary/10 font-headline">{step.step}</div>
              <div className="w-14 h-14 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-5 group-hover:bg-primary group-hover:text-background group-hover:shadow-[0_0_30px_rgba(173,255,133,0.3)] transition-all duration-300">
                {step.icon}
              </div>
              <h4 className="text-lg font-semibold text-on-surface mb-2 font-headline">{step.title}</h4>
              <p className="text-sm text-on-surface-variant leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>

        {/* Second row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6 max-w-4xl mx-auto">
          {steps.slice(4).map((step, index) => (
            <div
              key={index}
              className="card-glass p-6 relative group"
            >
              <div className="absolute top-4 right-4 text-4xl font-bold text-primary/10 font-headline">{step.step}</div>
              <div className="w-14 h-14 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-5 group-hover:bg-primary group-hover:text-background group-hover:shadow-[0_0_30px_rgba(173,255,133,0.3)] transition-all duration-300">
                {step.icon}
              </div>
              <h4 className="text-lg font-semibold text-on-surface mb-2 font-headline">{step.title}</h4>
              <p className="text-sm text-on-surface-variant leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkingProcessSection;
