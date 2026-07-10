import { HeroSection } from '@/components/home/HeroSection'
import { TrustBar } from '@/components/home/TrustBar'
import { DestaquesSection } from '@/components/home/DestaquesSection'
import { TiposImovelSection } from '@/components/home/TiposImovelSection'
import { ResidencialSection } from '@/components/home/ResidencialSection'
import { ComercialSection } from '@/components/home/ComercialSection'
import { AnuncieSection } from '@/components/home/AnuncieSection'
import { InstitucionalSection } from '@/components/home/InstitucionalSection'
import { CTAFinalSection } from '@/components/home/CTAFinalSection'
import { getImoveisDestaque } from '@/lib/imoveis-fake'

export default function HomePage() {
  const destaque = getImoveisDestaque()

  return (
    <>
      <HeroSection />
      <TrustBar />
      <TiposImovelSection />
      <DestaquesSection imoveis={destaque} />
      <ResidencialSection />
      <ComercialSection />
      <AnuncieSection />
      <InstitucionalSection />
      <CTAFinalSection />
    </>
  )
}
