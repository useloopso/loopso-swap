"use client"

import React, { useState } from 'react'
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
import { tokenList } from '@/constants/index.js'

const SwapWidget = () => {
  const [tokenOne, setTokenOne] = useState(tokenList[0]);
  const [tokenTwo, setTokenTwo] = useState(tokenList[1]);

  const switchTokens = () => {
    const one = tokenOne;
    const two = tokenTwo;
    setTokenOne(two);
    setTokenTwo(one);
  }

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
                      src={tokenOne.img}
                      alt='Token'
                      width={20}
                      height={20}
                    />
                    <span>{tokenOne.ticker}</span>
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
            <MoveDown 
              className='bg-[#85A0FF]/70 hover:bg-primary/10 hover:text-black rounded-xl p-2 h-9 w-9 border-2 border-slate cursor-pointer' 
              onClick={switchTokens}/>
          </div>
          <div className="h-2"></div>
          <div className='swapcontent'>
            <div className='flex'>
              <Dialog>
                <DialogTrigger className='p-3 bg-[#85A0FF]/60 rounded-2xl text-black text-sm font-semibold flex w-36 items-center justify-center'>
                  <div className='flex items-center justify-center gap-3'>
                  <Image 
                      src={tokenTwo.img}
                      alt='Token'
                      width={20}
                      height={20}
                    />
                    <span>{tokenTwo.ticker}</span>
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