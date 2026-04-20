import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { MessageCircle, Send, Zap } from 'lucide-react'
import { profile } from '../data/portfolio'

export default function CTASection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const whatsappUrl = `https://wa.me/${profile.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent('Halo Rifki, saya ingin konsultasi tentang project. Bisa dibantu?')}`

  return (
    <section className="py-28 px-6 relative" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-b from-dark via-primary/5 to-dark" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto relative z-10 text-center"
      >
        <div className="glass-card rounded-3xl p-12 md:p-16 relative overflow-hidden">
          {/* Decorative gradient lines */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />

          {/* Background orbs */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-[100px]" />

          <div className="relative z-10">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
              className="text-3xl md:text-4xl font-black text-white mb-4"
            >
              Siap Mulai <span className="gradient-text">Project Anda?</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 }}
              className="text-slate-400 mb-4 max-w-lg mx-auto"
            >
              Konsultasi gratis, tanpa commitment. Mari diskusikan kebutuhan Anda sekarang.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.35 }}
              className="inline-flex items-center gap-2 text-sm text-primary bg-primary/10 px-4 py-2 rounded-full mb-8"
            >
              <Zap size={14} />
              Slot terbatas — hanya handle 3-5 project bersamaan untuk menjaga kualitas
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20BD5A] text-white px-8 py-4 rounded-xl font-semibold transition-all hover:shadow-lg hover:shadow-[#25D366]/30 hover:-translate-y-0.5 no-underline text-sm"
              >
                <MessageCircle size={18} />
                Chat WhatsApp Sekarang
              </a>
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex items-center gap-2 glass-card text-slate-300 hover:text-primary px-8 py-4 rounded-xl font-semibold transition-all hover:-translate-y-0.5 no-underline text-sm"
              >
                <Send size={18} />
                Kirim Email
              </a>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
