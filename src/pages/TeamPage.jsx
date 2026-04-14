import React from 'react'
import TeamSection from '../components/TeamSection/TeamSection'
import SEOHead from '../components/SEO/SEOHead'

const TeamPage = () => {
  return (
    <div className="pt-24">
      <SEOHead
        title="Our Team"
        description="Meet the expert team behind Anuhya Digital — Salesforce consultants, web developers, and digital marketing specialists with 10+ years of experience."
        path="team.html"
      />
      <TeamSection />
    </div>
  )
}

export default TeamPage
