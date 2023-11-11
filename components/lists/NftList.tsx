import React, { useEffect } from 'react';
import Moralis from 'moralis';
import { useWallets } from '@web3-onboard/react';
import MoralisService from '@/hooks/moralis-nft';

const NftList = () => {
  const connectedWallets = useWallets();

  useEffect(() => {
    const fetchNFTs = async () => {
      try {
        if (Moralis.Core.isStarted) {
          return;
        }

        await Moralis.start({
          apiKey: process.env.NEXT_PUBLIC_MORALIS_API_KEY,
        });

        const address = connectedWallets[0]?.accounts[0]?.address;

        const mumbaiNft = await MoralisService.fetchMumbaiNFTs(address);
        
        console.log('mumbaiNFTs list', mumbaiNft);
      } catch (error) {
        console.error('Error fetching NFTs:', error);
      }
    };

    fetchNFTs();
  }, [connectedWallets]); 

  return (
    <div className='swap-content'>
            
    </div>
  );
};

export default NftList;
