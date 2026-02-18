import React from 'react'
import { useSelector } from 'react-redux'
import SectionTitle from '../../components/SectionTitle'
import { Quote, Star } from 'lucide-react'

const Testimonials = () => {
  const { portfolioData } = useSelector((state) => state.portfolio)
  const testimonials = portfolioData?.testimonials || []

  if (!testimonials || testimonials.length === 0) {
    return null
  }

  return (
    <section id="testimonials" className="py-16">
      <SectionTitle title="Testimonials" />
      <div className="grid grid-cols-2 sm:grid-cols-1 gap-6 mt-10">
        {testimonials.map((testimonial) => (
          <div
            key={testimonial._id}
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-thirdry/50 transition-all duration-300 relative"
          >
            {/* Quote icon */}
            <div className="absolute top-4 right-4 text-thirdry/20">
              <Quote className="w-12 h-12" />
            </div>

            {/* Content */}
            <div className="flex items-start gap-4 mb-4">
              <div className="w-14 h-14 rounded-full overflow-hidden bg-gradient-to-br from-thirdry to-secondary flex-shrink-0">
                {testimonial.image ? (
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-white text-xl font-bold">
                    {testimonial.name?.charAt(0)}
                  </div>
                )}
              </div>
              <div>
                <h3 className="text-white font-semibold">{testimonial.name}</h3>
                <p className="text-thirdry text-sm">{testimonial.role}</p>
                {testimonial.company && (
                  <p className="text-gray-500 text-xs">{testimonial.company}</p>
                )}
              </div>
            </div>

            <p className="text-gray-300 italic leading-relaxed">
              "{testimonial.text}"
            </p>

            {/* Stars */}
            <div className="flex gap-1 mt-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Testimonials
