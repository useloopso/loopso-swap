"use client"

import React from 'react'
import { ChevronDown, MoveDown, Settings } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from '@/components/ui/label'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"


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
        <div className="h-3"></div>
        <div>
          <div className='swapcontent'>
          <Dialog>
            <DialogTrigger className='p-3 bg-[#78EE9D]/30 rounded-2xl text-black font-light flex'>
              Open
              <ChevronDown className='ml-auto'/>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Are you sure absolutely sure?</DialogTitle>
                <DialogDescription>
                  This action cannot be undone. This will permanently delete your account
                  and remove your data from our servers.
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
          <div className="h-5"></div>
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
            <Label className='p-1 text-2xl'>0.00</Label>
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