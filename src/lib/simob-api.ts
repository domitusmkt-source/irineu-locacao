const SIMOB_API_URL = process.env.SIMOB_API_URL || ''
const SIMOB_TOKEN = process.env.SIMOB_TOKEN || ''
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const SIMOB_JWT_SECRET = process.env.SIMOB_JWT_SECRET || ''

export interface SimobImovel {
  codigo: string
  tipo: string
  finalidade: string
  valor: number
  cidade: string
  bairro: string
  endereco: string
  area: number
  dormitorios?: number
  banheiros?: number
  vagas?: number
  descricao: string
  fotos: string[]
  latitude?: number
  longitude?: number
  status: string
}

async function fetchSimob(endpoint: string, options?: RequestInit) {
  if (!SIMOB_API_URL || !SIMOB_TOKEN) {
    throw new Error('SIMOB_API_URL e SIMOB_TOKEN não configurados')
  }
  const res = await fetch(`${SIMOB_API_URL}${endpoint}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${SIMOB_TOKEN}`,
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    next: { revalidate: 300 },
  })
  if (!res.ok) throw new Error(`Simob API error: ${res.status}`)
  return res.json()
}

export async function getImoveisSimob(): Promise<SimobImovel[]> {
  return fetchSimob('/imoveis?finalidade=locacao&status=disponivel')
}

export async function getImovelSimob(codigo: string): Promise<SimobImovel> {
  return fetchSimob(`/imoveis/${codigo}`)
}

export function isSimobConfigured(): boolean {
  return Boolean(SIMOB_API_URL && SIMOB_TOKEN)
}
