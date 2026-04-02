import React from 'react';
import Hero from './components/Hero'
import PromoSection from './components/PromoSection'
import AboutSection from './components/AboutSection'
import Services from './components/Services'
import HomeLeadForm from './components/HomeLeadForm/HomeLeadForm'
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
      />
      <PromoSection />
      <AboutSection />
      <Services />
      <HomeLeadForm />
      <ProjectSection />
      <WorkingProcessSection />
      <ClientSection />
      <TestimonialsSection />
      <Blogs />
    </>
  )
}

export default App
