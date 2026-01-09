import React from 'react'

const SectionTitle = ({ title }) => {
  return (
    <div className='flex flex-col items-start py-4 sm:py-2'>
      <div className="flex items-center gap-4">
        <h2 className="text-4xl sm:text-2xl font-bold text-white" style={{ fontFamily: "'Orbitron', sans-serif" }}>
          {title}
        </h2>
        <div className="hidden sm:block w-16 h-0.5 bg-gradient-to-r from-thirdry to-transparent"></div>
      </div>
      <div className="flex items-center gap-4 mt-3 w-full">
        <div className="w-24 sm:w-16 h-1 rounded-full bg-gradient-to-r from-thirdry to-secondary"></div>
        <div className="flex-1 h-px bg-gradient-to-r from-thirdry/30 to-transparent"></div>
      </div>
    </div>
  )
}

export default SectionTitle