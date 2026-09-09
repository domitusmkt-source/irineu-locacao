'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { Menu, X, Phone, MessageCircle, User } from 'lucide-react'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'

const WA_URL = 'https://api.whatsapp.com/send?phone=554734817707'
const AREA_CLIENTE_URL = 'https://enet.simob.com.br/login/26bf51ea7122094ad0a4779cb1fd26d4881'

const navLinks = [
  { href: '/imoveis', label: 'Imóveis' },
  { href: '/locacao-residencial', label: 'Residencial' },
  { href: '/locacao-comercial', label: 'Comercial' },
  { href: '/anuncie', label: 'Anuncie seu Imóvel' },
  { href: '/#sobre', label: 'Sobre' },
  { href: '/#contato', label: 'Contato' },
]

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  // Página do imóvel não tem hero/fundo escuro atrás do header, então o
  // estado inicial "transparente" precisa usar o mesmo visual do estado "scrolled".
  const isImovelDetail = pathname?.startsWith('/imoveis/') ?? false
  const solid = scrolled || isImovelDetail

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-40 transition-all duration-300"
      animate={{
        backgroundColor: solid ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,0)',
        boxShadow: solid ? '0 1px 20px rgba(0,0,0,0.1)' : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-24 md:h-28 flex items-center justify-between gap-4">
        {/* Logo — versão colorida sobre header sólido (branco), alto-contraste sobre o hero transparente.
            Assets recortados no conteúdo real (sem a margem transparente do PNG original) para a marca
            ocupar de fato a altura reservada. */}
        <Link href="/" className="shrink-0">
          <Image
            src={solid ? '/images/logo-irineu.png' : '/images/logo-irineu-branco.png'}
            alt="Irineu Locação de Imóveis"
            width={617}
            height={531}
            className="h-20 md:h-24 w-auto transition-opacity duration-300"
            priority
          />
        </Link>

        {/* Nav desktop */}
        <nav className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium whitespace-nowrap transition-colors hover:text-[#1C3E77] ${
                solid ? 'text-[#1E293B]' : 'text-white drop-shadow'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTAs desktop */}
        <div className="hidden lg:flex items-center gap-3 shrink-0">
          <a
            href="tel:4734817707"
            className={`flex items-center gap-1.5 text-sm font-medium transition-colors whitespace-nowrap ${solid ? 'text-[#1E293B]' : 'text-white drop-shadow'}`}
          >
            <Phone size={15} />
            (47) 3481-7707
          </a>
          <a
            href={AREA_CLIENTE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-1.5 text-sm font-medium transition-colors whitespace-nowrap border rounded-lg px-3 py-2 ${
              solid
                ? 'text-[#1E293B] border-[#1E293B]/20 hover:border-[#1C3E77] hover:text-[#1C3E77]'
                : 'text-white border-white/40 hover:border-white hover:bg-white/10 drop-shadow'
            }`}
          >
            <User size={15} />
            Área do Cliente
          </a>
          <a
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors whitespace-nowrap"
          >
            <MessageCircle size={16} />
            WhatsApp
          </a>
        </div>

        {/* Mobile menu */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger className={`lg:hidden p-2 rounded-lg transition-colors ${solid ? 'text-[#1E293B]' : 'text-white'}`}>
            <Menu size={24} />
          </SheetTrigger>
          {/* showCloseButton={false} remove o X automático — usamos nosso próprio no header azul */}
          <SheetContent side="right" className="w-72 bg-white p-0" showCloseButton={false}>
            <div className="flex flex-col h-full">
              <div className="bg-[#1C3E77] p-5 flex items-center justify-between shrink-0">
                <Image src="/images/logo-irineu-branco.png" alt="Irineu Locação" width={617} height={531} className="h-20 w-auto" />
                <button onClick={() => setOpen(false)} className="text-white p-1 hover:text-blue-200 transition-colors" aria-label="Fechar menu">
                  <X size={22} />
                </button>
              </div>
              <nav className="flex flex-col p-4 gap-1 flex-1 overflow-y-auto">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="text-[#1E293B] font-medium py-3 px-4 rounded-lg hover:bg-blue-50 hover:text-[#1C3E77] transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
              <div className="p-4 border-t flex flex-col gap-3 shrink-0">
                <a href="tel:4734817707" className="flex items-center gap-2 text-[#1E293B] font-medium py-3 px-4 rounded-lg border hover:bg-gray-50 transition-colors">
                  <Phone size={16} className="text-[#1C3E77]" />
                  (47) 3481-7707
                </a>
                <a
                  href={AREA_CLIENTE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-[#1E293B] font-medium py-3 px-4 rounded-lg border hover:bg-gray-50 transition-colors"
                >
                  <User size={16} className="text-[#1C3E77]" />
                  Área do Cliente
                </a>
                <a
                  href={WA_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-green-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-green-700 transition-colors"
                >
                  <MessageCircle size={16} />
                  Falar no WhatsApp
                </a>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </motion.header>
  )
}
