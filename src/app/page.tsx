import { HeroSection } from '@/components/home/HeroSection'
import { TrustBar } from '@/components/home/TrustBar'
import { DestaquesSection } from '@/components/home/DestaquesSection'
import { TiposImovelSection } from '@/components/home/TiposImovelSection'
import { ResidencialSection } from '@/components/home/ResidencialSection'
import { ComercialSection } from '@/components/home/ComercialSection'
import { AnuncieSection } from '@/components/home/AnuncieSection'
import { InstitucionalSection } from '@/components/home/InstitucionalSection'
import { CTAFinalSection } from '@/components/home/CTAFinalSection'
import { getImoveisDestaque, getImoveisResidenciais } from '@/lib/api/simob'

export default async function HomePage() {
  // Se a API Simob estiver indisponível, a seção de destaques simplesmente
  // renderiza sem cards em vez de quebrar a Home inteira.
  const destaque = await getImoveisDestaque().catch(() => [])
  const residenciais = await getImoveisResidenciais().catch(() => [])

  return (
    <>
      <HeroSection />
      <TrustBar />
      <TiposImovelSection />
      <DestaquesSection imoveis={destaque} />
      <ResidencialSection totalResidenciais={residenciais.length} />
      <ComercialSection />
      <AnuncieSection />
      <InstitucionalSection />
      <CTAFinalSection />
    </>
  )
}
