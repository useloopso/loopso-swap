import Moralis from 'moralis';
import { EvmChain } from '@moralisweb3/common-evm-utils';

const MoralisService = {
    fetchGoerliNFTs: async (address: string) => {
        try {
          const goerliNFTs = [];
          const chain = EvmChain.GOERLI;
    
          const response = await Moralis.EvmApi.nft.getWalletNFTs({
            address,
            chain,
            normalizeMetadata: true,
          });
    
          goerliNFTs.push(response.result);
    
          return goerliNFTs;
        } catch (error) {
          console.error('Error fetching NFTs:', error);
          throw error; 
        }
    },
    fetchSepoliaNFTs: async (address: string) => {
        try {
          const sepoliaNFTs = [];
          const chain = EvmChain.SEPOLIA;
    
          const response = await Moralis.EvmApi.nft.getWalletNFTs({
            address,
            chain,
            normalizeMetadata: true,
          });
    
          sepoliaNFTs.push(response.result);
    
          return sepoliaNFTs;
        } catch (error) {
          console.error('Error fetching NFTs:', error);
          throw error; 
        }
    },
    fetchMumbaiNFTs: async (address: string) => {
        try {
          const chain = EvmChain.MUMBAI;
    
          const response = await Moralis.EvmApi.nft.getWalletNFTs({
            address,
            chain,
            normalizeMetadata: true,
          });
    
          const nfts = response.result.map(nft => ({
            tokenId: nft.result.tokenId,
            tokenAddress: nft.result.tokenAddress,
            tokenUri: nft.result.tokenUri,
            tokenName: nft.result.name,
            tokenSymbol: nft.result.symbol,
            amount: nft.result.amount,
            metadata: nft.result.metadata,
          }));
    
          return nfts;
        } catch (error) {
          console.error('Error fetching NFTs:', error);
          throw error; 
        }
    },
    fetchEthereumNFTs: async (address: string) => {
        try {
          const ethereumNFTs = [];
          const chain = EvmChain.ETHEREUM;
    
          const response = await Moralis.EvmApi.nft.getWalletNFTs({
            address,
            chain,
            normalizeMetadata: true,
          });
    
          ethereumNFTs.push(response.result);
    
          return ethereumNFTs;
        } catch (error) {
          console.error('Error fetching NFTs:', error);
          throw error; 
        }
    },
    fetchPolygonNFTs: async (address: string) => {
        try {
          const polygonNFTs = [];
          const chain = EvmChain.POLYGON;
    
          const response = await Moralis.EvmApi.nft.getWalletNFTs({
            address,
            chain,
            normalizeMetadata: true,
          });
    
          polygonNFTs.push(response.result);
    
          return polygonNFTs;
        } catch (error) {
          console.error('Error fetching NFTs:', error);
          throw error; 
        }
    },
}

export default MoralisService;