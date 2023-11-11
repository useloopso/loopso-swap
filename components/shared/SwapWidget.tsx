"use client"

import React, { useState } from 'react'
import { ArrowRightLeft, BadgeInfo, InfinityIcon, MoveDown } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from '@/components/ui/label'
import { networkList, tokenList } from '@/constants/index.js'
import SelectTokenModal from '../modal/SelectTokenModal'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip'
import SelectSourceChainModal from '../modal/SelectSourceChainModal'
import SelectDestinationChainModal from '../modal/SelectDestinationChainModal'

const SwapWidget = () => {
  const [tokenOne, setTokenOne] = useState(tokenList[0]);
  const [tokenTwo, setTokenTwo] = useState(tokenList[1]);
  const [networkOne, setNetworkOne] = useState(networkList[0]);
  const [networkTwo, setNetworkTwo] = useState(networkList[1]);

  return (
    <div className='widget-wrapper'>
      <div className='widget-content blue-pink-gradient'>
        <div className='flex items-center justify-center'>
          <p className='flex flex-col items-center justify-center'>
            <span className='font-semibold'>Swap Tokens&nbsp;</span> 
            <span className='text-xs'>(Powered by Loopso)</span>
          </p>
        </div>
        <div className='flex items-center mt-5 gap-3 pl-2'>
          <InfinityIcon />
          <p className='font-semibold text-sm pr-1'>From</p>
          <SelectSourceChainModal network={networkOne} />
        </div>
        <div className="h-4"></div>
          <div className='swap-content'>
            <p className='font-semibold text-xs pl-1 pt-3'>Send:</p>
            <div className='flex items-center pt-3'>
                <Input 
                  placeholder="0.00" 
                  type='number' 
                />
                <SelectTokenModal 
                  token={tokenOne}
                />
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
            <SelectDestinationChainModal network={networkTwo} />
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
                <SelectTokenModal 
                  token={tokenTwo}
                />
            </div>
          </div>
        <div className="h-4"></div>
        <div className='items-center justify-center flex'>
          <Button type="submit" className='w-[100%] text-md flex items-center justify-center gap-3'>
            <ArrowRightLeft className='h-4 w-4'/>
            Swap
          </Button>
        </div>
      </div>
    </div>
  )
}

export default SwapWidget