import React from 'react'
import { useSelector } from 'react-redux'
import SectionTitle from '../../components/SectionTitle'

const getServiceIcon = (iconType) => {
  const icons = {
    code: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    design: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    mobile: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
    database: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
      </svg>
    ),
    cloud: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
      </svg>
    ),
    api: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  }
  return icons[iconType] || icons.code
}

const Services = () => {
  const { portfolioData } = useSelector((state) => state.portfolio)
  const services = portfolioData?.services || []

  if (!services || services.length === 0) {
    return null
  }

  return (
    <section id="services" className="py-16">
      <SectionTitle title="Services" />
      <div className="grid grid-cols-3 sm:grid-cols-1 md:grid-cols-2 gap-6 mt-10">
        {services.map((service) => (
          <div
            key={service._id}
            className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-thirdry/50 transition-all duration-300 hover:transform hover:-translate-y-2"
          >
            {/* Icon */}
            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-thirdry to-secondary flex items-center justify-center text-white mb-5 group-hover:scale-110 transition-transform duration-300">
              {getServiceIcon(service.icon)}
            </div>

            {/* Title & Description */}
            <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
            <p className="text-gray-400 text-sm mb-4 leading-relaxed">{service.description}</p>

            {/* Features */}
            {service.features && service.features.length > 0 && (
              <ul className="space-y-2 mb-4">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-gray-300 text-sm">
                    <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            )}

            {/* Price */}
            {service.price && (
              <div className="pt-4 border-t border-white/10">
                <p className="text-thirdry font-bold text-lg">{service.price}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}

export default Services
