import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star } from 'lucide-react'

export default function TestimonialCarousel({ testimonials = [] }) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const t = setInterval(() => {
      setIndex((i) => (i + 1) % testimonials.length)
    }, 4500)
    return () => clearInterval(t)
  }, [testimonials.length])

  if (!testimonials || testimonials.length === 0) return null

  const prev = () => setIndex((i) => (i - 1 + testimonials.length) % testimonials.length)
  const next = () => setIndex((i) => (i + 1) % testimonials.length)

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-dark-text mb-10 font-heading">What Our Guests Say</h2>

        <div className="max-w-3xl mx-auto relative">
          <AnimatePresence initial={false} mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
              className="bg-white p-8 rounded-lg shadow-xl"
            >
              <div className="flex text-sand mb-4">
                {[...Array(testimonials[index].stars)].map((_, i) => (
                  <Star key={i} fill="currentColor" />
                ))}
              </div>
              <p className="text-lg italic text-gray-700 mb-6">"{testimonials[index].quote}"</p>
              <p className="font-bold text-ocean-blue text-right">- {testimonials[index].name}</p>
            </motion.div>
          </AnimatePresence>

          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex gap-4">
            <button onClick={prev} aria-label="Previous testimonial" className="bg-white/80 p-2 rounded-full shadow">
              ‹
            </button>
            <button onClick={next} aria-label="Next testimonial" className="bg-white/80 p-2 rounded-full shadow">
              ›
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
