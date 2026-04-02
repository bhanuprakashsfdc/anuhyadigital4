import React from 'react'
import WebDesignJson from '../../data/webdesign.json'

const WebDesignKeywords = () => {
  return (
    <div className="py-8 border-t border-outline-variant/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-lg font-semibold text-on-surface mb-4 font-headline">{WebDesignJson.header}</h2>
        <div className="flex flex-wrap gap-2">
          {WebDesignJson.content.map((item, index) => (
            <span className="text-xs text-on-surface-variant px-3 py-1.5 rounded-full bg-surface-high/50 border border-outline-variant/10" key={index}>{item}</span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default WebDesignKeywords
