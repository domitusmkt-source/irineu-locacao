import type { MetadataRoute } from 'next'
import { IS_INDEXABLE, SITE_URL } from '@/lib/site'

export default function robots(): MetadataRoute.Robots {
  // Homologação (deploy previews/branch deploys da Netlify) fica fora do índice.
  if (!IS_INDEXABLE) {
    return { rules: { userAgent: '*', disallow: '/' } }
  }

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // Proxy interno da Simob: JSON sem valor de busca.
      disallow: ['/api/'],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  }
}
