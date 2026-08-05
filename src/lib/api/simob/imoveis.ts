import { cache } from 'react'
import type { Imovel } from '@/types/imovel'
import { FINALIDADE_LOCACAO, MAX_RESULTS_LISTAGEM } from './config'
import { simobGet, simobPost } from './http'
import { mapDetalheToImovel, mapListagemToImovel } from './mapper'
import type { SimobImovelDetalhe, SimobImovelListagem } from './types'

export { filtrarImoveis } from './filtro'

/**
 * Busca todo o portfólio de imóveis disponíveis para locação.
 * `cache()` deduplica chamadas repetidas dentro do mesmo request no servidor
 * (ex.: Home + página de detalhes pedindo "similares" na mesma renderização).
 */
export const listImoveisDisponiveis = cache(async function listImoveisDisponiveis(): Promise<Imovel[]> {
  const result = await simobPost<SimobImovelListagem[]>('/v2/integracaoApi/imovel/filtro/categoria/caracteristicas', {
    finalidade: FINALIDADE_LOCACAO,
    trazerCaracteristicas: 20,
    quantidadeImagens: 1,
    considerarPrevisaoSaida: false,
    offset: { firstResult: 0, maxResults: MAX_RESULTS_LISTAGEM },
  })
  return result.map(mapListagemToImovel)
})

export async function getImoveisDestaque(limit = 6): Promise<Imovel[]> {
  const result = await simobGet<SimobImovelListagem[]>(
    `/v2/integracaoApi/imovel/destaques?finalidade=${FINALIDADE_LOCACAO}&randomResults=true&maxResults=${limit}&trazerCaracteristicas=20&quantidadeImagens=1&considerarPrevisaoSaida=false&calcularValorAbono=false`
  )
  return result.map(mapListagemToImovel)
}

export async function getImoveisResidenciais(): Promise<Imovel[]> {
  const todos = await listImoveisDisponiveis()
  return todos.filter((i) => i.categoria === 'residencial')
}

export async function getImoveisComerciais(): Promise<Imovel[]> {
  const todos = await listImoveisDisponiveis()
  return todos.filter((i) => i.categoria === 'comercial')
}

/** Busca um imóvel pelo código retornado pela API (usado em /imoveis/[id]). */
export async function getImovelById(codigo: string): Promise<Imovel | undefined> {
  try {
    const result = await simobGet<SimobImovelDetalhe[]>(
      `/v2/integracaoApi/detalhes/imovel/${encodeURIComponent(codigo)}?considerarPrevisaoSaida=true&calcularValorAbono=true`
    )
    const item = result?.[0]
    return item ? mapDetalheToImovel(item) : undefined
  } catch {
    // Código inexistente, imóvel indisponível ou API fora do ar: trata como "não encontrado".
    return undefined
  }
}

export async function getImoveisSimilares(imovel: Imovel, limit = 3): Promise<Imovel[]> {
  const todos = await listImoveisDisponiveis()
  return todos
    .filter((i) => i.id !== imovel.id && (i.tipo === imovel.tipo || i.cidade === imovel.cidade))
    .slice(0, limit)
}
