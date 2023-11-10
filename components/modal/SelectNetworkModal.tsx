import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { ChevronDown, X } from 'lucide-react';
import { chains } from '@/components/web3-onboard';
import { Separator } from '../ui/separator';
import useWeb3Onboard from '../web3-onboard';
import { useWallets } from '@web3-onboard/react';
import Image from 'next/image';
import { networkList } from '@/constants';

type Props = {
    network: any;
};

const SelectNetworkModal = ({ network }: Props) => {
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
                const chainHex = `0x${chainId.toString(16)}`;
                await setChainId(chainHex);
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
                    className='p-3 bg-[#85A0FF]/60 rounded-2xl text-black text-sm font-semibold flex w-52 h-12 items-center justify-center'
                    onClick={() => setIsOpen(true)}
                >
                    <div className='flex items-center justify-center gap-3'>
                        <Image src={selectedNetwork.img} alt='NetworkImage' width={20} height={20} />
                        <span>{selectedNetwork.network}</span>
                    </div>
                    <ChevronDown className='ml-auto w-5 h-5' />
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

export default SelectNetworkModal;
