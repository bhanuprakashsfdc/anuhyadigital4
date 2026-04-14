import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEO/SEOHead';
import blogPosts1 from '../data/blogPosts1';
import blogPosts2 from '../data/blogPosts2';
import blogPosts3 from '../data/blogPosts3';

const allPosts = [...blogPosts1, ...blogPosts2, ...blogPosts3].sort(
  (a, b) => new Date(b.date) - new Date(a.date)
);

const categories = ['All', ...new Set(allPosts.map(p => p.category))];

const AllBlogsPage = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [visibleCount, setVisibleCount] = useState(9);

  const filtered = activeCategory === 'All'
    ? allPosts
    : allPosts.filter(p => p.category === activeCategory);

  const visiblePosts = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    if (scrollHeight - scrollTop - clientHeight < 300 && hasMore) {
      setVisibleCount(prev => prev + 6);
    }
  };

  return (
    <div className="pt-28 pb-20" onScroll={handleScroll}>
      <SEOHead
        title="Blog & News"
        description="Expert insights on Salesforce development, web development, AI-driven design, and advanced coding techniques from Anuhya Digital."
        path="blogs.html"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="w-8 h-0.5 bg-primary"></span>
            <span className="text-sm font-semibold text-primary font-label tracking-widest uppercase">{allPosts.length} Articles</span>
            <span className="w-8 h-0.5 bg-primary"></span>
          </div>
          <h1 className="section-heading text-3xl md:text-4xl lg:text-5xl font-bold text-on-surface leading-tight">
            <span className="neon-gradient-text">Blog & Insights</span>
          </h1>
          <p className="text-on-surface-variant mt-4">
            Salesforce development, web engineering, AI design, and advanced coding techniques.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => { setActiveCategory(cat); setVisibleCount(9); }}
              className={`px-4 py-2 rounded-lg text-sm font-medium font-label transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-primary text-background'
                  : 'bg-surface-high text-on-surface-variant hover:text-primary hover:bg-surface-highest'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {visiblePosts.map(post => (
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

        {hasMore && (
          <div className="text-center mt-12">
            <button
              onClick={() => setVisibleCount(prev => prev + 6)}
              className="btn-outline px-8 py-3"
            >
              Load More Posts
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllBlogsPage;
