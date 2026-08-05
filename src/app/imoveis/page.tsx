'use client'
import { useState, useMemo, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import { SlidersHorizontal, Search, X, ChevronDown } from 'lucide-react'
import { CardImovel } from '@/components/imoveis/CardImovel'
import { filtrarImoveis } from '@/lib/api/simob/filtro'
import { FiltrosImovel, Imovel, TipoImovel, CategoriaImovel } from '@/types/imovel'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Input } from '@/components/ui/input'

const ITEMS_PER_PAGE = 12

function labelFromSlug(slug: string): string {
  return slug.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
}

function ImoveisContent() {
  const searchParams = useSearchParams()

  const [imoveis, setImoveis] = useState<Imovel[]>([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState<string | null>(null)

  const [filtros, setFiltros] = useState<FiltrosImovel>({
    tipo: (searchParams.get('tipo') as TipoImovel) || undefined,
    cidade: searchParams.get('cidade') || undefined,
    categoria: (searchParams.get('categoria') as CategoriaImovel) || undefined,
  })
  const [busca, setBusca] = useState('')
  const [ordenacao, setOrdenacao] = useState('recente')
  const [pagina, setPagina] = useState(1)
  const [sheetOpen, setSheetOpen] = useState(false)

  useEffect(() => {
    const preco = searchParams.get('preco')
    if (preco) {
      const [min, max] = preco.split('-').map(Number)
      setFiltros((f) => ({ ...f, precoMin: min || undefined, precoMax: max || undefined }))
    }
  }, [searchParams])

  useEffect(() => {
    let cancelado = false
    setCarregando(true)
    fetch('/api/imoveis')
      .then((res) => res.json())
      .then((data: { imoveis: Imovel[]; error?: string }) => {
        if (cancelado) return
        setImoveis(data.imoveis || [])
        setErro(data.error || null)
      })
      .catch(() => {
        if (cancelado) return
        setImoveis([])
        setErro('Não foi possível carregar os imóveis no momento.')
      })
      .finally(() => {
        if (!cancelado) setCarregando(false)
      })
    return () => {
      cancelado = true
    }
  }, [])

  const tiposDisponiveis = useMemo(() => {
    const mapa = new Map<string, string>()
    imoveis.forEach((i) => mapa.set(i.tipo, labelFromSlug(i.tipo)))
    return Array.from(mapa.entries()).sort((a, b) => a[1].localeCompare(b[1]))
  }, [imoveis])

  const cidadesDisponiveis = useMemo(() => {
    return Array.from(new Set(imoveis.map((i) => i.cidade))).sort((a, b) => a.localeCompare(b))
  }, [imoveis])

  const resultado = useMemo(() => {
    let lista = filtrarImoveis(imoveis, { ...filtros, busca: busca || undefined })
    if (ordenacao === 'menor-preco') lista = [...lista].sort((a, b) => a.preco - b.preco)
    else if (ordenacao === 'maior-preco') lista = [...lista].sort((a, b) => b.preco - a.preco)
    else lista = [...lista].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    return lista
  }, [imoveis, filtros, busca, ordenacao])

  const totalPages = Math.ceil(resultado.length / ITEMS_PER_PAGE)
  const paginado = resultado.slice((pagina - 1) * ITEMS_PER_PAGE, pagina * ITEMS_PER_PAGE)

  function limparFiltros() {
    setFiltros({})
    setBusca('')
    setPagina(1)
  }

  const selectClass = 'w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-[#1E293B] focus:outline-none focus:ring-2 focus:ring-[#1B4398] bg-white appearance-none'

  const FiltrosSidebar = () => (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-[#1E293B]">Filtros</h3>
        <button onClick={limparFiltros} className="text-sm text-[#CC2929] hover:underline flex items-center gap-1">
          <X size={14} /> Limpar
        </button>
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-500 uppercase mb-2">Busca</label>
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <Input
            value={busca}
            onChange={(e) => { setBusca(e.target.value); setPagina(1) }}
            placeholder="Cidade, bairro, tipo..."
            className="pl-9"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-500 uppercase mb-2">Categoria</label>
        <select
          value={filtros.categoria || ''}
          onChange={(e) => { setFiltros((f) => ({ ...f, categoria: (e.target.value as CategoriaImovel) || undefined })); setPagina(1) }}
          className={selectClass}
        >
          <option value="">Todas</option>
          <option value="residencial">Residencial</option>
          <option value="comercial">Comercial</option>
        </select>
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-500 uppercase mb-2">Tipo de imóvel</label>
        <select
          value={filtros.tipo || ''}
          onChange={(e) => { setFiltros((f) => ({ ...f, tipo: (e.target.value as TipoImovel) || undefined })); setPagina(1) }}
          className={selectClass}
        >
          <option value="">Todos</option>
          {tiposDisponiveis.map(([slug, label]) => (
            <option key={slug} value={slug}>{label}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-500 uppercase mb-2">Cidade</label>
        <select
          value={filtros.cidade || ''}
          onChange={(e) => { setFiltros((f) => ({ ...f, cidade: e.target.value || undefined })); setPagina(1) }}
          className={selectClass}
        >
          <option value="">Todas</option>
          {cidadesDisponiveis.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-500 uppercase mb-2">Preço máximo (R$/mês)</label>
        <select
          value={filtros.precoMax ? `${filtros.precoMax}` : ''}
          onChange={(e) => { setFiltros((f) => ({ ...f, precoMax: e.target.value ? Number(e.target.value) : undefined })); setPagina(1) }}
          className={selectClass}
        >
          <option value="">Qualquer</option>
          <option value="1000">Até R$ 1.000</option>
          <option value="2000">Até R$ 2.000</option>
          <option value="5000">Até R$ 5.000</option>
          <option value="10000">Até R$ 10.000</option>
        </select>
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-500 uppercase mb-2">Quartos (mínimo)</label>
        <select
          value={filtros.quartos || ''}
          onChange={(e) => { setFiltros((f) => ({ ...f, quartos: e.target.value ? Number(e.target.value) : undefined })); setPagina(1) }}
          className={selectClass}
        >
          <option value="">Qualquer</option>
          <option value="1">1+</option>
          <option value="2">2+</option>
          <option value="3">3+</option>
          <option value="4">4+</option>
        </select>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-[#F4F6F9]">
      {/* Page header */}
      <div className="bg-[#1B4398] pt-24 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h1 className="text-3xl font-extrabold text-white mb-2">Imóveis para Alugar</h1>
          <p className="text-blue-200">Encontre o imóvel ideal em Santa Catarina</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar desktop */}
          <aside className="hidden lg:block w-72 shrink-0">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-24">
              <FiltrosSidebar />
            </div>
          </aside>

          {/* Main */}
          <div className="flex-1 min-w-0">
            {/* Toolbar */}
            <div className="flex items-center justify-between gap-4 mb-6 flex-wrap">
              <p className="text-[#1E293B] font-semibold">
                <span className="text-[#1B4398] font-bold">{resultado.length}</span> imóveis encontrados
              </p>
              <div className="flex items-center gap-3">
                {/* Mobile filter button */}
                <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
                  <SheetTrigger className="lg:hidden flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-semibold text-[#1E293B] shadow-sm hover:border-[#1B4398] transition-colors">
                    <SlidersHorizontal size={16} />
                    Filtros
                  </SheetTrigger>
                  <SheetContent side="left" className="w-80 p-6">
                    <FiltrosSidebar />
                  </SheetContent>
                </Sheet>

                {/* Ordenação */}
                <div className="relative">
                  <select
                    value={ordenacao}
                    onChange={(e) => { setOrdenacao(e.target.value); setPagina(1) }}
                    className="bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-medium text-[#1E293B] shadow-sm appearance-none pr-8 focus:outline-none focus:ring-2 focus:ring-[#1B4398]"
                  >
                    <option value="recente">Mais recente</option>
                    <option value="menor-preco">Menor preço</option>
                    <option value="maior-preco">Maior preço</option>
                  </select>
                  <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Grid */}
            {carregando ? (
              <div className="bg-white rounded-2xl p-12 text-center">
                <div className="w-8 h-8 border-4 border-[#1B4398] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p className="text-gray-400 text-sm">Carregando imóveis...</p>
              </div>
            ) : erro ? (
              <div className="bg-white rounded-2xl p-12 text-center">
                <p className="text-gray-500 text-lg mb-2">Não foi possível carregar os imóveis agora</p>
                <p className="text-gray-400 text-sm">Tente novamente em instantes ou fale com a gente pelo WhatsApp.</p>
              </div>
            ) : paginado.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {paginado.map((imovel) => (
                  <CardImovel key={imovel.id} imovel={imovel} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-2xl p-12 text-center">
                <p className="text-gray-400 text-lg mb-2">Nenhum imóvel encontrado</p>
                <p className="text-gray-400 text-sm mb-6">Tente ajustar os filtros ou{' '}
                  <button onClick={limparFiltros} className="text-[#1B4398] underline">limpe os filtros</button>
                </p>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-8">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <button
                    key={p}
                    onClick={() => { setPagina(p); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
                    className={`w-10 h-10 rounded-xl font-semibold text-sm transition-colors ${
                      p === pagina ? 'bg-[#1B4398] text-white' : 'bg-white text-[#1E293B] border border-gray-200 hover:border-[#1B4398]'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ImoveisPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F4F6F9] pt-24 flex items-center justify-center"><div className="w-8 h-8 border-4 border-[#1B4398] border-t-transparent rounded-full animate-spin" /></div>}>
      <ImoveisContent />
    </Suspense>
  )
}
