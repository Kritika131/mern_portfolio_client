import React from 'react'
import { useSelector } from 'react-redux'
import SectionTitle from '../../components/SectionTitle'
import { Award, ExternalLink } from 'lucide-react'

const Certifications = () => {
  const { portfolioData } = useSelector((state) => state.portfolio)
  const certifications = portfolioData?.certifications || []

  if (!certifications || certifications.length === 0) {
    return null
  }

  return (
    <section id="certifications" className="py-16">
      <SectionTitle title="Certifications" />
      <div className="grid grid-cols-3 sm:grid-cols-1 md:grid-cols-2 gap-6 mt-10">
        {certifications.map((cert) => (
          <div
            key={cert._id}
            className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden hover:border-thirdry/50 transition-all duration-300 hover:transform hover:scale-105"
          >
            {cert.image && (
              <div className="h-40 overflow-hidden">
                <img
                  src={cert.image}
                  alt={cert.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
            )}
            <div className="p-5">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-thirdry to-secondary flex items-center justify-center flex-shrink-0">
                  <Award className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">{cert.title}</h3>
                  <p className="text-gray-400 text-sm">{cert.issuer}</p>
                </div>
              </div>
              {cert.date && (
                <p className="text-gray-500 text-xs mb-3">{cert.date}</p>
              )}
              {cert.credentialUrl && (
                <a
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-thirdry text-sm hover:underline"
                >
                  View Credential
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Certifications
