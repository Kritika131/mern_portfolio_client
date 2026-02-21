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
import { Home, User, GraduationCap, FolderKanban, Mail, Briefcase, Award, MessageSquare, Newspaper, Settings, BarChart3, ExternalLink, LogOut, Plus, Menu } from 'lucide-react'

// Sidebar navigation items
const navItems = [
  {
    key: 'intro',
    label: 'Intro',
    icon: <Home className="w-5 h-5" />,
  },
  {
    key: 'about',
    label: 'About',
    icon: <User className="w-5 h-5" />,
  },
  {
    key: 'education',
    label: 'Education',
    icon: <GraduationCap className="w-5 h-5" />,
  },
  {
    key: 'projects',
    label: 'Projects',
    icon: <FolderKanban className="w-5 h-5" />,
  },
  {
    key: 'contact',
    label: 'Contact',
    icon: <Mail className="w-5 h-5" />,
  },
  {
    key: 'experience',
    label: 'Experience',
    icon: <Briefcase className="w-5 h-5" />,
  },
  {
    key: 'certifications',
    label: 'Certifications',
    icon: <Award className="w-5 h-5" />,
  },
  {
    key: 'testimonials',
    label: 'Testimonials',
    icon: <MessageSquare className="w-5 h-5" />,
  },
  {
    key: 'blog',
    label: 'Blog',
    icon: <Newspaper className="w-5 h-5" />,
  },
  {
    key: 'services',
    label: 'Services',
    icon: <Settings className="w-5 h-5" />,
  },
  // {
  //   key: 'analytics',
  //   label: 'Analytics',
  //   icon: <BarChart3 className="w-5 h-5" />,
  // },
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
      // case 'analytics':
      //   return <AdminAnalytics />
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
              <ExternalLink className="w-5 h-5" />
              <span>View Portfolio</span>
            </Link>
            <button
              onClick={handleLogout}
              className="admin-nav-item w-full flex items-center gap-3 text-red-400 hover:text-red-300"
            >
              <LogOut className="w-5 h-5" />
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
        <Menu className="w-6 h-6" />
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
                  <ExternalLink className="w-4 h-4" />
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
                <Plus className="w-10 h-10 text-thirdry" />
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
