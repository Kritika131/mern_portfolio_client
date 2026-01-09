import React, { useEffect, useState } from 'react'
import { message } from "antd"
import AdminIntro from './AdminIntro'
import AdminAbout from './AdminAbout'
import { useSelector, useDispatch } from 'react-redux'
import AdminEducation from './AdminEducation'
import AdminProjects from './AdminProjects'
import AdminContact from './AdminContact'
import AdminExperience from './AdminExperience'
import AdminCertifications from './AdminCertifications'
import AdminTestimonials from './AdminTestimonials'
import AdminBlog from './AdminBlog'
import AdminServices from './AdminServices'
import AdminAnalytics from './AdminAnalytics'
import { useNavigate, Link } from 'react-router-dom'
import { SetPortfolioData, Showloading, Hideloading, reloadingData } from '../../redux/portfolioSlice'
import { updateUser, setLogout } from '../../redux/userSlice'
import api from '../../api/axios'

// Sidebar navigation items
const navItems = [
  {
    key: 'intro',
    label: 'Intro',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    key: 'about',
    label: 'About',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
  },
  {
    key: 'education',
    label: 'Education',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
      </svg>
    ),
  },
  {
    key: 'projects',
    label: 'Projects',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
  },
  {
    key: 'contact',
    label: 'Contact',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    key: 'experience',
    label: 'Experience',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    key: 'certifications',
    label: 'Certifications',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
  },
  {
    key: 'testimonials',
    label: 'Testimonials',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
  },
  {
    key: 'blog',
    label: 'Blog',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
      </svg>
    ),
  },
  {
    key: 'services',
    label: 'Services',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    key: 'analytics',
    label: 'Analytics',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
]

