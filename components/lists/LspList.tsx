import React, { useRef, useState } from 'react';
import { ArrowBigLeftDash, ArrowBigRightDash } from 'lucide-react';
import { Input } from '../ui/input';
import { SelectedNft } from '../shared/BridgeWidget';
import useGetLuksoNfts from '@/hooks/useGetLuksoNfts';
import { placeholderImg } from '@/constants';
import Image from 'next/image';

interface LspListProps {
  setSelectedNft: (selectedNft: SelectedNft) => void;
  selectedNft: SelectedNft | null;
}

const LspList = (props: LspListProps) => {
  const { setSelectedNft, selectedNft } = props;
  const [inputValue, setInputValue] = useState<string>('');
  const [defaultState, setDefaultState] = useState<string>('⬆️ NFTs not found. Try enter another name. ⬆️');

  const { nfts, loadingNfts } = useGetLuksoNfts(inputValue);
  const elementRef = useRef(null);

  const slideRight = (element: any) => {
    element.scrollLeft += 500;
  };
  const slideLeft = (element: any) => {
    element.scrollLeft -= 500;
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-center p-1">
        <p className="text-sm font-bold w-56">Search NFT by Name:</p>
        <Input
          className="bg-[#E1E1FF] rounded-3xl p-2 text-sm"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </div>
      <div className="h-4"></div>
      {(nfts ?? []).length === 0 && !loadingNfts && (
        <div className="flex items-center justify-center">
          <p>{defaultState}</p>
        </div>
      )}
      {((nfts ?? []).length === 1 || (nfts ?? []).length === 2) && !loadingNfts && (
        <div className="flex items-center justify-center">
          <div
            className="ml-5 mr-5 w-[90%] flex gap-5 mb-2 overflow-x-auto overflow-scroll scroll-smooth"
            ref={elementRef}
          >
            {nfts?.map((nft, index) => (
              <div
                onClick={() =>
                  setSelectedNft({
                    id: nft.id,
                    contractAddress: nft.contractAddress,
                    metadata: {
                      description: nft.metadata.description,
                      image: nft.metadata.image,
                      name: nft.metadata.name,
                    },
                    tokenId: nft.id,
                    tokenUri: nft.metadata.image,
                    tokenAddress: nft.contractAddress,
                  })
                }
                key={index}
              >
                <div
                  className={`w-[150px] h-[200px] flex-shrink-0 shadow-md mb-5 rounded-3xl hover:scale-110 transition-all mt-[20px] cursor-pointer flex flex-col text-black bg-[#E1E1FF] p-3 hover:bg-[#85A0FF]/70 hover:text-white 
                  ${selectedNft?.id === nft.id && selectedNft?.contractAddress === nft.contractAddress ? 'selectedNft' : ''}`}
                >
                  <div className="flex items-center justify-center">
                    <Image
                      src={nft.metadata.image || placeholderImg}
                      alt={`NFT ${nft.id}`}
                      width={100}
                      height={100}
                      className="nftImage rounded-lg"
                    />
                  </div>
                  <div className="h-2"></div>
                  <div className="flex flex-col gap-2 text-sm overflow-auto">
                    <span className="font-semibold flex items-center justify-center mt-2">Token ID: #{nft.id}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {(nfts ?? []).length > 2 && !loadingNfts && (
        <div className="flex items-center justify-center">
          <ArrowBigLeftDash
            onClick={() => slideLeft(elementRef.current)}
            className="relative w-8 h-8 cursor-pointer bg-[#85A0FF]/70 rounded-full text-white p-1 hover:bg-[#E1E1FF] hover:text-[#85A0FF]/70"
          />
          <div
            className="ml-5 mr-5 w-[90%] flex gap-5 mb-2 overflow-x-auto overflow-scroll scroll-smooth"
            ref={elementRef}
          >
            {nfts?.map((nft, index) => (
              <div
                onClick={() =>
                  setSelectedNft({
                    id: nft.id,
                    contractAddress: nft.contractAddress,
                    metadata: {
                      description: nft.metadata.description,
                      image: nft.metadata.image,
                      name: nft.metadata.name,
                    },
                    tokenId: nft.id,
                    tokenUri: nft.metadata.image,
                    tokenAddress: nft.contractAddress,
                  })
                }
                key={index}
              >
                <div
                  className={`w-[150px] h-[200px] flex-shrink-0 shadow-md mb-5 rounded-3xl hover:scale-110 transition-all mt-[20px] cursor-pointer flex flex-col text-black bg-[#E1E1FF] p-3 hover:bg-[#85A0FF]/70 hover:text-white 
                  ${selectedNft?.id === nft.id && selectedNft?.contractAddress === nft.contractAddress ? 'selectedNft' : ''}`}
                >
                  <div className="flex items-center justify-center">
                    <Image
                      src={nft.metadata.image || placeholderImg}
                      alt={`NFT ${nft.id}`}
                      width={100}
                      height={100}
                      className="nftImage rounded-lg"
                    />
                  </div>
                  <div className="h-2"></div>
                  <div className="flex flex-col gap-2 text-sm overflow-auto">
                    <span className="font-semibold flex items-center justify-center mt-2">Token ID: #{nft.id}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <ArrowBigRightDash
            onClick={() => slideRight(elementRef.current)}
            className="relative w-8 h-8 cursor-pointer ml-auto bg-[#85A0FF]/70 rounded-full text-white p-1 hover:bg-[#E1E1FF] hover:text-[#85A0FF]/70"
          />
        </div>
      )}
    </div>
  );
};

export default LspList;
