import React from 'react'
import ContactSection from '../components/ContactSection/ContactSection'
import SEOHead from '../components/SEO/SEOHead'

const ContactPage = () => {
  return (
    <div className="pt-24">
      <SEOHead
        title="Contact Us"
        description="Get in touch with Anuhya Digital for Salesforce consulting, web development, SEO, and digital marketing services. Based in Tirupati, serving clients worldwide."
        path="contact.html"
      />
      <ContactSection />
    </div>
  )
}

export default ContactPage
