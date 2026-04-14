import React from 'react'
import Blogs from '../components/Blogs'
import SEOHead from '../components/SEO/SEOHead'

const BlogPage = () => {
  return (
    <div className="pt-24">
      <SEOHead
        title="Blog & News"
        description="Stay updated with the latest insights on Salesforce, web development, SEO, and digital marketing from Anuhya Digital's expert team."
        path="blogs.html"
      />
      <Blogs />
    </div>
  )
}

export default BlogPage
