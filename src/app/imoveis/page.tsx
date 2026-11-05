import { listImoveisDisponiveis } from '@/lib/api/simob'
import { pageMetadata } from '@/lib/site'
import { ImoveisBusca } from './ImoveisBusca'

export const metadata = pageMetadata({
  title: 'Imóveis para Alugar em Joinville e Araquari',
  description:
    'Veja todos os imóveis disponíveis para locação: casas, apartamentos, kitnets, salas comerciais, galpões e terrenos em Joinville, Araquari e região.',
  path: '/imoveis',
})

export default async function ImoveisPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  // Ler os filtros da URL torna a rota dinâmica: assim a listagem (e os links
  // para cada imóvel) já sai no HTML inicial, em vez de só um spinner.
  await searchParams
  const imoveis = await listImoveisDisponiveis().catch((error) => {
    console.error('[imoveis] falha ao consultar a Simob API no SSR:', error)
    return null
  })

  return <ImoveisBusca imoveisIniciais={imoveis} />
}
