"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { footerVariants } from '@/utils/motion'
import { Button } from '../ui/button'
import { FileText, GithubIcon, Rocket, TwitterIcon } from 'lucide-react'
import { Separator } from '../ui/separator'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

const MainFooter = () => {
  const pathname = usePathname();

  const openNewTab = (url: any) => {
      window.open(url, '_blank');
  };

  return (
    <motion.footer
      variants={footerVariants}
      initial="hidden"
      whileInView="show"
      className='sm:p-16 xs:p-8 px-6 py-20 relative'
    >
      <div className='footer-gradient' />

      <div className='2xl:max-w-[1280px] w-full mx-auto flex flex-col gap-8'>
        <div className='flex items-center justify-between flex-wrap gap-5'>
          <h4 className='font-bold md:text-[64px] text-[44px] text-white'>
            Loopso
          </h4>
          <Button className='text-[16px] font-semibold gap-2'>
            Launch Loopso
            <Rocket />
          </Button>
        </div>
        <Separator />
        <div className="flex items-center justify-between flex-wrap gap-4">
          <h4 className="font-extrabold text-[24px] text-white">
            METAVERUS
          </h4>
          <p className="font-normal text-[14px] text-white opacity-50">
            Copyright © 2021 - 2022 Metaversus. All rights reserved.
          </p>

          <div className="flex gap-4">
            <FileText 
              onClick={() => openNewTab('')}
              className='cursor-pointer hover:text-[#E1E1FF] rounded-3xl w-7 h-7'
            />
            <GithubIcon 
              onClick={() => openNewTab('https://github.com/useloopso')} 
              className='cursor-pointer hover:text-[#E1E1FF] rounded-3xl w-7 h-7'
            />
            <TwitterIcon 
              onClick={() => openNewTab('https://twitter.com/loopso_xyz')} 
              className='cursor-pointer hover:text-[#E1E1FF] rounded-3xl w-7 h-7'
            />
          </div>
        </div>
      </div>
    </motion.footer>
  )
}

export default MainFooter
