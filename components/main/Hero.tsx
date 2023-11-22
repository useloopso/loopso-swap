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
          <motion.h1 
            variants={textVariant(1.1)}
            className={`text-center items-center justify-center font-bold lg:text-[52px] md:text-[44px] sm:text-[38px] text-[34px] pt-12 text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.5)]`}
          >
            Cross-chain Bi-directional <br/> Bridge Protocol
          </motion.h1>
          <motion.div
            variants={textVariant(1.2)}
            className='flex flex-col justify-center items-center gap-16'
          >
            <h1 className={`text-center items-center font-semibold lg:text-[30px] md:text-[22px] sm:text-[18px] text-[16px] pt-10 text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.3)]`}>
              🚀 Effortlessly Bridge to 
              <span className='text-[#FE005B] uppercase'>
                &nbsp;Lukso&nbsp;
              </span>
              only at 
              <span className='text-[#E1E1FF] uppercase'>
                &nbsp;Loopso&nbsp;
              </span>
              🚀
            </h1>
          </motion.div>
        </div>

        <motion.div
          variants={slideIn('right', 'tween', 0.2, 1)}
          className='relative w-full md:-mt-[20px] -mt-[12px]'
        >
          <Image
            src="/assets/loopso-chain.png"
            alt="hero_cover"
            className="w-full lg:h-[400px] md:h-[300px] sm:h-[250px] h-[200px] object-cover rounded-tl-[140px] z-10 relative"
            width={1500}
            height={1500}
          />
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Hero
