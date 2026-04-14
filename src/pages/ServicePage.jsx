import React from 'react'
import Services from '../components/Services'
import SEOHead from '../components/SEO/SEOHead'

const ServicePage = () => {
  return (
    <div className="pt-24">
      <SEOHead
        title="Our Services"
        description="Salesforce consulting, web development, SEO, social media marketing, mobile app development, e-commerce solutions, and digital strategy services from Anuhya Digital."
        path="services.html"
      />
      <Services />
    </div>
  )
}

export default ServicePage
