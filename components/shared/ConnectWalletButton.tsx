import React, { useEffect, useState } from 'react';
import useWeb3Onboard from '@/hooks/web3-onboard';
import { Button } from '../ui/button';
import { useWallets } from '@web3-onboard/react';
import Image from 'next/image';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { Wallet2 } from 'lucide-react';

interface WalletState {
  label: string;
}

function ConnectWalletButton() {
  const [connectedWallet, setConnectedWallet] = useState<WalletState | null>(null);
  const { connectWallet, disconnectWallet } = useWeb3Onboard();
  const connectedWallets = useWallets();

  useEffect(() => {
    if (connectedWallets.length) {
      setConnectedWallet(connectedWallets[0]);
    }
    if (connectedWallets.length === 0) {
      setConnectedWallet(null);
    }
  }, [connectedWallets]);

  const handleConnect = async () => {
    const wallet = await connectWallet();
    setConnectedWallet(wallet);
  };

  const handleDisconnect = async () => {
    await disconnectWallet();
    setConnectedWallet(null);
  };

  const formatAddress = (address: string) => {
    const formattedAddress = `${address.substring(0, 5)}...${address.substring(address.length - 5)}`;
    return formattedAddress;
  };

  return (
    <div>
      {connectedWallet ? (
        <div className='flex gap-4 items-center justify-center text-center'>
          <DropdownMenu>
            <DropdownMenuTrigger className='flex w-40 h-10 gap-3 bg-[#85A0FF]/70 items-center justify-center text-white hover:bg-[#E1E1FF] hover:text-[#85A0FF]/70 rounded-3xl'>
              {connectedWallet.label === 'MetaMask' && (
                <Image src="/assets/metamask.svg" alt="Metamask logo" width={20} height={20}/>
              )}
              {connectedWallet.label === 'Universal Profiles' && (
                <Image src="/assets/up.png" alt="Universal Profiles logo" width={20} height={20}/>
              )}
              {connectedWallet.label !== 'Universal Profiles' && connectedWallet.label !== 'MetaMask' && (
                <Wallet2 />
              )}
              <p className='font-bold text-xs items-center justify-center'>
                {formatAddress(connectedWallets[0]?.accounts[0]?.address || '')}
              </p>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='bg-transparent border-none shadow-none'>
              <Button onClick={handleDisconnect} className='w-40 gap-3'>
                Disconnect Wallet
              </Button>
            </DropdownMenuContent>
                </DropdownMenu>

        </div>
      ) : (
        <Button onClick={handleConnect} className='w-40'>
          Connect Wallet
        </Button>
      )}
    </div>
  );
}

export default ConnectWalletButton;
