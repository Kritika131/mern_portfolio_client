import React, { useState } from 'react'
import SectionTitle from '../../components/SectionTitle'
import { useSelector } from "react-redux"
import { Link } from 'react-router-dom'

const Projects = () => {
  const [selectedItem, setSelectedItem] = useState(0)
  const [imageLoaded, setImageLoaded] = useState(false)

  const { portfolioData } = useSelector((state) => state.portfolio)
  const projects = portfolioData?.projects || []

  // Don't render if no projects
  if (!projects || projects.length === 0) {
    return null
  }

  const currentProject = projects[selectedItem]

  return (
    <div className='py-16 sm:py-8 relative' id='projects'>
      {/* Background decoration */}
      <div className="absolute top-20 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>

      <SectionTitle title="Projects" />

      <div className="mt-8">
        {/* Project Cards Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-1 gap-6 mb-12">
          {projects.map((project, idx) => (
            <div
              key={project._id || idx}
              className={`project-card glass-dark p-4 cursor-pointer transition-all duration-300 animate-fadeIn ${
                selectedItem === idx
                  ? 'border-2 border-thirdry shadow-lg shadow-teal-500/20'
                  : 'border border-transparent hover:border-thirdry/30'
              }`}
              style={{ animationDelay: `${idx * 0.1}s` }}
              onClick={() => {
                setSelectedItem(idx)
                setImageLoaded(false)
              }}
            >
              <div className="relative overflow-hidden rounded-lg mb-3">
                <img
                  src={project.image}
                  className={`w-full h-32 object-cover transition-transform duration-500 ${
                    selectedItem === idx ? 'scale-105' : 'hover:scale-110'
                  }`}
                  alt={project.title}
                />
                {selectedItem === idx && (
                  <div className="absolute inset-0 bg-gradient-to-t from-teal-500/30 to-transparent"></div>
                )}
              </div>
              <h3 className={`font-semibold truncate ${
                selectedItem === idx ? 'text-thirdry' : 'text-white'
              }`}>
                {project.title}
              </h3>
              <p className="text-gray-500 text-sm mt-1 truncate">
                {project.technologies?.slice(0, 3).join(' • ')}
              </p>
            </div>
          ))}
        </div>

        {/* Selected Project Details */}
        {currentProject && (
          <div className="glass p-8 sm:p-4 rounded-2xl animate-fadeIn">
            <div className="flex sm:flex-col gap-10">
              {/* Project Image */}
              <div className="w-1/2 sm:w-full">
                <div className="relative group overflow-hidden rounded-xl">
                  <Link to={currentProject.deployed_link} target='_blank'>
                    <img
                      src={currentProject.image}
                      className='w-full h-72 sm:h-48 object-cover transition-transform duration-500 group-hover:scale-110'
                      alt={currentProject.title}
                      onLoad={() => setImageLoaded(true)}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                      <span className="text-white font-semibold flex items-center gap-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                        View Live Demo
                      </span>
                    </div>
                  </Link>
                </div>
              </div>

              {/* Project Info */}
              <div className="w-1/2 sm:w-full flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-secondary text-3xl sm:text-xl font-bold">{currentProject.title}</h2>
                  <div className="flex gap-3">
                    <Link
                      to={currentProject.deployed_link}
                      target='_blank'
                      className="p-2 rounded-full bg-thirdry/10 hover:bg-thirdry/20 transition-colors hover-glow"
                      title="Live Demo"
                    >
                      <svg className="w-5 h-5 text-thirdry" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </Link>
                    <Link
                      to={currentProject.github_link}
                      target='_blank'
                      className="p-2 rounded-full bg-thirdry/10 hover:bg-thirdry/20 transition-colors hover-glow"
                      title="Source Code"
                    >
                      <box-icon name='github' type='logo' color='#54D6BB' size="sm"></box-icon>
                    </Link>
                  </div>
                </div>

                <p className="text-gray-300 leading-relaxed sm:text-sm">
                  {currentProject.description}
                </p>

                {/* Technologies */}
                <div className="mt-4">
                  <h4 className="text-thirdry text-sm font-semibold mb-3">Technologies Used</h4>
                  <div className="flex flex-wrap gap-2">
                    {currentProject.technologies && currentProject.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 text-sm bg-thirdry/10 text-thirdry rounded-full border border-thirdry/20"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 mt-6">
                  <Link
                    to={currentProject.deployed_link}
                    target='_blank'
                    className="btn-primary flex items-center gap-2 text-sm"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    Live Preview
                  </Link>
                  <Link
                    to={currentProject.github_link}
                    target='_blank'
                    className="btn-outline flex items-center gap-2 text-sm"
                  >
                    <box-icon name='github' type='logo' color='currentColor' size="xs"></box-icon>
                    View Code
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Projects
