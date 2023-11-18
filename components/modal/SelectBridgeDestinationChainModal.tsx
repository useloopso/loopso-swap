import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { ChevronDown, X } from 'lucide-react';
import useWeb3Onboard from '../../hooks/web3-onboard';
import { useWallets } from '@web3-onboard/react';
import Image from 'next/image';
import { networkList } from '@/constants';

type Network = {
    network: string;
    chainId: number;
    img: string
};
interface SelectBridgeDestinationChainModalProps {
    setSelectedNetwork: (network: Network | undefined) => void
    selectedNetwork: Network | undefined
  }
  
  const SelectDestinationChainModal =(props: SelectBridgeDestinationChainModalProps) => {
    const {setSelectedNetwork, selectedNetwork} = props
    const [isOpen, setIsOpen] = useState(false);
    const connectedWallets = useWallets()
    const { connectWallet } = useWeb3Onboard();
    const { setChainId } = useWeb3Onboard();

    const closeDialog = () => {
        setIsOpen(false);
    };

    const switchNetwork = async (chainId: number) => {
        try {
            if (!connectedWallets.length) {
                closeDialog();
                await connectWallet();
              } else {
                setSelectedNetwork(networkList.find((e) => e.chainId === chainId));
                closeDialog();
              }
        } catch (error) {
          console.error('Error switching network:', error);
        }
    };

    return (
        <div>
            <Dialog open={isOpen}>
                <DialogTrigger
                    className='p-3 bg-[#E1E1FF] rounded-2xl text-black text-base font-semibold flex w-full h-16 items-center justify-center hover:bg-[#85A0FF]/10 hover:text-white hover:border hover:border-[#E1E1FF]'
                    onClick={() => setIsOpen(true)}
                >
                    <div className='flex items-center justify-center pl-3 gap-3'>
                        {selectedNetwork ? (
                        <>
                            <Image src={selectedNetwork.img} alt='NetworkImage' width={15} height={15} />
                            <span>{selectedNetwork.network}</span>
                        </>
                        ) : (
                            <span>Select Network</span>
                        )}
                    </div>
                    <div className='flex items-center justify-between gap-1 ml-auto'>
                        <ChevronDown className='ml-auto w-6 h-6 pr-2' />
                    </div>
                </DialogTrigger>
                <DialogContent className='circlesDialog'>
                    <DialogHeader className='flex items-center justify-center gap-3'>
                        <DialogTitle className='flex ml-auto'>
                            <X className='ml-auto w-4 h-4 cursor-pointer' onClick={closeDialog} />
                        </DialogTitle>
                        <DialogTitle>
                            ⬇️&nbsp; Select Destination Chain &nbsp;⬇️
                        </DialogTitle>
                        <DialogDescription>
                            <div className='grid grid-cols-2 items-center justify-center p-4 gap-x-8 gap-y-2'>
                                {networkList?.map((e) => (
                                    <div className='flex items-center justify-center w-48 h-16 gap-3 rounded-3xl cursor-pointer bg-[#85A0FF]/70 hover:bg-[#E1E1FF] text-sm font-semibold text-white hover:text-[#85A0FF]/70 hover:rounded-3xl hover:border hover:border-white' key={e.chainId} onClick={() => switchNetwork(e.chainId)}>
                                        <Image src={e.img} alt={e.network} width={20} height={20} />
                                        {e.network}
                                    </div>
                                ))}
                            </div>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default SelectDestinationChainModal;
