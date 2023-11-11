import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { ChevronDown, X } from 'lucide-react';
import { Separator } from '../ui/separator';
import useWeb3Onboard from '../web3-onboard';
import { useWallets } from '@web3-onboard/react';
import Image from 'next/image';
import { networkList } from '@/constants';

type Props = {
    network: any;
};

const SelectDestinationChainModal = ({ network }: Props) => {
    const [selectedNetwork, setSelectedNetwork] = useState(network);
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
                    className='p-3 bg-[#E1E1FF] rounded-2xl text-black text-sm font-semibold flex w-48 h-10 items-center justify-center hover:bg-[#85A0FF]/10 hover:text-white hover:border hover:border-[#E1E1FF]'
                    onClick={() => setIsOpen(true)}
                >
                    <div className='flex items-center justify-center gap-1'>
                        <div className='flex items-center pl-2 gap-2 w-40'>
                            <Image src={selectedNetwork.img} alt='NetworkImage' width={12} height={12} />
                            <span>{selectedNetwork.network}</span>
                        </div>
                        <ChevronDown className='ml-auto w-6 h-6 pr-2' />
                    </div>
                </DialogTrigger>
                <DialogContent className='bg-[#E1E1FF]/60'>
                    <DialogHeader>
                        <DialogTitle className='flex justify-center'>
                            Select Network
                            <X className='ml-auto w-4 h-4 cursor-pointer' onClick={closeDialog} />
                        </DialogTitle>
                        <Separator />
                        <DialogDescription>
                            <div className='modalContent'>
                                {networkList?.map((e) => (
                                    <div className='networkChoice' key={e.chainId} onClick={() => switchNetwork(e.chainId)}>
                                        <Image src={e.img} alt={e.network} width={20} height={20} className='networkLogo' />
                                        <div className='networkChoiceNames'>
                                            <div className='networkName'>{e.network}</div>
                                        </div>
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
