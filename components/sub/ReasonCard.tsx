"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { fadeIn } from '@/utils/motion'
import Image from 'next/image';

interface ExploreCardProps {
    id: string;
    iconUrl: string;
    imgUrl: string;
    title: string;
    content:string;
    index: number;
    active: string;
    handleClick: (id: string) => void;
}

const ReasonCard = ({
    id,
    iconUrl,
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
            <h3 className="font-semibold absolute z-0  lg:rotate-[-90deg] lg:bottom-40 lg:origin-[0,0] sm:text-[26px] text-[18px] text-black w-72">
                {title}
            </h3>
        ) : (
            <div className="absolute bottom-0 p-5 lg:p-8 md:p-4 sm:p-3 flex justify-start w-full flex-col bg-[#FDDCE8]/70 rounded-b-[24px]">
            <div
              className={`flex justify-center items-center w-[60px] h-[60px] rounded-[24px] glassmorphism mb-[16px]`}
            >
              <Image
                src={iconUrl}
                alt="reason-icon"
                className="w-3/4 h-3/4 object-contain"
                width={1000}
                height={1000}
              />
            </div>
            <h2 className="font-semibold sm:text-[32px] text-[24px] text-black">
              {title}
            </h2>
            <p className="font-normal text-[16px] leading-[20.16px] text-black mt-[24px]">
              {content}
            </p>
          </div>
        )}
    </motion.div>
  )
}

export default ReasonCard
