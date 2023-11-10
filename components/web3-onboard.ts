import Onboard, { OnboardAPI } from '@web3-onboard/core'
import injectedModule from '@web3-onboard/injected-wallets'
import luksoModule from '@lukso/web3-onboard-config'
import { ConnectModalOptions } from '@web3-onboard/core/dist/types'

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

export const chains = [
  {
    id: 4201,
    token: 'LYXt',
    label: 'LUKSO Testnet',
    rpcUrl: 'https://rpc.testnet.lukso.network',
  },
  {
    id: 5,
    token: 'GoerliETH',
    label: 'Goerli Testnet',
    rpcUrl: 'https://rpc.ankr.com/eth_goerli',
  },
  {
    id: 11155111,
    token: 'SepoliaETH',
    label: 'Sepolia Testnet',
    rpcUrl: 'https://sepolia.infura.io/v3/',
  },
  {
    id: 80001,
    token: 'MATIC',
    label: 'Mumbai Testnet',
    rpcUrl: 'https://rpc-mumbai.maticvigil.com',
  },
  {
    id: 42,
    token: 'LYX',
    label: 'LUKSO Mainnet',
    rpcUrl: 'https://rpc.mainnet.lukso.network/',
  },
  {
    id: 1,
    token: 'ETH',
    label: 'Ethereum Mainnet',
    rpcUrl: 'https://mainnet.infura.io/v3/',

  },
  {
    id: 137,
    token: 'MATIC',
    label: 'Polygon Mainnet',
    rpcUrl: 'https://polygon.llamarpc.com',
  },
]

const LoopsoIcon = "/assets/logo.svg"

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

const connect: ConnectModalOptions = {
  iDontHaveAWalletLink:
    'https://chrome.google.com/webstore/detail/universal-profiles/abpickdkkbnbcoepogfhkhennhfhehfn?hl=en',
  removeWhereIsMyWalletWarning: true,
}

let onboard: OnboardAPI

const setupWeb3Onboard = async () => {
  onboard = Onboard({
    wallets,
    chains,
    appMetadata,
    connect,
  })
  const connectedWallets = await onboard.connectWallet()
  return connectedWallets[0]
}

const disconnect = async (): Promise<void> => {
  const [primaryWallet] = onboard.state.get().wallets
  await onboard.disconnectWallet({ label: primaryWallet.label })
}

const setChainId = async (chainHex: string): Promise<void> => {
  await onboard.setChain({ chainId: chainHex })
}

const isWalletConnected = (): boolean => {
  const currentState = onboard.state.get();
  return Boolean(currentState.wallets && currentState.wallets.length > 0);
};

export default function useWeb3Onboard() {
  return {
    disconnect,
    setChainId,
    setupWeb3Onboard,
    isWalletConnected,
  }
}