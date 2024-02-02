import React from 'react'
import {useSelector} from "react-redux"
import {useNavigate} from "react-router-dom"
import Resume from "../../../assets/Resume.pdf"

import "./style.css"
const Intro = () => {
  const {loading,portfolioData} = useSelector((state)=>state.portfolio)
  const {intro} = portfolioData;
  const {name,welcomeText,caption ,description} = intro
  const navigate = useNavigate()

  return (
   
    <div className="flex min-h-[85vh] sm:min-h-[75vh] justify-center items-center relative ">

   
   
    <div className='  flex flex-col text-gray-400 items-start justify-center gap-2 mt-5 bg-primary ' id='home'>
      <h3 className='text-3xl sm:text-lg'>{welcomeText}</h3>
      <h1 className='text_name text-6xl sm:text-3xl  font-bold text-white relative mb-4'> {name}</h1>
      <p className='text-4xl sm:text-2xl  text-white  ' style={{fontFamily:"'Libre Barcode 128 Text', system-ui"}} >{caption}</p>
      <p className=' w-2/3 sm:w-full sm:text-justify sm:text-sm '>{description} </p>
      <div className="btns flex gap-6 mt-4 sm:gap-4 ">
        <a href={Resume} download className=' rounded-md border-[1px] px-4 py-1 bg-thirdry text-white hover:text-thirdry hover:bg-transparent hover:border-thirdry sm:text-sm  '>Download Resume</a>
         <button  className=' text-thirdry rounded-md border-[1px] border-thirdry px-4 py-1 sm:px-2 hover:bg-thirdry sm:text-sm hover:text-white '> <a href="#contact">Let's talk</a></button>
      </div>
    </div>
    <div className="   absolute -right-12 sm:hidden">
    <img src="https://www.hackersfriend.com/media/kid_coding.png" className=' w-[24rem] h-[24rem]  ' alt="" />

    </div>
    </div>
   
  )
}

export default Intro