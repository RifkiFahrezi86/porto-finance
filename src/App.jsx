import Navbar from './components/Navbar'
import Hero from './components/Hero'
import TrustBar from './components/TrustBar'
import Projects from './components/Projects'
import Experience from './components/Experience'
import CTASection from './components/CTASection'
import Footer from './components/Footer'
import WhatsAppFloat from './components/WhatsAppFloat'

function App() {
  return (
    <div className="min-h-screen bg-dark text-slate-200">
      <Navbar />
      <Hero />
      <TrustBar />
      <Projects />
      <Experience />
      <CTASection />
      <Footer />
      <WhatsAppFloat />
    </div>
  )
}

export default App
