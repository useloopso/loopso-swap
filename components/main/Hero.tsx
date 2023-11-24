"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { slideIn, staggerContainer, textVariant } from '@/utils/motion'
import Image from 'next/image'

const Hero = () => {
  return (
    <section>
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.25 }}
        className={`mx-auto flex flex-col w-[100%]`}
      >
        <div className='flex justify-center items-center flex-col relative'>
        <motion.div
          variants={slideIn('left', 'tween', 0.2, 1)}
          className='relative w-full md:-mt-[20px] -mt-[12px]'
        >
          <Image
            src="/assets/main/loopso-chain-blank.png"
            alt="hero_cover"
            className="w-full lg:h-[300px] md:h-[275px] sm:h-[250px] h-[200px] object-contain z-10 relative"
            width={1500}
            height={1500}
          />
        </motion.div>
          <motion.h1 
            variants={textVariant(1.1)}
            className={`text-center items-center justify-center font-bold lg:text-[52px] md:text-[44px] sm:text-[38px] text-[34px] text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.5)]`}
          >
            Seamless Multichain Connectivity
          </motion.h1>
          <motion.div
            variants={textVariant(1.2)}
            className='flex flex-col justify-center items-center gap-16'
          >
            <h1 className={`text-center items-center font-semibold lg:text-[30px] md:text-[22px] sm:text-[18px] text-[16px] pt-10 text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.3)]`}>
              Bridge Tokens within 30 seconds only at&nbsp;
              <span className='text-[#E1E1FF]'>LOOPSO 🤯</span>
            </h1>
          </motion.div>
        </div>

        <motion.div
          variants={slideIn('right', 'tween', 0.2, 1)}
          className='relative w-full md:-mt-[20px] -mt-[12px]'
        >
          <Image
            src="/assets/main/loopso-chain-blank.png"
            alt="hero_cover"
            className="w-full lg:h-[300px] md:h-[275px] sm:h-[250px] h-[200px] object-contain z-10 relative mt-6"
            width={1500}
            height={1500}
          />
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Hero
