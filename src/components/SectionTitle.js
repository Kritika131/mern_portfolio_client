import React from 'react'

const SectionTitle = ({title}) => {
  return (
    <div className='flex gap-6 items-center text-center py-10 sm:py-8 sm:gap-1 sm:flex-col'>
      <h1 className="text-3xl text-secondary sm:text-2xl " style={{fontFamily:"'Rubik Doodle Shadow', sans-serif"}}>{title}</h1>
      <div className="w-56 h-[2px] sm:w-36 sm:border-2 rounded-lg border-[1px] mt-[4px] border-secondary"></div>
    </div>
  )
}

export default SectionTitle