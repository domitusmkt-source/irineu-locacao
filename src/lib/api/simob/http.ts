import { SIMOB_BASE_URL, SIMOB_TOKEN, isSimobConfigured } from './config'
import type { SimobApiEnvelope } from './types'

export class SimobApiError extends Error {
  constructor(message: string, public status?: number) {
    super(message)
    this.name = 'SimobApiError'
  }
}

interface RequestOptions {
  /** Revalida o cache do Next a cada N segundos (fetch server-side). */
  revalidateSeconds?: number
}

async function parseEnvelope<T>(res: Response): Promise<T> {
  if (!res.ok) {
    throw new SimobApiError(`Simob API respondeu ${res.status} ${res.statusText}`, res.status)
  }
  let json: SimobApiEnvelope<T>
  try {
    json = await res.json()
  } catch {
    throw new SimobApiError('Resposta da Simob API não é um JSON válido')
  }
  if (!json.success) {
    throw new SimobApiError(json.message || 'Simob API retornou success:false')
  }
  return json.result
}

/** GET autenticado em um endpoint da integracaoApi. `path` já inclui a query string. */
export async function simobGet<T>(path: string, options: RequestOptions = {}): Promise<T> {
  if (!isSimobConfigured()) {
    throw new SimobApiError('Integração Simob não configurada (SIMOB_BASE_URL/SIMOB_TOKEN ausentes)')
  }
  const res = await fetch(`${SIMOB_BASE_URL}${path}`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${SIMOB_TOKEN}` },
    next: { revalidate: options.revalidateSeconds ?? 300 },
  })
  return parseEnvelope<T>(res)
}

/**
 * POST autenticado enviando `data` como multipart/form-data com uma única
 * chave "data" contendo o JSON serializado — é assim que a Simob API espera
 * os parâmetros de filtro (não é JSON body puro).
 */
export async function simobPost<T>(path: string, data: Record<string, unknown>, options: RequestOptions = {}): Promise<T> {
  if (!isSimobConfigured()) {
    throw new SimobApiError('Integração Simob não configurada (SIMOB_BASE_URL/SIMOB_TOKEN ausentes)')
  }
  const form = new FormData()
  form.set('data', JSON.stringify(data))
  const res = await fetch(`${SIMOB_BASE_URL}${path}`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${SIMOB_TOKEN}` },
    body: form,
    next: { revalidate: options.revalidateSeconds ?? 300 },
  })
  return parseEnvelope<T>(res)
}
