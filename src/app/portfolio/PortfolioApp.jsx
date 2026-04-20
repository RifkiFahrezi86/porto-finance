import Navbar from './components/Navbar'
import Hero from './components/Hero'
import TrustBar from './components/TrustBar'
import Services from './components/Services'
import HowItWorks from './components/HowItWorks'
import Projects from './components/Projects'
import Testimonials from './components/Testimonials'
import Pricing from './components/Pricing'
import FAQ from './components/FAQ'
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
      <Services />
      <HowItWorks />
      <Projects />
      <Testimonials />
      <Pricing />
      <FAQ />
      <Experience />
      <CTASection />
      <Footer />
      <WhatsAppFloat />
    </div>
  )
}

export default App
