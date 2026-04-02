import React from 'react'
import { WEBSITE_NAME } from '../constants/constants';
import { WEBSITE_URL } from '../constants/constants';

const Minifooter = () => {
  const currentYear = new Date().getFullYear();
  return (
    <div className="border-t border-outline-variant/10 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-sm text-on-surface-variant text-center">
          &copy; {currentYear}. Created & Maintained by{' '}
          <a href={WEBSITE_URL} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
            {WEBSITE_NAME}
          </a>
          . All rights reserved.
        </p>
      </div>
    </div>
  )
}

export default Minifooter
