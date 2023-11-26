import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import Image from "next/image";
import { ChevronDown, X } from "lucide-react";
import { ERC20Token, NativeToken, Network } from "@/lib/types";
import Moralis from "moralis";
import { useWallets } from "@web3-onboard/react";
import MoralisTokenService from "../apis/moralis-token";
import LuksoTokenService from "../apis/lukso-token";
import { networkList } from "@/constants";
import { Separator } from "../ui/separator";
import MoralisNativeService from "../apis/moralis-native";
import { ethers } from "ethers";

interface SelectTokenModalProps {
  selectedToken: ERC20Token | NativeToken | undefined;
  setSelectedToken: (network: ERC20Token | NativeToken | undefined) => void;
  network: Network | undefined;
}

const SelectTokenModalV2 = (props: SelectTokenModalProps) => {
  const { setSelectedToken, selectedToken, network } = props;
  const [isOpen, setIsOpen] = useState(false);
  const connectedWallets = useWallets();

  const [erc20TokenList, setErc20TokenList] = useState<ERC20Token[]>([]);
  const [nativeTokenList, setNativeTokenList] = useState<NativeToken[]>([]);

  const luksoTestnetChainId = networkList.find(
    (network) => network.network === "Lukso Testnet"
  )?.chainId;
  const goerliTestnetChainId = networkList.find(
    (network) => network.network === "Goerli Testnet"
  )?.chainId;
  const sepoliaTestnetChainId = networkList.find(
    (network) => network.network === "Sepolia Testnet"
  )?.chainId;
  const mumbaiTestnetChainId = networkList.find(
    (network) => network.network === "Mumbai Testnet"
  )?.chainId;
  const ethereumMainnetChainId = networkList.find(
    (network) => network.network === "Ethereum Mainnet"
  )?.chainId;
  const polygonMainnetChainId = networkList.find(
    (network) => network.network === "Polygon Mainnet"
  )?.chainId;

  useEffect(() => {
    const initMoralis = async () => {
      try {
        if (Moralis.Core.isStarted) {
          return;
        }
        await Moralis.start({
          apiKey: process.env.NEXT_PUBLIC_MORALIS_API_KEY,
        });
      } catch (error) {
        console.error("Error Initialising Moralis", error);
      }
    };
    initMoralis();
  }, []);

  const formatTokenBalance = (balance: any, decimals: any) => {
    const divisor = 10 ** decimals;
    const formattedBalance = balance / divisor;
    return formattedBalance.toFixed(4);
  };

  const handleFetchTokens = async () => {
    try {
      setIsOpen(true);
  
      const address = connectedWallets[0]?.accounts[0]?.address;
      
      if (connectedWallets[0]?.chains[0]?.id === `0x${luksoTestnetChainId?.toString(16)}`) {
        const provider = new ethers.BrowserProvider(window.lukso);
        const balance = await provider.getBalance(address);
        const lyxBalance = ethers.formatEther(balance);

        const nativeToken : NativeToken = {
          balance: lyxBalance,
          decimals: 18,
          name: 'Lukso Testnet Token',
          symbol: 'LYXT',
          token_address: '',
          image: '/assets/tokens/lukso.svg',
          isNative: true
        }

        const result = await LuksoTokenService.fetchLuksoTokens(address);
        const formattedTokens = result.map((item: any) => ({
          token_address: item.token.address,
          decimals: item.token.decimals,
          name: item.token.name,
          symbol: item.token.symbol,
          balance: item.value,
          image: "",
          isNative: false
        }));

        setErc20TokenList(formattedTokens);
        setNativeTokenList([nativeToken]);
        console.log("formattedTokens", formattedTokens);
        console.log("nativeToken", nativeToken);

      } else {
        const promises = connectedWallets.map(async (e) => {
          if (e.chains[0].id === `0x${goerliTestnetChainId?.toString(16)}`) {
            const native = await MoralisNativeService.fetchGoerliNative(address);
            const nativeToken : NativeToken = {
              balance: formatTokenBalance(native.balance, 18),
              decimals: 18,
              name: 'Goerli ETH',
              symbol: 'GETH',
              token_address: '0xdD69DB25F6D620A7baD3023c5d32761D353D3De9',
              image: '/assets/tokens/eth.svg',
              isNative: true
            }
            const erc20 = await MoralisTokenService.fetchGoerliTokens(address);
            return { nativeToken, erc20 };

          } else if (e.chains[0].id === `0x${sepoliaTestnetChainId?.toString(16)}`) {
            const native = await MoralisNativeService.fetchSepoliaNative(address);
            const nativeToken : NativeToken = {
              balance: formatTokenBalance(native.balance, 18),
              decimals: 18,
              name: 'Sepolia ETH',
              symbol: 'SETH',
              token_address: '0x7daf26D64a62e2e1dB838C84bCAc5bdDb3b5D926',
              image: '/assets/tokens/eth.svg',
              isNative: true
            }
            const erc20 = await MoralisTokenService.fetchSepoliaTokens(address);
            return { nativeToken, erc20 };

          } else if (e.chains[0].id === `0x${mumbaiTestnetChainId?.toString(16)}`) {
            const native = await MoralisNativeService.fetchMumbaiNative(address);
            const nativeToken : NativeToken = {
              balance: formatTokenBalance(native.balance, 18),
              decimals: 18,
              name: 'Mumbai Testnet Token',
              symbol: 'MATIC',
              token_address: '0x0000000000000000000000000000000000001010',
              image: '/assets/tokens/matic.svg',
              isNative: true
            }
            const erc20 = await MoralisTokenService.fetchMumbaiTokens(address);
            return { nativeToken, erc20 };

          } else if (e.chains[0].id === `0x${ethereumMainnetChainId?.toString(16)}`) {
            const native = await MoralisNativeService.fetchEthereumNative(address);
            const nativeToken : NativeToken = {
              balance: formatTokenBalance(native.balance, 18),
              decimals: 18,
              name: 'Ethereum Mainnet Token',
              symbol: 'ETH',
              token_address: '0x73bFE136fEba2c73F441605752b2B8CAAB6843Ec',
              image: '/assets/tokens/eth.svg',
              isNative: true
            }
            const erc20 = await MoralisTokenService.fetchEthereumTokens(address);
            return { nativeToken, erc20 };

          } else if (e.chains[0].id === `0x${polygonMainnetChainId?.toString(16)}`) {
            const native = await MoralisNativeService.fetchPolygonNative(address);
            const nativeToken : NativeToken = {
              balance: formatTokenBalance(native.balance, 18),
              decimals: 18,
              name: 'Polygon Mainnet Token',
              symbol: 'MATIC',
              token_address: '0x0000000000000000000000000000000000001010',
              image: '/assets/tokens/matic.svg',
              isNative: true
            }
            const erc20 = await MoralisTokenService.fetchPolygonTokens(address);
            return { nativeToken, erc20 };

          }
        });
  
        const results = await Promise.all(promises);
  
        const erc20Tokens = results.flatMap((result) => result?.erc20).filter((token) => token !== undefined) as ERC20Token[];
        const nativeTokens = results.flatMap((result) => result?.nativeToken).filter((token) => token !== undefined) as NativeToken[];
  
        setErc20TokenList(erc20Tokens);
        setNativeTokenList(nativeTokens);

        console.log("erc20tokens", erc20Tokens);
        console.log("nativetokens", nativeTokens);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const closeDialog = () => {
    setIsOpen(false);
  };

  const switchToken = (address: string) => {
    const selectedERC20Token = erc20TokenList.find(token => token.token_address === address);
    const selectedNativeToken = nativeTokenList.find(token => token.token_address === address);
  
    if (selectedERC20Token) {
      setSelectedToken(selectedERC20Token);
    } else if (selectedNativeToken) {
      setSelectedToken(selectedNativeToken);
    }
  
    closeDialog();
  };
  

  return (
    <div>
      <Dialog open={isOpen}>
        <DialogTrigger
          className="p-3 bg-[#85A0FF]/60 rounded-2xl text-white text-sm font-semibold flex w-52 h-12 items-center justify-center hover:bg-[#E1E1FF] hover:text-[#85A0FF]/70"
          onClick={() => handleFetchTokens()}
        >
          <div className="flex items-center justify-center gap-3">
            {selectedToken ? (
              <>
                <Image
                  src={selectedToken.image ? selectedToken.image : "/assets/tokens/loopso-token-2.svg"}
                  alt="NetworkImage"
                  width={25}
                  height={25}
                />
                <span>{selectedToken.symbol}</span>
              </>
            ) : (
              <span>Select Token</span>
            )}
          </div>
          <ChevronDown className="ml-auto w-5 h-5" />
        </DialogTrigger>
        <DialogContent className="circlesDialog">
          <DialogHeader className="flex items-center justify-center gap-3">
            <DialogTitle className="flex ml-auto">
              <X
                className="ml-auto w-4 h-4 cursor-pointer"
                onClick={closeDialog}
              />
            </DialogTitle>
            <DialogTitle>⬇️&nbsp; Select Token &nbsp;⬇️</DialogTitle>
            <DialogDescription>
                <h1 className='font-semibold flex items-center justify-center text-base'>Native Token</h1>
                <Separator />
                <div className="flex items-center justify-center p-4 gap-x-8 gap-y-2">
                    {nativeTokenList.map((token) => (
                        <div
                            className="flex items-center w-52 h-20 gap-3 rounded-3xl cursor-pointer pl-4 bg-[#85A0FF]/70 hover:bg-[#E1E1FF] text-sm text-white hover:text-[#85A0FF]/70 hover:rounded-3xl hover:border hover:border-white"
                            key={token.token_address}
                            onClick={() => switchToken(token.token_address)}
                        >
                            <Image src={token.image} alt="erc20" width={35} height={35} />
                            <div className="flex flex-col">
                                <div className="font-semibold">{token.name}</div>
                                <div className="text-xs">Balance: {token.balance}</div>
                            </div>
                        </div>
                    ))}
                </div>
                <h1 className='font-semibold flex items-center justify-center text-base'>Other Tokens</h1>
                <Separator />
                <div className="grid grid-cols-2 items-center justify-center p-4 gap-x-8 gap-y-2">
                    {erc20TokenList.map((token) => (
                        <div
                            className="flex items-center w-52 h-20 gap-3 rounded-3xl cursor-pointer pl-4 bg-[#85A0FF]/70 hover:bg-[#E1E1FF] text-sm text-white hover:text-[#85A0FF]/70 hover:rounded-3xl hover:border hover:border-white"
                            key={token.token_address}
                            onClick={() => switchToken(token.token_address)}
                        >
                            <Image src="/assets/tokens/loopso-token-2.svg" alt="erc20" width={35} height={35} />
                            <div className="flex flex-col">
                                <div className="font-semibold">{token.name}</div>
                                <div className="text-xs">Balance: {formatTokenBalance(token.balance, token.decimals)}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SelectTokenModalV2;
