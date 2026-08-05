import { NextResponse } from 'next/server'
import { listImoveisDisponiveis } from '@/lib/api/simob'

// Proxy server-side para a Simob API: mantém o token de autenticação fora do
// bundle do cliente. A página /imoveis (client component) consome esta rota
// e aplica busca/ordenação/paginação localmente sobre os dados reais.
export async function GET() {
  try {
    const imoveis = await listImoveisDisponiveis()
    return NextResponse.json({ imoveis })
  } catch (error) {
    console.error('[api/imoveis] falha ao consultar a Simob API:', error)
    return NextResponse.json(
      { imoveis: [], error: 'Não foi possível carregar os imóveis no momento.' },
      { status: 502 }
    )
  }
}
