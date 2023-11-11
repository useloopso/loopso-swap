"use client"

import React, { useState } from 'react'
import { BadgeInfo, ImageDown, InfinityIcon, MoveDown } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { networkList, tokenList } from '@/constants/index.js'
import SelectDestinationChainModal from '../modal/SelectDestinationChainModal'
import SelectBridgeSourceChainModal from '../modal/SelectBridgeSourceChainModal'
import EvmNftList from '../lists/EvmNftList'

const BridgeWidget = () => {
  const [tokenOne, setTokenOne] = useState(tokenList[0]);
  const [tokenTwo, setTokenTwo] = useState(tokenList[1]);
  const [networkOne, setNetworkOne] = useState(networkList[0]);
  const [networkTwo, setNetworkTwo] = useState(networkList[1]);

  return (
    <div className='widget-wrapper'>
      <div className='widget-content blue-pink-gradient'>
        <div className='flex items-center justify-center'>
          <p className='flex flex-col items-center justify-center'>
            <span className='font-semibold'>Bridge NFTs&nbsp;</span> 
            <span className='text-xs'>(Powered by Loopso)</span>
          </p>
        </div>
        <div className='flex items-center mt-5 gap-3 pl-2'>
          <InfinityIcon />
          <p className='font-semibold text-sm pr-1'>From</p>
          <SelectBridgeSourceChainModal network={networkOne} />
        </div>
        <div className="h-4"></div>
          <div className='swap-content'>
            
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
            
          </div>
        <div className="h-4"></div>
        <div className='items-center justify-center flex'>
          <Button type="submit" className='w-[100%] text-md flex items-center justify-center gap-3'>
            <ImageDown className='h-5 w-5'/>
            Bridge
          </Button>
        </div>
      </div>
      <EvmNftList />
    </div>
  )
}

export default BridgeWidget