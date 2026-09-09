import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { LenisProvider } from '@/components/providers/LenisProvider'
import { CookieBanner } from '@/components/CookieBanner'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Irineu Locação de Imóveis | Joinville e Norte de SC',
    template: '%s | Irineu Locação',
  },
  description:
    'Encontre apartamentos, casas, salas comerciais e galpões para alugar em Joinville, Araquari, São Francisco do Sul e região Norte de Santa Catarina. Irineu Locação de Imóveis - CRECI 11975J.',
  keywords: [
    'imóveis para alugar',
    'locação joinville',
    'apartamentos joinville',
    'casas para alugar sc',
    'irineu locação',
    'aluguel joinville',
    'imóveis norte sc',
    'galpão para alugar joinville',
  ],
  authors: [{ name: 'Irineu Locação de Imóveis' }],
  openGraph: {
    title: 'Irineu Locação de Imóveis | Joinville e Norte de SC',
    description: 'Os melhores imóveis para alugar em Santa Catarina. CRECI 11975J.',
    images: [{ url: '/images/predioirienu.png', width: 1200, height: 630, alt: 'Irineu Locação de Imóveis' }],
    locale: 'pt_BR',
    type: 'website',
    siteName: 'Irineu Locação de Imóveis',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Irineu Locação de Imóveis',
    description: 'Os melhores imóveis para alugar em Santa Catarina.',
    images: ['/images/predioirienu.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={inter.variable}>
      <head>
        <meta name="theme-color" content="#1C3E77" />
      </head>
      <body className="antialiased">
        <LenisProvider>
          <Header />
          <main id="main-content">{children}</main>
          <Footer />
          <CookieBanner />
        </LenisProvider>
      </body>
    </html>
  )
}
