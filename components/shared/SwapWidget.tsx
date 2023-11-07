"use client"

import React from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MoveDown, Settings } from 'lucide-react'
import { Label } from '../ui/label'

const SwapWidget = () => {

  return (
    <div className='widgetwrapper'>
      <div className='widgetcontent blue-pink-gradient'>
        <div className='flex p-4'>
          <p>
            <span className='font-semibold'>Swap&nbsp;</span> 
            <span className='text-xs'>(Powered by Loopso)</span>
          </p>
          <div className='ml-auto'>
              <Settings />
          </div>
        </div>
        <div>
          <div className='swapcontent'>
            <Input 
              placeholder="0.00" 
              type='number' 
            />
          </div>
          <div className="h-2"></div>
          <div className='items-center justify-center flex'>
            <MoveDown className='bg-[#85A0FF]/60 rounded-lg p-2 h-8 w-8'/>
          </div>
          <div className="h-2"></div>
          <div className='swapcontent'>
            <Label className='p-2 text-2xl'>0.00</Label>
          </div>
        </div>
        <div className="h-4"></div>
        <div className='items-center justify-center flex'>
          <Button type="submit" className='w-[100%] text-md'>Swap</Button>
        </div>
      </div>
    </div>
  )
}

export default SwapWidget