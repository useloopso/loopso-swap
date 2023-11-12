import React, { useEffect, useState } from 'react';
import Moralis from 'moralis';
import { useWallets } from '@web3-onboard/react';
import MoralisService from '@/hooks/moralis-nft';
import { Button } from '../ui/button';
import NftCard from '../cards/NftCard';

const NftList = () => {
  const connectedWallets = useWallets();

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

  const fetchNFTs = async () => {
    try {
      const address = connectedWallets[0]?.accounts[0]?.address;

      const nftList = await MoralisService.fetchMumbaiNFTs(address);
      
      console.log('NFTs list', nftList);


      nftList.map((nft) => {
        console.log('nft', nft[0].tokenAddress.toJSON());
      })
    } catch (error) {
      console.error('Error fetching NFTs:', error);
    }
  };

  return (
    <div className='w-full'>
        <Button onClick={fetchNFTs} className='w-full'>
          Retrieve Assets
        </Button>
      <div className="h-4"></div>
      <div className='swap-content'>
        <NftCard />
      </div>
    </div>
  );
};

export default NftList;
