import React, { useState } from 'react'
import SectionTitle from '../../components/SectionTitle'
import { useSelector } from "react-redux"
import { useParams } from 'react-router-dom'
import { message } from 'antd'
import api from '../../api/axios'
import { User, Mail, Phone, MapPin, UserCircle, Check, Send } from 'lucide-react'

const contactIcons = {
  name: <User className="w-5 h-5" />,
  email: <Mail className="w-5 h-5" />,
  mobile: <Phone className="w-5 h-5" />,
  country: <MapPin className="w-5 h-5" />,
  gender: <UserCircle className="w-5 h-5" />,
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

  let contactFields = Object.entries(contact).filter(([key]) => key !== '_id' && key !== 'userId' && contact[key])


  console.log("contactFields--", contactFields);
  console.log("contact--", contact);

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
                <a href="https://github.com/Kritika131" className="social-link hover-glow">
                  <box-icon name='github' type='logo' color='#54D6BB'></box-icon>
                </a>
                <a href="https://www.linkedin.com/in" className="social-link hover-glow">
                  <box-icon name='linkedin' type='logo' color='#54D6BB'></box-icon>
                </a>
                <a href="https://twitter.com" className="social-link hover-glow">
                  <box-icon name='twitter' type='logo' color='#54D6BB'></box-icon>
                </a>
                <a href="https://www.instagram.com" className="social-link hover-glow">
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
                  <Check className="w-10 h-10 text-thirdry" />
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
                      <Send className="w-5 h-5" />
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
