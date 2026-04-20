import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import { testimonials } from '../data/portfolio'

function StarRating({ rating }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={14}
          className={i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-slate-600'}
        />
      ))}
    </div>
  )
}

export default function Testimonials() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const [current, setCurrent] = useState(0)

  const itemsPerView = typeof window !== 'undefined' && window.innerWidth >= 768 ? 3 : 1
  const maxIndex = Math.max(0, testimonials.length - itemsPerView)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev >= maxIndex ? 0 : prev + 1))
    }, 5000)
    return () => clearInterval(timer)
  }, [maxIndex])

  return (
    <section id="testimoni" className="py-28 px-6 relative noise-overlay" ref={ref}>
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-sm text-primary font-semibold tracking-widest uppercase mb-3 block"
          >
            Testimoni
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-black text-white mb-4"
          >
            Apa Kata <span className="gradient-text">Client</span>
          </motion.h2>
          <div className="section-line mt-6" />
        </div>

        {/* Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${current * (100 / itemsPerView)}%)` }}
            >
              {testimonials.map((t, i) => (
                <div
                  key={i}
                  className="flex-shrink-0 px-3"
                  style={{ width: `${100 / itemsPerView}%` }}
                >
                  <div className="glass-card rounded-2xl p-7 h-full relative">
                    <Quote size={32} className="text-primary/10 absolute top-5 right-5" />

                    <div className="flex items-center gap-4 mb-5">
                      {/* Avatar */}
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-lg shrink-0">
                        {t.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white">{t.name}</h4>
                        <p className="text-xs text-primary-light">{t.project}</p>
                      </div>
                    </div>

                    <StarRating rating={t.rating} />

                    <p className="text-sm text-slate-400 leading-relaxed mt-4 mb-4">
                      "{t.text}"
                    </p>

                    <span className="text-xs text-slate-500">{t.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-3 mt-8">
            <button
              onClick={() => setCurrent((prev) => Math.max(0, prev - 1))}
              className="w-10 h-10 rounded-xl glass-card flex items-center justify-center text-slate-400 hover:text-primary transition-colors border-none bg-transparent cursor-pointer"
              aria-label="Previous"
            >
              <ChevronLeft size={18} />
            </button>

            <div className="flex gap-2">
              {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-2 h-2 rounded-full transition-all border-none cursor-pointer ${
                    i === current ? 'bg-primary w-6' : 'bg-slate-600 hover:bg-slate-500'
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={() => setCurrent((prev) => Math.min(maxIndex, prev + 1))}
              className="w-10 h-10 rounded-xl glass-card flex items-center justify-center text-slate-400 hover:text-primary transition-colors border-none bg-transparent cursor-pointer"
              aria-label="Next"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
