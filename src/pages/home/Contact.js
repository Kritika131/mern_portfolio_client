import React from 'react'
import SectionTitle from '../../components/SectionTitle'
import {useSelector} from "react-redux"

const Contact = () => {
  // const user={
  //   "name" : "Kritika",
  //   "email":"kritikag264@gmail.com",
  //   "gender":"Female",
  //   "mobile":"8340648195",
  //   "country":"INDIA",
    
  // }
  
  const {loading,portfolioData} = useSelector((state)=>state.portfolio)
  const {contact} = portfolioData;
  // console.log(contact);
  
  
  return (
    <div className='py-10 sm:py-6 min-h-[75vh]' id='contact'>
      <SectionTitle title="Say Hello"/>
      <div className="flex sm:flex-col sm:mt-6 items-center  px-10 sm:px-0 justify-between">
        <div className="flex flex-col gap-2 sm:gap-0 pl-16 sm:text-md text-thirdry">
        <p className='text-lg sm:text-sm'>{"{"}</p>
        {Object.keys(contact && contact).map((key)=>(
          key!=="_id" && ( <p className='ml-12 sm:ml-4 text-lg sm:text-sm'>

            <span >{key} : </span>
            <span>{contact[key]}</span>
          </p> )
        ))}
        <p className='text-lg sm:text-sm'>{"}"}</p>

        </div>
        <div className=' h-[350px] sm:h-[280px]  flex items-center justify-center'>
          <img src="https://icon-library.com/images/icon-for-contact-us/icon-for-contact-us-15.jpg" alt="" className='sm:h-[150px] h-[280px] -mt-8 mr-16 sm:mr-0 '  />
          {/* <lottie-player src="https://assets9.lottiefiles.com/packages/lf20_eroqjb7w.json" background="transparent" speed="1" ></lottie-player> */}
        </div>
      </div>
    </div>
  )
}

export default Contact