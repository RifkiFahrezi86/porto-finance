import { MessageCircle } from 'lucide-react'
import { profile } from '../data/portfolio'

export default function WhatsAppFloat() {
  const whatsappUrl = `https://wa.me/${profile.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent('Halo Rifki, saya melihat portfolio Anda. Bisa ngobrol?')}`

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 left-6 z-50 group no-underline"
      aria-label="Chat WhatsApp"
    >
      <div className="relative">
        {/* Pulse ring */}
        <div className="absolute inset-0 w-14 h-14 bg-[#25D366] rounded-full animate-ping opacity-20" />

        {/* Button */}
        <div className="relative w-14 h-14 bg-[#25D366] hover:bg-[#20BD5A] rounded-full flex items-center justify-center text-white shadow-lg shadow-[#25D366]/30 transition-all hover:scale-110">
          <MessageCircle size={24} />
        </div>

        {/* Tooltip */}
        <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 bg-dark-2 text-white text-xs font-medium px-3 py-2 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-white/10">
          Chat Sekarang
          <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-dark-2" />
        </div>
      </div>
    </a>
  )
}
