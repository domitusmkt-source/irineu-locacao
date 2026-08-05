import { SIMOB_BASE_URL } from './config'

type ImagemTamanho = '70x52' | '116x88' | '480x360' | '800x600' | '1366x768' | 'original'

const SUFIXOS: Record<ImagemTamanho, string> = {
  '70x52': '_miniatura',
  '116x88': '_miniatura_116x88',
  '480x360': '_miniatura_480x360',
  '800x600': '',
  '1366x768': '_1366x768',
  original: '_original',
}

/** Monta a URL pública de uma imagem de imóvel a partir dos campos retornados pela API. */
export function buildImovelImageUrl(
  baseUrlImagem: string,
  baseNomeImagem: string,
  extensao: string,
  tamanho: ImagemTamanho = '800x600'
): string {
  const caminho = baseUrlImagem.replace(/^\/+/, '').replace(/\/+$/, '')
  return `${SIMOB_BASE_URL}/${caminho}/${baseNomeImagem}${SUFIXOS[tamanho]}.${extensao}`
}
