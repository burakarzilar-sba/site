import { DM_Sans, Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/sonner'
import { ChunkLoadErrorHandler } from '@/components/chunk-load-error-handler'
import { Providers } from './providers'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'

const dmSans = DM_Sans({ subsets: ['latin'], variable: '--font-sans' })
const jakartaSans = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-display' })
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' })

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXTAUTH_URL || 'http://localhost:3000'),
  title: {
    default: 'SBA Elektronik | Elektrik Mühendislik Hizmetleri - Antalya',
    template: '%s | SBA Elektronik',
  },
  description: 'SBA Elektronik Elektrik Mühendislik Ltd. Şti. - Antalya, Burdur, Isparta bölgesinde proje taahhüt, GES, trafo kurulumu, akıllı ev sistemleri ve elektrik mühendisliği hizmetleri.',
  keywords: ['elektrik mühendisliği', 'antalya elektrikçi', 'GES kurulumu', 'trafo kurulumu', 'akıllı ev sistemleri', 'proje taahhüt', 'CK Akdeniz', 'güç artışı', 'SBA Elektronik'],
  openGraph: {
    title: 'SBA Elektronik | Elektrik Mühendislik Hizmetleri',
    description: 'Antalya bölgesinde profesyonel elektrik mühendisliği hizmetleri',
    images: ['/og-image.png'],
    type: 'website',
    locale: 'tr_TR',
  },
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <head>
        <script src="https://apps.abacus.ai/chatllm/appllm-lib.js" />
      </head>
      <body className={`${dmSans.variable} ${jakartaSans.variable} ${jetbrainsMono.variable} font-sans`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <Providers>
            {children}
          </Providers>
          <Toaster />
          <ChunkLoadErrorHandler />
        </ThemeProvider>
      </body>
    </html>
  )
}
