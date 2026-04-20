import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { ExternalLink, Github, Database, ArrowUpRight, FileText, Gamepad2, Code2, BookOpen, Warehouse, Package, CalendarClock, Clock, User } from 'lucide-react'
import { projects } from '../data/portfolio'

const projectIcons = [FileText, Gamepad2, Code2, BookOpen, Warehouse, Package, CalendarClock]
const projectGradients = [
  'from-amber-500/20 via-orange-500/10 to-transparent',
  'from-red-500/20 via-rose-500/10 to-transparent',
  'from-cyan-500/20 via-blue-500/10 to-transparent',
  'from-violet-500/20 via-purple-500/10 to-transparent',
  'from-emerald-500/20 via-teal-500/10 to-transparent',
  'from-sky-500/20 via-indigo-500/10 to-transparent',
  'from-yellow-500/20 via-lime-500/10 to-transparent',
]

const filterTabs = [
  { label: 'Semua', value: 'all' },
  { label: 'Website', value: 'website' },
  { label: 'Dashboard', value: 'dashboard' },
  { label: 'Akademik', value: 'academic' },
]

function ProjectCard({ project, index }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const [imgError, setImgError] = useState(false)
  const hasImage = project.image && !imgError

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.12 }}
      className="group glass-card rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-2"
    >
      {/* Project Visual */}
      <div className={`relative h-52 bg-gradient-to-br ${projectGradients[index % projectGradients.length]} flex items-center justify-center overflow-hidden`}>
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-transparent z-10" />

        {hasImage ? (
          <img
            src={project.image}
            alt={project.title}
            className="absolute inset-0 w-full h-full object-cover object-top opacity-80 group-hover:scale-105 transition-transform duration-500"
            onError={() => setImgError(true)}
          />
        ) : (
          <>
            <div className="absolute inset-0 opacity-10" style={{
              backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px)',
              backgroundSize: '20px 20px',
            }} />
            <div className="relative flex flex-col items-center gap-3">
              <div className="w-16 h-16 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                {(() => {
                  const IconComp = projectIcons[index % projectIcons.length] || Database
                  return <IconComp size={28} className="text-primary-light" />
                })()}
              </div>
            </div>
          </>
        )}

        {/* Client badge */}
        <div className="absolute top-3 left-3 z-20">
          <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${
            project.clientType === 'client'
              ? 'bg-green-400/20 text-green-400 border border-green-400/30'
              : 'bg-blue-400/20 text-blue-400 border border-blue-400/30'
          }`}>
            {project.clientType === 'client' ? 'Client Project' : 'Personal Project'}
          </span>
        </div>

        {/* Hover action buttons */}
        <div className="absolute inset-0 bg-dark/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-3 z-20">
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="w-11 h-11 rounded-xl bg-primary/80 hover:bg-primary flex items-center justify-center text-white transition-all hover:scale-110 no-underline"
              aria-label="Live demo"
            >
              <ExternalLink size={18} />
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="w-11 h-11 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all hover:scale-110 no-underline"
              aria-label="Source code"
            >
              <Github size={18} />
            </a>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-bold text-white group-hover:text-primary transition-colors">
            {project.title}
          </h3>
          <ArrowUpRight size={16} className="text-slate-600 group-hover:text-primary transition-colors shrink-0 mt-1" />
        </div>

        <p className="text-sm text-slate-400 mb-3 leading-relaxed">
          {project.description}
        </p>

        {/* Client & duration info */}
        <div className="flex flex-wrap items-center gap-3 mb-4 text-xs text-slate-500">
          {project.clientName && (
            <span className="flex items-center gap-1">
              <User size={11} className="text-primary" />
              {project.clientName}
            </span>
          )}
          {project.duration && (
            <span className="flex items-center gap-1">
              <Clock size={11} className="text-primary" />
              {project.duration}
            </span>
          )}
        </div>

        {/* Features */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.features.map((feature) => (
            <span
              key={feature}
              className="text-[11px] text-slate-300 bg-white/5 px-2.5 py-1 rounded-lg"
            >
              {feature}
            </span>
          ))}
        </div>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
          {project.tech.map((t) => (
            <span
              key={t}
              className="text-[11px] font-semibold text-primary bg-primary/10 px-3 py-1.5 rounded-lg"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default function Projects() {
  const [filter, setFilter] = useState('all')

  const filteredProjects = filter === 'all'
    ? projects
    : projects.filter((p) => p.category === filter)

  return (
    <section id="portfolio" className="py-28 px-6 relative noise-overlay">
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-sm text-primary font-semibold tracking-widest uppercase mb-3 block"
          >
            Portfolio
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-black text-white mb-4"
          >
            Hasil <span className="gradient-text">Karya Saya</span>
          </motion.h2>
          <div className="section-line mt-6" />
        </div>

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center justify-center gap-2 mb-12"
        >
          {filterTabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setFilter(tab.value)}
              className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all border-none cursor-pointer ${
                filter === tab.value
                  ? 'bg-gradient-to-r from-primary to-accent text-white shadow-lg shadow-primary/20'
                  : 'glass-card text-slate-400 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {filteredProjects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
