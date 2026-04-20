import { motion } from 'framer-motion'
import { techIconMap } from './TechIcons'
import { techStack } from '../data/portfolio'

export default function TrustBar() {
  const displayedTech = techStack.slice(0, 10)

  return (
    <section className="py-10 px-6 relative overflow-hidden border-y border-white/5">
      <div className="absolute inset-0 bg-gradient-to-r from-dark via-dark-2/50 to-dark" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-sm text-slate-500 mb-6"
        >
          Dipercaya oleh mahasiswa & bisnis dari berbagai kota di Indonesia
        </motion.p>

        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
          {displayedTech.map((tech, i) => {
            const IconComponent = techIconMap[tech.name]
            if (!IconComponent) return null
            return (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center gap-2 text-slate-500 hover:text-primary transition-colors"
              >
                <IconComponent size={20} className="opacity-60" />
                <span className="text-xs font-medium hidden sm:inline">{tech.name}</span>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
