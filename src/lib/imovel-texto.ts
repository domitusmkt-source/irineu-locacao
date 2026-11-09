// Textos de SEO/apresentação derivados exclusivamente dos dados reais do imóvel
// (vindos da Simob). Módulo puro — sem I/O nem variáveis de ambiente — para poder
// ser usado tanto em Server Components quanto em client components.
import type { Imovel } from '@/types/imovel'
import { toTitleCasePtBr } from '@/lib/api/simob/parse'

function normalizar(texto: string): string {
  return texto
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim()
}

/**
 * O `titulo` montado no mapper segue "Categoria [N Quartos] - Complemento", em que
 * o complemento é o nome do edifício/empreendimento (quando cadastrado na Simob)
 * ou o bairro.
 */
function partesDoTitulo(imovel: Imovel): { tipo: string; complemento: string } {
  const [tipo, ...resto] = imovel.titulo.split(' - ')
  return { tipo: tipo.trim(), complemento: resto.join(' - ').trim() }
}

/** Nome do edifício/empreendimento, quando o título traz um (e não apenas o bairro). */
export function nomeEmpreendimento(imovel: Imovel): string | undefined {
  const { complemento } = partesDoTitulo(imovel)
  if (!complemento || normalizar(complemento) === normalizar(imovel.bairro)) return undefined
  return toTitleCasePtBr(complemento)
}

/**
 * Tipo do imóvel como aparece no título, completado com o número de quartos
 * quando a Simob informa e o título ainda não o traz (ex.: títulos com edifício).
 */
export function descricaoTipo(imovel: Imovel): string {
  let { tipo } = partesDoTitulo(imovel)
  // Categoria genérica "Comercial" ficaria ambígua isolada no H1/título.
  if (normalizar(tipo) === 'comercial') tipo = 'Imóvel Comercial'
  if (imovel.quartos && !/\bquartos?\b/i.test(tipo)) {
    tipo += ` ${imovel.quartos} ${imovel.quartos === 1 ? 'Quarto' : 'Quartos'}`
  }
  return tipo
}

/** H1 da página do imóvel: "Casa Residencial 2 Quartos para alugar em Araquari – Porto Grande". */
export function tituloImovel(imovel: Imovel): string {
  return `${descricaoTipo(imovel)} para alugar em ${imovel.cidade} – ${imovel.bairro}`
}

/** Área no padrão brasileiro ("69,44"); `undefined` quando a Simob não informa a área (0). */
export function formatarArea(area: number): string | undefined {
  if (!area || area <= 0) return undefined
  return area.toLocaleString('pt-BR', { maximumFractionDigits: 2 })
}

/**
 * Chave para agrupar unidades do mesmo empreendimento (ou com a mesma descrição
 * cadastrada), usada para variar os "imóveis similares".
 */
export function chaveAgrupamento(imovel: Imovel): string {
  const emp = nomeEmpreendimento(imovel)
  if (emp) return `emp:${normalizar(emp)}|${normalizar(imovel.cidade)}`
  const desc = normalizar(imovel.descricao || '').slice(0, 160)
  return desc ? `desc:${desc}` : `id:${imovel.id}`
}
