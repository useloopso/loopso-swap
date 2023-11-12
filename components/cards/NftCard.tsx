import Image from "next/image";
import React from "react";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";

interface NftCardProps {
    tokenId: string;
    tokenAddress: string;
    tokenUri: string;
    tokenName: string;
    tokenSymbol: string;
    amount?: number;
    metadata?: NftMetadata;
}

interface NftMetadata {
    name: string;
    description: string;
    image: string;
}
  
const NftCard = ({
    tokenId,
    tokenAddress,
    tokenUri,
    tokenName,
    tokenSymbol,
    amount,
    metadata,
}: NftCardProps) => {
    const imageSrc = metadata?.image || '';
    const description = metadata?.description || '';
  
    return (
        <div className='flex flex-col h-auto text-black bg-[#FDDCE8]/80 p-3 rounded-3xl cursor-pointer hover:bg-[#85A0FF]/70 hover:text-white'>
            <Image src={imageSrc} alt='NFT' width={110} height={110} className='rounded-3xl' />
            <div className="h-2"></div>
            <div className='flex text-sm font-semibold'>
                <span>{tokenSymbol}</span>
                <span className='ml-auto'>#{tokenId}</span>
            </div>
            <Separator />
            <div className="h-2"></div>
            <div className='text-xs font-semibold'>{tokenName}</div>
            <div className="h-2"></div>
            <div className='text-xs font-semibold'>{description}</div>
        </div>
    );
};
  
export default NftCard;
