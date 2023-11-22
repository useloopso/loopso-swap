import React from 'react'

import { motion } from 'framer-motion'
import { fadeIn } from '@/utils/motion'
import Image from 'next/image'
import { ArrowUpRightSquare } from 'lucide-react'

interface IntegrationCardProps {
    imgUrl: string
    linkUrl: string
    title: string
    subtitle: string
    index: number
}

const IntegrationCard = ({ imgUrl, linkUrl, title, subtitle, index }: IntegrationCardProps) => {

    const openNewTab = (url: any) => {
        window.open(url, '_blank');
    };

  return (
    <motion.div
        variants={fadeIn('up', 'spring', index * 0.5, 1)}
        className='flex md:flex-row flex-col gap-4 cursor-pointer rounded-3xl p-4 hover:bg-[#E1E1FF]/70'
        onClick={() => openNewTab(linkUrl)}
    >
        <Image 
            src={imgUrl}
            alt="integration"
            className="md:w-[270px] w-full h-[250px] rounded-[32px] object-cover"
            width={1000}
            height={1000}
        />
        <div className='w-full flex justify-between items-center'>
            <div className='flex-1 md:ml-[62px] flex flex-col max-w-[700px]'>
                <h4 className="font-bold lg:text-[42px] text-[26px] text-white uppercase">
                    {title}
                </h4>
                <p className="mt-[16px] font-semibold lg:text-[20px] text-[14px] text-white">
                    {subtitle}
                </p>
            </div>
            <div className="lg:flex hidden items-center justify-center w-[100px] h-[100px] rounded-full bg-transparent" >
                <ArrowUpRightSquare className='text-white w-16 h-16'/>
            </div>
        </div>
    </motion.div>
  )
}

export default IntegrationCard
