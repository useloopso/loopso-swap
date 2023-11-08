import React from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import Image from 'next/image'
import { ChevronDown } from 'lucide-react'

type Props = {}

const SelectNetworkModal = (props: Props) => {
  return (
    <div>
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
  )
}

export default SelectNetworkModal