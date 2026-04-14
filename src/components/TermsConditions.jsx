import React from 'react';
import { WEBSITE_NAME, WEBSITE_URL, WEBSITE_EMAIL, WEBSITE_EMAILTag } from '../constants/constants';

const TermsConditions = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 mb-4">
          <span className="w-8 h-0.5 bg-primary"></span>
          <span className="text-sm font-semibold text-primary font-label tracking-widest uppercase">Legal</span>
        </div>
        <h1 className="section-heading text-3xl md:text-4xl font-bold text-on-surface">Terms and Conditions</h1>
      </div>

      <div className="space-y-6 text-on-surface-variant leading-relaxed">
        <p>Last updated: July 17, 2024</p>
        <p>Please read these terms and conditions carefully before using Our Service.</p>

        <div className="card-glass p-6 md:p-8">
          <h2 className="text-xl font-semibold text-on-surface mb-3 font-headline">Interpretation and Definitions</h2>
          <p className="mb-4">The words of which the initial letter is capitalized have meanings defined under the following conditions.</p>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></span>
              <span><strong className="text-on-surface">Company</strong> refers to {WEBSITE_NAME}.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></span>
              <span><strong className="text-on-surface">Service</strong> refers to the Website.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></span>
              <span><strong className="text-on-surface">Website</strong> refers to {WEBSITE_NAME}, accessible from <a href={WEBSITE_URL} className="text-primary hover:underline">{WEBSITE_URL}</a></span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></span>
              <span><strong className="text-on-surface">You</strong> means the individual accessing or using the Service.</span>
            </li>
          </ul>
        </div>

        <div className="card-glass p-6 md:p-8">
          <h2 className="text-xl font-semibold text-on-surface mb-3 font-headline">Acknowledgment</h2>
          <p>These are the Terms and Conditions governing the use of this Service. By accessing or using the Service You agree to be bound by these Terms and Conditions. If You disagree with any part, then You may not access the Service.</p>
        </div>

        <div className="card-glass p-6 md:p-8">
          <h2 className="text-xl font-semibold text-on-surface mb-3 font-headline">Links to Other Websites</h2>
          <p>Our Service may contain links to third-party web sites or services that are not owned or controlled by the Company. We strongly advise You to read the terms and conditions of any third-party web sites that You visit.</p>
        </div>

        <div className="card-glass p-6 md:p-8">
          <h2 className="text-xl font-semibold text-on-surface mb-3 font-headline">Termination</h2>
          <p>We may terminate or suspend Your access immediately, without prior notice or liability, for any reason whatsoever, including without limitation if You breach these Terms and Conditions.</p>
        </div>

        <div className="card-glass p-6 md:p-8">
          <h2 className="text-xl font-semibold text-on-surface mb-3 font-headline">Limitation of Liability</h2>
          <p>To the maximum extent permitted by applicable law, in no event shall the Company or its suppliers be liable for any special, incidental, indirect, or consequential damages whatsoever.</p>
        </div>

        <div className="card-glass p-6 md:p-8">
          <h2 className="text-xl font-semibold text-on-surface mb-3 font-headline">Governing Law</h2>
          <p>The laws of the Country, excluding its conflicts of law rules, shall govern this Terms and Your use of the Service.</p>
        </div>

        <div className="card-glass p-6 md:p-8">
          <h2 className="text-xl font-semibold text-on-surface mb-3 font-headline">Changes to These Terms</h2>
          <p>We reserve the right to modify or replace these Terms at any time. By continuing to access or use Our Service after revisions become effective, You agree to be bound by the revised terms.</p>
        </div>

        <div className="card-glass p-6 md:p-8">
          <h2 className="text-xl font-semibold text-on-surface mb-3 font-headline">Contact Us</h2>
          <p>If you have any questions about these Terms and Conditions, contact us at: <a href={WEBSITE_EMAILTag} className="text-primary hover:underline">{WEBSITE_EMAIL}</a></p>
        </div>
      </div>
    </div>
  )
}

export default TermsConditions
