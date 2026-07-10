import Link from 'next/link'
import { Search, MessageCircle } from 'lucide-react'

export function CTAFinalSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-[#0D2B6B] to-[#1B4398]" id="contato">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center text-white">
        <p className="text-blue-200 text-sm font-bold uppercase tracking-widest mb-4">Pronto para o próximo passo?</p>
        <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
          Pronto para{' '}
          <span className="text-[#FF6B6B]">MUDAR?</span>
        </h2>
        <p className="text-blue-200 text-lg mb-10 leading-relaxed">
          Nossa equipe está pronta para ajudar você a encontrar o imóvel perfeito. Seja para morar ou para o seu negócio — estamos aqui.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/imoveis"
            className="flex items-center justify-center gap-2 bg-white text-[#1B4398] font-bold px-8 py-4 rounded-xl hover:bg-blue-50 transition-colors"
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
        <p className="text-blue-300 text-xs mt-8">
          Atendemos de Seg–Sex 8h–18h e Sáb 8h–12h • (47) 3481-7707
        </p>
      </div>
    </section>
  )
}
