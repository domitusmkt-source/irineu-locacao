// Dados institucionais e de SEO compartilhados (metadata, sitemap, robots, JSON-LD).
// Mantidos em um único lugar para que canonical, Open Graph e Schema.org usem
// sempre o mesmo domínio e as mesmas informações exibidas no site.
import type { Metadata } from 'next'

/** Domínio definitivo de produção — nunca a URL *.netlify.app nem previews. */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://irineulocacao.com.br').replace(/\/+$/, '')

export const SITE_NAME = 'Irineu Locação de Imóveis'
export const SITE_SHORT_NAME = 'Irineu Locação'

export const DEFAULT_TITLE = 'Irineu Locação | Imóveis para Alugar em Joinville e Região'
export const DEFAULT_DESCRIPTION =
  'Casas, apartamentos, salas comerciais, galpões e terrenos para alugar em Joinville, Araquari e região. Conheça os imóveis da Irineu Locação.'

export const OG_IMAGE = {
  url: '/images/og-irineu.jpg',
  width: 1200,
  height: 630,
  alt: 'Irineu Locação de Imóveis — sede em Joinville',
}

/**
 * Só ambientes de homologação ficam fora do índice: deploy previews e branch
 * deploys da Netlify (`CONTEXT`, inlined no build via next.config) ou quando
 * `SITE_NOINDEX=true` é definido explicitamente.
 */
export const IS_INDEXABLE =
  process.env.SITE_NOINDEX !== 'true' &&
  !['deploy-preview', 'branch-deploy', 'dev'].includes(process.env.NETLIFY_CONTEXT || '')

export const CONTATO = {
  telefone: '+55-47-3481-7707',
  email: 'locacao@irineulocacao.com.br',
  instagram: 'https://www.instagram.com/irineulocacao/',
  creci: 'CRECI 11975J',
}

/** Serializa JSON-LD escapando `<` para não permitir fechamento da tag <script>. */
export function jsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, '\\u003c')
}

export function absoluteUrl(path = '/'): string {
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`
}

interface PageMetadataInput {
  /** Título da página; recebe o sufixo "| Irineu Locação" pelo template do layout. */
  title: string
  description: string
  /** Caminho canônico (sem query string), ex.: "/imoveis". */
  path: string
  images?: { url: string; width?: number; height?: number; alt?: string }[]
  /** Usa o título exatamente como informado, sem o template do layout. */
  absoluteTitle?: boolean
}

/**
 * Metadata completo por página. O Next faz merge raso por chave, então
 * openGraph/twitter precisam ser redeclarados inteiros (senão perdem a imagem).
 */
export function pageMetadata({ title, description, path, images = [OG_IMAGE], absoluteTitle }: PageMetadataInput): Metadata {
  const fullTitle = absoluteTitle ? title : `${title} | ${SITE_SHORT_NAME}`
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: fullTitle,
      description,
      url: path,
      images,
      locale: 'pt_BR',
      type: 'website',
      siteName: SITE_NAME,
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: images.map((i) => i.url),
    },
  }
}
