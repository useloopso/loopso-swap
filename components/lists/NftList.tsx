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
      const fetchedNftList = await MoralisService.fetchMumbaiNFTs(address);

      console.log('fetchedNftList', fetchedNftList);

      // Assuming you want to display all fetched NFTs, you can map through the list
      const nftCards = fetchedNftList.map((nft) => (
        <NftCard
          key={nft.tokenId.toString()} // Make sure to provide a unique key
          tokenId={nft.tokenId.toString()}
          tokenAddress={nft?.tokenAddress?.toJSON?.() || ''}
          tokenUri={nft?.tokenUri?.toString() || ''}
          tokenName={nft?.tokenName?.toString() || ''}
          tokenSymbol={nft?.tokenSymbol?.toString() || ''}
          amount={nft?.amount ? parseInt(nft?.amount.toString()) : undefined}
          metadata={nft?.metadata as NftMetadata | undefined}
        />
      ));

      // Set the mapped NFT cards to state or render directly, based on your use case
      // For simplicity, I'll set it to state here
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
      <div className='flex flex-wrap gap-3 grid-cols-4 items-center justify-center'>
        {nftCards}
      </div>
    </div>
  );
};

export default NftList;
