import React from 'react'
import AboutSection from '../components/AboutSection'
import SEOHead from '../components/SEO/SEOHead'

const AboutPage = () => {
  return (
    <div className="pt-24">
      <SEOHead
        title="About Us"
        description="Learn about Anuhya Digital — a team of 12+ expert Salesforce consultants and web developers with 10+ years of experience delivering digital transformation solutions."
        path="about-us.html"
      />
      <AboutSection />
    </div>
  )
}

export default AboutPage
