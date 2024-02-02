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
      <div className="flex sm:flex-col sm:mt-6 items-center  justify-between">
        <div className="flex flex-col gap-2 sm:gap-0 pl-14 sm:text-md text-thirdry">
        <p className=''>{"{"}</p>
        {Object.keys(contact && contact).map((key)=>(
          key!=="_id" && ( <p className='ml-6'>

            <span >{key} : </span>
            <span>{contact[key]}</span>
          </p> )
        ))}
        <p>{"}"}</p>

        </div>
        <div className='h-[320px] sm:h-[250px] '>
          <lottie-player src="https://assets9.lottiefiles.com/packages/lf20_eroqjb7w.json" background="transparent" speed="1" ></lottie-player>
        </div>
      </div>
    </div>
  )
}

export default Contact