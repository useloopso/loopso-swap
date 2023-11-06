import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Topbar from '@/components/shared/Topbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Loopso Swap',
  description: 'Loop into the New Creative Economy',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <html lang="en">
        <body className={inter.className}>
          <Topbar />
          <main className="main-container">
            {children}
          </main>
        </body>
      </html>
  );
}
