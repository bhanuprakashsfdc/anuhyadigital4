import React from 'react'
import Apppage from '../App'
import SEOHead from '../components/SEO/SEOHead'

const Homepage = () => {
  return (
    <div>
      <SEOHead
        title="Salesforce Consulting & Web Engineering"
        description="Anuhya Digital: 10+ years of expert Salesforce consulting and high-performance web development. Trusted by 30+ businesses across India, UK, Australia & EMEA."
        path=""
      />
      <Apppage />
    </div>
  )
}

export default Homepage
