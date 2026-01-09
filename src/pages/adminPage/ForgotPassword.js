import React, { useState } from 'react'
import { message } from 'antd'
import { Hideloading, Showloading } from '../../redux/portfolioSlice'
import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import api from '../../api/axios'

const ForgotPassword = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
    cpassword: "",
  })

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const forgotPassword = async () => {
    try {
      if (user.password !== user.cpassword) {
        message.error("Passwords don't match!")
        return
      }

      if (user.password.length < 6) {
        message.error("Password must be at least 6 characters")
        return
      }

      dispatch(Showloading())
      const response = await api.put("/admin/admin-forgotpass", user)
      dispatch(Hideloading())

      if (response.data.success) {
        message.success(response.data.msg)
        navigate('/admin-login')
      } else {
        message.error(response.data.msg)
      }
    } catch (err) {
      dispatch(Hideloading())
      message.error(err.response?.data?.msg || err.message)
    }
  }

  return (
    <div className='flex justify-center items-center h-screen bg-primary'>
      <div className='w-96 gap-2 sm:gap-0 sm:w-72 sm:px-4 flex p-5 shadow border bg-white border-gray-500 flex-col'>
        <h1 className='text-2xl text-primary text-center font-bold sm:text-xl'>Recover Password</h1>
        <hr className='mb-8 sm:mb-6' />

        <input
          type="email"
          placeholder='Email'
          value={user.email}
          onChange={e => setUser({ ...user, email: e.target.value })}
          required
          autoComplete='off'
        />
        <input
          type="password"
          placeholder='New Password'
          value={user.password}
          onChange={e => setUser({ ...user, password: e.target.value })}
          required
          autoComplete='off'
        />
        <input
          type="password"
          placeholder='Confirm Password'
          value={user.cpassword}
          onChange={e => setUser({ ...user, cpassword: e.target.value })}
          required
          autoComplete='off'
        />

        <button
          className="bg-primary text-white p-2 rounded sm:py-1 hover:opacity-80 mt-4 sm:text-md"
          onClick={forgotPassword}
        >
          Save
        </button>
        <p className='sm:text-sm'>
          Already recovered your password?{' '}
          <Link to="/admin-login" className="text-secondary hover:text-orange-700">
            Login
          </Link>
        </p>
      </div>
    </div>
  )
}

export default ForgotPassword
