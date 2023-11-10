import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import Image from 'next/image';
import { ChevronDown, X } from 'lucide-react';
import { networkList } from '@/constants/index.js';
import { Separator } from '../ui/separator';
import useWeb3Onboard from '../web3-onboard';

type Props = {
    network: any;
};

const SelectNetworkModal = ({ network }: Props) => {
    const [selectedNetwork, setSelectedNetwork] = useState(network);
    const [isOpen, setIsOpen] = useState(false);
    const { setChainId } = useWeb3Onboard();

    const closeDialog = () => {
        setIsOpen(false);
    };

    const updateNetwork = async (i: any) => {
        setSelectedNetwork(networkList[i]);
        closeDialog();
    };

    return (
        <div>
            <Dialog open={isOpen}>
                <DialogTrigger
                    className='p-3 bg-[#85A0FF]/60 rounded-2xl text-black text-sm font-semibold flex w-36 h-12 items-center justify-center'
                    onClick={() => setIsOpen(true)}
                >
                    <div className='flex items-center justify-center gap-3'>
                        <Image src={selectedNetwork.img} alt='Network' width={20} height={20} />
                        <span>{selectedNetwork.name}</span>
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
                                {networkList?.map((e, i) => (
                                    <div className='networkChoice' key={i} onClick={() => updateNetwork(i)}>
                                        <Image src={e.img} alt={e.name} width={20} height={20} className='networkLogo' />
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
