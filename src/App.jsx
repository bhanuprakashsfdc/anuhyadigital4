import React from 'react';
import Hero from './components/Hero'
import PromoSection from './components/PromoSection'
import AboutSection from './components/AboutSection'
import Services from './components/Services'
import ProjectSection from './components/ProjectSection'
import WorkingProcessSection from './components/WorkingProcessSection'
import ClientSection from './components/ClientSection/ClientSection'
import TestimonialsSection from './components/TestimonialsSection/TestimonialsSection'
import Blogs from './components/Blogs'

function App() {
  return (
    <>
      <Hero
        heading="Transform Your Business"
        subheading="Your Reliable Digital<br /><span>Partner & Guide</span>"
        description="Our dedicated team of experts is here to guide you through every step of your<br /> digital transformation journey, ensuring you make informed choices."
      />
      <PromoSection />
      <AboutSection />
      <Services />
      <ProjectSection />
      <WorkingProcessSection />
      <ClientSection />
      <TestimonialsSection />
      <Blogs />
    </>
  )
}

export default App
