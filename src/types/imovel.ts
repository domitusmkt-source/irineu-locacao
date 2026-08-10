// Slug derivado da categoria real retornada pela API Simob (ex.: "apartamento",
// "casa-residencial", "sala-comercial"). Não é mais uma union fixa porque a
// lista de categorias é definida pela imobiliária no Simob, não pelo site.
export type TipoImovel = string
export type CategoriaImovel = 'residencial' | 'comercial'
export type StatusImovel = 'disponivel' | 'alugado' | 'reservado'

export interface Imovel {
  id: string
  titulo: string
  tipo: TipoImovel
  categoria: CategoriaImovel
  status: StatusImovel
  preco: number
  cidade: string
  bairro: string
  regiao: string
  endereco: string
  cep?: string
  area: number
  quartos?: number
  banheiros?: number
  vagas?: number
  descricao: string
  caracteristicas: string[]
  /** Encargos mensais recorrentes (IPTU, condomínio, TLU/TCL etc.) retornados pelo Simob para o imóvel. */
  encargos: { label: string; valor: number }[]
  fotos: string[]
  destaque: boolean
  latitude?: number
  longitude?: number
  codigoSimob?: string
  createdAt: string
  updatedAt: string
}

export interface FiltrosImovel {
  regiao?: string
  cidade?: string
  bairro?: string
  tipo?: TipoImovel
  categoria?: CategoriaImovel
  precoMin?: number
  precoMax?: number
  quartos?: number
  vagas?: number
  busca?: string
}
