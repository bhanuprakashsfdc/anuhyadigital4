import React from 'react';

const WebToLeadForm = () => {
  return (
    <form action="https://webto.salesforce.com/servlet/servlet.WebToLead?encoding=UTF-8&orgId=00D2x000004uBnW" method="POST">
      <input type="hidden" name="oid" value="00D2x000004uBnW" />
      <input type="hidden" name="retURL" value="https://anuhyadigital.com/" />

      <h3 className="text-xl font-semibold text-on-surface mb-6 font-headline">Send Us a Message</h3>

      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="first_name" className="block text-sm text-on-surface-variant mb-2">First Name</label>
            <input
              type="text"
              className="input-field"
              id="first_name"
              name="first_name"
              maxLength={40}
              placeholder="John"
            />
          </div>
          <div>
            <label htmlFor="last_name" className="block text-sm text-on-surface-variant mb-2">Last Name</label>
            <input
              type="text"
              className="input-field"
              id="last_name"
              name="last_name"
              maxLength={80}
              placeholder="Doe"
            />
          </div>
        </div>

        <div>
          <label htmlFor="email" className="block text-sm text-on-surface-variant mb-2">Email</label>
          <input
            type="email"
            className="input-field"
            id="email"
            name="email"
            maxLength={80}
            placeholder="john@example.com"
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm text-on-surface-variant mb-2">Phone</label>
          <input
            type="text"
            className="input-field"
            id="phone"
            name="phone"
            maxLength={40}
            placeholder="+91 98765 43210"
          />
        </div>

        <div>
          <label htmlFor="company" className="block text-sm text-on-surface-variant mb-2">Company</label>
          <input
            type="text"
            className="input-field"
            id="company"
            name="company"
            maxLength={40}
            placeholder="Your Company"
          />
        </div>

        <div>
          <label htmlFor="linkedin" className="block text-sm text-on-surface-variant mb-2">LinkedIn</label>
          <input
            type="text"
            className="input-field"
            id="00N2x000006WIXH"
            name="00N2x000006WIXH"
            maxLength={20}
            placeholder="linkedin.com/in/yourprofile"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm text-on-surface-variant mb-2">Message</label>
          <textarea
            className="input-field min-h-[120px] resize-y"
            id="description"
            name="description"
            placeholder="Tell us about your project..."
          ></textarea>
        </div>

        <button type="submit" className="btn-primary w-full text-center">
          Send Message
        </button>
      </div>
    </form>
  );
};

export default WebToLeadForm;
