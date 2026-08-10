// Formatos brutos retornados pela API Simob/FlexPro (v2/integracaoApi).
// Nomes de campos exatamente como documentados/observados na API real.

export interface SimobCaracteristica {
  id: number
  descricao: string
  valor: string
  idImovelCaracteristica?: number
  /** Endpoints de listagem usam `tipoCaracteristica`, o de detalhes usa `tipo`. */
  tipoCaracteristica?: number
  tipo?: number
  idGrupo?: number
  descricaoGrupo?: string
  /** Presente apenas no endpoint de detalhes: mesmo agrupamento de idGrupo/descricaoGrupo,
   *  porém aninhado. Grupo id 2 ("Valores") reúne os encargos monetários (IPTU, condomínio etc). */
  grupo?: { id: number; descricao: string }
  publicar?: boolean
  ordem?: number
}

export interface SimobImagemListagem {
  baseNomeImagem: string
  extensao: string
  descricao?: string
  ordem?: number
}

export interface SimobImagemDetalhe {
  id: number
  descricao?: string
  baseNomeImagem: string
  extensao: string
  posicao?: number
}

/** Item retornado por /imovel/filtro/categoria/caracteristicas, /destaques e /exclusivos */
export interface SimobImovelListagem {
  id: string
  codigo: string
  bairro: string
  idBairro?: string
  idImobiliaria?: string
  uf?: string
  cidade: string
  complemento?: string | null
  numero?: string
  endereco: string
  descricaoCategoria: string
  exclusividade?: string
  updatedAt: string
  imagem?: string
  idCategoria: string
  valor: string
  cep?: string
  edificio?: string | null
  idEmpreendimento?: number | null
  nomeEmpreendimento?: string | null
  descricaoImovel?: string
  finalidade: number | string
  baseUrlImagem: string
  baseNomeImagem: string
  extensao: string
  linkGoogleMaps?: string
  caracteristicas?: SimobCaracteristica[]
  imagens?: SimobImagemListagem[]
}

/** Item retornado por /detalhes/imovel/{codigo} */
export interface SimobImovelDetalhe {
  id: number
  codigo: string
  nome?: string
  descricao?: string
  imagens?: SimobImagemDetalhe[]
  videos?: unknown[]
  imagem?: string
  categoria: { id: number; descricao: string }
  configVenda: { disponibilizarPortal?: boolean; inativo?: boolean; valor: string } | null
  configLocacao: { disponibilizarPortal?: boolean; inativo?: boolean; valor: string } | null
  caracteristicas?: SimobCaracteristica[]
  bairro: string
  endereco: string
  numero?: string
  complemento?: string | null
  uf?: string
  cidade: string
  edificio?: string | null
  cep?: string
  linkGoogleMaps?: string
  baseUrlImagem: string
}

export interface SimobCategoria {
  id: number
  descricao: string
  count?: string
  idsImoveis?: string
}

export interface SimobBairro {
  id: number
  descricao: string
  codigo?: string
  count?: number
  cidade: string
  idsCategorias?: string
  idsImoveis?: string
}

export interface SimobApiEnvelope<T> {
  success: boolean
  result: T
  message?: string
  requestId?: string
}
