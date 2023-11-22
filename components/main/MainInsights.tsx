"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { staggerContainer } from '@/utils/motion'
import { TitleText, TypingText } from '../sub/CustomTexts'
import IntegrationCard from '../sub/IntegrationCard'
import { insights } from '@/constants'

const MainInsights = () => {
  return (
    <section className={`sm:p-16 xs:p-8 px-6 py-12 relative z-10`}>
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.25 }}
        className={`2xl:max-w-[1280px] w-full mx-auto flex flex-col`}
      >
        <TypingText title="| Integrations" textStyles="text-center" />
        <TitleText title={<>Integrations only at Loopso</>} textStyles="text-center" />
        <div className="mt-[50px] flex flex-col gap-[30px]">
          {insights.map((item, index) => (
            <IntegrationCard key={`insight-${index}`} {...item} index={index + 1} />
          ))}
        </div>
      </motion.div>
    </section>
  )
}

export default MainInsights
