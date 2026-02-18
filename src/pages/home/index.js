import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import Intro from './intro/Intro'
import About from './About'
import Education from './Education'
import Experience from './Experience'
import Certifications from './Certifications'
import Testimonials from './Testimonials'
import Services from './Services'
import Header from '../../components/Header'
import Projects from './Projects'
import Contact from './Contact'
import Footer from './Footer'
import LeftSider from '../../components/LeftSider'
import { useSelector, useDispatch } from 'react-redux'
import { SetPortfolioData, Showloading, Hideloading, SetViewingUsername } from '../../redux/portfolioSlice'
import api from '../../api/axios'
import { ArrowUp } from 'lucide-react'

const Home = () => {
  const { username } = useParams()
  const { portfolioData, viewingUsername } = useSelector((state) => state.portfolio)
  const dispatch = useDispatch()
  const [error, setError] = useState(null)
  const [userExists, setUserExists] = useState(true)
  const [hasPortfolio, setHasPortfolio] = useState(true)
  const [showScrollTop, setShowScrollTop] = useState(false)

  // Handle scroll to show/hide scroll-to-top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Fetch portfolio by username
  const fetchPortfolio = async () => {
    try {
      setError(null)
      dispatch(Showloading())
      const response = await api.get(`/portfolio/user/${username}`)
      dispatch(Hideloading())

      if (response.data.success) {
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
        dispatch(SetViewingUsername(username))
        setUserExists(true)
        setHasPortfolio(true)
      }
    } catch (err) {
      dispatch(Hideloading())
      if (err.response?.status === 404) {
        if (err.response.data.userExists === true) {
          setUserExists(true)
          setHasPortfolio(false)
        } else {
          setUserExists(false)
          setHasPortfolio(false)
        }
      } else {
        setError(err.response?.data?.msg || "Error loading portfolio")
      }
    }
  }

  useEffect(() => {
    if (username && username !== viewingUsername) {
      fetchPortfolio()
    }
  }, [username])

  // User not found
  if (!userExists) {
    return (
      <div className='min-h-screen bg-primary flex items-center justify-center'>
        <div className='text-center text-white'>
          <h1 className='text-4xl font-bold mb-4'>User Not Found</h1>
          <p className='text-gray-300 mb-6'>
            The user "{username}" doesn't exist.
          </p>
          <Link
            to="/admin-signup"
            className='bg-secondary text-white px-6 py-3 rounded-lg hover:opacity-80'
          >
            Create Your Portfolio
          </Link>
        </div>
      </div>
    )
  }

  // User exists but no portfolio
  if (!hasPortfolio) {
    return (
      <div className='min-h-screen bg-primary flex items-center justify-center'>
        <div className='text-center text-white'>
          <h1 className='text-4xl font-bold mb-4'>Portfolio Coming Soon</h1>
          <p className='text-gray-300 mb-6'>
            {username} hasn't created their portfolio yet.
          </p>
          <Link
            to="/admin-signup"
            className='bg-secondary text-white px-6 py-3 rounded-lg hover:opacity-80'
          >
            Create Your Own Portfolio
          </Link>
        </div>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className='min-h-screen bg-primary flex items-center justify-center'>
        <div className='text-center text-white'>
          <h1 className='text-4xl font-bold mb-4'>Error</h1>
          <p className='text-gray-300'>{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className='py-6 px-12 bg-primary sm:px-5'>
      <Header admin={false} />
      {portfolioData && (
        <div className="px-24 sm:px-0">
          <Intro />
          <About />
          <Experience />
          <Education />
          <Certifications />
          <Projects />
          <Services />
          <Testimonials />
          <Contact />
          <Footer />
          <LeftSider />
        </div>
      )}

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 sm:bottom-6 sm:right-6 p-3 rounded-full bg-thirdry text-white shadow-lg shadow-thirdry/30 hover:bg-secondary hover:shadow-secondary/30 transition-all duration-300 z-50 ${
          showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
        }`}
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-6 h-6" />
      </button>
    </div>
  )
}

export default Home
