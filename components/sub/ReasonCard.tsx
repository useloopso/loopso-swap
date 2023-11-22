"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { fadeIn } from '@/utils/motion'
import Image from 'next/image';

interface ExploreCardProps {
    id: string;
    imgUrl: string;
    title: string;
    content:string;
    index: number;
    active: string;
    handleClick: (id: string) => void;
}

const ReasonCard = ({
    id,
    imgUrl,
    title,
    content,
    index,
    active,
    handleClick
}: ExploreCardProps) => {
  return (
    <motion.div
        variants={fadeIn('right', 'spring', index * 0.5, 0.75)}
        className={`relative ${active === id ? 'lg:flex-[3.5] flex-[10]' : 'lg:flex-[0.5] flex-[2]'} 
        flex items-center justify-center min-w-[170px] h-[500px] transition-[flex] duration-[0.7s] ease-out-flex cursor-pointer`}
        onClick={() => handleClick(id)}
    >
        <Image 
            src={imgUrl}
            alt={title}
            className='absolute w-full h-full object-cover rounded-3xl'
            width={1000}
            height={1000}
        />
        {active !== id ? (
            <h3 className="font-semibold sm:text-[26px] text-[18px] text-white absolute z-0 lg:bottom-24 lg:rotate-[-90deg] lg:origin-[0,0]">
                {title}
            </h3>
        ) : (
            <div className="absolute bottom-0 p-8 flex justify-start w-full flex-col bg-[rgba(0,0,0,0.5)] rounded-b-[24px]">
            <div
              className={`flex justify-center items-center w-[60px] h-[60px] rounded-[24px] glassmorphism mb-[16px]`}
            >
              <Image
                src="/main/headset.svg"
                alt="headset"
                className="w-1/2 h-1/2 object-contain"
                width={1000}
                height={1000}
              />
            </div>
            <h2 className="font-semibold sm:text-[32px] text-[24px] text-white">
              {title}
            </h2>
            <p className="font-normal text-[16px] leading-[20.16px] text-white mt-[24px]">
              {content}
            </p>
          </div>
        )}
    </motion.div>
  )
}

export default ReasonCard
