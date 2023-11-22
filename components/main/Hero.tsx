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
            className={`font-bold lg:text-[48px] md:text-[36px] sm:text-[30px] text-[26px]  pt-20  text-[#E1E1FF] drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,1.2)]`}
          >
            Cross-chain Bi-directional Bridge Protocol
          </motion.h1>
          <motion.div
            variants={textVariant(1.2)}
            className='flex flex-col justify-center items-center gap-16'
          >
            <h1 className={`text-center items-center font-semibold lg:text-[30px] md:text-[20px] sm:text-[18px] text-[16px] pt-10 text-[#E1E1FF] drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]`}>
              Token-agnostic Bridge <br /> Seamlessly Connecting you to
              <span className='text-[#FE005B] uppercase'>
                &nbsp;Lukso
              </span>
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
