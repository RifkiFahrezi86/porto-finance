import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Briefcase, Zap, ArrowRight } from 'lucide-react'
import { experiences, techStack } from '../data/portfolio'
import { techIconMap } from './TechIcons'

function TimelineItem({ exp, index, total }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -30 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.12 }}
      className="relative flex gap-5 group"
    >
      {/* Timeline line & dot */}
      <div className="flex flex-col items-center">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/30 flex items-center justify-center shrink-0 group-hover:from-primary/30 group-hover:to-accent/30 transition-all">
          <Briefcase size={16} className="text-primary" />
        </div>
        {index < total - 1 && (
          <div className="w-px flex-1 bg-gradient-to-b from-primary/30 via-primary/10 to-transparent mt-2 min-h-[40px]" />
        )}
      </div>

      {/* Card content */}
      <div className="glass-card rounded-xl p-5 flex-1 mb-6 transition-all duration-300 hover:-translate-y-0.5">
        <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
          <div>
            <h3 className="text-base font-bold text-white group-hover:text-primary transition-colors">{exp.role}</h3>
            <p className="text-sm text-primary-light font-medium">{exp.company}</p>
          </div>
          <span className="text-xs text-slate-400 bg-white/5 px-3 py-1 rounded-lg whitespace-nowrap">
            {exp.period}
          </span>
        </div>
        <p className="text-sm text-slate-400 leading-relaxed mt-2">{exp.description}</p>
      </div>
    </motion.div>
  )
}

function TechCard({ tech, index }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-30px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.3, delay: index * 0.04 }}
      className="group glass-card rounded-xl p-4 text-center transition-all duration-300 hover:-translate-y-1 cursor-default"
    >
      <div className="text-3xl mb-2.5 flex justify-center">
        {(() => {
          const IconComponent = techIconMap[tech.name]
          return IconComponent ? <IconComponent size={26} className="text-primary-light group-hover:text-primary transition-colors" /> : null
        })()}
      </div>
      <h4 className="text-xs font-bold text-white mb-0.5">{tech.name}</h4>
      <span className="text-[10px] text-primary/70 uppercase tracking-wider font-medium">{tech.level}</span>
    </motion.div>
  )
}

export default function Experience() {
  return (
    <section id="experience" className="py-28 px-6 relative noise-overlay">
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section header */}
        <div className="text-center mb-20">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-sm text-primary font-semibold tracking-widest uppercase mb-3 block"
          >
            My Journey
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-black text-white mb-4"
          >
            Experience & <span className="gradient-text">Tech Stack</span>
          </motion.h2>
          <div className="section-line mt-6" />
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Timeline */}
          <div>
            <h3 className="text-lg font-bold text-white mb-8 flex items-center gap-3">
              <span className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                <Briefcase size={16} className="text-primary" />
              </span>
              Work Experience
            </h3>
            <div>
              {experiences.map((exp, i) => (
                <TimelineItem key={i} exp={exp} index={i} total={experiences.length} />
              ))}
            </div>
          </div>

          {/* Tech Stack */}
          <div>
            <h3 className="text-lg font-bold text-white mb-8 flex items-center gap-3">
              <span className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                <Zap size={16} className="text-primary" />
              </span>
              Tech Stack
            </h3>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
              {techStack.map((tech, i) => (
                <TechCard key={i} tech={tech} index={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
