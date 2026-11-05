import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { LenisProvider } from '@/components/providers/LenisProvider'
import { CookieBanner } from '@/components/CookieBanner'
import {
  DEFAULT_DESCRIPTION,
  DEFAULT_TITLE,
  IS_INDEXABLE,
  OG_IMAGE,
  SITE_NAME,
  SITE_SHORT_NAME,
  SITE_URL,
} from '@/lib/site'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: `%s | ${SITE_SHORT_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME }],
  // Canonical/og:url são definidos por página (pageMetadata) — no layout seriam
  // herdados por todas as rotas e apontariam tudo para a Home.
  openGraph: {
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [OG_IMAGE],
    locale: 'pt_BR',
    type: 'website',
    siteName: SITE_NAME,
  },
  twitter: {
    card: 'summary_large_image',
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [OG_IMAGE.url],
  },
  robots: IS_INDEXABLE
    ? { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large' } }
    : { index: false, follow: false },
  // Token do Google Search Console (método "Tag HTML"), configurado na Netlify.
  ...(process.env.GOOGLE_SITE_VERIFICATION && {
    verification: { google: process.env.GOOGLE_SITE_VERIFICATION },
  }),
}

export const viewport: Viewport = {
  themeColor: '#1C3E77',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={inter.variable}>
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
