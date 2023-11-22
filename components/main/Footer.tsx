"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { footerVariants } from '@/utils/motion'
import { Button } from '../ui/button'
import { FileText, GithubIcon, Rocket, TwitterIcon } from 'lucide-react'
import { Separator } from '../ui/separator'
import { usePathname, useRouter } from 'next/navigation'

const Footer = () => {
    const router = useRouter();

    const handleOnClick = () => {
        router.push('/swap')
      }

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
          <h4 className='font-bold md:text-[52px] text-[40px] text-white'>
            Loops into the New Creative Economy
          </h4>
          <Button className='h-11 pl-5 pr-5 font-semibold text-base gap-2' onClick={handleOnClick}>
                Launch App
                <Rocket /> 
            </Button>
        </div>
        <Separator />
        <div className="flex items-center justify-between flex-wrap gap-4">
          <h4 className="font-extrabold text-[24px] text-white uppercase">
            Loopso
          </h4>
          <div className="flex gap-4">
          <FileText 
            onClick={() => openNewTab('')}
            className='cursor-pointer rounded-2xl w-11 h-11 bg-[#85A0FF]/70 text-white hover:bg-[#E1E1FF] hover:text-[#85A0FF]/70 p-3'
        />
        <GithubIcon 
            onClick={() => openNewTab('https://github.com/useloopso')} 
            className='cursor-pointer rounded-2xl w-11 h-11 bg-[#85A0FF]/70 text-white hover:bg-[#E1E1FF] hover:text-[#85A0FF]/70 p-3'
        />
        <TwitterIcon 
            onClick={() => openNewTab('https://twitter.com/loopso_xyz')} 
            className='cursor-pointer rounded-2xl w-11 h-11 bg-[#85A0FF]/70 text-white hover:bg-[#E1E1FF] hover:text-[#85A0FF]/70 p-3'
        />
          </div>
        </div>
      </div>
    </motion.footer>
  )
}

export default Footer
