import type { Metadata } from 'next'
import Link from 'next/link'
import { Home, ArrowRight } from 'lucide-react'
import { getImoveisResidenciais } from '@/lib/api/simob'
import { CardImovel } from '@/components/imoveis/CardImovel'

export const metadata: Metadata = {
  title: 'Locação Residencial — Casas, Apartamentos e Terrenos | Irineu Locação',
  description: 'Encontre casas, apartamentos e terrenos para alugar em Joinville e Norte de Santa Catarina. Locação residencial com atendimento especializado.',
  openGraph: {
    title: 'Locação Residencial | Irineu Locação de Imóveis',
    description: 'Casas, apartamentos e terrenos para alugar no Norte de SC.',
  },
}

const WA_URL = 'https://api.whatsapp.com/send?phone=554734817707&text=Olá! Tenho interesse em imóveis residenciais para locação.'

export default async function LocacaoResidencialPage() {
  const imoveis = await getImoveisResidenciais().catch(() => [])

  return (
    <div className="min-h-screen bg-[#F4F6F9]">
      {/* Hero */}
      <div className="bg-gradient-to-br from-[#1C3E77] to-[#0D2853] pt-24 md:pt-28 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-2 text-blue-200 text-sm mb-4">
            <Link href="/" className="hover:text-white transition-colors">Início</Link>
            <span>/</span>
            <span className="text-white">Locação Residencial</span>
          </div>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
              <Home size={22} className="text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-white">Locação Residencial</h1>
          </div>
          <p className="text-blue-200 max-w-xl">
            Casas, apartamentos e terrenos disponíveis para alugar em Joinville e Norte de Santa Catarina.
          </p>
          <div className="flex flex-wrap gap-3 mt-6">
            <Link
              href="/imoveis?categoria=residencial&tipo=casa"
              className="bg-white/10 hover:bg-white/20 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
            >
              Casas
            </Link>
            <Link
              href="/imoveis?categoria=residencial&tipo=terreno"
              className="bg-white/10 hover:bg-white/20 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
            >
              Terrenos
            </Link>
            <Link
              href="/imoveis?categoria=residencial&tipo=apartamento"
              className="bg-white/10 hover:bg-white/20 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
            >
              Apartamentos
            </Link>
          </div>
        </div>
      </div>

      {/* Listagem */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-500 text-sm">
            <span className="font-bold text-[#1E293B]">{imoveis.length}</span> imóveis residenciais disponíveis
          </p>
          <Link
            href="/imoveis"
            className="text-[#1C3E77] text-sm font-semibold flex items-center gap-1 hover:underline"
          >
            Ver todos <ArrowRight size={14} />
          </Link>
        </div>

        {imoveis.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {imoveis.map((imovel) => (
              <CardImovel key={imovel.id} imovel={imovel} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-400 text-lg mb-4">Nenhum imóvel residencial disponível no momento.</p>
            <Link href="/imoveis" className="text-[#1C3E77] font-semibold hover:underline">
              Ver todos os imóveis
            </Link>
          </div>
        )}

        {/* CTA WhatsApp */}
        <div className="mt-12 bg-[#1C3E77] rounded-2xl p-8 text-center text-white">
          <h2 className="text-xl font-extrabold mb-2">Não encontrou o que procura?</h2>
          <p className="text-blue-200 text-sm mb-5">
            Nossa equipe tem acesso a imóveis que ainda não estão no site. Fale conosco.
          </p>
          <a
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold px-8 py-3.5 rounded-xl transition-colors"
          >
            Falar com consultor
            <ArrowRight size={18} />
          </a>
        </div>
      </div>
    </div>
  )
}
