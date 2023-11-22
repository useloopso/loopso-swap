import MainFooter from '@/components/main/MainFooter'
import MainGetStarted from '@/components/main/MainGetStarted'
import MainInsights from '@/components/main/MainInsights'
import React from 'react'
import Hero from '@/components/main/Hero'
import Topbar from '@/components/main/Topbar'
import WhyLoopso from '@/components/main/WhyLoopso'

const page = () => {
  return (
    <div className="overflow-hidden circles">
      <Topbar />
      <Hero />
      <div className="relative">
        <div className="gradient-03 z-0" />
        <WhyLoopso />
      </div>
      <div className="relative">
        <MainGetStarted />
        <div className="gradient-04 z-0" />
      </div>
      <div className="relative">
        <MainInsights />
        <div className="gradient-04 z-0" />
      </div>
      <MainFooter />
  </div>
  )
}

export default page
