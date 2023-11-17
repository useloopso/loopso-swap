import { ADDRESSES } from "loopso-bridge-sdk";

export const navbarLinks = [
  {
    imgURL: "/assets/repeat2.svg",
    route: "/swap",
    label: "Token Swap",
  },
  {
    imgURL: "/assets/imagedown.svg",
    route: "/bridge",
    label: "NFT Bridge",
  },
];

export const tokenList = [
  {
    ticker: "$L$",
    img: "/assets/luksot.svg",
    name: "Wrapped Lajos Token",
    decimals: 18,
    //chainId:
  },

  {
    ticker: "USDC",
    img: "/assets/usdc.svg",
    name: "USD Coin",
    address: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
    decimals: 6,
  },
  {
    ticker: "USDT",
    img: "/assets/usdt.svg",
    name: "Tether USD",
    address: "0xdac17f958d2ee523a2206206994597c13d831ec7",
    decimals: 6,
  },
  {
    ticker: "WETH",
    img: "/assets/weth.svg",
    name: "Wrapped Ethereum",
    address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
    decimals: 18,
  },
  {
    ticker: "LYX",
    img: "/assets/lukso.svg",
    name: "Lukso Mainnet Token",
    address: "0x2260fac5e5542a773aa44fbcfedf7c193bc2c599",
    decimals: 18,
  },
  {
    ticker: "MATIC",
    img: "/assets/matic.svg",
    name: "Matic Token",
    address: "0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0",
    decimals: 18,
  },
];

export const networkList = [
  {
    network: "Lukso Testnet",
    img: "/assets/lukso.svg",
    chainId: 4201,
    loopsoContractAddress: ADDRESSES.LOOPSO_LUKSO_CONTRACT_ADDRESS,
  },
  {
    network: "Goerli Testnet",
    img: "/assets/eth.svg",
    chainId: 5,
    loopsoContractAddress: "Not yet supported",
  },
  {
    network: "Sepolia Testnet",
    img: "/assets/eth.svg",
    chainId: 11155111,
    loopsoContractAddress: "Not yet supported",
  },
  {
    network: "Mumbai Testnet",
    img: "/assets/matic.svg",
    chainId: 80001,
    loopsoContractAddress: ADDRESSES.LOOPSO_MUMBAI_CONTRACT_ADDRESS,
  },
  {
    network: "Lukso Mainnet",
    img: "/assets/lukso.svg",
    chainId: 42,
    loopsoContractAddress: "Not yet supported",
  },
  {
    network: "Ethereum Mainnet",
    img: "/assets/eth.svg",
    chainId: 1,
    loopsoContractAddress: "Not yet supported",
  },
  {
    network: "Polygon Mainnet",
    img: "/assets/matic.svg",
    chainId: 137,
    loopsoContractAddress: "Not yet supported",
  },
];
