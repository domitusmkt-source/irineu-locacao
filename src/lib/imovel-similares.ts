// Seleção de "imóveis similares" — função pura sobre a listagem já carregada da
// Simob (nenhuma chamada extra à API).
import type { Imovel } from '@/types/imovel'
import { chaveAgrupamento } from '@/lib/imovel-texto'

/** FNV-1a 32 bits: desempate determinístico e diferente para cada página. */
function hash(texto: string): number {
  let h = 0x811c9dc5
  for (let i = 0; i < texto.length; i++) {
    h ^= texto.charCodeAt(i)
    h = Math.imul(h, 0x01000193)
  }
  return h >>> 0
}

function pontuar(base: Imovel, candidato: Imovel): number {
  let pontos = 0
  if (candidato.categoria !== base.categoria) pontos -= 10
  if (candidato.tipo === base.tipo) pontos += 4
  if (candidato.cidade === base.cidade) pontos += 3
  if (candidato.bairro === base.bairro && candidato.cidade === base.cidade) pontos += 2
  if (base.preco > 0 && candidato.preco > 0) {
    const razao = Math.max(base.preco, candidato.preco) / Math.min(base.preco, candidato.preco)
    if (razao <= 1.3) pontos += 2
    else if (razao <= 1.8) pontos += 1
  }
  if (base.quartos != null && candidato.quartos === base.quartos) pontos += 1
  return pontos
}

/**
 * Imóveis mais parecidos (mesma categoria, tipo, cidade/bairro e faixa de preço),
 * no máximo um por empreendimento e nenhum do mesmo empreendimento do imóvel
 * atual. Empates são resolvidos por um hash do par de códigos — estável entre
 * renderizações, mas variando de página para página, o que distribui os links
 * internos por todo o portfólio em vez de concentrá-los nos primeiros da lista.
 */
export function selecionarSimilares(base: Imovel, todos: Imovel[], limite = 3): Imovel[] {
  const ordenados = todos
    .filter((i) => i.id !== base.id)
    .map((i) => ({ imovel: i, pontos: pontuar(base, i), desempate: hash(`${base.id}:${i.id}`) }))
    .sort((a, b) => b.pontos - a.pontos || a.desempate - b.desempate)
    .map((x) => x.imovel)

  const escolhidos: Imovel[] = []
  const grupos = new Set([chaveAgrupamento(base)])
  for (const imovel of ordenados) {
    if (escolhidos.length >= limite) break
    const grupo = chaveAgrupamento(imovel)
    if (grupos.has(grupo)) continue
    grupos.add(grupo)
    escolhidos.push(imovel)
  }
  // Portfólio pequeno demais para variar: completa com os próximos mais parecidos.
  for (const imovel of ordenados) {
    if (escolhidos.length >= limite) break
    if (!escolhidos.includes(imovel)) escolhidos.push(imovel)
  }
  return escolhidos
}
