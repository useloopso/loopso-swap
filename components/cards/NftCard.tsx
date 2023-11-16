import Image from "next/image";
import React from "react";
import { Separator } from "../ui/separator";

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
        <div className='w-[200px] h-[250px] flex-shrink-0 shadow-md mb-5 rounded-3xl hover:scale-110 transition-all mt-[20px] p-3 cursor-pointer flex flex-col text-black bg-[#E1E1FF] hover:bg-[#85A0FF]/70 hover:text-white'>
            <div className='flex items-center justify-center'>
                <Image src={imageSrc} alt='NFT' width={110} height={110} className='nftImage rounded-lg' />
            </div>
            <div className="h-2"></div>
            <div className='flex text-sm font-semibold'>
                <span>{tokenSymbol}</span>
                <span className='ml-auto'>#{tokenId}</span>
            </div>
            <Separator />
            <div className="h-2"></div>
            <div className='text-xs font-semibold'>{tokenName}</div>
            <div className="h-2"></div>
        </div>
    );
};
  
export default NftCard;
