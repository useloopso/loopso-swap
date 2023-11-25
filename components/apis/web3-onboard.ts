import Onboard, { OnboardAPI } from '@web3-onboard/core'
import injectedModule from '@web3-onboard/injected-wallets'
import luksoModule from '@lukso/web3-onboard-config'
import { AccountCenterOptions, ConnectModalOptions, Notify } from '@web3-onboard/core/dist/types'
import { ADDRESSES } from 'loopso-bridge-sdk'

const lukso = luksoModule()

const injected = injectedModule({
  custom: [lukso],
  sort: wallets => {
    const sorted = wallets.reduce<any[]>((sorted, wallet) => {
      if (wallet.label === 'Universal Profiles') {
        sorted.unshift(wallet)
      } else {
        sorted.push(wallet)
      }
      return sorted
    }, [])
    return sorted
  },
  displayUnavailable: ['Universal Profiles'],
})

const wallets = [injected]

const INFURA_KEY = process.env.NEXT_PUBLIC_INFURA_API_KEY
const BLOCKNATIVE_KEY = process.env.NEXT_PUBLIC_BLOCKNATIVE_API_KEY

export const chains = [
  {
    id: 4201,
    token: 'LYXt',
    label: 'Lukso Testnet',
    rpcUrl: "https://rpc.testnet.lukso.gateway.fm",
    secondaryTokens: [
      {
        address: ADDRESSES.LAJOS_TOKEN_ADDRESS_MUMBAI,
        icon: "/assets/tokens/lajosToken.png",
      },
      {
        address: ADDRESSES.LAJOS_TOKEN_ADDRESS_WRAPPED_LUKSO,
        icon: "/assets/tokens/wrappedLajosToken.png"
      }
    ]
  },
  {
    id: 5,
    token: 'GoerliETH',
    label: 'Goerli Testnet',
    rpcUrl: `https://goerli.infura.io/v3/${INFURA_KEY}`,
    secondaryTokens: [
      {
        address: ADDRESSES.LAJOS_TOKEN_ADDRESS_MUMBAI,
        icon: "/assets/tokens/lajosToken.png",
      },
      {
        address: ADDRESSES.LAJOS_TOKEN_ADDRESS_WRAPPED_LUKSO,
        icon: "/assets/tokens/wrappedLajosToken.png"
      }
    ]
  },
  {
    id: 11155111,
    token: 'SepoliaETH',
    label: 'Sepolia Testnet',
    rpcUrl: `https://sepolia.infura.io/v3/${INFURA_KEY}`,
    secondaryTokens: [
      {
        address: ADDRESSES.LAJOS_TOKEN_ADDRESS_MUMBAI,
        icon: "/assets/tokens/lajosToken.png",
      },
      {
        address: ADDRESSES.LAJOS_TOKEN_ADDRESS_WRAPPED_LUKSO,
        icon: "/assets/tokens/wrappedLajosToken.png"
      }
    ]
  },
  {
    id: 80001,
    token: 'MATIC',
    label: 'Mumbai Testnet',
    rpcUrl: `https://polygon-mumbai.infura.io/v3/${INFURA_KEY}`,
    secondaryTokens: [
      {
        address: ADDRESSES.LAJOS_TOKEN_ADDRESS_MUMBAI,
        icon: "/assets/tokens/lajosToken.png",
      },
      {
        address: ADDRESSES.LAJOS_TOKEN_ADDRESS_WRAPPED_LUKSO,
        icon: "/assets/tokens/wrappedLajosToken.png"
      }
    ]
  },
  {
    id: 42,
    token: 'LYX',
    label: 'Lukso Mainnet',
    rpcUrl: "https://rpc.mainnet.lukso.network/",
    secondaryTokens: [
      {
        address: ADDRESSES.LAJOS_TOKEN_ADDRESS_MUMBAI,
        icon: "/assets/tokens/lajosToken.png",
      },
      {
        address: ADDRESSES.LAJOS_TOKEN_ADDRESS_WRAPPED_LUKSO,
        icon: "/assets/tokens/wrappedLajosToken.png"
      }
    ]
  },
  {
    id: 1,
    token: 'ETH',
    label: 'Ethereum Mainnet',
    rpcUrl: `https://mainnet.infura.io/v3/${INFURA_KEY}`,
    secondaryTokens: [
      {
        address: ADDRESSES.LAJOS_TOKEN_ADDRESS_MUMBAI,
        icon: "/assets/tokens/lajosToken.png",
      },
      {
        address: ADDRESSES.LAJOS_TOKEN_ADDRESS_WRAPPED_LUKSO,
        icon: "/assets/tokens/wrappedLajosToken.png"
      }
    ]
  },
  {
    id: 137,
    token: 'MATIC',
    label: 'Polygon Mainnet',
    rpcUrl: `https://mainnet.infura.io/v3/${INFURA_KEY}`,
    secondaryTokens: [
      {
        address: ADDRESSES.LAJOS_TOKEN_ADDRESS_MUMBAI,
        icon: "/assets/tokens/lajosToken.png",
      },
      {
        address: ADDRESSES.LAJOS_TOKEN_ADDRESS_WRAPPED_LUKSO,
        icon: "/assets/tokens/wrappedLajosToken.png"
      }
    ]
  },
]

const LoopsoIcon = "/assets/logos/logo.svg"

const appMetadata = {
  name: 'Loopso Swap',
  icon: LoopsoIcon,
  logo: LoopsoIcon,
  description: 'Loop into the New Creative Economy',
  recommendedInjectedWallets: [
    {
      name: 'Universal Profiles',
      url: 'https://chrome.google.com/webstore/detail/universal-profiles/abpickdkkbnbcoepogfhkhennhfhehfn?hl=en',
    },
  ],
}

const accountCenter: AccountCenterOptions = {
  desktop: {
    position: 'bottomRight',
    enabled: true,
    minimal: false
  },
  mobile: {
    position: 'bottomRight',
    enabled: true,
    minimal: true
  }
}


const notify: Notify = {
  enabled: false,
  transactionHandler: transaction => {
    return false;
  },
  position: 'bottomLeft',
};


const connect: ConnectModalOptions = {
  iDontHaveAWalletLink:
    'https://chrome.google.com/webstore/detail/universal-profiles/abpickdkkbnbcoepogfhkhennhfhehfn?hl=en',
  removeWhereIsMyWalletWarning: true,
  autoConnectLastWallet: true,
  autoConnectAllPreviousWallet: true,
}

export const onboard = Onboard({
  apiKey: BLOCKNATIVE_KEY,
  wallets,
  chains,
  appMetadata,
  accountCenter,
  notify,
  connect,
})

const connectWallet = async () => {
  const wallets = await onboard.connectWallet()
  return wallets[0]
}

const disconnectWallet = async (): Promise<void> => {
  const [primaryWallet] = onboard.state.get().wallets
  await onboard.disconnectWallet({ label: primaryWallet.label })
}

const setChainId = async (chainHex: string): Promise<void> => {
  await onboard.setChain({ chainId: chainHex })
}

export default function useWeb3Onboard() {
  return {
    connectWallet,
    disconnectWallet,
    setChainId,
  }
}