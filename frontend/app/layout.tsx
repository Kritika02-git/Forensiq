import type { Metadata } from 'next'
import { Bebas_Neue, IBM_Plex_Mono, Manrope } from 'next/font/google'
import './globals.css'

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas'
})

const ibmPlexMono = IBM_Plex_Mono({
  weight: ['400', '500'],
  subsets: ['latin'],
  variable: '--font-mono'
})

const manrope = Manrope({
  weight: ['400', '500', '600', '700', '800'],
  subsets: ['latin'],
  variable: '--font-manrope'
})

export const metadata: Metadata = {
  title: 'Forensiq — AI Debate Arena',
  description: 'Debate any topic against an AI that adapts to your skill level'
}

export default function RootLayout({
                                     children,
                                   }: {
  children: React.ReactNode
}) {
  return (
      <html lang="en" className={`${bebasNeue.variable} ${ibmPlexMono.variable} ${manrope.variable}`}>
      <body>{children}</body>
      </html>
  )
}