import Moralis from 'moralis';
import { EvmChain } from '@moralisweb3/common-evm-utils';

const MoralisService = {
    fetchGoerliNFTs: async (address: string) => {
        try {
          const chain = EvmChain.GOERLI;
    
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
            tokenHash: nft.result.tokenHash,
            amount: nft.result.amount,
            metadata: nft.result.metadata,
          }));
    
          return nfts;
        } catch (error) {
          console.error('Error fetching NFTs:', error);
          throw error; 
        }
    },
    fetchSepoliaNFTs: async (address: string) => {
        try {
          const chain = EvmChain.SEPOLIA;
    
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
            tokenHash: nft.result.tokenHash,
            amount: nft.result.amount,
            metadata: nft.result.metadata,
          }));
    
          return nfts;
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
            tokenHash: nft.result.tokenHash,
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
          const chain = EvmChain.ETHEREUM;
    
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
            tokenHash: nft.result.tokenHash,
            amount: nft.result.amount,
            metadata: nft.result.metadata,
          }));
    
          return nfts;
        } catch (error) {
          console.error('Error fetching NFTs:', error);
          throw error; 
        }
    },
    fetchPolygonNFTs: async (address: string) => {
        try {
          const chain = EvmChain.POLYGON;
    
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
            tokenHash: nft.result.tokenHash,
            amount: nft.result.amount,
            metadata: nft.result.metadata,
          }));
    
          return nfts;
        } catch (error) {
          console.error('Error fetching NFTs:', error);
          throw error; 
        }
    },
}

export default MoralisService;