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
import Image from 'next/image'


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
            <div className='flex'>
              <Dialog>
                <DialogTrigger className='p-3 bg-[#85A0FF]/60 rounded-2xl text-black text-sm font-semibold flex w-36 items-center justify-center'>
                  <div className='flex items-center justify-center gap-3'>
                    <Image 
                      src='/assets/lukso.svg'
                      alt='Token'
                      width={20}
                      height={20}
                    />
                    <span>LYX</span>
                  </div>
                  <ChevronDown className='ml-auto w-5 h-5'/>
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
              <Dialog>
                <DialogTrigger className='p-3 bg-[#85A0FF]/60 rounded-2xl text-black text-sm font-semibold flex w-40 items-center justify-center ml-auto'>
                  <div className='flex items-center justify-center gap-3'>
                    <Image 
                      src='/assets/lukso.svg'
                      alt='Network'
                      width={20}
                      height={20}
                    />
                    <span>Lukso</span>
                  </div>
                  <ChevronDown className='ml-auto w-5 h-5'/>
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
            </div>
          <div className="h-5"></div>
            <Input 
              placeholder="0.00" 
              type='number' 
            />
          </div>
          <div className="h-2"></div>
          <div className='items-center justify-center flex'>
            <MoveDown className='bg-[#85A0FF]/60 rounded-3xl p-2 h-8 w-8 border border-slate'/>
          </div>
          <div className="h-2"></div>
          <div className='swapcontent'>
            <div className='flex'>
              <Dialog>
                <DialogTrigger className='p-3 bg-[#85A0FF]/60 rounded-2xl text-black text-sm font-semibold flex w-36 items-center justify-center'>
                  <div className='flex items-center justify-center gap-3'>
                    <Image 
                      src='/assets/usdc.svg'
                      alt='Token'
                      width={20}
                      height={20}
                    />
                    <span>USDC</span>
                  </div>
                  <ChevronDown className='ml-auto w-5 h-5'/>
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
              <Dialog>
                  <DialogTrigger className='p-3 bg-[#85A0FF]/60 rounded-2xl text-black text-sm font-semibold flex w-40 items-center justify-center ml-auto'>
                    <div className='flex items-center justify-center gap-3'>
                      <Image 
                        src='/assets/eth.svg'
                        alt='Network'
                        width={20}
                        height={20}
                      />
                      <span>Ethereum</span>
                    </div>
                    <ChevronDown className='ml-auto w-5 h-5'/>
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
            </div>
            <div className="h-5"></div>
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