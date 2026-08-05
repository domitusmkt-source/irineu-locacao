import { parseBrNumber, toTitleCasePtBr } from './parse'
import type { SimobCaracteristica } from './types'

/**
 * A API Simob não tem campos fixos para quartos/banheiros/vagas/área — cada
 * imobiliária cadastra suas próprias "características" (id livre) e só a
 * descrição é padronizada. Por isso extraímos esses valores por palavra-chave
 * na descrição, em vez de por id (que varia por imobiliária).
 */

function norm(descricao: string): string {
  return descricao
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .trim()
}

function acharValor(caracteristicas: SimobCaracteristica[], predicate: (descNorm: string) => boolean): string | undefined {
  const item = caracteristicas.find((c) => predicate(norm(c.descricao || '')))
  return item?.valor
}

export interface CaracteristicasExtraidas {
  quartos?: number
  banheiros?: number
  vagas?: number
  area?: number
  diferenciais: string[]
}

export function extrairCaracteristicas(caracteristicas: SimobCaracteristica[] | undefined): CaracteristicasExtraidas {
  const lista = caracteristicas || []

  const quartosRaw = acharValor(lista, (d) => (d.includes('dormitorio') || d.includes('quarto')) && !d.includes('suite'))
  const banheirosRaw = acharValor(lista, (d) => d.includes('banheiro'))
  const areaRaw =
    acharValor(lista, (d) => d.includes('area') && d.includes('unidade')) ??
    acharValor(lista, (d) => d.includes('area') && d.includes('privativa')) ??
    acharValor(lista, (d) => d.includes('area') && d.includes('total'))

  let vagas: number | undefined
  const vagasNumRaw = acharValor(lista, (d) => d.includes('vaga'))
  if (vagasNumRaw !== undefined) {
    vagas = parseBrNumber(vagasNumRaw)
  } else {
    const garagemRaw = acharValor(lista, (d) => d.includes('garagem'))
    if (garagemRaw !== undefined) {
      vagas = /sim/i.test(garagemRaw) ? 1 : 0
    }
  }

  // "Diferenciais": características do tipo Sim/Não marcadas como "Sim".
  const diferenciais = lista
    .filter((c) => {
      const tipo = c.tipoCaracteristica ?? c.tipo
      return tipo === 1 && /sim/i.test(c.valor || '')
    })
    .map((c) => toTitleCasePtBr(c.descricao))
    .filter(Boolean)

  return {
    quartos: parseBrNumber(quartosRaw),
    banheiros: parseBrNumber(banheirosRaw),
    vagas,
    area: parseBrNumber(areaRaw),
    diferenciais: Array.from(new Set(diferenciais)),
  }
}
