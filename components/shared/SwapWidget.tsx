"use client"

import React, { useState } from 'react'
import { BadgeInfo, InfinityIcon, MoveDown, Repeat2 } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import SelectTokenModal from '../modal/SelectTokenModal'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip'
import SelectSourceChainModal from '../modal/SelectSourceChainModal'
import SelectDestinationChainModal from '../modal/SelectDestinationChainModal'
import { motion } from 'framer-motion';
import { fadeIn, staggerContainer } from '@/utils/motion';
import  styles  from '@/styles'

const SwapWidget = () => {

  return (
    <motion.div 
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.25 }}
      className='widget-wrapper'
    >
      <motion.div 
        variants={fadeIn('up', 'tween', 0.3, 1)} 
        className='widget-content blue-pink-gradient'
      >
        <div className='flex items-center justify-center'>
          <p className='flex flex-col items-center justify-center'>
            <span className='font-semibold'>Swap Tokens&nbsp;</span> 
            <span className='text-xs'>(Powered by Loopso)</span>
          </p>
        </div>
        <div className='flex items-center mt-5 gap-3 pl-2'>
          <InfinityIcon />
          <p className='font-semibold text-sm pr-1'>From</p>
          <SelectSourceChainModal />
        </div>
        <div className="h-4"></div>
          <div className='swap-content'>
            <p className='font-semibold text-xs pl-1 pt-3'>Send:</p>
            <div className='flex items-center pt-3'>
                <Input 
                  placeholder="0.00" 
                  type='number' 
                  className='placeholder:hover:text-[#85A0FF]/70'
                />
                <SelectTokenModal />
              </div>
          </div>
          <div className="h-2"></div>
          <div className='items-center justify-center flex'>
            <MoveDown className='bg-[#E1E1FF]/50 rounded-3xl p-2 h-9 w-9' />
          </div>
          <div className="h-2"></div>
          <div className='flex items-center gap-6 pl-2'>
            <InfinityIcon />
            <p className='font-semibold text-sm'>To</p>
            <SelectDestinationChainModal />
          </div>
          <div className="h-4"></div>
          <div className='swap-content'>
            <div className='flex items-center pl-1 pt-3 gap-1'>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger><BadgeInfo className='w-4 h-4' /></TooltipTrigger>
                  <TooltipContent>
                    <p>This amount is estimated based on the current bridge rate and fees.</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <p className='font-semibold text-xs'>Receive (estimated):</p>
            </div>
            <div className='flex items-center pt-3'>
                <Input 
                  placeholder="0.00" 
                  type='number' 
                  disabled={true}
                />
                <SelectTokenModal />
            </div>
          </div>
        <div className="h-4"></div>
        <div className='items-center justify-center flex'>
          <Button type="submit" className='w-[100%] text-md flex items-center justify-center gap-3'>
            <Repeat2 className='h-5 w-5'/>
            Swap
          </Button>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default SwapWidget