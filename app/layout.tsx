import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'MMFitnes | Independência em movimento',
  description: 'Moda fitness feminina feita para mulheres que se movem por si.',
  generator: 'Next.js',
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#171717',
  userScalable: true,
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR" className="bg-background"><body className="antialiased">{children}{process.env.NODE_ENV === 'production' && <Analytics />}</body></html>
}
