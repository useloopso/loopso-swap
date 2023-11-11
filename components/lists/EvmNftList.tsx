import React, { useEffect } from 'react';
import Moralis from 'moralis';
import { EvmChain } from '@moralisweb3/common-evm-utils';

const EvmNftList: React.FC = () => {
  useEffect(() => {
    const initializeMoralis = async () => {
      try {
        if (Moralis.Core.isStarted) {
          return;
        }

        await Moralis.start({
          apiKey: process.env.NEXT_PUBLIC_MORALIS_API_KEY,
        });

        const allNFTs = [];
        const address = '0x7532F22C2B613020B2165200fAb94B3b4BD7e4b4';

        const chains = [EvmChain.ETHEREUM, EvmChain.BSC, EvmChain.POLYGON];

        for (const chain of chains) {
          const response = await Moralis.EvmApi.nft.getWalletNFTs({
            address,
            chain,
          });

          allNFTs.push(response);
        }

        console.log('list of all NFTs: ', allNFTs);
      } catch (error) {
        console.error('Error initializing Moralis:', error);
      }
    };

    initializeMoralis();
  }, []); 

  return (
    <div>
      
    </div>
  );
};

export default EvmNftList;
