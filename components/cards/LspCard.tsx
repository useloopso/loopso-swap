import Image from "next/image";
import React from "react";
import { Separator } from "../ui/separator";

interface LspMetadata {
    description: string;
    images: string;
}
  
const LspCard = ({
    description,
    images,
}: LspMetadata) => {
    return (
        <div className='w-[150px] h-[225px] flex-shrink-0 shadow-md mb-5 rounded-3xl bg-white hover:scale-110 transition-all mt-[20px] cursor-pointer flex flex-col text-black bg-[#FDDCE8]/80 p-3 hover:bg-[#85A0FF]/70 hover:text-white'>
            <div className='flex items-center justify-center'>
                <Image src={`https://universalpage.dev/api/ipfs/${images}`} alt='NFT' width={100} height={100} className='nftImage rounded-lg' />
            </div>
            <div className="h-4"></div>
            <Separator />
            <div className="h-4"></div>
            <div className='text-xs font-semibold'>{description}</div>
            <div className="h-2"></div>
        </div>
    );
};
  
export default LspCard;
