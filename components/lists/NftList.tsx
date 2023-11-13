import React, { useEffect, useState } from 'react';
import Moralis from 'moralis';
import { useWallets } from '@web3-onboard/react';
import MoralisService from '@/hooks/moralis-nft';
import { Button } from '../ui/button';
import NftCard from '../cards/NftCard';


interface NftMetadata {
  name: string;
  description: string;
  image: string;
}

const NftList = () => {
  const connectedWallets = useWallets();
  const [nftCards, setNftCards] = useState<React.ReactNode[]>([]);

  useEffect(() => {
    const initMoralis = async () => {
      try {
        if (Moralis.Core.isStarted) {
          return;
        }

        await Moralis.start({
          apiKey: process.env.NEXT_PUBLIC_MORALIS_API_KEY,
        });
      } catch (error) {
        console.error('Error Initialising Moralis', error);
      }
    }
    initMoralis();
  }, []); 

  const handleFetchNFTs = async () => {
    try {
      const address = connectedWallets[0]?.accounts[0]?.address;
      const fetchedNftList = await MoralisService.fetchSepoliaNFTs(address);

      console.log('fetchedNftList', fetchedNftList);

      const nftCards = fetchedNftList.map((nft) => (
        <NftCard
          key={nft.tokenId.toString()}
          tokenId={nft.tokenId.toString()}
          tokenAddress={nft?.tokenAddress?.toJSON?.() || ''}
          tokenUri={nft?.tokenUri?.toString() || ''}
          tokenName={nft?.tokenName?.toString() || ''}
          tokenSymbol={nft?.tokenSymbol?.toString() || ''}
          amount={nft?.amount ? parseInt(nft?.amount.toString()) : undefined}
          metadata={nft?.metadata as NftMetadata | undefined}
        />
      ));

      setNftCards(nftCards);
    } catch (error) {
      console.error('Error fetching NFTs:', error);
    }
  };

  return (
    <div className='w-full'>
        <Button onClick={handleFetchNFTs} className='w-full'>
          Retrieve Assets
        </Button>
      <div className="h-4"></div>
      <div className='flex gap-5 overflow-x-auto overflow-scroll scrollbar-hide scroll-smooth'>
        {nftCards}
      </div>
    </div>
  );
};

export default NftList;
