import '@styles/global.css';
import type { Metadata } from 'next';
import { Rubik } from 'next/font/google';
import Header from '@components/header';
import Footer from './components/footer';
import ThemeProvider from '@components/theme-provider';
import { Analytics } from '@vercel/analytics/react';

const rubik = Rubik({ subsets: ['latin'], weight: '300' });

export const metadata: Metadata = {
  title: 'glow cloud: the weather',
  description: 'Hourly weather report with a slightly absurd take.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={rubik.className}>
        <ThemeProvider>
          <Header />
          {children}
          <Footer />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
