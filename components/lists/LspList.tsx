import UniversalPageService from '@/hooks/universal-page-nft';
import React, { useRef, useState } from 'react'
import { Button } from '../ui/button';
import { ArrowBigLeftDash, ArrowBigRightDash } from 'lucide-react';
import LspCard from '../cards/LspCard';
import { Input } from '../ui/input';

const LspList = () => {
    const [inputValue, setInputValue] = useState<string>('');
    const [lspCards, setLspCards] = useState<React.ReactNode[]>([]);
    const [defaultState, setDefaultState] = useState<string>("⬆️ Retrieve LSPs from selected network ⬆️");

    const handleFetchNFTs = async () => {
        try {
            const results = await UniversalPageService.fetchLSPs(inputValue);
    
            console.log('Results:', results);
    
            if (results && results.images && results.images.length > 0 && results.images[0].length > 0) {
                const imageUrl = results.images[0][0].url; 
                const cleanedImageUrl = imageUrl.replace('ipfs://', ''); 
                console.log('Image URL:', cleanedImageUrl);
            
                const lspCards = (
                    <LspCard
                        key={results.description}
                        description={results.description}
                        images={cleanedImageUrl}
                    />
                );
            
                setLspCards([lspCards]);
            } else {
                console.error('Error: Invalid data structure');
                setDefaultState("Invalid data structure");
            }
    
        } catch (error) {
            console.error('Error fetching NFTs:', error);
            setDefaultState("Error fetching NFTs");
        }
    };
    const elementRef=useRef(null);

    const slideRight=(element: any)=>{
        element.scrollLeft+=500;
    }
    const slideLeft=(element: any)=>{
        element.scrollLeft-=500;
    }

  return (
    <div className='w-full'>
        <div className='flex items-center justify-center p-1'>
          <p className='text-sm font-bold w-40'>Enter IPFS CID:</p>
          <Input
            className='bg-[#E1E1FF] rounded-3xl p-2 text-sm'
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </div>
        <div className="h-4"></div>
        <Button onClick={handleFetchNFTs} className='w-full'>
            Retrieve Assets
        </Button>
        <div className="h-4"></div>
        {lspCards.length === 0 ? (
            <p className='flex items-center justify-center text-sm font-semibold'>{defaultState}</p>
        ) : (
        <div>
          {lspCards.length > 3 ? (
            <>
            <div className='flex gap-5 overflow-x-auto overflow-scroll scrollbar-hide scroll-smooth' ref={elementRef}>
              {lspCards}
            </div>
            <div className='flex items-center justify-center'>
              <ArrowBigLeftDash onClick={()=>slideLeft(elementRef.current)} className='w-8 h-8 cursor-pointer bg-[#85A0FF]/70 rounded-full text-white p-1 hover:bg-[#E1E1FF] hover:text-[#85A0FF]/70' />
              <ArrowBigRightDash onClick={()=>slideRight(elementRef.current)}  className='w-8 h-8 cursor-pointer ml-auto bg-[#85A0FF]/70 rounded-full text-white p-1 hover:bg-[#E1E1FF] hover:text-[#85A0FF]/70'/>
            </div>
            </>
          ) : (
            <>
            <div className='flex gap-5 ml-10 mr-10 items-center justify-center'>
              {lspCards}
            </div>
            </>
          )}
        </div>
      )}
    </div>
  )
}

export default LspList