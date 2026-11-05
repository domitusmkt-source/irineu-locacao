import Link from 'next/link'

export const metadata = {
  title: 'Página não encontrada',
  robots: { index: false, follow: true },
}

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#F4F6F9]">
      <div className="bg-[#1C3E77] pt-24 md:pt-28 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h1 className="text-3xl font-extrabold text-white mb-2">Página não encontrada</h1>
          <p className="text-blue-200">Este endereço não existe ou o imóvel não está mais disponível para locação.</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 flex flex-wrap gap-3">
        <Link
          href="/imoveis"
          className="bg-[#1C3E77] hover:bg-[#0D2853] text-white font-semibold px-6 py-3 rounded-xl transition-colors text-sm"
        >
          Ver imóveis disponíveis
        </Link>
        <Link
          href="/"
          className="border border-[#1C3E77] text-[#1C3E77] hover:bg-blue-50 font-semibold px-6 py-3 rounded-xl transition-colors text-sm"
        >
          Voltar ao início
        </Link>
      </div>
    </div>
  )
}
