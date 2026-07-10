import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { getImovelById, getImoveisSimilares } from '@/lib/imoveis-fake'

const tipoLabel: Record<string, string> = {
  apartamento: 'Apartamento',
  casa: 'Casa',
  terreno: 'Terreno',
  galpao: 'Galpão',
  'sala-comercial': 'Sala Comercial',
}

const tipoBadgeColor: Record<string, string> = {
  apartamento: 'bg-blue-100 text-blue-800',
  casa: 'bg-green-100 text-green-800',
  terreno: 'bg-yellow-100 text-yellow-800',
  galpao: 'bg-orange-100 text-orange-800',
  'sala-comercial': 'bg-purple-100 text-purple-800',
}

function formatPreco(preco: number) {
  return preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 0 })
}

export default async function ImovelPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const imovel = getImovelById(id)
  if (!imovel) redirect('/imoveis')

  const similares = getImoveisSimilares(imovel, 3)
  const waText = encodeURIComponent(
    `Olá! Tenho interesse no imóvel: ${imovel.titulo} (${imovel.codigoSimob}) - ${imovel.bairro}, ${imovel.cidade}. Poderia me dar mais informações?`
  )
  const waUrl = `https://wa.me/5547348177073?text=${waText}`
  const mapsUrl = `https://www.google.com/maps/search/${encodeURIComponent(imovel.endereco + ', ' + imovel.cidade + ', SC')}`

  return (
    <main className="bg-white min-h-screen pt-16 md:pt-[72px]">

      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-2 text-sm text-gray-500">
          <Link href="/" className="hover:text-[#1B4398]">Início</Link>
          <span>/</span>
          <Link href="/imoveis" className="hover:text-[#1B4398]">Imóveis</Link>
          <span>/</span>
          <span className="text-gray-800 font-medium truncate max-w-xs">{imovel.titulo}</span>
        </div>
      </div>

      {/* Hero */}
      <div className="relative w-full h-64 sm:h-80 md:h-96 lg:h-[480px] bg-gray-200">
        <Image
          src={imovel.fotos[0]}
          alt={imovel.titulo}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between gap-4">
          <div>
            <span className={`inline-block text-xs font-bold px-3 py-1 rounded-full mb-2 ${tipoBadgeColor[imovel.tipo] ?? 'bg-gray-100 text-gray-800'}`}>
              {tipoLabel[imovel.tipo] ?? imovel.tipo}
            </span>
            <h1 className="text-white text-xl sm:text-2xl md:text-3xl font-extrabold drop-shadow">{imovel.titulo}</h1>
            <p className="text-white/80 text-sm mt-1">{imovel.bairro}, {imovel.cidade} — SC</p>
          </div>
          <div className="hidden sm:block bg-white/95 rounded-2xl px-5 py-3 text-right shadow-lg shrink-0">
            <p className="text-xs text-gray-500 font-medium">Aluguel mensal</p>
            <p className="text-[#1B4398] text-2xl font-extrabold">
              {formatPreco(imovel.preco)}
              <span className="text-sm font-normal text-gray-500">/mês</span>
            </p>
          </div>
        </div>
      </div>

      {/* Galeria adicional */}
      {imovel.fotos.length > 1 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
            {imovel.fotos.slice(1).map((foto, i) => (
              <div key={i} className="relative aspect-square rounded-lg overflow-hidden bg-gray-100">
                <Image src={foto} alt={`Foto ${i + 2}`} fill className="object-cover" sizes="120px" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Conteúdo */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-10">

          {/* Coluna principal */}
          <div className="flex-1 min-w-0">

            {/* Preço mobile */}
            <div className="sm:hidden mb-6 bg-[#F4F6F9] rounded-2xl p-4">
              <p className="text-xs text-gray-500 font-medium">Aluguel mensal</p>
              <p className="text-[#1B4398] text-3xl font-extrabold">
                {formatPreco(imovel.preco)}
                <span className="text-base font-normal text-gray-500">/mês</span>
              </p>
            </div>

            {/* Código e endereço */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              {imovel.codigoSimob && (
                <span className="text-xs text-gray-400 font-mono bg-gray-100 px-3 py-1 rounded-full">
                  Cód: {imovel.codigoSimob}
                </span>
              )}
              <span className="text-xs text-gray-500">{imovel.endereco}</span>
              {imovel.cep && <span className="text-xs text-gray-400">CEP {imovel.cep}</span>}
            </div>

            {/* Cards de características */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
              <div className="bg-[#F4F6F9] rounded-xl p-4 text-center">
                <p className="text-2xl font-extrabold text-[#1B4398]">{imovel.area}</p>
                <p className="text-xs text-gray-500 mt-1">m² de área</p>
              </div>
              {imovel.quartos != null && (
                <div className="bg-[#F4F6F9] rounded-xl p-4 text-center">
                  <p className="text-2xl font-extrabold text-[#1B4398]">{imovel.quartos}</p>
                  <p className="text-xs text-gray-500 mt-1">{imovel.quartos === 1 ? 'Quarto' : 'Quartos'}</p>
                </div>
              )}
              {imovel.banheiros != null && (
                <div className="bg-[#F4F6F9] rounded-xl p-4 text-center">
                  <p className="text-2xl font-extrabold text-[#1B4398]">{imovel.banheiros}</p>
                  <p className="text-xs text-gray-500 mt-1">{imovel.banheiros === 1 ? 'Banheiro' : 'Banheiros'}</p>
                </div>
              )}
              {imovel.vagas != null && (
                <div className="bg-[#F4F6F9] rounded-xl p-4 text-center">
                  <p className="text-2xl font-extrabold text-[#1B4398]">{imovel.vagas}</p>
                  <p className="text-xs text-gray-500 mt-1">{imovel.vagas === 1 ? 'Vaga' : 'Vagas'}</p>
                </div>
              )}
            </div>

            {/* Descrição */}
            <div className="mb-8">
              <h2 className="text-lg font-bold text-gray-900 mb-3">Sobre o imóvel</h2>
              <p className="text-gray-600 leading-relaxed">{imovel.descricao}</p>
            </div>

            {/* Diferenciais */}
            {imovel.caracteristicas.length > 0 && (
              <div className="mb-8">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Diferenciais</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-3 gap-x-4">
                  {imovel.caracteristicas.map((c) => (
                    <div key={c} className="flex items-center gap-2 text-sm text-gray-700">
                      <span className="w-2 h-2 rounded-full bg-[#1B4398] shrink-0" />
                      {c}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Explore a Vizinhança */}
            <div className="mb-8 border border-gray-200 rounded-2xl p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-1">Explore a Vizinhança</h2>
              <p className="text-sm text-gray-500 mb-5">{imovel.bairro}, {imovel.cidade} — SC</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-5">
                {[
                  { label: 'Supermercados', emoji: '🛒' },
                  { label: 'Escolas', emoji: '🏫' },
                  { label: 'Farmácias', emoji: '💊' },
                  { label: 'Bancos', emoji: '🏦' },
                  { label: 'Transporte público', emoji: '🚌' },
                  { label: 'Restaurantes', emoji: '🍽️' },
                ].map((poi) => (
                  <div key={poi.label} className="flex items-center gap-2 bg-gray-50 rounded-xl px-3 py-2.5 text-sm text-gray-700">
                    <span>{poi.emoji}</span>
                    <span>{poi.label}</span>
                  </div>
                ))}
              </div>
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm font-semibold text-[#1B4398] hover:underline"
              >
                Ver no Google Maps →
              </a>
            </div>

          </div>

          {/* Sidebar */}
          <div className="lg:w-80 xl:w-96 shrink-0">
            <div className="lg:sticky lg:top-24 space-y-4">

              {/* Preço + contato */}
              <div className="border border-gray-200 rounded-2xl p-6 shadow-sm">
                <p className="text-xs text-gray-500 font-medium mb-1">Aluguel mensal</p>
                <p className="text-[#1B4398] text-3xl font-extrabold mb-1">
                  {formatPreco(imovel.preco)}
                  <span className="text-base font-normal text-gray-400">/mês</span>
                </p>
                <p className="text-xs text-gray-400 mb-5">+ encargos conforme contrato</p>

                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-xl transition-colors text-sm mb-3"
                >
                  Falar pelo WhatsApp
                </a>

                <a
                  href="tel:+554734817707"
                  className="flex items-center justify-center gap-2 w-full border border-[#1B4398] text-[#1B4398] hover:bg-blue-50 font-semibold py-3 rounded-xl transition-colors text-sm"
                >
                  (47) 3481-7707
                </a>
              </div>

              {/* Formulário de interesse */}
              <div className="border border-gray-200 rounded-2xl p-6 shadow-sm">
                <h3 className="font-bold text-gray-900 mb-1">Tenho interesse</h3>
                <p className="text-xs text-gray-500 mb-4">Preencha e nossa equipe entra em contato.</p>
                <form
                  action={`mailto:locacao@irineulocacao.com.br?subject=Interesse: ${imovel.titulo}`}
                  method="POST"
                  encType="text/plain"
                  className="space-y-3"
                >
                  <input
                    type="text"
                    name="nome"
                    placeholder="Seu nome"
                    required
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm placeholder-gray-400 focus:outline-none focus:border-[#1B4398] focus:ring-1 focus:ring-[#1B4398]"
                  />
                  <input
                    type="tel"
                    name="telefone"
                    placeholder="Telefone / WhatsApp"
                    required
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm placeholder-gray-400 focus:outline-none focus:border-[#1B4398] focus:ring-1 focus:ring-[#1B4398]"
                  />
                  <textarea
                    name="mensagem"
                    placeholder="Mensagem (opcional)"
                    rows={3}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm placeholder-gray-400 focus:outline-none focus:border-[#1B4398] focus:ring-1 focus:ring-[#1B4398] resize-none"
                  />
                  <label className="flex items-start gap-2 text-xs text-gray-500 cursor-pointer">
                    <input type="checkbox" required className="mt-0.5 accent-[#1B4398]" />
                    <span>
                      Li e concordo com a{' '}
                      <Link href="/privacidade" className="text-[#1B4398] underline">Política de Privacidade</Link>
                    </span>
                  </label>
                  <button
                    type="submit"
                    className="w-full bg-[#1B4398] hover:bg-[#0D2B6B] text-white font-bold py-3 rounded-xl transition-colors text-sm"
                  >
                    Enviar interesse
                  </button>
                </form>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Imóveis similares */}
      {similares.length > 0 && (
        <div className="border-t border-gray-100 bg-[#F4F6F9] py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Imóveis similares</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {similares.map((s) => (
                <Link
                  key={s.id}
                  href={`/imoveis/${s.id}`}
                  className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                >
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={s.fotos[0]}
                      alt={s.titulo}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute top-3 left-3">
                      <span className={`text-xs font-bold px-2 py-1 rounded-full ${tipoBadgeColor[s.tipo] ?? 'bg-gray-100 text-gray-800'}`}>
                        {tipoLabel[s.tipo] ?? s.tipo}
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="font-semibold text-gray-900 text-sm leading-snug mb-1 line-clamp-2">{s.titulo}</p>
                    <p className="text-gray-500 text-xs mb-3">{s.bairro}, {s.cidade}</p>
                    <p className="text-[#1B4398] font-extrabold">
                      {formatPreco(s.preco)}
                      <span className="text-xs font-normal text-gray-400">/mês</span>
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

    </main>
  )
}
