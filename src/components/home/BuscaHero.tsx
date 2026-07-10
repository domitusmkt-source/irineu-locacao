'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search } from 'lucide-react'

export function BuscaHero() {
  const router = useRouter()
  const [tipo, setTipo] = useState('')
  const [cidade, setCidade] = useState('')
  const [preco, setPreco] = useState('')

  function handleBuscar() {
    const params = new URLSearchParams()
    if (tipo) params.set('tipo', tipo)
    if (cidade) params.set('cidade', cidade)
    if (preco) params.set('preco', preco)
    router.push(`/imoveis?${params.toString()}`)
  }

  const selectClass =
    'flex-1 min-w-0 bg-white border-0 text-[#1E293B] text-sm font-medium px-4 py-3.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1B4398] appearance-none cursor-pointer'

  return (
    <div className="bg-white/95 backdrop-blur rounded-2xl shadow-2xl p-4 flex flex-col md:flex-row gap-3 max-w-3xl">
      <select value={tipo} onChange={(e) => setTipo(e.target.value)} className={selectClass} aria-label="Tipo de imóvel">
        <option value="">Tipo de imóvel</option>
        <option value="apartamento">Apartamento</option>
        <option value="casa">Casa</option>
        <option value="terreno">Terreno</option>
        <option value="galpao">Galpão</option>
        <option value="sala-comercial">Sala Comercial</option>
      </select>

      <select value={cidade} onChange={(e) => setCidade(e.target.value)} className={selectClass} aria-label="Cidade">
        <option value="">Cidade</option>
        <option value="Joinville">Joinville</option>
        <option value="Araquari">Araquari</option>
        <option value="São Francisco do Sul">São Francisco do Sul</option>
        <option value="Jaraguá do Sul">Jaraguá do Sul</option>
        <option value="Garuva">Garuva</option>
        <option value="Itapoá">Itapoá</option>
        <option value="Balneário Barra do Sul">Balneário Barra do Sul</option>
      </select>

      <select value={preco} onChange={(e) => setPreco(e.target.value)} className={selectClass} aria-label="Faixa de preço">
        <option value="">Faixa de preço</option>
        <option value="0-1000">Até R$ 1.000</option>
        <option value="0-2000">Até R$ 2.000</option>
        <option value="0-5000">Até R$ 5.000</option>
        <option value="0-10000">Até R$ 10.000</option>
        <option value="10000-999999">Acima de R$ 10.000</option>
      </select>

      <button
        onClick={handleBuscar}
        className="flex items-center justify-center gap-2 bg-[#1B4398] hover:bg-[#0D2B6B] text-white font-bold px-7 py-3.5 rounded-xl transition-colors shrink-0 text-sm"
      >
        <Search size={18} />
        Buscar Imóvel
      </button>
    </div>
  )
}
