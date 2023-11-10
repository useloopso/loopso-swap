"use client"

import Image from 'next/image';
import Link from 'next/link';
import {FileText, Github, MoreHorizontal, Twitter} from 'lucide-react';
import ConnectWallet from './ConnectWallet';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { useState } from 'react';
import { navbarLinks } from '@/constants';
import { usePathname, useRouter } from 'next/navigation';

const Topbar = () => {
    const router = useRouter();
    const pathname = usePathname();

    const openNewTab = (url: any) => {
        window.open(url, '_blank');
    };

    return (
        <nav className="topbar px-5 py-5">
            <div className='flex'>
                <Link href="/">
                        <Image
                        src="/assets/logo.svg"
                        alt="logo"
                        width={165}
                        height={165}
                        />
                </Link>
            </div>
            <div className="flex items-center gap-1 pl-2">
                <div className='flex items-center justify-center mt-1 gap-3 w-full'>
                    {navbarLinks.map((link) => {
                        const isActive = (pathname.includes(link.route) && link.route.length > 1) || pathname === link.route;
                        return (
                            <Link href={link.route} key={link.label} className={`navbar_link hover:bg-primary/10 hover:rounded-2xl hover:text-black ${isActive && 'bg-primary/10 rounded-2xl text-black'}`}>
                                <Image src={link.imgURL} alt={link.label} width={20} height={24}/>
                                <p className="text-light-1 max-lg:hidden">{link.label}</p>
                            </Link>
                        )}
                    )}
                </div>
            </div>

            <div>
                <div className="flex items-center gap-4 mt-1 ml-auto">
                    <ConnectWallet />
                    <DropdownMenu>
                        <DropdownMenuTrigger className='bg-[#85A0FF]/70 text-white hover:bg-primary/10 hover:text-[#000000] rounded-2xl'>
                            <MoreHorizontal className='w-10 h-10 p-2'/>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className='mr-5'>
                            <DropdownMenuItem className='px-5 gap-3 font-semibold cursor-pointer' onClick={() => openNewTab('https://github.com/useloopso')}><Github />Github</DropdownMenuItem>
                            <DropdownMenuItem className='px-5  gap-3 font-semibold cursor-pointer'><FileText />Docs</DropdownMenuItem>
                            <DropdownMenuItem className='px-5  gap-3 font-semibold cursor-pointer'onClick={() => openNewTab('https://twitter.com/loopso_xyz')}><Twitter />Twitter</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </nav>
    )
}

export default Topbar