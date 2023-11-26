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
    isNative: false

  },
  {
    ticker: "USDC",
    img: "/assets/tokens/usdc.svg",
    name: "USD Coin",
    address: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
    decimals: 6,
    isNative: false

  },
  {
    ticker: "USDT",
    img: "/assets/tokens/usdt.svg",
    name: "Tether USD",
    address: "0xdac17f958d2ee523a2206206994597c13d831ec7",
    decimals: 6,
    isNative: false

  },
  {
    ticker: "WETH",
    img: "/assets/tokens/weth.svg",
    name: "Wrapped Ethereum",
    address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
    decimals: 18,
    isNative: false

  },
  {
    ticker: "LYX",
    img: "/assets/tokens/lukso.svg",
    name: "Lukso Testnet Token",
    address: "0x2260fac5e5542a773aa44fbcfedf7c193bc2c599",
    decimals: 18,
    isNative: true

  },
  {
    ticker: "WMATIC",
    img: "/assets/tokens/matic.svg",
    name: "Wrapped Matic Token",
    address: ADDRESSES.WRAPPED_MATIC_ADDRESS_MUMBAI,
    decimals: 18,
    isNative: false
  },
  {
    ticker: "MATIC",
    img: "/assets/tokens/matic.svg",
    name: "Matic Token",
    address: ADDRESSES.WRAPPED_MATIC_ADDRESS_MUMBAI,
    isNative: true,
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
    isNative: false
  },

  {
    ticker: "USDC",
    img: "/assets/tokens/usdc.svg",
    name: "USD Coin",
    address: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
    decimals: 6,
    isNative: false

  },
  {
    ticker: "USDT",
    img: "/assets/tokens/usdt.svg",
    name: "Tether USD",
    address: "0xdac17f958d2ee523a2206206994597c13d831ec7",
    decimals: 6,
    isNative: false

  },
  {
    ticker: "WETH",
    img: "/assets/tokens/weth.svg",
    name: "Wrapped Ethereum",
    address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
    decimals: 18,
    isNative: false

  },
  {
    ticker: "WLYXt",
    img: "/assets/tokens/lukso.svg",
    name: "Lukso Wrapped Testnet Token",
    address: ADDRESSES.WRAPPED_LYX_ADDRESS_LUKSO,
    decimals: 18,
    isNative: false

  },
  {
    ticker: "LYXt",
    img: "/assets/tokens/lukso.svg",
    name: "Lukso Testnet Token",
    address: ADDRESSES.WRAPPED_LYX_ADDRESS_LUKSO,
    decimals: 18,
    isNative: true
  },
  {
    ticker: "WMATIC",
    img: "/assets/tokens/matic.svg",
    name: "Wrapped Matic Token",
    address: ADDRESSES.WRAPPED_MATIC_ADDRESS_MUMBAI,
    decimals: 18,
    isNative: false
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
    title: 'Best Rate 🤑',
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
  'Transfer tokens between Sepolia, Lukso Testnet, and Mumbai by locking them on the source chain',
  'This triggers a rapid minting process on the destination chain through the Loopso Bridge Messaging Relayer',
  'VOILA! 🚀 You will receive a confirmation that your tokens have been successfully bridged and released❗️',
];

export const integrations = [
  {
    imgUrl: '/assets/main/sdk.png',
    linkUrl:'https://www.npmjs.com/package/loopso-bridge-sdk',
    title: '🛠 Bridge SDK 🛠',
    subtitle:
        'Projects can integrate Loopso Bridge using our open-sourced npm SDK and build their custom UI on top of it.',
  },
  {
    imgUrl: '/assets/main/widget.png',
    linkUrl:'https://github.com/useloopso',
    title: '🧩 Swap Widget 🧩',
    subtitle:
        'Enable cross-chain swaps on your website seamlessly by integrating Loopso <Widget /> into your codebase. ❗️ COMING SOON ❗️',
  },
];

export const placeholderImg = "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/310px-Placeholder_view_vector.svg.png"