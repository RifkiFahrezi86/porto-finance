import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Check, Zap } from 'lucide-react'
import { pricing, profile } from '../data/portfolio'

export default function Pricing() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  const whatsappBase = `https://wa.me/${profile.phone.replace(/[^0-9]/g, '')}`

  return (
    <section id="pricing" className="py-28 px-6 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-dark via-dark-2/50 to-dark" />

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-sm text-primary font-semibold tracking-widest uppercase mb-3 block"
          >
            Harga
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-black text-white mb-4"
          >
            Paket <span className="gradient-text">Harga</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-slate-400 text-sm max-w-lg mx-auto"
          >
            Harga final ditentukan setelah konsultasi sesuai kompleksitas project Anda.
          </motion.p>
          <div className="section-line mt-6" />
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {pricing.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className={`relative glass-card rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-2 ${
                plan.popular ? 'ring-2 ring-primary md:scale-105' : ''
              }`}
              ref={i === 0 ? ref : undefined}
            >
              {/* Popular badge */}
              {plan.popular && (
                <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-primary to-accent py-2 text-center">
                  <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center justify-center gap-1">
                    <Zap size={12} /> Paling Populer
                  </span>
                </div>
              )}

              <div className={`p-8 ${plan.popular ? 'pt-14' : ''}`}>
                {/* Plan name */}
                <h3 className="text-lg font-bold text-white mb-1">{plan.name}</h3>
                <p className="text-sm text-slate-400 mb-6">{plan.description}</p>

                {/* Price */}
                <div className="mb-8">
                  <span className="text-xs text-slate-500 block mb-1">{plan.prefix}</span>
                  <span className="text-3xl font-black text-white">{plan.price}</span>
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm text-slate-300">
                      <Check size={16} className="text-primary shrink-0 mt-0.5" />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <a
                  href={`${whatsappBase}?text=${encodeURIComponent(`Halo Rifki, saya tertarik dengan paket ${plan.name} (${plan.description}). Bisa konsultasi?`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block text-center py-3.5 rounded-xl font-semibold text-sm transition-all hover:-translate-y-0.5 no-underline ${
                    plan.popular
                      ? 'bg-gradient-to-r from-primary to-accent text-white hover:shadow-lg hover:shadow-primary/30'
                      : 'glass-card text-slate-300 hover:text-primary hover:border-primary/30'
                  }`}
                >
                  Order Sekarang
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
