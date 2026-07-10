import Link from 'next/link'
import Image from 'next/image'
import { Phone, Mail, MapPin } from 'lucide-react'

const WA_URL = 'https://api.whatsapp.com/send?phone=554734817707'
const IG_URL = 'https://www.instagram.com/irineulocacao/'

const quickLinks = [
  { href: '/', label: 'Início' },
  { href: '/imoveis', label: 'Buscar Imóveis' },
  { href: '/locacao-residencial', label: 'Locação Residencial' },
  { href: '/locacao-comercial', label: 'Locação Comercial' },
  { href: '/anuncie', label: 'Anuncie seu Imóvel' },
]

const services = [
  'Locação Residencial',
  'Locação Comercial',
  'Gestão de Contratos',
  'Consultoria Imobiliária',
  'Análise de Imóveis',
]

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-[#0D2B6B] text-white">
      {/* CTA faixa */}
      <div className="bg-[#1B4398] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-xl font-bold">Pronto para encontrar seu imóvel ideal?</p>
            <p className="text-blue-200 text-sm mt-1">Nossa equipe está pronta para ajudar você.</p>
          </div>
          <div className="flex gap-3">
            <Link
              href="/imoveis"
              className="bg-white text-[#1B4398] font-semibold px-6 py-2.5 rounded-lg hover:bg-blue-50 transition-colors text-sm"
            >
              Ver Imóveis
            </Link>
            <a
              href={WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-2.5 rounded-lg transition-colors text-sm"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Logo + desc */}
        <div className="lg:col-span-1">
          <div className="mb-4">
            <Image
              src="/images/logoirineulocacao.png"
              alt="Irineu Locação de Imóveis"
              width={140}
              height={56}
              className="h-14 w-auto rounded-xl"
            />
          </div>
          <p className="text-blue-200 text-sm leading-relaxed mb-4">
            Referência em locação de imóveis em Joinville e Norte de SC há mais de 25 anos.
          </p>
          <p className="text-blue-300 text-xs font-semibold mb-4">CRECI 2959J</p>
          <div className="flex gap-3">
            <a
              href={IG_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram Irineu Locação"
              className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors"
            >
              {/* Instagram SVG icon */}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              Instagram
            </a>
            <a
              href={WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp Irineu Locação"
              className="flex items-center gap-1.5 bg-green-600/80 hover:bg-green-600 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              WhatsApp
            </a>
          </div>
        </div>

        {/* Links rápidos */}
        <div>
          <h3 className="text-white font-bold mb-5 text-sm uppercase tracking-wider">Links Rápidos</h3>
          <ul className="space-y-2.5">
            {quickLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-blue-200 hover:text-white text-sm transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Serviços */}
        <div>
          <h3 className="text-white font-bold mb-5 text-sm uppercase tracking-wider">Nossos Serviços</h3>
          <ul className="space-y-2.5">
            {services.map((s) => (
              <li key={s} className="text-blue-200 text-sm">{s}</li>
            ))}
          </ul>
        </div>

        {/* Contato */}
        <div>
          <h3 className="text-white font-bold mb-5 text-sm uppercase tracking-wider">Fale Conosco</h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <MapPin size={16} className="text-blue-300 mt-0.5 shrink-0" />
              <p className="text-blue-200 text-sm">Rua Nove de Março, 277 - Centro, Joinville - SC</p>
            </div>
            <div className="flex items-center gap-3">
              <Phone size={16} className="text-blue-300 shrink-0" />
              <a href="tel:4734817707" className="text-blue-200 hover:text-white text-sm transition-colors">
                (47) 3481-7707
              </a>
            </div>
            <div className="flex items-center gap-3">
              <Mail size={16} className="text-blue-300 shrink-0" />
              <a href="mailto:locacao@irineulocacao.com.br" className="text-blue-200 hover:text-white text-sm transition-colors break-all">
                locacao@irineulocacao.com.br
              </a>
            </div>
          </div>
          <div className="mt-5 pt-5 border-t border-white/10">
            <p className="text-blue-300 text-xs font-semibold mb-1">Horário de Atendimento</p>
            <p className="text-blue-200 text-xs">Seg–Sex: 08h–18h</p>
            <p className="text-blue-200 text-xs">Sáb: 08h–12h</p>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-blue-300 text-xs">
            © {year} Irineu Locação de Imóveis. Todos os direitos reservados.
          </p>
          <div className="flex gap-4">
            <Link href="/privacidade" className="text-blue-300 hover:text-white text-xs transition-colors">Política de Privacidade</Link>
            <Link href="/cookies" className="text-blue-300 hover:text-white text-xs transition-colors">Política de Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
