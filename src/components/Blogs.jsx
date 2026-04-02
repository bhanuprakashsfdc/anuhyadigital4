import React, { useEffect, useState } from 'react';
import axios from 'axios';

const stripHtml = (html) => {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body.textContent || '';
};

const Blogs = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    axios.get('https://learn.anuhyadigital.com/wp-json/wp/v2/posts?per_page=12&_embed', {
      signal: controller.signal,
    })
      .then(response => {
        setPosts(response.data);
        setLoading(false);
      })
      .catch(error => {
        if (!axios.isCancel(error)) {
          setError('Unable to load blog posts. Please try again later.');
          setLoading(false);
        }
      });

    return () => controller.abort();
  }, []);

  const BlogSkeleton = () => (
    <div className="card-glass overflow-hidden animate-pulse">
      <div className="aspect-video bg-surface-high"></div>
      <div className="p-6 space-y-3">
        <div className="h-3 bg-surface-high rounded w-1/3"></div>
        <div className="h-5 bg-surface-high rounded w-full"></div>
        <div className="h-5 bg-surface-high rounded w-2/3"></div>
        <div className="h-3 bg-surface-high rounded w-full"></div>
        <div className="h-3 bg-surface-high rounded w-4/5"></div>
      </div>
    </div>
  );

  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
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

        {/* Error state */}
        {error && (
          <div className="text-center py-12">
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {error}
            </div>
          </div>
        )}

        {/* Blog grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            Array.from({ length: 6 }).map((_, i) => <BlogSkeleton key={i} />)
          ) : (
            posts.map(post => (
              <div key={post.id} className="card-glass overflow-hidden group">
                <div className="relative aspect-video overflow-hidden">
                  {post._embedded?.['wp:featuredmedia']?.[0]?.source_url && (
                    <img
                      src={post._embedded['wp:featuredmedia'][0].source_url}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      alt={stripHtml(post.title.rendered)}
                    />
                  )}
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/20 text-primary backdrop-blur-sm border border-primary/20">
                      {new Date(post.date).toLocaleDateString('en-US', { day: '2-digit', month: 'short' })}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-3 text-xs text-on-surface-variant">
                    <span className="flex items-center gap-1">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      {post._embedded?.author?.[0]?.name}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-on-surface mb-3 font-headline line-clamp-2 group-hover:text-primary transition-colors duration-300">
                    <a href={post.link} target="_blank" rel="noopener noreferrer">{stripHtml(post.title.rendered)}</a>
                  </h3>
                  <p className="text-sm text-on-surface-variant leading-relaxed line-clamp-3">{stripHtml(post.excerpt.rendered)}</p>
                  <a
                    href={post.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-2 text-sm text-primary font-medium group-hover:gap-3 transition-all duration-300"
                  >
                    Read More
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default Blogs;
