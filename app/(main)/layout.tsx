"use client"

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../globals.css'
import { Web3OnboardProvider } from '@web3-onboard/react'
import { onboard } from '@/components/apis/web3-onboard'
import Navbar from '@/components/shared/Navbar'

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
            {children}
        </body>
      </html>
    </Web3OnboardProvider>
  );
}
