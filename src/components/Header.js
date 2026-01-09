import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setLogout } from '../redux/userSlice'
import { ClearPortfolioData } from '../redux/portfolioSlice'
import Resume from "../assets/Resume.pdf"

const Header = ({ admin }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [active, setActive] = useState('home')
  const [scrolled, setScrolled] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user } = useSelector(state => state.user)
  const { portfolioData } = useSelector(state => state.portfolio)

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleActive = (name) => {
    setActive(name)
    setMobileMenuOpen(false)
  }

  const handleLogout = () => {
    dispatch(setLogout())
    dispatch(ClearPortfolioData())
    navigate('/admin-login')
  }

  // Navigation items
  const navItems = [
    { name: 'home', label: 'Home', href: '#home' },
    { name: 'about', label: 'About', href: '#about' },
    { name: 'projects', label: 'Projects', href: '#projects' },
    { name: 'education', label: 'Education', href: '#education' },
    { name: 'contact', label: 'Contact', href: '#contact' },
  ]

  // Admin header is now handled in the admin dashboard
  if (admin) {
    return null
  }

  // Get name from portfolio data for public view
  const displayName = portfolioData?.intro?.name || 'Portfolio'

  return (
    <>
      {/* Main Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-primary/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-6 sm:px-4">
          <div className="flex items-center justify-between h-20 sm:h-16">
            {/* Logo */}
            <a href="#home" className="flex items-center gap-2 group">
              <div className="w-10 h-10 sm:w-8 sm:h-8 rounded-lg bg-gradient-to-br from-thirdry to-secondary flex items-center justify-center group-hover:shadow-lg group-hover:shadow-thirdry/30 transition-all">
                <span className="text-white font-bold text-lg sm:text-base">&lt;/&gt;</span>
              </div>
              <span className="text-white font-bold text-xl sm:text-lg" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                {displayName.split(' ')[0]}
              </span>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => handleActive(item.name)}
                  className={`relative text-sm font-medium transition-colors hover:text-thirdry ${
                    active === item.name ? 'text-thirdry' : 'text-gray-400'
                  }`}
                >
                  {item.label}
                  {active === item.name && (
                    <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-thirdry rounded-full"></span>
                  )}
                </a>
              ))}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center gap-4">
              <a
                href={Resume}
                download
                className="btn-outline text-sm py-2 px-6"
              >
                Download CV
              </a>
              <a
                href="#contact"
                className="btn-primary text-sm py-2 px-6"
              >
                Hire Me
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300 ${
          mobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMobileMenuOpen(false)}
      />

      {/* Mobile Slide-out Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-primary z-50 md:hidden transform transition-transform duration-300 ease-out ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-6">
          {/* Close Button */}
          <button
            className="absolute top-4 right-4 p-2 rounded-lg hover:bg-white/10 transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Logo */}
          <div className="flex items-center gap-2 mb-10">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-thirdry to-secondary flex items-center justify-center">
              <span className="text-white font-bold text-lg">&lt;/&gt;</span>
            </div>
            <span className="text-white font-bold text-xl" style={{ fontFamily: "'Orbitron', sans-serif" }}>
              {displayName.split(' ')[0]}
            </span>
          </div>

          {/* Mobile Navigation */}
          <nav className="space-y-2">
            {navItems.map((item, idx) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => handleActive(item.name)}
                className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
                  active === item.name
                    ? 'bg-thirdry/10 text-thirdry'
                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                }`}
                style={{ animationDelay: `${idx * 50}ms` }}
              >
                <span className="text-sm font-medium">{item.label}</span>
                {active === item.name && (
                  <svg className="w-4 h-4 ml-auto" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </a>
            ))}
          </nav>

          {/* Mobile CTA Buttons */}
          <div className="mt-8 space-y-3">
            <a
              href={Resume}
              download
              className="btn-outline w-full flex items-center justify-center gap-2 text-sm"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download CV
            </a>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="btn-primary w-full flex items-center justify-center gap-2 text-sm"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Hire Me
            </a>
          </div>

          {/* Social Links */}
          <div className="mt-10 pt-6 border-t border-white/10">
            <p className="text-gray-500 text-xs mb-4">Connect with me</p>
            <div className="flex gap-3">
              <a href="#" className="p-2 rounded-lg bg-white/5 hover:bg-thirdry/20 transition-colors">
                <box-icon name='github' type='logo' color='#54D6BB' size="sm"></box-icon>
              </a>
              <a href="#" className="p-2 rounded-lg bg-white/5 hover:bg-thirdry/20 transition-colors">
                <box-icon name='linkedin' type='logo' color='#54D6BB' size="sm"></box-icon>
              </a>
              <a href="#" className="p-2 rounded-lg bg-white/5 hover:bg-thirdry/20 transition-colors">
                <box-icon name='twitter' type='logo' color='#54D6BB' size="sm"></box-icon>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Spacer for fixed header */}
      <div className="h-20 sm:h-16"></div>
    </>
  )
}

export default Header
