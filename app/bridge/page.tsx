import BridgeWidget from '@/components/shared/BridgeWidget'
import React from 'react'

type Props = {}

const page = (props: Props) => {
  return (
    <div className="main-container bg-hero-pattern bg-cover bg-no-repeat bg-center min-h-screen min-w-full">
      <BridgeWidget />
    </div>
  )
}

export default page