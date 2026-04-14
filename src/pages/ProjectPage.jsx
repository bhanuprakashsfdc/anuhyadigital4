import React from 'react'
import ProjectSection from '../components/ProjectSection'
import SEOHead from '../components/SEO/SEOHead'

const ProjectPage = () => {
  return (
    <div className="pt-24">
      <SEOHead
        title="Our Projects"
        description="Explore Anuhya Digital's portfolio of Salesforce implementations, web development projects, SEO campaigns, and social media marketing work."
        path="projects.html"
      />
      <ProjectSection />
    </div>
  )
}

export default ProjectPage
