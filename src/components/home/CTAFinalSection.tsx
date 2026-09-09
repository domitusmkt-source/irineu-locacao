import Link from 'next/link'
import { Search, MessageCircle } from 'lucide-react'

export function CTAFinalSection() {
  return (
    <section className="py-28 md:py-36 bg-gradient-to-br from-[#0D2853] to-[#1C3E77]" id="contato">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center text-white">
        <h2 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
          Pronto para{' '}
          <span className="text-[#E32618]">MUDAR?</span>
        </h2>
        <p className="text-blue-200 text-base mb-12">
          Encontre seu próximo imóvel com a Irineu.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/imoveis"
            className="flex items-center justify-center gap-2 bg-white text-[#1C3E77] font-bold px-8 py-4 rounded-xl hover:bg-blue-50 transition-colors"
          >
            <Search size={20} />
            Ver todos os imóveis
          </Link>
          <a
            href="https://api.whatsapp.com/send?phone=554734817707&text=Olá! Vim pelo site e gostaria de ajuda para encontrar um imóvel."
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold px-8 py-4 rounded-xl transition-colors"
          >
            <MessageCircle size={20} />
            Falar com consultor
          </a>
        </div>
      </div>
    </section>
  )
}
