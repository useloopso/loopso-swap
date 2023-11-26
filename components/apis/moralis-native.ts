import Moralis from 'moralis';
import { EvmChain } from '@moralisweb3/common-evm-utils';

const MoralisNativeService = {
    fetchGoerliNative: async (address: string) => {
        try {
          const chain = EvmChain.GOERLI;
    
          const response = await Moralis.EvmApi.balance.getNativeBalance({
            chain,
            address,
          });
    
          console.log('Response', response.toJSON())
    
          return response.toJSON();
        } catch (error) {
          console.error('Error fetching tokens:', error);
          throw error; 
        }
    },
    fetchSepoliaNative: async (address: string) => {
        try {
          const chain = EvmChain.SEPOLIA;
    
          const response = await Moralis.EvmApi.balance.getNativeBalance({
            chain,
            address,
          });
    
          console.log('Response', response.toJSON())
    
          return response.toJSON();
        } catch (error) {
          console.error('Error fetching tokens:', error);
          throw error; 
        }
    },
    fetchMumbaiNative: async (address: string) => {
        try {
          const chain = EvmChain.MUMBAI;
    
          const response = await Moralis.EvmApi.balance.getNativeBalance({
            chain,
            address,
          });
    
          console.log('Response', response.toJSON())
    
          return response.toJSON();
        } catch (error) {
          console.error('Error fetching tokens:', error);
          throw error; 
        }
    },
    fetchEthereumNative: async (address: string) => {
        try {
          const chain = EvmChain.ETHEREUM;
    
          const response = await Moralis.EvmApi.balance.getNativeBalance({
            chain,
            address,
          });
    
          console.log('Response', response.toJSON())
    
          return response.toJSON();
        } catch (error) {
          console.error('Error fetching tokens:', error);
          throw error; 
        }
    },
    fetchPolygonNative: async (address: string) => {
        try {
          const chain = EvmChain.POLYGON;
    
          const response = await Moralis.EvmApi.balance.getNativeBalance({
            chain,
            address,
          });
    
          console.log('Response', response.toJSON())
    
          return response.toJSON();
        } catch (error) {
          console.error('Error fetching tokens:', error);
          throw error; 
        }
    },
}

export default MoralisNativeService;