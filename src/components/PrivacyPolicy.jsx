import React from 'react'
import { WEBSITE_NAME } from '../constants/constants';

const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 mb-4">
          <span className="w-8 h-0.5 bg-primary"></span>
          <span className="text-sm font-semibold text-primary font-label tracking-widest uppercase">Legal</span>
        </div>
        <h1 className="section-heading text-3xl md:text-4xl font-bold text-on-surface">Privacy Policy</h1>
      </div>

      <div className="space-y-6 text-on-surface-variant leading-relaxed">
        <p>Your privacy is important to us. It is {WEBSITE_NAME}'s policy to respect your privacy regarding any information we may collect from you across our website.</p>

        <div className="card-glass p-6 md:p-8">
          <h2 className="text-xl font-semibold text-on-surface mb-3 font-headline">1. Information We Collect</h2>
          <p>We only ask for personal information when we truly need it to provide a service to you. We collect it by fair and lawful means, with your knowledge and consent.</p>
        </div>

        <div className="card-glass p-6 md:p-8">
          <h2 className="text-xl font-semibold text-on-surface mb-3 font-headline">2. How We Use Information</h2>
          <p>We use the collected information to provide, operate, maintain, improve, and customize our services, including analyzing and monitoring usage trends.</p>
        </div>

        <div className="card-glass p-6 md:p-8">
          <h2 className="text-xl font-semibold text-on-surface mb-3 font-headline">3. Information Sharing</h2>
          <p>We do not share any personally identifying information publicly or with third-parties, except when required to by law.</p>
        </div>

        <div className="card-glass p-6 md:p-8">
          <h2 className="text-xl font-semibold text-on-surface mb-3 font-headline">4. Data Retention</h2>
          <p>We retain collected information for as long as necessary to provide you with your requested service. What data we store, we protect within commercially acceptable means.</p>
        </div>

        <div className="card-glass p-6 md:p-8">
          <h2 className="text-xl font-semibold text-on-surface mb-3 font-headline">5. Your Rights</h2>
          <p>You are free to refuse our request for your personal information, with the understanding that we may be unable to provide you with some of your desired services.</p>
        </div>

        <div className="card-glass p-6 md:p-8">
          <h2 className="text-xl font-semibold text-on-surface mb-3 font-headline">6. Contact Us</h2>
          <p>If you have any questions about how we handle user data and personal information, feel free to contact us at <a href="mailto:hello@anuhyadigital.com" className="text-primary hover:underline">hello@anuhyadigital.com</a>.</p>
        </div>

        <p className="text-sm">This policy is effective as of 01-06-24.</p>
      </div>
    </div>
  )
}

export default PrivacyPolicy
