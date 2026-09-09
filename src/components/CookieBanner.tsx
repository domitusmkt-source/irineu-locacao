'use client'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { X } from 'lucide-react'

export function CookieBanner() {
  const [visible, setVisible] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent')
    if (!consent) setVisible(true)
  }, [])

  if (pathname.startsWith('/imoveis/')) return null

  function accept() {
    localStorage.setItem('cookie-consent', 'accepted')
    setVisible(false)
  }

  function refuse() {
    localStorage.setItem('cookie-consent', 'refused')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#1E293B] text-white shadow-2xl border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="flex-1 text-sm text-gray-300">
          Usamos cookies para melhorar sua experiência. Ao continuar, você concorda com nossa{' '}
          <Link href="/cookies" className="text-blue-400 underline hover:text-blue-300">
            Política de Cookies
          </Link>
          .
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={refuse}
            className="text-sm text-gray-400 hover:text-white transition-colors px-3 py-1.5"
          >
            Recusar
          </button>
          <Link href="/cookies" className="text-sm text-blue-400 hover:text-blue-300 transition-colors px-3 py-1.5">
            Saiba mais
          </Link>
          <button
            onClick={accept}
            className="bg-[#1C3E77] hover:bg-[#0D2853] text-white text-sm font-medium px-5 py-2 rounded-lg transition-colors"
          >
            Aceitar
          </button>
          <button onClick={accept} className="text-gray-400 hover:text-white transition-colors ml-1">
            <X size={18} />
          </button>
        </div>
      </div>
    </div>
  )
}
