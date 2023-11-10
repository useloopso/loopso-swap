import Image from 'next/image'
import React from 'react'
import { Button } from '../ui/button'
import ConnectWallet from './ConnectWallet'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { FileText, GithubIcon, MoreHorizontal, TwitterIcon } from 'lucide-react'
import { navbarLinks } from '@/constants'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

const Navbar = () => {
    const router = useRouter();
    const pathname = usePathname();

    const openNewTab = (url: any) => {
        window.open(url, '_blank');
    };

  return (
    <nav className="dark:bg-gray-900 fixed w-full z-20 top-0 start-0 ">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse" title='logo'>
                <Image
                    src="/assets/logo.svg"
                    alt="logo"
                    width={165}
                    height={165}
                />
            </a>
            <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse gap-1">
                <ConnectWallet />
                <DropdownMenu>
                    <DropdownMenuTrigger className='bg-[#85A0FF]/70 text-white hover:bg-[#E1E1FF] hover:text-[#85A0FF]/70 rounded-3xl'>
                        <MoreHorizontal className='w-10 h-10 p-2'/>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className='mr-5'>
                        <DropdownMenuItem className='px-5 gap-3 font-semibold cursor-pointer' onClick={() => openNewTab('https://github.com/useloopso')}><GithubIcon />Github</DropdownMenuItem>
                        <DropdownMenuItem className='px-5  gap-3 font-semibold cursor-pointer'><FileText />Docs</DropdownMenuItem>
                        <DropdownMenuItem className='px-5  gap-3 font-semibold cursor-pointer'onClick={() => openNewTab('https://twitter.com/loopso_xyz')}><TwitterIcon />Twitter</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1 bg-[#E1E1FF] p-1 rounded-3xl" id="navbar-sticky">
                <div className='flex items-center justify-center gap-4 w-full'>
                    {navbarLinks.map((link) => {
                        const isActive = (pathname.includes(link.route) && link.route.length > 1) || pathname === link.route;
                        return (
                            <Link href={link.route} key={link.label} className={`navbar_link ${isActive && 'bg-[#85A0FF]/70 rounded-3xl text-white'} ${!isActive && 'hover:text-[#85A0FF]/70 '}`}>
                                <p className="text-light-1 max-lg:hidden">{link.label}</p>
                            </Link>
                        )}
                    )}
                </div>
            </div>
        </div>
    </nav>
  )
}

export default Navbar