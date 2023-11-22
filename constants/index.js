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

export const tokenListForMumbai = [
  {
    ticker: "$L$",
    img: "/assets/tokens/lajosToken.png",
    name: "Lajos Token",
    decimals: 18,
    address: ADDRESSES.LAJOS_TOKEN_ADDRESS_MUMBAI,
    //chainId:
  },

  {
    ticker: "USDC",
    img: "/assets/tokens/usdc.svg",
    name: "USD Coin",
    address: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
    decimals: 6,
  },
  {
    ticker: "USDT",
    img: "/assets/tokens/usdt.svg",
    name: "Tether USD",
    address: "0xdac17f958d2ee523a2206206994597c13d831ec7",
    decimals: 6,
  },
  {
    ticker: "WETH",
    img: "/assets/tokens/weth.svg",
    name: "Wrapped Ethereum",
    address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
    decimals: 18,
  },
  {
    ticker: "LYX",
    img: "/assets/tokens/lukso.svg",
    name: "Lukso Mainnet Token",
    address: "0x2260fac5e5542a773aa44fbcfedf7c193bc2c599",
    decimals: 18,
  },
  {
    ticker: "MATIC",
    img: "/assets/tokens/matic.svg",
    name: "Matic Token",
    address: "0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0",
    decimals: 18,
  },
];

export const tokenListForLukso = [
  {
    ticker: "$L$",
    img: "/assets/tokens/wrappedLajosToken.png",
    name: "Wrapped Lajos Token",
    decimals: 18,
    address: ADDRESSES.LAJOS_TOKEN_ADDRESS_WRAPPED_LUKSO,
    //chainId:
  },

  {
    ticker: "USDC",
    img: "/assets/tokens/usdc.svg",
    name: "USD Coin",
    address: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
    decimals: 6,
  },
  {
    ticker: "USDT",
    img: "/assets/tokens/usdt.svg",
    name: "Tether USD",
    address: "0xdac17f958d2ee523a2206206994597c13d831ec7",
    decimals: 6,
  },
  {
    ticker: "WETH",
    img: "/assets/tokens/weth.svg",
    name: "Wrapped Ethereum",
    address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
    decimals: 18,
  },
  {
    ticker: "LYX",
    img: "/assets/tokens/lukso.svg",
    name: "Lukso Mainnet Token",
    address: "0x2260fac5e5542a773aa44fbcfedf7c193bc2c599",
    decimals: 18,
  },
  {
    ticker: "MATIC",
    img: "/assets/tokens/matic.svg",
    name: "Matic Token",
    address: "0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0",
    decimals: 18,
  },
];

export const networkList = [
  {
    network: "Lukso Testnet",
    img: "/assets/tokens/lukso.svg",
    chainId: 4201,
    loopsoContractAddress: ADDRESSES.LOOPSO_LUKSO_CONTRACT_ADDRESS,
  },
  {
    network: "Goerli Testnet",
    img: "/assets/tokens/eth.svg",
    chainId: 5,
    loopsoContractAddress: "Not yet supported",
  },
  {
    network: "Sepolia Testnet",
    img: "/assets/tokens/eth.svg",
    chainId: 11155111,
    loopsoContractAddress: "Not yet supported",
  },
  {
    network: "Mumbai Testnet",
    img: "/assets/tokens/matic.svg",
    chainId: 80001,
    loopsoContractAddress: ADDRESSES.LOOPSO_MUMBAI_CONTRACT_ADDRESS,
  },
  {
    network: "Lukso Mainnet",
    img: "/assets/tokens/lukso.svg",
    chainId: 42,
    loopsoContractAddress: "Not yet supported",
  },
  {
    network: "Ethereum Mainnet",
    img: "/assets/tokens/eth.svg",
    chainId: 1,
    loopsoContractAddress: "Not yet supported",
  },
  {
    network: "Polygon Mainnet",
    img: "/assets/tokens/matic.svg",
    chainId: 137,
    loopsoContractAddress: "Not yet supported",
  },
];

export const whyLoopso = [
  {
    id: 'reason-1',
    iconUrl: '/assets/main/reason-1.png',
    imgUrl: '/assets/main/bg-1.png',
    title: 'Permissionless 🤫',
    content: 'Loopso offers a frictionless and open interoperability experience between blockchains.'
  },
  {
    id: 'reason-2',
    iconUrl: '/assets/main/reason-2.png',
    imgUrl: '/assets/main/bg-2.png',
    title: 'Token Agnostic 🤝',
    content: 'Swap flexibly to all token standards only at Loopso.'
  },
  {
    id: 'reason-3',
    iconUrl: '/assets/main/reason-3.png',
    imgUrl: '/assets/main/bg-3.png',
    title: 'Best Rate 🙌🏻',
    content: 'Loopso offers the best swap rate for all tokens.'
  },
  {
    id: 'reason-4',
    iconUrl: '/assets/main/reason-4.png',
    imgUrl: '/assets/main/bg-4.png',
    title: 'Cross-chain 🔗',
    content: 'Seamlessly swap your assets across different blockchains.'
  },
  {
    id: 'reason-5',
    iconUrl: '/assets/main/reason-5.png',
    imgUrl: '/assets/main/bg-5.png',
    title: 'Fast Transactions ⚡️',
    content: 'Transactions are confirmed and sent withing 30 seconds.'
  },
];

export const howItWorks = [
  'Find a world that suits you and you want to enter',
  'Enter the world by reading basmalah to be safe',
  'No need to beat around the bush, just stay on the gas and have fun',
];

export const insights = [
  {
    imgUrl: '/main/planet-06.png',
    title: 'The launch of the Metaverse makes Elon musk ketar-ketir',
    subtitle:
        'Magna etiam tempor orci eu lobortis elementum nibh tellus molestie. Diam maecenas sed enim ut sem viverra alique.',
  },
  {
    imgUrl: '/main/planet-07.png',
    title: '7 tips to easily master the madness of the Metaverse',
    subtitle:
        'Vitae congue eu consequat ac felis donec. Et magnis dis parturient montes nascetur ridiculus mus. Convallis tellus id interdum',
  },
  {
    imgUrl: '/main/planet-08.png',
    title: 'With one platform you can explore the whole world virtually',
    subtitle:
        'Quam quisque id diam vel quam elementum. Viverra nam libero justo laoreet sit amet cursus sit. Mauris in aliquam sem',
  },
];

export const socials = [
  {
    name: 'twitter',
    url: '/main/twitter.svg',
  },
  {
    name: 'linkedin',
    url: '/main/linkedin.svg',
  },
  {
    name: 'instagram',
    url: '/main/instagram.svg',
  },
  {
    name: 'facebook',
    url: '/main/facebook.svg',
  },
];