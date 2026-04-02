import React from 'react'
import Salesforcejson from '../../data/salesforce.json'

const SalesforceKeywords = () => {
  return (
    <div className="py-8 border-t border-outline-variant/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-lg font-semibold text-on-surface mb-4 font-headline">{Salesforcejson.header}</h2>
        <div className="flex flex-wrap gap-2">
          {Salesforcejson.content.map((item, index) => (
            <span className="text-xs text-on-surface-variant px-3 py-1.5 rounded-full bg-surface-high/50 border border-outline-variant/10" key={index}>{item}</span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SalesforceKeywords
