import React, { useState } from 'react'
import { message } from 'antd'
import { Hideloading, Showloading } from '../../redux/portfolioSlice'
import { setLogin } from '../../redux/userSlice'
import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import api from '../../api/axios'
import { Check, User, AtSign, ArrowRight, Lock, Eye, EyeOff, ShieldCheck, ArrowLeft, UserPlus } from 'lucide-react'

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
                <Check className="w-5 h-5 text-thirdry" />
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
                      {/* <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <User className="w-5 h-5 text-gray-500" />
                      </div> */}
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
                      {/* <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <AtSign className="w-5 h-5 text-gray-500" />
                      </div> */}
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
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </>
              ) : (
                <>
                  <div>
                    <label className="text-gray-400 text-sm mb-2 block">Password</label>
                    <div className="relative">
                      {/* <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Lock className="w-5 h-5 text-gray-500" />
                      </div> */}
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
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="text-gray-400 text-sm mb-2 block">Confirm Password</label>
                    <div className="relative">
                      {/* <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <ShieldCheck className="w-5 h-5 text-gray-500" />
                      </div> */}
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
                      <ArrowLeft className="w-5 h-5" />
                      Back
                    </button>
                    <button
                      type="submit"
                      className="btn-primary flex-1 flex items-center justify-center gap-2"
                    >
                      <UserPlus className="w-5 h-5" />
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
