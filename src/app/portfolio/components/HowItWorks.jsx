import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { MessageCircle, FileText, Code, CheckCircle } from 'lucide-react'
import { howItWorks } from '../data/portfolio'

const iconMap = {
  MessageCircle,
  FileText,
  Code,
  CheckCircle,
}

export default function HowItWorks() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <section className="py-28 px-6 relative" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-b from-dark via-dark-2/50 to-dark" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-sm text-primary font-semibold tracking-widest uppercase mb-3 block"
          >
            Proses Kerja
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-black text-white mb-4"
          >
            Cara <span className="gradient-text">Order</span>
          </motion.h2>
          <div className="section-line mt-6" />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {howItWorks.map((step, i) => {
            const IconComponent = iconMap[step.iconName]
            return (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="relative text-center group"
              >
                {/* Connector line */}
                {i < howItWorks.length - 1 && (
                  <div className="hidden lg:block absolute top-10 left-[60%] w-[80%] h-px bg-gradient-to-r from-primary/30 to-transparent" />
                )}

                {/* Step number & icon */}
                <div className="relative inline-flex items-center justify-center mb-6">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/15 to-accent/15 border border-primary/20 flex items-center justify-center group-hover:from-primary/25 group-hover:to-accent/25 group-hover:border-primary/40 transition-all duration-300">
                    {IconComponent && <IconComponent size={28} className="text-primary" />}
                  </div>
                  <span className="absolute -top-2 -right-2 w-7 h-7 rounded-lg bg-gradient-to-br from-primary to-accent text-white text-xs font-bold flex items-center justify-center">
                    {step.step}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-primary transition-colors">
                  {step.title}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