const Admin = () => {
  const { portfolioData, reloadData } = useSelector((state) => state.portfolio)
  const { token, user } = useSelector((state) => state.user)
  const [hasPortfolio, setHasPortfolio] = useState(user?.hasPortfolio || false)
  const [activeTab, setActiveTab] = useState('intro')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  // Redirect if not logged in
  useEffect(() => {
    if (!token) {
      navigate("/admin-login")
    }
  }, [token, navigate])

  // Fetch user's own portfolio data
  const fetchOwnPortfolio = async () => {
    try {
      dispatch(Showloading())
      const response = await api.get("/portfolio/my-portfolio")
      dispatch(Hideloading())

      if (response.data.success) {
        setHasPortfolio(response.data.hasPortfolio)
        if (response.data.hasPortfolio) {
          dispatch(SetPortfolioData({
            intro: response.data.intro,
            about: response.data.about,
            projects: response.data.projects,
            contact: response.data.contact,
            educations: response.data.educations,
            experiences: response.data.experiences,
            certifications: response.data.certifications,
            testimonials: response.data.testimonials,
            blogs: response.data.blogs,
            services: response.data.services
          }))
        }
        dispatch(reloadingData(false))
      }
    } catch (err) {
      dispatch(Hideloading())
      console.error("Error fetching portfolio:", err)
    }
  }

  useEffect(() => {
    if (token && !portfolioData) {
      fetchOwnPortfolio()
    }
  }, [token])

  useEffect(() => {
    if (reloadData) {
      fetchOwnPortfolio()
    }
  }, [reloadData])

  // Create portfolio
  const handleCreatePortfolio = async () => {
    try {
      dispatch(Showloading())
      const response = await api.post("/portfolio/create-portfolio")
      dispatch(Hideloading())

      if (response.data.success) {
        message.success(response.data.msg)
        setHasPortfolio(true)
        dispatch(updateUser({ hasPortfolio: true }))
        dispatch(reloadingData(true))
      } else {
        message.error(response.data.msg)
      }
    } catch (err) {
      dispatch(Hideloading())
      message.error(err.response?.data?.msg || "Error creating portfolio")
    }
  }

  // Logout handler
  const handleLogout = () => {
    dispatch(setLogout())
    navigate("/admin-login")
  }

  // Render active component
  const renderContent = () => {
    switch (activeTab) {
      case 'intro':
        return <AdminIntro />
      case 'about':
        return <AdminAbout />
      case 'education':
        return <AdminEducation />
      case 'projects':
        return <AdminProjects />
      case 'contact':
        return <AdminContact />
      case 'experience':
        return <AdminExperience />
      case 'certifications':
        return <AdminCertifications />
      case 'testimonials':
        return <AdminTestimonials />
      case 'blog':
        return <AdminBlog />
      case 'services':
        return <AdminServices />
      case 'analytics':
        return <AdminAnalytics />
      default:
        return <AdminIntro />
    }
  }

  if (!token) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className={`admin-sidebar w-64 sm:w-0 sm:absolute sm:z-50 sm:h-full transition-all duration-300 ${sidebarOpen ? 'sm:w-64' : ''}`}>
        <div className="p-6">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-thirdry to-secondary flex items-center justify-center">
              <span className="text-white font-bold text-lg">&lt;/&gt;</span>
            </div>
            <div>
              <h1 className="text-white font-bold">Portfolio</h1>
              <p className="text-gray-500 text-xs">Admin Panel</p>
            </div>
          </div>

          {/* User Info */}
          <div className="glass p-4 rounded-xl mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-thirdry to-secondary flex items-center justify-center">
                <span className="text-white font-bold">{user?.username?.charAt(0).toUpperCase()}</span>
              </div>
              <div>
                <p className="text-white font-medium text-sm">{user?.username}</p>
                <p className="text-gray-500 text-xs truncate max-w-[120px]">{user?.email}</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="space-y-2">
            {navItems.map((item) => (
              <button
                key={item.key}
                onClick={() => {
                  setActiveTab(item.key)
                  setSidebarOpen(false)
                }}
                className={`admin-nav-item w-full flex items-center gap-3 ${activeTab === item.key ? 'active' : ''}`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
          </nav>

          {/* Bottom Actions */}
          <div className="mt-8 pt-6 border-t border-white/10 space-y-2">
            <Link
              to={`/portfolio/${user?.username}`}
              target="_blank"
              className="admin-nav-item w-full flex items-center gap-3"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              <span>View Portfolio</span>
            </Link>
            <button
              onClick={handleLogout}
              className="admin-nav-item w-full flex items-center gap-3 text-red-400 hover:text-red-300"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Menu Button */}
      <button
        className="hidden sm:flex fixed top-4 left-4 z-50 p-2 rounded-lg bg-primary text-white"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="hidden sm:block fixed inset-0 bg-black/50 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-white shadow-sm p-6 sm:pl-16">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800 capitalize">{activeTab}</h1>
              <p className="text-gray-500 text-sm">Manage your {activeTab} section</p>
            </div>

            {/* Portfolio URL */}
            {user && hasPortfolio && (
              <div className="hidden sm:hidden md:flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-lg">
                <span className="text-gray-500 text-sm">Portfolio:</span>
                <a
                  href={`/portfolio/${user.username}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-secondary hover:underline text-sm font-medium flex items-center gap-1"
                >
                  /{user.username}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            )}
          </div>
        </header>

        {/* Content Area */}
        <div className="p-6">
          {/* Create Portfolio Section */}
          {!hasPortfolio && (
            <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-thirdry/20 to-secondary/20 flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-thirdry" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Welcome, {user?.username}!
              </h2>
              <p className="text-gray-500 mb-8 max-w-md mx-auto">
                You haven't created your portfolio yet. Click the button below to get started with your professional portfolio.
              </p>
              <button
                onClick={handleCreatePortfolio}
                className="bg-gradient-to-r from-thirdry to-secondary text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-thirdry/30 transition-all"
              >
                Create My Portfolio
              </button>
            </div>
          )}

          {/* Portfolio Management */}
          {hasPortfolio && portfolioData && (
            <div className="admin-card">
              {renderContent()}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default Admin
