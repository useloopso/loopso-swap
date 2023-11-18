import { chains } from "@/hooks/web3-onboard";
import { type ClassValue, clsx } from "clsx"
import { JsonRpcProvider, ethers } from "ethers";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getProviderBasedOnChainId(chainId: number): JsonRpcProvider | null {
  const selectedChain = chains.find((chain) => chain.id === chainId);

  if (!selectedChain) {
    return null;
  }

  const ethersProvider = new ethers.JsonRpcProvider(selectedChain.rpcUrl);
  return ethersProvider;
}