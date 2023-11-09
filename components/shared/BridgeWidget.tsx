"use client"

import React, { useState } from 'react'
import { ArrowRightLeft, MoveDown, Settings2 } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from '@/components/ui/label'
import { networkList, tokenList } from '@/constants/index.js'
import SelectTokenModal from '../modal/SelectTokenModal'
import SelectNetworkModal from '../modal/SelectNetworkModal'

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from '../ui/separator'


const BridgeWidget = () => {
  const [tokenOne, setTokenOne] = useState(tokenList[0]);
  const [tokenTwo, setTokenTwo] = useState(tokenList[1]);
  const [networkOne, setNetworkOne] = useState(networkList[0]);
  const [networkTwo, setNetworkTwo] = useState(networkList[1]);

  return (
    <div className='widget-wrapper'>
      <div className='widget-content blue-pink-gradient'>
        <div className='flex p-4'>
          <p>
            <span className='font-semibold'>Bridge NFTs&nbsp;</span> 
            <span className='text-xs'>(Powered by Loopso)</span>
          </p>
        </div>
        <div className="h-3"></div>
        <div>
          <div className='swap-content'>
            <div className='flex'>
              <SelectTokenModal 
                token={tokenOne}
              />
              <div className='ml-auto'>
                <SelectNetworkModal 
                  network={networkOne}
                />
              </div>
            </div>
          <div className="h-5"></div>
            <Input 
              placeholder="0.00" 
              type='number' 
            />
          </div>
          <div className="h-2"></div>
          <div className='items-center justify-center flex'>
            <MoveDown 
              className='bg-[#85A0FF]/70 rounded-xl p-2 h-9 w-9 border-2 border-slate' />
          </div>
          <div className="h-2"></div>
          <div className='swap-content'>
            <div className='flex'>
              <SelectTokenModal 
                token={tokenTwo}
              />
              <div className='ml-auto'>
                <SelectNetworkModal 
                  network={networkTwo}
                />
              </div>
            </div>
            <div className="h-5"></div>
            <Label className='p-1 text-2xl'>0.00</Label>
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

export default BridgeWidget