import React, { useState } from 'react'
import SectionTitle from '../../components/SectionTitle'
import {useSelector} from "react-redux"
import { Link } from 'react-router-dom'

const Projects = () => {
  // const projects = [
  //   {
  //     id:"1",
  //     company:"fhkd",
  //     title:"React Project",
  //     image:"https://sheysathya2.netlify.app/pizzas.svg",
  //     // period:"2022-2023",
  //     technologies:[],
  //     description:"An ecommerce application developed using react, node ,redux mad mongodb",
  //     link:'/',
  //   },
  //   {
  //     id:"2",
  //     title:"Software Project",
  //     image:"https://sheysathya2.netlify.app/ecommerce.svg",

  //     technologies:[],
  //     description:"An ecommerce application developed using react, node ,redux mad mongodb",
  //     link:'/',
  //   },
  //   {
  //     id:"3",
  //     title:"Wed Project",
  //     image:"https://sheysathya2.netlify.app/hotels.svg",
      
  //     technologies:[],
  //     description:"An ecommerce application developed using react, node ,redux mad mongodb",
  //     link:'/',
  //   },
  //   {
  //     id:"4",
  //     title:"Dev Project",
  //     image:"https://sheysathya2.netlify.app/hotels.svg",
  //     technologies:[],
  //     description:"An ecommerce application developed using react, node ,redux mad mongodb",
  //     link:'/',
  //   },
  // ]

  const [selectedItem,setSelectedItem] = useState(0)
  const handleSelectedItem=(id)=>{
      setSelectedItem(id)
  }

  
  const {loading,portfolioData} = useSelector((state)=>state.portfolio)
  const {projects} = portfolioData;
  console.log(projects);
    return (
    <div className='py-6 sm:py-4' id='projects'>
      <SectionTitle title="Projects"/>
      <div className="flex sm:flex-col gap-40 sm:gap-16  items-center py-4 ">
      <div className=" w-2/3 sm:flex-row sm:overflow-x-scroll sm:scroll-smooth sm:w-full flex flex-col gap-6  border-l-2 border-teal-950">
        {
          projects && projects.map((project,idx)=>(
            <div key={project.id} className=' cursor-pointer' onClick={()=>handleSelectedItem(idx)}>
              <h1 className={`text-xl  px-6 py-2 sm:text-sm text-nowrap  ${selectedItem===idx ? 'text-thirdry border-thirdry border-l-4 rounded-sm ml-[-3px]  transition bg-[#1a7f5a31]':'text-white'}`}>{project.title}</h1>
            </div>
          ))

        }
      </div>
      <div className="flex flex-col  items-center justify-center sm:gap-10">
        <div className=" ">
       <Link to={projects[selectedItem].deployed_link} target='_blank' > <img src={projects[selectedItem].image} className='w-[25rem] h-60 sm:w-[20rem] sm:h-44 mb-4 transition-all hover:scale-105 object-cover rounded-full' alt="" /> </Link>

        </div>
      <div className=" flex flex-col gap-4 text-justify ">
        <div className='flex gap-3 sm:gap-1 items-center sm:flex-col sm:items-start '>

         <h1 className=" text-secondary text-2xl sm:text-lg  text-nowrap  ">{projects[selectedItem].title}</h1>
         <div className='flex w-full items-center justify-between  text-2xl '>
         <Link to={projects[selectedItem].deployed_link}  target='_blank' className='text-xl hover:scale-105 transition-all '>  🔗</Link> 
          
         <div className='flex items-center font-bold text-sm text-gray-500 '>
          <span>Source Code </span>
         <Link to={projects[selectedItem].github_link}  target='_blank' className="pl-1  transition-all text-sm hover:scale-105 text-center">   
          <box-icon name='github' type='logo' style={{fill:"white"}}  ></box-icon></Link> 

         </div>
         </div>
        </div>
        
        <div className='text-thirdry sm:text-sm '><strong>Technologies Used -</strong> 
          {
            projects[selectedItem] && projects[selectedItem].technologies.map((tech,i,arr)=>(
              <span className='text-white' key={i}> {tech} , </span>
            ))
          }
        </div>
         {/* <h1 className="text-thirdry">{projects[selectedItem].d}</h1>  */}
         <p className="text-white sm:text-sm">{projects[selectedItem].description}</p>
         {/* <p className='text-white'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta tempore rem veritatis numquam molestiae, reiciendis sunt temporibus itaque corporis fugiat nostrum enim corrupti voluptatibus maxime illo! A doloremque repellat similique?
         </p> */}
      </div>
      </div>
      </div>
    </div>
  )
}

export default Projects