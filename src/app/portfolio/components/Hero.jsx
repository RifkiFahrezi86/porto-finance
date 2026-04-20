import { motion } from 'framer-motion'
import { MessageCircle, ExternalLink, MapPin, Briefcase, Users, Star, Clock } from 'lucide-react'
import { profile } from '../data/portfolio'

function StatItem({ icon: Icon, value, label, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="text-center px-4 py-3"
    >
      <div className="flex items-center justify-center gap-2 mb-1">
        <Icon size={16} className="text-primary" />
        <span className="text-2xl md:text-3xl font-black text-white">{value}</span>
      </div>
      <span className="text-xs text-slate-400">{label}</span>
    </motion.div>
  )
}

export default function Hero() {
  const whatsappUrl = `https://wa.me/${profile.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent('Halo Rifki, saya tertarik dengan jasa pemrograman Anda. Bisa konsultasi?')}`

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden noise-overlay"
    >
      {/* Animated background orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-[10%] w-72 h-72 bg-primary/8 rounded-full blur-[100px] animate-float" />
        <div className="absolute bottom-20 right-[10%] w-96 h-96 bg-accent/8 rounded-full blur-[120px] animate-float-delayed" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/3 rounded-full blur-[150px]" />
      </div>

      {/* Dot grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '30px 30px',
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-20">
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20">
          {/* Photo with animated ring */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 100, delay: 0.1 }}
            className="flex-shrink-0"
          >
            <div className="relative group">
              {/* Outer glow ring */}
              <div className="absolute -inset-3 bg-gradient-to-br from-primary via-accent to-primary-light rounded-full opacity-20 blur-xl group-hover:opacity-40 transition-opacity duration-500" />
              {/* Spinning border */}
              <div className="absolute -inset-1.5 rounded-full bg-gradient-to-r from-primary via-transparent to-accent animate-[spin_8s_linear_infinite] opacity-60" />
              <div className="absolute -inset-1 rounded-full bg-dark" />
              <img
                src="/profile.jpeg"
                alt={profile.name}
                className="relative w-44 h-44 md:w-56 md:h-56 rounded-full object-cover shadow-2xl"
              />
              {/* Status dot */}
              <div className="absolute bottom-2 right-2 md:bottom-4 md:right-4">
                <div className="relative">
                  <div className="absolute inset-0 w-5 h-5 bg-green-400 rounded-full animate-ping opacity-40" />
                  <div className="w-5 h-5 bg-green-400 rounded-full border-3 border-dark" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Text content */}
          <div className="text-center md:text-left flex-1">
            {/* Location badge */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="inline-flex items-center gap-2 bg-primary/5 border border-primary/15 rounded-full px-4 py-1.5 mb-5"
            >
              <MapPin size={14} className="text-primary" />
              <span className="text-sm text-slate-400">{profile.location}</span>
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full" />
              <span className="text-sm text-green-400">Available</span>
            </motion.div>

            {/* Headline */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
            >
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-black mb-4 tracking-tight leading-tight">
                <span className="text-white">Butuh Jasa </span>
                <span className="gradient-text">Pemrograman?</span>
              </h1>
              <h2 className="text-lg md:text-xl text-slate-300 font-medium mb-3">
                Website, Dashboard, Tugas IT — Selesai Cepat & Profesional
              </h2>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
              className="text-base text-slate-400 max-w-lg mb-8 leading-relaxed"
            >
              {profile.description}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 }}
              className="flex flex-wrap items-center justify-center md:justify-start gap-4 mb-10"
            >
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20BD5A] text-white px-7 py-3.5 rounded-xl font-semibold transition-all hover:shadow-lg hover:shadow-[#25D366]/30 hover:-translate-y-0.5 no-underline"
              >
                <MessageCircle size={18} />
                Konsultasi Gratis via WhatsApp
              </a>
              <a
                href="#portfolio"
                className="inline-flex items-center gap-2 glass-card text-slate-300 hover:text-primary px-7 py-3.5 rounded-xl font-semibold transition-all hover:-translate-y-0.5 no-underline"
              >
                <ExternalLink size={18} />
                Lihat Portfolio
              </a>
            </motion.div>
          </div>
        </div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-12 glass-card rounded-2xl"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/5">
            <StatItem icon={Briefcase} value={profile.stats.projects} label="Project Selesai" delay={0.8} />
            <StatItem icon={Users} value={profile.stats.clients} label="Client Puas" delay={0.9} />
            <StatItem icon={Star} value={profile.stats.rating} label="Rating Client" delay={1.0} />
            <StatItem icon={Clock} value={`${profile.stats.experience} Tahun`} label="Pengalaman" delay={1.1} />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
