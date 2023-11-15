import SwapWidget from '@/components/shared/SwapWidget'
import React from 'react'

type Props = {}

const page = (props: Props) => {
  return (
    <div className="main-container bg-hero-pattern bg-cover bg-no-repeat bg-center min-h-screen min-w-full">
        <SwapWidget />
    </div>
  )
}

export default page