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
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"

const Topbar = () => {

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
                    <DropdownMenuTrigger>
                        <Button>
                            <MoreHorizontal />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem className='px-5 gap-3 font-semibold'><Github />Github</DropdownMenuItem>
                        <DropdownMenuItem className='px-5  gap-3 font-semibold'><FileText />Docs</DropdownMenuItem>
                        <DropdownMenuItem className='px-5  gap-3 font-semibold'><Twitter />Twitter</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
        </nav>
    )
}

export default Topbar