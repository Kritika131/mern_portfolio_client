import React from 'react'
import { useSelector } from 'react-redux'
import SectionTitle from '../../components/SectionTitle'
import { Code, Image, Smartphone, Database, Cloud, Terminal, Check } from 'lucide-react'

const getServiceIcon = (iconType) => {
  const icons = {
    code: <Code className="w-8 h-8" />,
    design: <Image className="w-8 h-8" />,
    mobile: <Smartphone className="w-8 h-8" />,
    database: <Database className="w-8 h-8" />,
    cloud: <Cloud className="w-8 h-8" />,
    api: <Terminal className="w-8 h-8" />,
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
                    <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
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
