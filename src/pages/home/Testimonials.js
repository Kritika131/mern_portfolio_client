import React from 'react'
import { useSelector } from 'react-redux'
import SectionTitle from '../../components/SectionTitle'

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
              <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
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
                <svg key={star} className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Testimonials
