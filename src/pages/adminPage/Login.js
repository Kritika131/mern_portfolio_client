import React, { useState, useEffect } from 'react'
import { message } from 'antd'
import { Hideloading, Showloading } from '../../redux/portfolioSlice'
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { setLogin } from '../../redux/userSlice'
import api from '../../api/axios'

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: ""
  })
  const [showPassword, setShowPassword] = useState(false)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { token } = useSelector((state) => state.user)

  // Redirect if already logged in
  useEffect(() => {
    if (token) {
      navigate('/admin')
    }
  }, [token, navigate])

  const login = async (e) => {
    e?.preventDefault()
    try {
      dispatch(Showloading())
      const response = await api.post("/admin/admin-login", user)
      dispatch(Hideloading())

      if (response.data.success) {
        message.success(response.data.msg)
        dispatch(setLogin({
          user: response.data.user,
          token: response.data.token
        }))
        navigate('/admin')
      } else {
        message.error(response.data.msg)
      }
    } catch (err) {
      dispatch(Hideloading())
      message.error(err.response?.data?.msg || err.message)
    }
  }

  return (
    <div className='min-h-screen bg-primary flex'>
      {/* Left Side - Branding */}
      <div className='hidden md:flex w-1/2 flex-col justify-center items-center p-12 relative overflow-hidden'>
        {/* Background decorations */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-teal-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>

        <div className="relative z-10 text-center">
          <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-thirdry to-secondary flex items-center justify-center mx-auto mb-8 animate-float">
            <span className="text-white font-bold text-4xl">&lt;/&gt;</span>
          </div>
          <h1 className="text-5xl font-bold text-white mb-4">Portfolio Builder</h1>
          <p className="text-gray-400 text-lg max-w-md">
            Create your professional portfolio in minutes. Showcase your skills, projects, and experience.
          </p>

          {/* Features */}
          <div className="mt-12 space-y-4">
            {['Modern Design', 'Easy to Customize', 'Mobile Responsive'].map((feature, idx) => (
              <div key={idx} className="flex items-center gap-3 text-gray-300">
                <svg className="w-5 h-5 text-thirdry" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className='w-full md:w-1/2 flex items-center justify-center p-8'>
        <div className='w-full max-w-md'>
          {/* Mobile Logo */}
          <div className="md:hidden text-center mb-8">
            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-thirdry to-secondary flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-2xl">&lt;/&gt;</span>
            </div>
            <h1 className="text-2xl font-bold text-white">Portfolio Builder</h1>
          </div>

          <div className='glass-dark p-8 rounded-2xl'>
            <div className="text-center mb-8">
              <h2 className='text-3xl font-bold text-white mb-2'>Welcome Back</h2>
              <p className="text-gray-400">Sign in to manage your portfolio</p>
            </div>

            <form onSubmit={login} className="space-y-5">
              <div>
                <label className="text-gray-400 text-sm mb-2 block">Email Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                    </svg>
                  </div>
                  <input
                    type="email"
                    placeholder='you@example.com'
                    value={user.email}
                    onChange={e => setUser({ ...user, email: e.target.value })}
                    className="input-modern pl-12"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-gray-400 text-sm mb-2 block">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder='Enter your password'
                    value={user.password}
                    onChange={e => setUser({ ...user, password: e.target.value })}
                    className="input-modern pl-12 pr-12"
                    required
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500 hover:text-gray-300"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 rounded border-gray-600 text-thirdry focus:ring-thirdry bg-transparent" />
                  <span className="text-gray-400 text-sm">Remember me</span>
                </label>
                <Link to="/forgot-password" className="text-thirdry hover:text-secondary text-sm transition-colors">
                  Forgot Password?
                </Link>
              </div>

              <button
                type="submit"
                className="btn-primary w-full flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
                Sign In
              </button>
            </form>

            <div className="mt-8 text-center">
              <p className='text-gray-400'>
                Don't have an account?{' '}
                <Link to="/admin-signup" className="text-thirdry hover:text-secondary font-medium transition-colors">
                  Create Account
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
