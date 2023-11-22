"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { staggerContainer, fadeIn, rollVariants } from '@/utils/motion'
import { TitleText, TypingText } from '../sub/CustomTexts'
import  StartSteps  from '../sub/StartSteps'
import { howItWorks } from '@/constants'
import Image from 'next/image'

const HowItWorks = () => {
  return (
    <section className='sm:p-16 xs:p-8 px-6 py-12 relative z-10'>
      <motion.div
        variants={staggerContainer}
        initial='hidden'
        whileInView='show'
        viewport={{ once: false, amount: 0.25 }}
        className='mx-auto flex lg:flex-row flex-col gap-8 2xl:max-w-[1280px] w-full'
      >
        <motion.div
          variants={rollVariants('left')}
          className='flex-1 flex justify-center items-center'
        >
          <Image 
            src='/assets/main/loopso-cool.svg'
            alt='get-started'
            className='w-[90%] h-[90%] object-contain'
            width={1000}
            height={1000}
          />
        </motion.div>
        <motion.div
          variants={fadeIn('left', 'tween', 0.2, 1)}
          className='flex-[0.75] flex justify-center flex-col'
        >
          <TypingText title='| How it Works' textStyles='' />
          <TitleText title={<>Start Bridging with <span className='text-[#E1E1FF] uppercase drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.3)]'>Loopso</span>🔥</>} textStyles='' />
          <div className='mt-[31px] flex flex-col max-w-[500px] gap-[24px]'>
            {howItWorks.map((feature, index) => (
              <StartSteps 
                key={feature}
                number={index + 1}
                text={feature}
              />
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default HowItWorks
