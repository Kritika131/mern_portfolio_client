import React, { useState } from 'react'
import SectionTitle from '../../components/SectionTitle'
import { useSelector } from "react-redux"
import { useParams } from 'react-router-dom'
import { message } from 'antd'
import api from '../../api/axios'

const contactIcons = {
  name: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  ),
  email: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
  mobile: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  ),
  country: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  gender: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
}

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const { portfolioData } = useSelector((state) => state.portfolio)
  const { contact } = portfolioData || {}
  const { username } = useParams()

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validate form
    if (!formData.name || !formData.email || !formData.message) {
      message.error('Please fill in all fields')
      return
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      message.error('Please enter a valid email address')
      return
    }

    try {
      setLoading(true)
      const response = await api.post(
        `/portfolio/contact/${username}`,
        formData
      )

      if (response.data.success) {
        message.success(response.data.msg)
        setFormData({ name: '', email: '', message: '' })
        setSent(true)
        setTimeout(() => setSent(false), 5000)
      } else {
        message.error(response.data.msg)
      }
    } catch (error) {
      message.error(error.response?.data?.msg || 'Failed to send message. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (!contact) return null

  const contactFields = Object.entries(contact).filter(([key]) => key !== '_id' && key !== 'userId')

  return (
    <div className='py-16 sm:py-8 min-h-[75vh] relative' id='contact'>
      {/* Background decoration */}
      <div className="absolute top-20 right-10 w-80 h-80 bg-teal-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-10 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl"></div>

      <SectionTitle title="Get In Touch" />

      <div className="mt-12 grid grid-cols-2 sm:grid-cols-1 gap-12">
        {/* Contact Info */}
        <div className="space-y-6 animate-fadeIn">
          <div className="glass-dark p-8 sm:p-6 rounded-2xl">
            <h3 className="text-2xl sm:text-xl font-bold text-white mb-6 flex items-center gap-2">
              <span className="text-secondary">&lt;</span>
              Contact Details
              <span className="text-secondary">/&gt;</span>
            </h3>

            <div className="space-y-4">
              {contactFields.map(([key, value], idx) => (
                <div
                  key={key}
                  className="flex items-center gap-4 p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors animate-fadeIn"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <div className="p-3 rounded-full bg-thirdry/10 text-thirdry">
                    {contactIcons[key.toLowerCase()] || contactIcons.name}
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm capitalize">{key}</p>
                    <p className="text-white font-medium">{value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Social Links */}
            <div className="mt-8 pt-6 border-t border-white/10">
              <h4 className="text-gray-400 text-sm mb-4">Connect with me</h4>
              <div className="flex gap-4">
                <a href="#" className="social-link hover-glow">
                  <box-icon name='github' type='logo' color='#54D6BB'></box-icon>
                </a>
                <a href="#" className="social-link hover-glow">
                  <box-icon name='linkedin' type='logo' color='#54D6BB'></box-icon>
                </a>
                <a href="#" className="social-link hover-glow">
                  <box-icon name='twitter' type='logo' color='#54D6BB'></box-icon>
                </a>
                <a href="#" className="social-link hover-glow">
                  <box-icon name='instagram' type='logo' color='#54D6BB'></box-icon>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="animate-fadeIn delay-200">
          <div className="glass p-8 sm:p-6 rounded-2xl">
            <h3 className="text-2xl sm:text-xl font-bold text-white mb-6 flex items-center gap-2">
              <span className="text-secondary">&lt;</span>
              Send Message
              <span className="text-secondary">/&gt;</span>
            </h3>

            {sent ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 rounded-full bg-thirdry/20 flex items-center justify-center mx-auto mb-6 animate-scaleIn">
                  <svg className="w-10 h-10 text-thirdry" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h4 className="text-2xl font-bold text-white mb-2">Message Sent!</h4>
                <p className="text-gray-400">Thank you for reaching out. I'll get back to you soon.</p>
              </div>
            ) : (
              <form className="space-y-5" onSubmit={handleSubmit}>
                <div>
                  <label className="text-gray-400 text-sm mb-2 block">Your Name</label>
                  <input
                    type="text"
                    className="input-modern"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    disabled={loading}
                  />
                </div>

                <div>
                  <label className="text-gray-400 text-sm mb-2 block">Your Email</label>
                  <input
                    type="email"
                    className="input-modern"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    disabled={loading}
                  />
                </div>

                <div>
                  <label className="text-gray-400 text-sm mb-2 block">Message</label>
                  <textarea
                    rows={4}
                    className="input-modern resize-none"
                    placeholder="Your message here..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    disabled={loading}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                      Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact