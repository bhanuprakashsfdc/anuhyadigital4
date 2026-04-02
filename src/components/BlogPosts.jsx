import React, { useEffect, useState } from 'react';

const BlogPosts = () => {
  const [blogPosts, setBlogPosts] = useState([]);

  useEffect(() => {
    fetch('/data/blogpost.json')
      .then(response => response.json())
      .then(data => setBlogPosts(data))
      .catch(error => console.error('Error fetching blog posts:', error));
  }, []);

  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="w-8 h-0.5 bg-primary"></span>
            <span className="text-sm font-semibold text-primary font-label tracking-widest uppercase">Blog & News</span>
            <span className="w-8 h-0.5 bg-primary"></span>
          </div>
          <h2 className="section-heading text-3xl md:text-4xl font-bold text-on-surface leading-tight">
            Stay Informed With The Newest<br />
            <span className="neon-gradient-text">Blog Posts & News</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post, index) => (
            <div key={index} className="card-glass overflow-hidden group">
              <div className="relative aspect-video overflow-hidden">
                <img src={post.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="blog" />
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/20 text-primary backdrop-blur-sm border border-primary/20">
                    {post.date}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-4 mb-3 text-xs text-on-surface-variant">
                  <span>{post.author}</span>
                  <span>{post.comments} comments</span>
                </div>
                <h3 className="text-lg font-semibold text-on-surface mb-3 font-headline group-hover:text-primary transition-colors duration-300">
                  <a href={post.link}>{post.title}</a>
                </h3>
                <p className="text-sm text-on-surface-variant leading-relaxed">{post.description}</p>
                <a href={post.link} className="mt-4 inline-flex items-center gap-2 text-sm text-primary font-medium group-hover:gap-3 transition-all duration-300">
                  Read More
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogPosts;
