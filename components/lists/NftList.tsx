import React, { useEffect, useState } from 'react';
import Moralis from 'moralis';
import { useWallets } from '@web3-onboard/react';
import MoralisService from '@/hooks/moralis-nft';
import { Button } from '../ui/button';
import NftCard from '../cards/NftCard';
import { networkList } from '@/constants';


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

      const luksoTestnetChainId = networkList.find((network) => network.network === 'Lukso Testnet')?.chainId;
      const goerliTestnetChainId = networkList.find((network) => network.network === 'Goerli Testnet')?.chainId;
      const sepoliaTestnetChainId = networkList.find((network) => network.network === 'Sepolia Testnet')?.chainId;
      const mumbaiTestnetChainId = networkList.find((network) => network.network === 'Mumbai Testnet')?.chainId;
      const luksoMainnetChainId = networkList.find((network) => network.network === 'Lukso Mainnet')?.chainId;
      const ethereumMainnetChainId = networkList.find((network) => network.network === 'Ethereum Mainnet')?.chainId;
      const polygonMainnetChainId = networkList.find((network) => network.network === 'Polygon Mainnet')?.chainId;

      const promises = connectedWallets.map(async (e) => {
        if (e.chains[0].id === `0x${goerliTestnetChainId?.toString(16)}`) {
          return await MoralisService.fetchGoerliNFTs(address); 
        } 
        else if (e.chains[0].id === `0x${sepoliaTestnetChainId?.toString(16)}`) {
          return await MoralisService.fetchSepoliaNFTs(address);
        }
        else if (e.chains[0].id === `0x${mumbaiTestnetChainId?.toString(16)}`) {
          return await MoralisService.fetchMumbaiNFTs(address);
        }
        else if (e.chains[0].id === `0x${ethereumMainnetChainId?.toString(16)}`) {
          return await MoralisService.fetchEthereumNFTs(address);
        }
        else if (e.chains[0].id === `0x${polygonMainnetChainId?.toString(16)}`) {
          return await MoralisService.fetchPolygonNFTs(address);
        }
      });
        
      const results = await Promise.all(promises);

      console.log('Results:', results);

      const nftCards = results.flat().map((nft) => (
        <NftCard
          key={nft?.tokenHash?.toString()}
          tokenId={nft?.tokenId.toString() || ''}
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
