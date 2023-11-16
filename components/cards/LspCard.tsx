import Image from "next/image";
import React from "react";
import { Separator } from "../ui/separator";
import { Fade } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';

interface LspMetadata {
    description: string;
    images: string[];
}

const truncateDescription = (description: string, maxWords: number) => {
    const words = description.split(' ');
    if (words.length > maxWords) {
        return words.slice(0, maxWords).join(' ') + '...';
    }
    return description;
};

const LspCard = ({
    description,
    images,
}: LspMetadata) => {

    const truncatedDescription = truncateDescription(description, 50);

    const fadeProperties = {
        duration: 1500,
        pauseOnHover: true,
      };

    return (
        <div className='w-[300px] h-[350px] flex-shrink-0 shadow-md mb-5 rounded-3xl hover:scale-110 transition-all mt-[20px] cursor-pointer flex flex-col text-black bg-[#E1E1FF] p-3 hover:bg-[#85A0FF]/70 hover:text-white'>
            <div className='flex items-center justify-center'>
                {images && images.length === 1 ? (
                    // if only 1 image in array
                    <Image src={images[0]} alt='LSP' width={100} height={100} className='nftImage rounded-lg' />
                ) : (images && images.length > 1 && (
                    // if more than 1 image in array
                    <div className="relative w-full h-full">
                        <Fade {...fadeProperties} arrows={false}>
                            {images.map((image, index) => (
                                <div key={index} className='flex items-center justify-center'>
                                    <Image src={image} alt='LSP' width={100} height={100} className='nftImage rounded-lg'/>
                                </div>
                            ))}
                        </Fade>
                    </div>
                ))}
            </div>
            <div className="h-4"></div>
            <Separator />
            <div className="h-4"></div>
            <div className='text-xs font-semibold'>{truncatedDescription}</div>
            <div className="h-2"></div>
        </div>
    );
};

export default LspCard;
