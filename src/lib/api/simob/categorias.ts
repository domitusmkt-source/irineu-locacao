import { simobGet } from './http'
import { FINALIDADE_LOCACAO } from './config'
import type { SimobCategoria } from './types'
import type { CategoriaImovel } from '@/types/imovel'

/**
 * A API não retorna "residencial"/"comercial" diretamente na listagem —
 * apenas a categoria específica do imóvel (ex.: "APARTAMENTO", "GALPÃO").
 * Classificamos por palavra-chave a partir da descrição da categoria.
 */
export function classificarCategoria(descricaoCategoria: string): CategoriaImovel {
  const d = descricaoCategoria.toUpperCase()
  if (d.includes('COMERCIAL') || d.includes('GALP') || d.includes('LOJA') || d.includes('BOX')) {
    return 'comercial'
  }
  return 'residencial'
}

/** Busca as categorias de imóveis disponíveis para a finalidade de locação. */
export async function fetchCategorias(): Promise<SimobCategoria[]> {
  return simobGet<SimobCategoria[]>(
    `/v2/integracaoApi/imovel/categorias-imoveis/${FINALIDADE_LOCACAO}?considerarPrevisaoSaida=true`
  )
}
