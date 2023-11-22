"use client"

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { staggerContainer } from '@/utils/motion'
import { TitleText } from '../sub/CustomTexts'
import ReasonCard from '../sub/ReasonCard'
import { whyLoopso } from '@/constants'

const WhyLoopso = () => {
  const [active, setActive] = useState('reason-1')

  return (
    <section className='sm:p-16 xs:p-8 px-6 py-12' id="explore">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.25}}
        className='2xl:max-w-[1280px] w-full mx-auto flex flex-col'
      >
        <TitleText
          title={<>Why Loopso</>}
          textStyles="text-center"
        />
        <div className='mt-[50px] flex lg:flex-row flex-col min-h-[70vh] gap-5'>
          {whyLoopso.map((reasons, index) => (
            <ReasonCard 
              key={reasons.id}
              {...reasons}
              index={index}
              active={active}
              handleClick={setActive}
            />
          ))}
        </div>
      </motion.div>
    </section>
  )
}

export default WhyLoopso
