import type { Metadata } from 'next'
import { Rubik } from 'next/font/google'
import Header from '@components/header'
import Footer from './components/footer'
import '@styles/global.css'
import ThemeProvider from '@components/theme-provider'

const rubik = Rubik({ subsets: ['latin'], weight: '300' })

export const metadata: Metadata = {
  title: 'glow cloud: the weather',
  description: 'Hourly weather report with a slightly absurd take.',
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={rubik.className}>
        <ThemeProvider>
          <Header />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
