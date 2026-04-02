import React, { useState } from 'react';
import projectData from '../data/projects.json';

const ProjectSection = () => {
  const [filter, setFilter] = useState('all');

  const categories = [
    { key: 'all', label: 'View All' },
    { key: 'salesforce', label: 'Salesforce' },
    { key: 'webdev', label: 'Web Development' },
    { key: 'seo', label: 'SEO' },
    { key: 'smm', label: 'SMM' },
  ];

  const filteredProjects = filter === 'all'
    ? projectData
    : projectData.filter(p => p.category === filter);

  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="w-8 h-0.5 bg-primary"></span>
            <span className="text-sm font-semibold text-primary font-label tracking-widest uppercase">Our Latest Projects</span>
            <span className="w-8 h-0.5 bg-primary"></span>
          </div>
          <h2 className="section-heading text-3xl md:text-4xl lg:text-5xl font-bold text-on-surface leading-tight">
            Explore Our Latest Projects Now<br />
            <span className="neon-gradient-text">Successfully Finished</span>
          </h2>
        </div>

        {/* Filter buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setFilter(cat.key)}
              className={`px-5 py-2.5 rounded-lg text-sm font-medium font-label tracking-wide transition-all duration-300 ${
                filter === cat.key
                  ? 'cyber-gradient text-background shadow-[0_0_20px_rgba(173,255,133,0.2)]'
                  : 'border border-outline-variant/30 text-on-surface-variant hover:border-primary/30 hover:text-primary'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group relative rounded-2xl overflow-hidden border border-outline-variant/20 hover:border-primary/30 transition-all duration-300"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={project.image}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  alt={project.title}
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <p className="text-sm text-on-surface-variant mb-2">{project.description}</p>
                <h4 className="text-lg font-semibold text-on-surface font-headline">{project.title}</h4>
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-2 text-sm text-primary font-medium"
                  >
                    View Project
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectSection;
