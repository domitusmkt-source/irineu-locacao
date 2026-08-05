import type { CategoriaImovel, FiltrosImovel, Imovel } from '@/types/imovel'

// Módulo puro (sem I/O nem variáveis de ambiente) para poder ser importado
// com segurança tanto no servidor quanto em client components.
export function filtrarImoveis(imoveis: Imovel[], filtros: FiltrosImovel): Imovel[] {
  return imoveis.filter((i) => {
    if (filtros.cidade && i.cidade !== filtros.cidade) return false
    if (filtros.bairro && !i.bairro.toLowerCase().includes(filtros.bairro.toLowerCase())) return false
    // startsWith: um link "tipo=casa" deve casar com "casa-residencial" e "casa-comercial".
    if (filtros.tipo && !i.tipo.startsWith(filtros.tipo)) return false
    if (filtros.categoria && i.categoria !== (filtros.categoria as CategoriaImovel)) return false
    if (filtros.precoMin && i.preco < filtros.precoMin) return false
    if (filtros.precoMax && i.preco > filtros.precoMax) return false
    if (filtros.quartos && (i.quartos || 0) < filtros.quartos) return false
    if (filtros.vagas && (i.vagas || 0) < filtros.vagas) return false
    if (filtros.busca) {
      const q = filtros.busca.toLowerCase()
      if (
        !i.titulo.toLowerCase().includes(q) &&
        !i.cidade.toLowerCase().includes(q) &&
        !i.bairro.toLowerCase().includes(q) &&
        !i.descricao.toLowerCase().includes(q)
      )
        return false
    }
    return true
  })
}
