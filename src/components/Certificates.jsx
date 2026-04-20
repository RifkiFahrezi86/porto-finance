import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Award, ExternalLink, ShieldCheck, Calendar } from 'lucide-react'
import { certificates } from '../data/portfolio'

const certIcons = ['🏆', '🌐', '⚛️', '🗄️']
const certAccents = [
  'from-cyan-400 to-blue-500',
  'from-emerald-400 to-teal-500',
  'from-yellow-400 to-orange-500',
  'from-violet-400 to-purple-500',
]

function CertCard({ cert, index }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group glass-card rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-2"
    >
      {/* Top accent bar */}
      <div className={`h-1 bg-gradient-to-r ${certAccents[index] || certAccents[0]}`} />

      {/* Content */}
      <div className="p-6">
        {/* Icon & badge */}
        <div className="flex items-start justify-between mb-4">
          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${certAccents[index] || certAccents[0]} bg-opacity-10 flex items-center justify-center text-2xl`}>
            {certIcons[index] || '📜'}
          </div>
          {cert.credential && (
            <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-green-400 bg-green-400/10 border border-green-400/20 px-2.5 py-1 rounded-full uppercase tracking-wider">
              <ShieldCheck size={10} />
              {cert.credential}
            </span>
          )}
        </div>

        <h3 className="font-bold text-white text-base mb-1.5 group-hover:text-primary transition-colors">
          {cert.title}
        </h3>

        <p className="text-sm text-primary-light/80 font-medium mb-3">
          {cert.issuer}
        </p>

        <div className="flex items-center justify-between pt-3 border-t border-white/5">
          <span className="inline-flex items-center gap-1.5 text-xs text-slate-500">
            <Calendar size={12} />
            {cert.date}
          </span>
          {cert.image && (
            <a
              href={cert.image}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-primary hover:text-primary-light flex items-center gap-1 transition-colors no-underline"
            >
              View <ExternalLink size={11} />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default function Certificates() {
  return (
    <section id="certificates" className="py-28 px-6 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-dark via-dark-2/50 to-dark" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-sm text-primary font-semibold tracking-widest uppercase mb-3 block"
          >
            Credentials
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-black text-white mb-4"
          >
            Awards & <span className="gradient-text">Certificates</span>
          </motion.h2>
          <div className="section-line mt-6" />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {certificates.map((cert, i) => (
            <CertCard key={i} cert={cert} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
