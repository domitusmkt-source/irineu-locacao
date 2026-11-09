import type { MetadataRoute } from 'next'
import { listImoveisDisponiveis } from '@/lib/api/simob'
import { SITE_URL } from '@/lib/site'

// ISR: regenera junto com o cache das chamadas Simob (revalidate de 5 min em
// http.ts), então imóveis novos entram e alugados saem sem novo deploy.

/** "2026-11-03T19:08:31" (horário de Brasília, sem fuso) → Date. */
function parseDataSimob(valor: string): Date | undefined {
  const data = new Date(/[zZ]|[+-]\d{2}:?\d{2}$/.test(valor) ? valor : `${valor}-03:00`)
  return Number.isNaN(data.getTime()) ? undefined : data
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const paginas: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, changeFrequency: 'daily', priority: 1 },
    { url: `${SITE_URL}/imoveis`, changeFrequency: 'daily', priority: 0.9 },
    { url: `${SITE_URL}/locacao-residencial`, changeFrequency: 'daily', priority: 0.8 },
    { url: `${SITE_URL}/locacao-comercial`, changeFrequency: 'daily', priority: 0.8 },
    { url: `${SITE_URL}/anuncie`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${SITE_URL}/privacidade`, changeFrequency: 'yearly', priority: 0.2 },
    { url: `${SITE_URL}/cookies`, changeFrequency: 'yearly', priority: 0.2 },
  ]

  // Sem catch de propósito: se a Simob falhar na revalidação, o erro faz o Next
  // continuar servindo o último sitemap válido (completo) em vez de publicar
  // uma versão só com as páginas institucionais.
  const imoveis = await listImoveisDisponiveis()

  return [
    ...paginas,
    ...imoveis.map((imovel) => ({
      url: `${SITE_URL}/imoveis/${encodeURIComponent(imovel.id)}`,
      lastModified: parseDataSimob(imovel.updatedAt),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    })),
  ]
}
