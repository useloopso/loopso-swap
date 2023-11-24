import UniversalPageService from '@/hooks/universal-page-nft';
import React, { useRef, useState } from 'react'
import { Button } from '../ui/button';
import { ArrowBigLeftDash, ArrowBigRightDash } from 'lucide-react';
import LspCard from '../cards/LspCard';
import { Input } from '../ui/input';
import { SelectedNft } from '../shared/BridgeWidget';
import useGetLuksoNfts from '@/hooks/useGetLuksoNfts';
import { placeholderImg } from '@/constants';
interface LspListProps {

  setSelectedNft: (selectedNft: SelectedNft) => void
  selectedNft:SelectedNft | null
}

const LspList = (props: LspListProps) => {
  const {setSelectedNft, selectedNft} = props
    const [inputValue, setInputValue] = useState<string>('');
    const [lspCards, setLspCards] = useState<React.ReactNode[]>([]);
    const [defaultState, setDefaultState] = useState<string>("⬆️ Retrieve LSPs from selected network ⬆️");

    console.log(selectedNft, 'SELECTED NFT')
    const {nfts, loadingNfts} = useGetLuksoNfts(inputValue)
    console.log(nfts, 'wats NFTSSS?')
/*     const handleFetchNFTs = async () => {
      try {
        const results = await UniversalPageService.fetchLSPs(inputValue);
  
        console.log('Results:', results);
  
        if (results && results.images && Array.isArray(results.images)) {
          let ipfsLinks: string[] = [];
        
          const allImages: string[] = results.images.flatMap((imageArrayOrObject: any) => {
          if (typeof imageArrayOrObject.url === 'string') {
              const imageUrl = imageArrayOrObject.url.replace('ipfs://', 'https://universalpage.dev/api/ipfs/');
              ipfsLinks.push(imageUrl);
              return imageUrl;
            } else {
              console.error('Error: Invalid image object', imageArrayOrObject);
              return null;
            }
          });
        
          const filteredImages = allImages.filter((image) => image !== null);
        
          if (filteredImages.length > 0) {
            const lspCard = (
              <LspCard
                key={`${results.description}_multiple`}
                description={results.description}
                images={filteredImages}
              />
            );
        
            setLspCards([lspCard]);
            console.log('Filtered Iamges', filteredImages);
          } else {
            console.error('Error: No valid images found', results);
            setDefaultState('No valid images found');
          }
        } else {
          console.error('Error: Invalid data structure', results);
          setDefaultState('Invalid data structure');
        }
      } catch (error) {
        console.error('Error fetching NFTs:', error);
        setDefaultState("Error fetching NFTs");
      }
    }; */

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
          <p className='text-sm font-bold w-40'>Search NFT by name:</p>
          <Input
            className='bg-[#E1E1FF] rounded-3xl p-2 text-sm'
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </div>
        <div className="h-4"></div>
       {/*  <Button onClick={handleFetchNFTs} className='w-full'>
            Retrieve Assets
        </Button> */}
        <div className="h-4"></div>
        {nfts && !loadingNfts && nfts.map((nft, index) => (
        <div onClick={() => setSelectedNft(nft)}key={index}>
          <div style={selectedNft?.id === nft.id && selectedNft?.contractAddress === nft.contractAddress? {backgroundColor: "purple" }: {}}>
          TokenID: {nft.id}<br></br>
          Nft Contract Address: {nft.contractAddress}
       
        
          <img width="50px" src={nft.metadata.image || placeholderImg} alt={`NFT ${nft.id}`} />
          </div>
        </div>
         ))}  
        {lspCards.length === 0 ? (
        <p className='flex items-center justify-center text-sm font-semibold'>{defaultState}</p>
      ) : (
        <div>
          {lspCards.length > 3 ? (
            <>
              <div className='flex items-center justify-center'>
              <ArrowBigLeftDash onClick={()=>slideLeft(elementRef.current)} className='relative w-8 h-8 cursor-pointer bg-[#85A0FF]/70 rounded-full text-white p-1 hover:bg-[#E1E1FF] hover:text-[#85A0FF]/70' />
              <div className='ml-5 mr-5 w-[90%] flex gap-5 mb-2 overflow-x-auto overflow-scroll scroll-smooth' ref={elementRef}>
                {lspCards}
              </div>
              <ArrowBigRightDash onClick={()=>slideRight(elementRef.current)}  className='relative w-8 h-8 cursor-pointer ml-auto bg-[#85A0FF]/70 rounded-full text-white p-1 hover:bg-[#E1E1FF] hover:text-[#85A0FF]/70'/>
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