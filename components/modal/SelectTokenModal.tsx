import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import Image from 'next/image';
import { ChevronDown, X } from 'lucide-react';
import { tokenList } from '@/constants/index.js';
import { Separator } from '../ui/separator';

type Props = {
    token: any;
};

const SelectTokenModal = ({ token }: Props) => {
    const [selectedToken, setSelectedToken] = useState(token);
    const [isOpen, setIsOpen] = useState(false);

    const closeDialog = () => {
        setIsOpen(false);
    };

    const updateToken = (i: any) => {
        setSelectedToken(tokenList[i]);
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
                        <Image src={selectedToken.img} alt='Token' width={20} height={20} />
                        <span>{selectedToken.ticker}</span>
                    </div>
                    <ChevronDown className='ml-auto w-5 h-5' />
                </DialogTrigger>
                <DialogContent className='bg-[#E1E1FF]/60'>
                    <DialogHeader>
                        <DialogTitle className='flex justify-center'>
                            Select Token
                            <X className='ml-auto w-4 h-4 cursor-pointer' onClick={closeDialog} />
                        </DialogTitle>
                        <Separator />
                        <DialogDescription>
                            <div className='modalContent'>
                                {tokenList?.map((e, i) => (
                                    <div className='tokenChoice' key={i} onClick={() => updateToken(i)}>
                                        <Image src={e.img} alt={e.ticker} width={20} height={20} className='tokenLogo' />
                                        <div className='tokenChoiceNames'>
                                            <div className='tokenName'>{e.name}</div>
                                            <div className='tokenTicker'>{e.ticker}</div>
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

export default SelectTokenModal;
