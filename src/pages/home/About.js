import React from 'react'
import SectionTitle from '../../components/SectionTitle'
import { useSelector } from 'react-redux'

// Skill icons mapping
const skillIcons = {
  'javascript': '🟨',
  'react': '⚛️',
  'node': '🟢',
  'nodejs': '🟢',
  'express': '⚡',
  'mongodb': '🍃',
  'firebase': '🔥',
  'python': '🐍',
  'html': '🌐',
  'css': '🎨',
  'typescript': '💙',
  'nextjs': '▲',
  'vue': '💚',
  'angular': '🔴',
  'tailwind': '🌊',
  'git': '📦',
  'docker': '🐳',
  'aws': '☁️',
  'sql': '🗄️',
  'mysql': '🐬',
  'postgresql': '🐘',
  'redis': '🔴',
  'graphql': '◈',
}

const getSkillIcon = (skill) => {
  const key = skill.toLowerCase().replace(/\s+/g, '')
  return skillIcons[key] || '💻'
}

// Calculate years of experience from experience data
const calculateYearsOfExperience = (experiences) => {
  if (!experiences || experiences.length === 0) return 0

  let totalMonths = 0

  experiences.forEach(exp => {
    if (exp.duration) {
      // Try to parse duration like "Jan 2020 - Present" or "2020 - 2022"
      const parts = exp.duration.split('-').map(p => p.trim())
      if (parts.length === 2) {
        const startDate = parseDate(parts[0])
        const endDate = parts[1].toLowerCase() === 'present' ? new Date() : parseDate(parts[1])

        if (startDate && endDate) {
          const months = (endDate.getFullYear() - startDate.getFullYear()) * 12 +
                        (endDate.getMonth() - startDate.getMonth())
          totalMonths += Math.max(0, months)
        }
      }
    }
  })

  const years = Math.floor(totalMonths / 12)
  return years > 0 ? years : (totalMonths > 0 ? 1 : 0)
}

// Parse date string to Date object
const parseDate = (dateStr) => {
  if (!dateStr) return null

  // Try parsing "Jan 2020" format
  const monthMatch = dateStr.match(/([a-zA-Z]+)\s*(\d{4})/)
  if (monthMatch) {
    const months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec']
    const monthIndex = months.indexOf(monthMatch[1].toLowerCase().substring(0, 3))
    if (monthIndex !== -1) {
      return new Date(parseInt(monthMatch[2]), monthIndex)
    }
  }

  // Try parsing "2020" format
  const yearMatch = dateStr.match(/(\d{4})/)
  if (yearMatch) {
    return new Date(parseInt(yearMatch[1]), 0)
  }

  return null
}

const About = () => {
  const { portfolioData } = useSelector((state) => state.portfolio)
  const { about, projects, experiences, testimonials } = portfolioData || {}

  if (!about) return null

  // Calculate dynamic stats
  const yearsOfExperience = calculateYearsOfExperience(experiences)
  const projectsCount = projects?.length || 0
  const clientsCount = testimonials?.length || 0

  // Build stats array - only include stats that have values
  const stats = []

  if (yearsOfExperience > 0) {
    stats.push({
      value: `${yearsOfExperience}+`,
      label: 'Years Experience',
      delay: '0'
    })
  }

  if (projectsCount > 0) {
    stats.push({
      value: `${projectsCount}+`,
      label: 'Projects Completed',
      delay: '100'
    })
  }

  if (clientsCount > 0) {
    stats.push({
      value: `${clientsCount}+`,
      label: 'Happy Clients',
      delay: '200'
    })
  }

  return (
    <div id='about' className="py-16 sm:py-8 relative">
      {/* Background decoration */}
      <div className="absolute top-1/2 right-0 w-72 h-72 bg-teal-500/5 rounded-full blur-3xl"></div>

      <SectionTitle title="About me" />

      {/* Main Content Card */}
      <div className="glass-dark p-8 sm:p-4 rounded-2xl mt-8 animate-fadeIn">
        <div className="flex sm:flex-col w-full items-center gap-12 sm:gap-6">
          {/* Lottie Animation or Image */}
          <div className="w-1/3 sm:w-full flex items-center justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-teal-500/20 to-blue-500/20 rounded-full blur-2xl"></div>
              {about.lottie_url?.includes('lottiefiles') || about.lottie_url?.endsWith('.json') ? (
                <lottie-player
                  src={about.lottie_url}
                  speed="1"
                  style={{ width: "18rem", height: "18rem" }}
                  autoplay
                  loop
                ></lottie-player>
              ) : about.lottie_url ? (
                <img
                  src={about.lottie_url}
                  alt="About"
                  className="w-72 h-72 object-cover rounded-2xl shadow-xl relative z-10"
                />
              ) : (
                <lottie-player
                  src="https://assets5.lottiefiles.com/packages/lf20_iv4dsx3q.json"
                  speed="1"
                  style={{ width: "18rem", height: "18rem" }}
                  autoplay
                  loop
                ></lottie-player>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="w-2/3 sm:w-full">
            <div className="space-y-4">
              <p className='text-gray-300 leading-relaxed sm:text-sm sm:text-justify'>
                {about.description_1}
              </p>
              <p className='text-gray-400 leading-relaxed sm:text-sm sm:text-justify'>
                {about.description_2}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Skills Section */}
      <div className="py-12 sm:py-8">
        <h2 className="text-thirdry text-xl sm:text-lg mb-8 flex items-center gap-2">
          <span className="text-secondary">&lt;</span>
          Technologies I work with
          <span className="text-secondary">/&gt;</span>
        </h2>

        <div className="grid grid-cols-4 sm:grid-cols-2 gap-4 sm:gap-3">
          {about.skills && about.skills.map((skill, idx) => (
            <div
              key={idx}
              className="skill-card glass p-4 sm:p-3 rounded-xl hover-lift cursor-default animate-fadeIn"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl sm:text-xl">{getSkillIcon(skill)}</span>
                <span className="text-white font-medium sm:text-sm">{skill}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Section - Only show if there are stats to display */}
      {stats.length > 0 && (
        <div className={`grid gap-6 mt-8 ${
          stats.length === 1 ? 'grid-cols-1 max-w-xs mx-auto' :
          stats.length === 2 ? 'grid-cols-2 sm:grid-cols-1' :
          'grid-cols-3 sm:grid-cols-1'
        }`}>
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="glass-dark p-6 rounded-xl text-center hover-lift animate-fadeIn"
              style={{ animationDelay: `${stat.delay}ms` }}
            >
              <h3 className="text-4xl sm:text-3xl font-bold gradient-text">{stat.value}</h3>
              <p className="text-gray-400 mt-2">{stat.label}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default About
