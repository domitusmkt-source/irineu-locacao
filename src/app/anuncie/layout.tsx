import { pageMetadata } from '@/lib/site'

// A página /anuncie é um Client Component (formulário), então o metadata fica
// neste layout de segmento.
export const metadata = pageMetadata({
  title: 'Anuncie seu Imóvel para Locação em Joinville e Araquari',
  description:
    'Quer alugar seu imóvel em Joinville, Araquari ou região? A Irineu Locação cuida da avaliação, divulgação, contrato e gestão da locação para você.',
  path: '/anuncie',
})

export default function AnuncieLayout({ children }: { children: React.ReactNode }) {
  return children
}
