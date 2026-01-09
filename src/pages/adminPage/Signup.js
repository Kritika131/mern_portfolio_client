import React, { useState } from 'react'
import { message } from 'antd'
import { Hideloading, Showloading } from '../../redux/portfolioSlice'
import { setLogin } from '../../redux/userSlice'
import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import api from '../../api/axios'

const SignUp = () => {
  const [user, setUser] = useState({
    email: "",
    username: "",
    password: "",
    cpassword: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [step, setStep] = useState(1)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const validateUsername = (username) => {
    const regex = /^[a-zA-Z0-9_]+$/
    return regex.test(username) && username.length >= 3 && username.length <= 30
  }

  const handleSignUp = async (e) => {
    e?.preventDefault()
    try {
      // Validate username
      if (!validateUsername(user.username)) {
        message.error("Username must be 3-30 characters, only letters, numbers, and underscores allowed")
        return
      }

      if (user.password !== user.cpassword) {
        message.error("Passwords don't match!")
        return
      }

      if (user.password.length < 6) {
        message.error("Password must be at least 6 characters")
        return
      }

      dispatch(Showloading())
      const response = await api.post("/admin/admin-signup", {
        email: user.email,
        username: user.username,
        password: user.password
      })
      dispatch(Hideloading())

      if (response.data.success) {
        message.success(response.data.msg)
        // Auto-login after signup
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

  const nextStep = () => {
    if (step === 1) {
      if (!user.username || !validateUsername(user.username)) {
        message.error("Please enter a valid username (3-30 chars, letters, numbers, underscores)")
        return
      }
      if (!user.email || !user.email.includes('@')) {
        message.error("Please enter a valid email address")
        return
      }
    }
    setStep(2)
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
          <h1 className="text-5xl font-bold text-white mb-4">Join Us Today</h1>
          <p className="text-gray-400 text-lg max-w-md">
            Create your account and start building your professional portfolio in minutes.
          </p>

          {/* Benefits */}
          <div className="mt-12 space-y-4">
            {['Free Forever', 'Custom URL', 'SEO Optimized', 'Analytics Dashboard'].map((feature, idx) => (
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

      {/* Right Side - Signup Form */}
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
            {/* Progress Steps */}
            <div className="flex items-center justify-center gap-2 mb-8">
              <div className={`w-3 h-3 rounded-full transition-colors ${step >= 1 ? 'bg-thirdry' : 'bg-gray-600'}`}></div>
              <div className={`w-12 h-0.5 transition-colors ${step >= 2 ? 'bg-thirdry' : 'bg-gray-600'}`}></div>
              <div className={`w-3 h-3 rounded-full transition-colors ${step >= 2 ? 'bg-thirdry' : 'bg-gray-600'}`}></div>
            </div>

            <div className="text-center mb-8">
              <h2 className='text-3xl font-bold text-white mb-2'>
                {step === 1 ? 'Create Account' : 'Set Password'}
              </h2>
              <p className="text-gray-400">
                {step === 1 ? 'Enter your details to get started' : 'Choose a secure password'}
              </p>
            </div>

            <form onSubmit={handleSignUp} className="space-y-5">
              {step === 1 ? (
                <>
                  <div>
                    <label className="text-gray-400 text-sm mb-2 block">Username</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <input
                        type="text"
                        placeholder='john_doe'
                        value={user.username}
                        onChange={e => setUser({ ...user, username: e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, '') })}
                        className="input-modern pl-12"
                        required
                        autoComplete='off'
                      />
                    </div>
                    <p className="text-gray-500 text-xs mt-2">
                      Your portfolio: <span className="text-thirdry">/portfolio/{user.username || 'username'}</span>
                    </p>
                  </div>

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
                        autoComplete='off'
                      />
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={nextStep}
                    className="btn-primary w-full flex items-center justify-center gap-2"
                  >
                    Continue
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </button>
                </>
              ) : (
                <>
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
                        placeholder='Min 6 characters'
                        value={user.password}
                        onChange={e => setUser({ ...user, password: e.target.value })}
                        className="input-modern pl-12 pr-12"
                        required
                        autoComplete='off'
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

                  <div>
                    <label className="text-gray-400 text-sm mb-2 block">Confirm Password</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                      </div>
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder='Re-enter password'
                        value={user.cpassword}
                        onChange={e => setUser({ ...user, cpassword: e.target.value })}
                        className="input-modern pl-12"
                        required
                        autoComplete='off'
                      />
                    </div>
                    {user.cpassword && user.password !== user.cpassword && (
                      <p className="text-red-400 text-xs mt-2">Passwords don't match</p>
                    )}
                  </div>

                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="btn-outline flex-1 flex items-center justify-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 17l-5-5m0 0l5-5m-5 5h12" />
                      </svg>
                      Back
                    </button>
                    <button
                      type="submit"
                      className="btn-primary flex-1 flex items-center justify-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                      </svg>
                      Create
                    </button>
                  </div>
                </>
              )}
            </form>

            <div className="mt-8 text-center">
              <p className='text-gray-400'>
                Already have an account?{' '}
                <Link to="/admin-login" className="text-thirdry hover:text-secondary font-medium transition-colors">
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUp
