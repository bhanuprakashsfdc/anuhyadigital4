import React from 'react';
import { useParams, Link } from 'react-router-dom';
import SEOHead from '../components/SEO/SEOHead';
import blogPosts1 from '../data/blogPosts1';
import blogPosts2 from '../data/blogPosts2';
import blogPosts3 from '../data/blogPosts3';

const allPosts = [...blogPosts1, ...blogPosts2, ...blogPosts3];

const BlogPostPage = () => {
  const { slug } = useParams();
  const cleanSlug = slug.replace('.html', '');
  const post = allPosts.find(p => p.slug === cleanSlug);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-6xl font-bold neon-gradient-text mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-on-surface mb-4">Post Not Found</h2>
          <Link to="/blogs.html" className="btn-primary inline-flex items-center gap-2">
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  const relatedPosts = allPosts
    .filter(p => p.category === post.category && p.id !== post.id)
    .slice(0, 3);

  return (
    <div className="pt-28 pb-20">
      <SEOHead
        title={post.title}
        description={post.excerpt}
        path={`blog/${post.slug}.html`}
      />

      <article className="max-w-4xl mx-auto px-4 sm:px-6">
        <header className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/20 text-primary border border-primary/20">
              {post.category}
            </span>
            <span className="text-sm text-on-surface-variant">
              {new Date(post.date).toLocaleDateString('en-US', { day: '2-digit', month: 'long', year: 'numeric' })}
            </span>
            <span className="text-sm text-on-surface-variant">|</span>
            <span className="text-sm text-on-surface-variant">{post.readTime}</span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-on-surface leading-tight font-headline mb-6">
            {post.title}
          </h1>
          <p className="text-lg text-on-surface-variant leading-relaxed">
            {post.excerpt}
          </p>
          <div className="flex items-center gap-3 mt-6 pt-6 border-t border-outline-variant/20">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm">
              AD
            </div>
            <div>
              <p className="text-sm font-medium text-on-surface">{post.author}</p>
              <p className="text-xs text-on-surface-variant">Salesforce & Web Engineering Experts</p>
            </div>
          </div>
        </header>

        <div
          className="prose prose-invert max-w-none
            [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-on-surface [&_h2]:font-headline [&_h2]:mt-12 [&_h2]:mb-4
            [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-on-surface [&_h3]:font-headline [&_h3]:mt-8 [&_h3]:mb-3
            [&_p]:text-on-surface-variant [&_p]:leading-relaxed [&_p]:mb-4
            [&_ul]:space-y-2 [&_ul]:mb-6 [&_ul]:pl-6
            [&_li]:text-on-surface-variant [&_li]:leading-relaxed [&_li]:list-disc
            [&_li_strong]:text-on-surface
            [&_pre]:bg-surface-high/80 [&_pre]:rounded-lg [&_pre]:p-4 [&_pre]:overflow-x-auto [&_pre]:mb-6 [&_pre]:border [&_pre]:border-outline-variant/20
            [&_code]:text-sm [&_code]:font-mono [&_code]:text-primary"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {relatedPosts.length > 0 && (
          <section className="mt-16 pt-12 border-t border-outline-variant/20">
            <h3 className="text-2xl font-bold text-on-surface font-headline mb-8">Related Posts</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {relatedPosts.map(rp => (
                <Link key={rp.id} to={`/blog/${rp.slug}.html`} className="card-glass p-4 group">
                  <span className="text-xs text-primary font-medium">{rp.category}</span>
                  <h4 className="text-sm font-semibold text-on-surface mt-2 line-clamp-2 group-hover:text-primary transition-colors">
                    {rp.title}
                  </h4>
                  <span className="text-xs text-on-surface-variant mt-2 block">{rp.readTime}</span>
                </Link>
              ))}
            </div>
          </section>
        )}
      </article>
    </div>
  );
};

export default BlogPostPage;
