import { HeroSection } from '@/components/home/HeroSection'
import { TrustBar } from '@/components/home/TrustBar'
import { DestaquesSection } from '@/components/home/DestaquesSection'
import { TiposImovelSection } from '@/components/home/TiposImovelSection'
import { ResidencialSection } from '@/components/home/ResidencialSection'
import { ComercialSection } from '@/components/home/ComercialSection'
import { AnuncieSection } from '@/components/home/AnuncieSection'
import { InstitucionalSection } from '@/components/home/InstitucionalSection'
import { CTAFinalSection } from '@/components/home/CTAFinalSection'
import { SloganSection } from '@/components/home/SloganSection'
import { getImoveisDestaque, getImoveisResidenciais } from '@/lib/api/simob'
import { CONTATO, DEFAULT_DESCRIPTION, DEFAULT_TITLE, SITE_NAME, SITE_URL, absoluteUrl, jsonLd, pageMetadata } from '@/lib/site'

export const metadata = pageMetadata({
  title: DEFAULT_TITLE,
  description: DEFAULT_DESCRIPTION,
  path: '/',
  absoluteTitle: true,
})

// Somente dados já exibidos no site (rodapé/política de privacidade).
const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'RealEstateAgent',
      '@id': `${SITE_URL}/#organizacao`,
      name: SITE_NAME,
      alternateName: 'Irineu Locação',
      url: absoluteUrl('/'),
      logo: absoluteUrl('/images/logo-irineu.png'),
      image: absoluteUrl('/images/og-irineu.jpg'),
      description: DEFAULT_DESCRIPTION,
      telephone: CONTATO.telefone,
      email: CONTATO.email,
      sameAs: [CONTATO.instagram],
      identifier: CONTATO.creci,
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'R. Nove de Março, 317 - Ed. Le Pont - Centro',
        addressLocality: 'Joinville',
        addressRegion: 'SC',
        addressCountry: 'BR',
      },
      areaServed: [
        { '@type': 'City', name: 'Joinville' },
        { '@type': 'City', name: 'Araquari' },
      ],
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          opens: '08:00',
          closes: '18:00',
        },
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: 'Saturday',
          opens: '08:30',
          closes: '12:00',
        },
      ],
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: absoluteUrl('/'),
      name: SITE_NAME,
      inLanguage: 'pt-BR',
      publisher: { '@id': `${SITE_URL}/#organizacao` },
    },
  ],
}

export default async function HomePage() {
  // Destaques são secundários (e aleatórios): se só essa chamada falhar, a seção
  // renderiza sem cards. A listagem principal fica sem catch de propósito: se a
  // Simob falhar na revalidação, o Next mantém a última Home válida em cache.
  const destaque = await getImoveisDestaque().catch(() => [])
  const residenciais = await getImoveisResidenciais()

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(structuredData) }} />
      <HeroSection />
      <TrustBar />
      <TiposImovelSection />
      <DestaquesSection imoveis={destaque} />
      <ResidencialSection totalResidenciais={residenciais.length} />
      <ComercialSection />
      <SloganSection />
      <AnuncieSection />
      <InstitucionalSection />
      <CTAFinalSection />
    </>
  )
}
