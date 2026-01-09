import React, { useState } from 'react'
import SectionTitle from '../../components/SectionTitle'
import { useSelector } from "react-redux"

const Education = () => {
  const { portfolioData } = useSelector((state) => state.portfolio)
  const educations = portfolioData?.educations || []

  const [selectedItem, setSelectedItem] = useState(0)

  // Don't render if no education entries
  if (!educations || educations.length === 0) {
    return null
  }

  return (
    <div className='py-16 sm:py-8 relative' id='education'>
      {/* Background decoration */}
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-500/5 rounded-full blur-3xl"></div>

      <SectionTitle title="Education" />

      {/* Timeline View */}
      <div className="mt-12 relative">
        {/* Timeline Line */}
        <div className="absolute left-8 sm:left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-thirdry via-thirdry/50 to-transparent"></div>

        <div className="space-y-8">
          {educations.map((edu, idx) => (
            <div
              key={edu._id || idx}
              className={`relative pl-20 sm:pl-12 animate-fadeIn cursor-pointer`}
              style={{ animationDelay: `${idx * 0.2}s` }}
              onClick={() => setSelectedItem(idx)}
            >
              {/* Timeline Dot */}
              <div className={`absolute left-6 sm:left-2 top-2 w-5 h-5 rounded-full border-2 transition-all duration-300 ${
                selectedItem === idx
                  ? 'bg-thirdry border-thirdry shadow-lg shadow-teal-500/50'
                  : 'bg-primary border-thirdry/50 hover:border-thirdry'
              }`}>
                {selectedItem === idx && (
                  <div className="absolute inset-0 rounded-full bg-thirdry animate-ping opacity-30"></div>
                )}
              </div>

              {/* Content Card */}
              <div className={`glass-dark p-6 sm:p-4 rounded-xl transition-all duration-300 hover-lift ${
                selectedItem === idx
                  ? 'border-2 border-thirdry/50 shadow-lg shadow-teal-500/10'
                  : 'border border-transparent hover:border-thirdry/20'
              }`}>
                {/* Period Badge */}
                <div className="inline-block px-3 py-1 bg-thirdry/10 rounded-full text-thirdry text-sm font-medium mb-3">
                  {edu.period}
                </div>

                {/* Title */}
                <h3 className="text-2xl sm:text-lg font-bold text-secondary mb-2">
                  {edu.title}
                </h3>

                {/* Institution */}
                <div className="flex items-center gap-2 text-gray-400 mb-3">
                  <svg className="w-4 h-4 text-thirdry" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  <span className="sm:text-sm">{edu.collage}</span>
                </div>

                {/* Percentage/Grade */}
                {edu.percentage && (
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-thirdry" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                      </svg>
                      <span className="text-white font-semibold">{edu.percentage}</span>
                    </div>
                  </div>
                )}

                {/* Description */}
                {selectedItem === idx && edu.description && (
                  <p className="text-gray-400 sm:text-sm leading-relaxed animate-fadeIn">
                    {edu.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Education
