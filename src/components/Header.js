import React,{useState} from 'react'
import Resume from "../assets/Resume.pdf"

const Header = ({admin}) => {
  const [openClose,setOpenClose] = useState(false)
  const [active,setActive] = useState('home');
  const handleClick=()=>{
    setOpenClose(!openClose)
    // console.log(openClose)
  }
  const handleActive = (name)=>{
    console.log(name," ",active);
    setActive(name)
    console.log(name," ",active);
    setOpenClose(false)
  }
  if(admin){
    return (
      <div className=' text-xl text-slate-100 '>
      <div className="logo w-full font-bold text-thirdry flex justify-between " style={{fontFamily:"'Rubik Scribble', system-ui"}}>
        <h1><span className='text-secondary text-3xl sm:xl ' style={{fontFamily:"'Rubik Scribble',system-ui"}}>K</span>RITIKA😇</h1>
        <h1><span className='text-secondary text-3xl sm:hidden ' style={{fontFamily:"'Rubik Scribble',system-ui"}}>Portfolio Admin</span></h1>
        {/* <p className='hover:text-secondary  text-primary'>Logout</p> */}
        <h1 className="underline text-primary text-xl hover:text-secondary cursor-pointer" onClick={()=>{
       
        window.location.href="/admin-login"
      }}> Logout</h1>

        </div>
      </div>
    )
  }
  return (
    <div className=' text-xl text-slate-100 sticky top-0 h-20 sm:h-16 bg-primary z-50 -mt-10 -mx-12 px-16 flex  justify-between items-center'>
      <div className="logo font-bold sm:text-sm" style={{fontFamily:"'Rubik Scribble', system-ui"}}><span className='text-secondary text-3xl sm:text-xl ' style={{fontFamily:"'Rubik Scribble',system-ui"}}>K</span>RITIKA😇</div>
      <div className="btns sm:hidden">
        <ul className=' list-none flex gap-16 text-gray-400'>
          <li className='' onClick={()=>handleActive('home')} style={{color:`${active==="home" ?"white":""}`}}><a href='#home'>Home</a></li>
          <li onClick={()=>handleActive('portfolio')} style={{color:`${active==="portfolio" ?"white":""}`}}><a href='#projects'>Portfolio</a></li>
          <li onClick={()=>handleActive('about')} style={{color:`${active==="about" ?"white":""}`}}><a href="#contact" >Contact</a></li>
        </ul>
      </div>
      <div className="hamburger_menu hidden sm:block">
        {openClose ? (
          <div className='   flex flex-col absolute -top-2 right-12 px-5 py-6 items-end'>
            <span onClick={handleClick} className='text-3xl'>×</span>
            <div className='text-gray-400 text-[16px] bg-gray-800 rounded-sm py-2 px-4' >
               <h3 onClick={()=>handleActive('home')} style={{color:`${active==="home" ?"white":""}`}}><a href='#home'>Home</a></h3>
               <h3 onClick={()=>handleActive('portfolio')} style={{color:`${active==="portfolio" ?"white":""}`}}><a href='#projects'>Portfolio</a></h3>
               <h3 onClick={()=>handleActive('about')} style={{color:`${active==="about" ?"white":""}`}}><a href='#contact'>Contact</a></h3>
               {/* <h3>Hire me</h3> */}
            </div>
          </div>

        ): (
          <div className="hidden sm:block">
            <svg onClick={handleClick} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{fill: "white",transform: "",msFilter:" "}}><path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"></path></svg>

          </div>

        )  }
        {/* <box-icon name='menu' className="bg-white"></box-icon> */}
      </div>
      
      <a href={Resume} download className=' text-thirdry rounded-md border-[1px] border-thirdry px-4 py-1 hover:bg-thirdry hover:text-white sm:hidden '>Hire Me</a>
  
    </div>
  )
}

export default Header