import axios  from 'axios'
import React, { useState } from 'react'
import {message} from 'antd'
import { Hideloading, Showloading } from '../../redux/portfolioSlice'
import {useDispatch} from "react-redux"
import {Link} from "react-router-dom"
const SignUp = () => {
  const [user,setUser] = useState({
    email:"",
    password:"",
    cpassword:"",
    
  })
 
  const dispatch = useDispatch()
 
  const handleSignUp = async()=>{
    if(user.password === user.cpassword){
      try{
         const formData = new FormData()
         for(let key in user){

           formData.append(key,user[key])
         }

         const response = await axios.post(process.env.REACT_APP_BASE_URL+"/admin/admin-signup", formData);
         dispatch(Hideloading())
      if(response.data.success){
        console.log("response---",response);
        message.success(response.data.msg)
        // localStorage.setItem('token',JSON.stringify(response.data));
        window.location.href='/admin-login';
      }else {
          // console.log("erro----- ",response.data);
          message.error(response.data.msg)
        }

      }catch(err){
        message.error(err.message)
        dispatch(Hideloading())
      }
    } else{
      message.error("Password doesn't matched!")
    }
  }

  const SignUp = async()=>{
    try{
      if(user.password===user.cpassword){

      
      dispatch(Showloading())
      const response = await axios.post(process.env.REACT_APP_BASE_URL+"/admin/admin-signup", user);
      dispatch(Hideloading())
      if(response.data.success){
        message.success(response.data.msg)
        // localStorage.setItem('token',JSON.stringify(response.data));
        window.location.href='/admin-login';
      }else {
          // console.log("erro----- ",response.data);
          message.error(response.data.msg)
        }
      }else{
        message.error("Password doesn't matched!")
      }
      } catch(err){
        message.error(err.message)
        dispatch(Hideloading())

    }
  }
  return (
    <div className='flex justify-center items-center h-screen bg-primary'>
      <div className='w-96 sm:w-72 sm:gap-2 sm:px-3 flex gap-5 p-5 shadow border bg-white border-gray-500 flex-col'>
        <h1 className='text-2xl text-primary text-center font-bold  ' >Admin SignUp</h1>
        <hr />
       
         <div className=" flex items-center justify-center">
         <img src="https://tse1.mm.bing.net/th?id=OIP.GHGGLYe7gDfZUzF_tElxiQHaHa&pid=Api&rs=1&c=1&qlt=95&w=117&h=117" className=' rounded-full object-cover  h-40 w-40 sm:h-28 sm:w-28 sm:mb-4 mb-7' alt="add profile photo" />
         {/* <img src={`${user.profile_img ? URL.createObjectURL(user.profile_img) : "https://tse1.mm.bing.net/th?id=OIP.GHGGLYe7gDfZUzF_tElxiQHaHa&pid=Api&rs=1&c=1&qlt=95&w=117&h=117"}`} className=' rounded-full object-cover  h-40 w-40 sm:h-28 sm:w-28 sm:mb-4 mb-7' alt="add profile photo" /> */}
          </div> 
        
       
        <input type="email" placeholder='email' value={user.email} onChange={e=>setUser({...user,email:e.target.value})} required autoComplete='off'/>
        <input type="password" placeholder='Password' value={user.password} onChange={e=>setUser({...user,password:e.target.value})} required autoComplete='off'/>
        <input type="password" placeholder='Confirm Password' value={user.cpassword} onChange={e=>setUser({...user,cpassword:e.target.value})} required autoComplete='off'/>
        
        <button className="bg-primary text-white p-2 rounded sm:py-1 hover:opacity-80 mt-6 sm:mt-4" onClick={SignUp}>SignUp</button>
        <p>Already have an account? <Link to="/admin-login" className="text-secondary hover:text-orange-700 ">Login</Link></p>
      </div>  
    </div>
  )
}

export default SignUp