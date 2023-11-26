import Moralis from 'moralis';
import { EvmChain } from '@moralisweb3/common-evm-utils';
import { ERC20Token } from '@/lib/types';

const MoralisTokenService = {
    fetchGoerliTokens: async (address: string) => {
        try {
          const chain = EvmChain.GOERLI;
    
          const response = await Moralis.EvmApi.token.getWalletTokenBalances({
            address,
            chain,
          });
    
          const parsedTokens: ERC20Token[] = response.toJSON().map((token: any) => ({
            balance: token.balance,
            decimals: token.decimals,
            name: token.name,
            symbol: token.symbol,
            token_address: token.token_address,
            image: "",
            isNative: false
          }));
      
          console.log('Parsed Tokens', parsedTokens);
      
          return parsedTokens;
        } catch (error) {
          console.error('Error fetching tokens:', error);
          throw error; 
        }
    },
    fetchSepoliaTokens: async (address: string) => {
        try {
          const chain = EvmChain.SEPOLIA;
    
          const response = await Moralis.EvmApi.token.getWalletTokenBalances({
            address,
            chain,
          });
    
          const parsedTokens: ERC20Token[] = response.toJSON().map((token: any) => ({
            balance: token.balance,
            decimals: token.decimals,
            name: token.name,
            symbol: token.symbol,
            token_address: token.token_address,
            image: "",
            isNative: false
          }));
      
          console.log('Parsed Tokens', parsedTokens);
      
          return parsedTokens;
        } catch (error) {
          console.error('Error fetching tokens:', error);
          throw error; 
        }
    },
    fetchMumbaiTokens: async (address: string) => {
        try {
          const chain = EvmChain.MUMBAI;
    
          const response = await Moralis.EvmApi.token.getWalletTokenBalances({
            address,
            chain,
          });
    
          const parsedTokens: ERC20Token[] = response.toJSON().map((token: any) => ({
            balance: token.balance,
            decimals: token.decimals,
            name: token.name,
            symbol: token.symbol,
            token_address: token.token_address,
            image: "",
            isNative: false
          }));
      
          console.log('Parsed Tokens', parsedTokens);
      
          return parsedTokens;
        } catch (error) {
          console.error('Error fetching tokens:', error);
          throw error; 
        }
    },
    fetchEthereumTokens: async (address: string) => {
        try {
          const chain = EvmChain.ETHEREUM;
    
          const response = await Moralis.EvmApi.token.getWalletTokenBalances({
            address,
            chain,
          });
    
          const parsedTokens: ERC20Token[] = response.toJSON().map((token: any) => ({
            balance: token.balance,
            decimals: token.decimals,
            name: token.name,
            symbol: token.symbol,
            token_address: token.token_address,
            image: "",
            isNative: false
          }));
      
          console.log('Parsed Tokens', parsedTokens);
      
          return parsedTokens;
        } catch (error) {
          console.error('Error fetching tokens:', error);
          throw error; 
        }
    },
    fetchPolygonTokens: async (address: string) => {
        try {
          const chain = EvmChain.POLYGON;

          const response = await Moralis.EvmApi.token.getWalletTokenBalances({
            address,
            chain,
          });
    
          const parsedTokens: ERC20Token[] = response.toJSON().map((token: any) => ({
            balance: token.balance,
            decimals: token.decimals,
            name: token.name,
            symbol: token.symbol,
            token_address: token.token_address,
            image: "",
            isNative: false
          }));
      
          console.log('Parsed Tokens', parsedTokens);
      
          return parsedTokens;
        } catch (error) {
          console.error('Error fetching tokens:', error);
          throw error; 
        }
    },
}

export default MoralisTokenService;