"use client"

import Image from 'next/image'
import React from 'react'
import { FileText, GithubIcon, Menu, MoreHorizontal, Rocket, TwitterIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion';
import { navVariants } from '@/utils/motion';
import { Button } from '../ui/button'

const Topbar = () => {
    const router = useRouter();

    const openNewTab = (url: any) => {
        window.open(url, '_blank');
    };

    const handleOnClick = () => {
      router.push('/swap')
    }

  return (
    <motion.nav 
        className={`dark:bg-gray-900 w-full z-20 top-0 start-0 pb-8 relative`}
        variants={navVariants}
        initial="hidden"
        whileInView="show"
    >
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse" title='logo'>
                <Image
                    src="/assets/logos/logo.svg"
                    alt="logo"
                    width={165}
                    height={165}
                />
            </a>
            <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse gap-5 items-center justify-center">
              <FileText 
                onClick={() => openNewTab('')}
                className='cursor-pointer rounded-3xl w-12 h-12 bg-[#85A0FF]/70 text-white hover:bg-[#E1E1FF] hover:text-[#85A0FF]/70 p-3'
              />
              <GithubIcon 
                onClick={() => openNewTab('https://github.com/useloopso')} 
                className='cursor-pointer rounded-2xl w-12 h-12 bg-[#85A0FF]/70 text-white hover:bg-[#E1E1FF] hover:text-[#85A0FF]/70 p-3'
              />
              <TwitterIcon 
                onClick={() => openNewTab('https://twitter.com/loopso_xyz')} 
                className='cursor-pointer rounded-2xl w-12 h-12 bg-[#85A0FF]/70 text-white hover:bg-[#E1E1FF] hover:text-[#85A0FF]/70 p-3'
              />
              <div>
                <Button className='h-12 pl-5 pr-5 font-semibold text-lg gap-2' onClick={handleOnClick}>
                  Launch App
                  <Rocket />
                </Button>
              </div>
            </div>
        </div>
    </motion.nav>
  )
}

export default Topbar