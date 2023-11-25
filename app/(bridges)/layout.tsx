"use client"

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../globals.css'
import { Web3OnboardProvider } from '@web3-onboard/react'
import { onboard } from '@/components/apis/web3-onboard'
import Navbar from '@/components/shared/Navbar'
import { Toaster } from 'sonner'

const inter = Inter({ subsets: ['latin'] })

const metadata: Metadata = {
  title: 'Loopso Swap',
  description: 'Loop into the New Creative Economy',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Web3OnboardProvider web3Onboard={onboard}>
      <html lang="en">
        <body className={`${inter.className} circles overflow-y-scroll overflow-x-hidden`}>
            <Navbar />
            <Toaster 
              richColors
              position="bottom-left"
              expand={true}
              visibleToasts={5}
              closeButton={true}
            />
            {children}
        </body>
      </html>
    </Web3OnboardProvider>
  );
}
