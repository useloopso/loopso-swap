"use client"

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '../ui/button';
import {FileText, Github, MoreHorizontal, Twitter} from 'lucide-react';
import ConnectWallet from './ConnectWallet';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { useState } from 'react';

const Topbar = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const openNewTab = (url: any) => {
        window.open(url, '_blank');
    };

    return (
        <nav className="topbar px-5 py-5">
        <Link href="/" className="absolute">
                <Image
                src="/assets/logo.svg"
                alt="logo"
                width={165}
                height={165}
                />
        </Link>

        <div className="flex items-center gap-1">
            <div className="block md:hidden"></div>
        </div>

        <div>
            <div className="flex items-center gap-4">
                <ConnectWallet />
                <DropdownMenu>
                    <DropdownMenuTrigger className='bg-[#85A0FF]/70 text-white hover:bg-primary/10 hover:text-[#000000] rounded-2xl'>
                        <MoreHorizontal className='w-10 h-10 p-2'/>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className='mr-5'>
                        <DropdownMenuItem className='px-5 gap-3 font-semibold cursor-pointer' onClick={() => openNewTab('https://github.com/useloopso')}><Github />Github</DropdownMenuItem>
                        <DropdownMenuItem className='px-5  gap-3 font-semibold cursor-pointer'><FileText />Docs</DropdownMenuItem>
                        <DropdownMenuItem className='px-5  gap-3 font-semibold cursor-pointer'><Twitter />Twitter</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
        </nav>
    )
}

export default Topbar