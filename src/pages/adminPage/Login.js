import axios  from 'axios'
import React, { useState } from 'react'
import {message} from 'antd'
import { Hideloading, Showloading } from '../../redux/portfolioSlice'
import {useDispatch} from "react-redux"
import {Link} from "react-router-dom"
import { setLogin } from '../../redux/userSlice'
import {useNavigate} from "react-router-dom"
const Login = () => {
  const [user,setUser] = useState({
    email:"",
    password:""
  })

  const dispatch = useDispatch()
  const navigate = useNavigate()
 
  const login = async()=>{
    try{
      dispatch(Showloading())
      const response = await axios.post(process.env.REACT_APP_BASE_URL+"/admin/admin-login", user);
      dispatch(Hideloading())
      if(response.data.success){
        console.log("response-------->",response.data);
        message.success(response.data.msg)
        const data = response.data;
        dispatch(setLogin({
          user:data.user,
          token:data.token
        }))
        navigate('/admin')
      }else {
          // console.log("erro----- ",response.data);
          message.error(response.data.msg)
        }
      } catch(err){
        message.error(err.message)
        dispatch(Hideloading())
        console.log("rrr   ",err);

    }
  }
  return (
    <div className='flex justify-center items-center h-screen bg-primary'>
      <div className='w-96 flex gap-5 p-5  sm:w-72 sm:gap-2 sm:px-3 shadow border bg-white border-gray-500 flex-col'>
        <h1 className='text-2xl text-primary font-bold text-center  '  >Admin Login</h1>
        <hr />
        <div className=" flex items-center justify-center">
         <img src={`${user.profile_img ? URL.createObjectURL(user.profile_img) : "https://tse1.mm.bing.net/th?id=OIP.GHGGLYe7gDfZUzF_tElxiQHaHa&pid=Api&rs=1&c=1&qlt=95&w=117&h=117"}`} className=' rounded-full object-cover  h-40 w-40 sm:h-28 sm:w-28 sm:mb-4 mb-7' alt="add profile photo" />
          </div> 
        <input type="email" placeholder='email' value={user.email} onChange={e=>setUser({...user,email:e.target.value})} />
        <input type="password" placeholder='password' value={user.password} onChange={e=>setUser({...user,password:e.target.value})} />
        <button className="bg-primary text-white p-2 rounded sm:py-1 hover:opacity-80 mt-6 sm:mt-4" onClick={login}>Login</button>
        <p>Doesn't have an account? <Link to="/admin-signup" className="text-secondary hover:text-orange-700">SignUp</Link></p>
      </div>
    </div>
  )
}

export default Login