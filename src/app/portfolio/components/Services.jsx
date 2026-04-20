import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Globe, LayoutDashboard, Smartphone, Server, Bug, GraduationCap, ArrowUpRight, Check, Clock, Banknote } from 'lucide-react'
import { services, profile } from '../data/portfolio'

const iconMap = {
  Globe,
  LayoutDashboard,
  Smartphone,
  Server,
  Bug,
  GraduationCap,
}

const cardColors = [
  'from-cyan-500/10 to-blue-500/10',
  'from-blue-500/10 to-indigo-500/10',
  'from-pink-500/10 to-purple-500/10',
  'from-emerald-500/10 to-cyan-500/10',
  'from-violet-500/10 to-blue-500/10',
  'from-orange-500/10 to-red-500/10',
]

function ServiceCard({ service, index }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-30px' })
  const IconComponent = iconMap[service.iconName]
  const whatsappUrl = `https://wa.me/${profile.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Halo Rifki, saya tertarik dengan layanan ${service.title}. Bisa konsultasi?`)}`

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className={`group glass-card rounded-2xl p-7 transition-all duration-300 hover:-translate-y-2 relative overflow-hidden ${
        service.highlight ? 'ring-2 ring-primary/50' : ''
      }`}
    >
      {/* Highlight badge */}
      {service.highlight && (
        <div className="absolute top-3 right-3 text-[10px] font-bold text-primary bg-primary/10 px-2.5 py-1 rounded-full uppercase tracking-wider">
          Populer
        </div>
      )}

      {/* Background gradient overlay */}
      <div className={`absolute inset-0 bg-gradient-to-br ${cardColors[index] || cardColors[0]} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/15 to-accent/15 border border-primary/15 flex items-center justify-center group-hover:border-primary/30 transition-all">
            {IconComponent && <IconComponent size={24} className="text-primary" />}
          </div>
        </div>

        <h3 className="text-lg font-bold text-white mb-2 group-hover:text-primary transition-colors">
          {service.title}
        </h3>
        <p className="text-sm text-slate-400 leading-relaxed mb-4">{service.description}</p>

        {/* Features checklist */}
        <ul className="space-y-1.5 mb-5">
          {service.features.map((feature) => (
            <li key={feature} className="flex items-center gap-2 text-xs text-slate-300">
              <Check size={12} className="text-primary shrink-0" />
              {feature}
            </li>
          ))}
        </ul>

        {/* Meta info */}
        <div className="flex items-center gap-4 mb-5 pt-4 border-t border-white/5">
          <span className="flex items-center gap-1.5 text-xs text-slate-400">
            <Clock size={12} className="text-primary" />
            {service.estimasi}
          </span>
          <span className="flex items-center gap-1.5 text-xs text-slate-400">
            <Banknote size={12} className="text-primary" />
            {service.startPrice}
          </span>
        </div>

        {/* CTA */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-xs font-semibold bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all no-underline"
        >
          Order Layanan Ini
          <ArrowUpRight size={14} />
        </a>
      </div>
    </motion.div>
  )
}

export default function Services() {
  return (
    <section id="services" className="py-28 px-6 relative">
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark via-dark-2/50 to-dark" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-sm text-primary font-semibold tracking-widest uppercase mb-3 block"
          >
            Layanan
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-black text-white mb-4"
          >
            Apa yang Bisa <span className="gradient-text">Saya Kerjakan</span>
          </motion.h2>
          <div className="section-line mt-6" />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service, i) => (
            <ServiceCard key={i} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
