// Configuração da integração Simob/FlexPro (https://flexpro.com.br/docsapi)
// Credenciais lidas apenas de variáveis de ambiente — nunca hardcoded.
// Este módulo só deve ser importado por código server-side (Server Components,
// Route Handlers), pois expõe o token de autenticação.

export const SIMOB_BASE_URL = (process.env.SIMOB_BASE_URL || '').replace(/\/+$/, '')
export const SIMOB_TOKEN = process.env.SIMOB_TOKEN || ''
export const SIMOB_JWT_SECRET = process.env.SIMOB_JWT_SECRET || ''

export function isSimobConfigured(): boolean {
  return Boolean(SIMOB_BASE_URL && SIMOB_TOKEN)
}

// 1 = Locação, 2 = Vendas, 3/4 = captação (não usados aqui).
// A Irineu Locação de Imóveis trabalha apenas com locação.
export const FINALIDADE_LOCACAO = 1

// Teto alto o suficiente para trazer todo o portfólio disponível em uma única
// chamada (portfólio atual tem pouco mais de 100 imóveis). Evita implementar
// paginação remota por enquanto — a paginação da UI continua sendo local.
export const MAX_RESULTS_LISTAGEM = 500
