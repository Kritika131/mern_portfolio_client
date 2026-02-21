import React, { useState, useEffect } from 'react'
import { useSelector } from "react-redux"
import Resume from "../../../assets/Resume.pdf"
import "./style.css"
import { FileDown, MessageCircle } from 'lucide-react'

// Custom Typing Effect Hook
const useTypingEffect = (texts, typingSpeed = 100, deletingSpeed = 50, pauseTime = 2000) => {
  const [displayText, setDisplayText] = useState('')
  const [textIndex, setTextIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    if (!texts || texts.length === 0) return

    const currentText = texts[textIndex]

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < currentText.length) {
          setDisplayText(currentText.slice(0, displayText.length + 1))
        } else {
          setTimeout(() => setIsDeleting(true), pauseTime)
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1))
        } else {
          setIsDeleting(false)
          setTextIndex((prev) => (prev + 1) % texts.length)
        }
      }
    }, isDeleting ? deletingSpeed : typingSpeed)

    return () => clearTimeout(timeout)
  }, [displayText, isDeleting, textIndex, texts, typingSpeed, deletingSpeed, pauseTime])

  return displayText
}

const Intro = () => {
  const { portfolioData } = useSelector((state) => state.portfolio)
  const { intro } = portfolioData || {}
  const { name, welcomeText, caption, description, profileImage, resumeUrl } = intro || {}

  // Typing effect for caption
  const typingTexts = [caption, "Creative Coder", "Problem Solver"]
  const typedText = useTypingEffect(typingTexts.filter(Boolean), 80, 40, 2000)

  if (!intro) return null

  // Use uploaded resume from database, fallback to static file
  const resumeLink = resumeUrl || Resume
  const hasResume = !!resumeUrl

  const handleDownloadResume = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch(resumeLink)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `${name || 'Resume'}_Resume.pdf`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
    } catch {
      window.open(resumeLink, '_blank')
    }
  }

  return (
    <div className="flex min-h-[85vh] sm:min-h-[75vh] justify-between items-center relative overflow-hidden px-4" id='home'>
      {/* Main Content */}
      <div className='flex flex-col text-gray-400 items-start justify-center gap-3 mt-5 z-10 w-[60%] animate-fadeIn'>
        {/* Welcome Text with animation */}
        <h3 className='text-xl sm:text-lg text-thirdry animate-fadeInLeft'>
          <span className="text-secondary">&lt;</span> {welcomeText} <span className="text-secondary">/&gt;</span>
        </h3>

        {/* Name with gradient effect */}
        <h1 className='text-6xl sm:text-3xl font-bold text-white relative mb-2 animate-fadeIn delay-200'>
          <span className="gradient-text text-glow">{name}</span>
        </h1>

        {/* Typing Effect Caption */}
        <div className='h-12 sm:h-8 flex items-center'>
          <p className='text-3xl sm:text-xl text-gray-300' style={{ fontFamily: "'Orbitron', sans-serif" }}>
            {typedText}
            <span className="typing-cursor ml-1"></span>
          </p>
        </div>

        {/* Description with glass effect */}
        <div className="glass-dark p-4 pr-8 rounded-lg mt-2 animate-fadeIn delay-300">
          <p className='w-full sm:w-full sm:text-justify sm:text-sm text-gray-300 leading-relaxed'>
            {description}
          </p>
        </div>

        {/* Buttons with new styles */}
        <div className="btns flex gap-6 mt-6 sm:gap-4 animate-fadeIn delay-400">
          {hasResume ? (
            <a
              href={resumeLink}
              onClick={handleDownloadResume}
              className='btn-primary flex items-center gap-2 sm:text-sm hover-lift'
            >
              <FileDown className="w-5 h-5" />
              Download Resume
            </a>
          ) : (
            <span className='flex items-center gap-2 sm:text-sm px-6 py-2.5 rounded-lg border border-gray-600 text-gray-500 cursor-not-allowed opacity-60'>
              <FileDown className="w-5 h-5" />
              Resume Not Available
            </span>
          )}
          <a
            href="#contact"
            className='btn-outline flex items-center gap-2 sm:text-sm sm:px-4 hover-lift'
          >
            <MessageCircle className="w-5 h-5" />
            Let's Talk
          </a>
        </div>

        {/* Social Links */}
        <div className="flex gap-4 mt-6 animate-fadeIn delay-500">
          <a href="#" className="social-link hover-glow">
            <box-icon name='github' type='logo' color='#54D6BB'></box-icon>
          </a>
          <a href="#" className="social-link hover-glow">
            <box-icon name='linkedin' type='logo' color='#54D6BB'></box-icon>
          </a>
          <a href="#" className="social-link hover-glow">
            <box-icon name='twitter' type='logo' color='#54D6BB'></box-icon>
          </a>
        </div>
      </div>

      {/* Profile Image / Floating Image */}
      <div className="absolute right-12 sm:hidden">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-teal-500/20 to-blue-500/20 rounded-full blur-2xl"></div>
          {profileImage ? (
            <div className="relative z-10">
              <div className="w-[20rem] h-[20rem] rounded-full overflow-hidden border-4 border-thirdry/30 shadow-2xl shadow-thirdry/20">
                <img
                  src={profileImage}
                  className='w-full h-full object-cover'
                  alt={name || "Profile"}
                />
              </div>
              {/* Decorative ring */}
              <div className="absolute -inset-4 border-2 border-dashed border-thirdry/20 rounded-full animate-spin-slow"></div>
            </div>
          ) : (
            <img
              src="https://www.hackersfriend.com/media/kid_coding.png"
              className='w-[24rem] h-[24rem] relative z-10 drop-shadow-2xl'
              alt="Developer illustration"
            />
          )}
        </div>
      </div>

    </div>
  )
}

export default Intro
