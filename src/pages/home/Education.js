import React, { useState } from 'react'
import SectionTitle from '../../components/SectionTitle'
import {useSelector} from "react-redux"

const Experiences = () => {
  // const exp = [
  //   {
  //     id:"1",
  //     percentage:"Percentage - 80%",
  //     title:"Btech(Information Technology)",
  //     period:"2020-2023",
  //     description:"",
  //   },
  //   {
  //     id:"2",
  //     percentage:"Percentage - 80%",
  //     title:"Diploma(Information Technology)",
  //     period:"2017-2020",
  //     description:"",
  //   },
  //   {
  //     id:"3",
  //     percentage:"Percentage - 68%",
  //     title:"Matric(10th)",
  //     period:"2017",
  //     description:"",
  //   },
  // ]

  
  const {loading,portfolioData} = useSelector((state)=>state.portfolio)
  const {educations} = portfolioData;
  // console.log("educations ",educations);
  
  const [selectedItem,setSelectedItem] = useState(0)
  const handleSelectedItem=(id)=>{
      setSelectedItem(id)
  }
  return (
    <div className='py-10'>
      <SectionTitle title="Education"/>
      <div className="flex sm:flex-col gap-20 sm:gap-8 items-center py-6 sm:py-3">
      <div className=" w-[32%] sm:flex-row sm:overflow-x-scroll  sm:w-full flex flex-col gap-5 sm:gap-2 border-l-2 border-teal-900">
        {
          educations && educations.map((ex,idx)=>(
            <div key={ex.id} className=' cursor-pointer max-w-[15rem]' onClick={()=>handleSelectedItem(idx)}>
              <h1 className={`text-xl sm:text-sm px-6 py-2 text-nowrap  ${selectedItem===idx ? 'text-thirdry border-thirdry border-l-4 rounded-sm ml-[-3px]  transition bg-[#1a7f5a31]':'text-white'}`}>{ex.period}</h1>
            </div>
          ))

        }
      </div>
      <div className=" flex flex-col gap-4 sm:gap-1 sm:text-sm ">
        
         <h1 className=" text-secondary text-2xl sm:text-lg">{educations[selectedItem].title}</h1>
         <h1 className="text-white"><strong className='text-thirdry'>Percentage - </strong>{educations[selectedItem].percentage}</h1> 
         <h1 className="text-white"><strong className='text-thirdry'>Collage - </strong> {educations[selectedItem].collage}</h1> 
         <p className='text-white'>
         {educations[selectedItem].description}
         </p>
      </div>
      </div>
    </div>
  )
}

export default Experiences