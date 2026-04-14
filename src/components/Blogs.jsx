import React from 'react';
import { Link } from 'react-router-dom';
import blogPosts1 from '../data/blogPosts1';
import blogPosts2 from '../data/blogPosts2';
import blogPosts3 from '../data/blogPosts3';

const allLocalPosts = [...blogPosts1, ...blogPosts2, ...blogPosts3];
const displayedPosts = allLocalPosts.slice(0, 12);

const Blogs = () => {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="w-8 h-0.5 bg-primary"></span>
            <span className="text-sm font-semibold text-primary font-label tracking-widest uppercase">Blog & News</span>
            <span className="w-8 h-0.5 bg-primary"></span>
          </div>
          <h2 className="section-heading text-3xl md:text-4xl lg:text-5xl font-bold text-on-surface leading-tight">
            Stay Informed With The Newest<br />
            <span className="neon-gradient-text">Blog Posts & News</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedPosts.map(post => (
            <div key={post.id} className="card-glass overflow-hidden group">
              <div className="relative aspect-video overflow-hidden bg-surface-high/50">
                <img
                  src={post.image}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  alt={post.title}
                />
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/20 text-primary backdrop-blur-sm border border-primary/20">
                    {new Date(post.date).toLocaleDateString('en-US', { day: '2-digit', month: 'short' })}
                  </span>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-surface-high/80 text-on-surface-variant backdrop-blur-sm">
                    {post.category}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-4 mb-3 text-xs text-on-surface-variant">
                  <span className="flex items-center gap-1">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {post.readTime}
                  </span>
                  <span className="flex items-center gap-1">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    {post.author}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-on-surface mb-3 font-headline line-clamp-2 group-hover:text-primary transition-colors duration-300">
                  <Link to={`/blog/${post.slug}.html`}>{post.title}</Link>
                </h3>
                <p className="text-sm text-on-surface-variant leading-relaxed line-clamp-3">{post.excerpt}</p>
                <Link
                  to={`/blog/${post.slug}.html`}
                  className="mt-4 inline-flex items-center gap-2 text-sm text-primary font-medium group-hover:gap-3 transition-all duration-300"
                >
                  Read More
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blogs;
