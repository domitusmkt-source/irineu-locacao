import { parseBrNumber } from './parse'
import type { SimobCaracteristica } from './types'

const GRUPO_VALORES_ID = 2
const SUFIXO_MOEDA = /\s*-\s*R\$\s*$/i

export interface EncargoImovel {
  label: string
  valor: number
}

/**
 * Extrai os encargos recorrentes (IPTU, condomínio, TLU/TCL etc.) do grupo
 * "Valores" retornado pela API Simob. Só entram itens publicáveis com valor
 * numérico positivo — isso já descarta linhas "Sob Consulta" (valor "Sim")
 * e encargos zerados ou vazios, sem precisar listar nomes fixos.
 */
export function extrairEncargos(caracteristicas: SimobCaracteristica[] | undefined): EncargoImovel[] {
  const lista = caracteristicas || []
  return lista
    .filter((c) => {
      const grupoId = c.grupo?.id ?? c.idGrupo
      return grupoId === GRUPO_VALORES_ID && (c.publicar ?? true)
    })
    .map((c) => ({
      label: (c.descricao || '').replace(SUFIXO_MOEDA, '').trim(),
      valor: parseBrNumber(c.valor) ?? 0,
      ordem: c.ordem ?? 0,
    }))
    .filter((e) => e.valor > 0 && e.label.length > 0)
    .sort((a, b) => a.ordem - b.ordem)
    .map(({ label, valor }) => ({ label, valor }))
}
