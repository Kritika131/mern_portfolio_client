import React from 'react'
import { useSelector } from 'react-redux'
import SectionTitle from '../../components/SectionTitle'
import { Calendar, MapPin } from 'lucide-react'

const Experience = () => {
  const { portfolioData } = useSelector((state) => state.portfolio)
  const experiences = portfolioData?.experiences || []

  if (!experiences || experiences.length === 0) {
    return null
  }

  return (
    <section id="experience" className="py-16">
      <SectionTitle title="Experience" />
      <div className="mt-10 relative">
        {/* Timeline line */}
        <div className="absolute left-0 md:left-1/2 transform md:-translate-x-px top-0 bottom-0 w-0.5 bg-gradient-to-b from-thirdry via-secondary to-thirdry"></div>

        <div className="space-y-12">
          {experiences.map((exp, index) => (
            <div key={exp._id} className={`relative flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
              {/* Timeline dot */}
              <div className="absolute left-0 md:left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-thirdry border-4 border-primary z-10"></div>

              {/* Content card */}
              <div className={`ml-8 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-thirdry/50 transition-all duration-300">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-white">{exp.role}</h3>
                      <p className="text-thirdry font-medium">{exp.company}</p>
                    </div>
                    {exp.current && (
                      <span className="px-3 py-1 bg-green-500/20 text-green-400 text-xs rounded-full">Current</span>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-gray-400 text-sm mb-4">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {exp.duration}
                    </span>
                    {exp.location && (
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {exp.location}
                      </span>
                    )}
                  </div>
                  {exp.description && (
                    <p className="text-gray-300 text-sm mb-4">{exp.description}</p>
                  )}
                  {exp.technologies && exp.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech, idx) => (
                        <span key={idx} className="px-2 py-1 bg-thirdry/10 text-thirdry text-xs rounded">
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Experience
