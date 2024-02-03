import React from 'react'
import SectionTitle from '../../components/SectionTitle'
import {useSelector} from 'react-redux'

const About = () => {
  const skills = [
    "JavaScript",
    "React",
    "Node",
    "Express",
    "MongoDB",
    "Firebase"
  ]

  const {loading,portfolioData} = useSelector((state)=>state.portfolio)
  const {about} = portfolioData;
  // console.log("about ",about);
  
  return (
    <div id='about'>
      <SectionTitle title="About me"/>
      <div className="flex sm:flex-col w-full items-center gap-28 sm:gap-1 py-10 sm:py-0   ">
        <div className="h-[50vh]  w-1/2 sm:w-full flex items-center justify-center sm:px-12 sm:h-[25vh]   ">
          <lottie-player src={about.lottie_url && about.lottie_url} speed="1"  style={{width:"20rem",height:"20rem"}} autoplay ></lottie-player>
         
        </div>
        <p className=' w-1/2 text-gray-400  sm:w-full sm:text-sm sm:text-justify '> {about.description_1}.<br/> {about.description_2 } </p>
      </div>

      <div className="py-8 sm:py-10">
        <h1 className=" text-thirdry text-xl sm:text-lg ">Here are a few technologies I've been working with recently:</h1>
        <div className="flex flex-wrap gap-5 sm:gap-4   sm:justify-center justify-between  mt-6 ">
        {about.skills && about.skills.map((skill,idx)=>(
          <div key={idx} className='border border-thirdry py-2 px-12 sm:px-5 sm:py-1'>
              <h1 className='text-thirdry sm:text-md'>{skill}</h1>
          </div>
        ))}
        </div>
      </div>
    </div>
  )
}
export default About