"use client"

import React, { useEffect, useState } from 'react'
import { ImageDown, InfinityIcon, MoveDown } from 'lucide-react'

import { Button } from "@/components/ui/button"
import SelectBridgeSourceChainModal from '../modal/SelectBridgeSourceChainModal'
import NftList from '../lists/NftList'
import SelectBridgeDestinationChainModal from '../modal/SelectBridgeDestinationChainModal'
import { useConnectWallet, useWallets } from '@web3-onboard/react'
import LspList from '../lists/LspList'
import { networkList } from '@/constants'
import { fadeIn, staggerContainer } from '@/utils/motion'
import { motion } from 'framer-motion'
import { ERC721_ABI, checkAllowance, getLoopsoContractFromChainId, getLoopsoContractFromContractAddr } from 'loopso-bridge-sdk'
import {  TransactionResponse, ethers } from 'ethers'
import { Network } from '@/lib/types'
import { getProviderBasedOnChainId } from '@/lib/utils'

async function checkNftApproval(tokenContract: ethers.Contract, contractAddressSrc: string, tokenId: number): Promise<string | null> {
	const approvalTx = await tokenContract.approve(
		contractAddressSrc,
		tokenId
	)
  
	if (approvalTx){
    return approvalTx
  }else return null

}

async function bridgeNonFungibleTokens(
	contractAddressSrc: string,
	signer: ethers.Signer | ethers.JsonRpcProvider,
	tokenAddress: string,
	dstAddress: string,
	dstChain: number,
  tokenId: number,
  tokenUri: string,
): Promise<TransactionResponse | null> {

	const loopsoContractOnSrc = await getLoopsoContractFromContractAddr(contractAddressSrc, signer)
	const tokenContract = new ethers.Contract(tokenAddress, ERC721_ABI, signer);

	try {
		const approved = await checkNftApproval( tokenContract, contractAddressSrc, tokenId)
    if(approved){
      const bridgeTx = loopsoContractOnSrc?.bridgeNonFungibleTokens(tokenAddress, tokenId, tokenUri, dstChain, dstAddress);
      if (!bridgeTx) {
        throw new Error("Bridge transaction failed");
      }
      return bridgeTx;
    }else{
      throw new Error("Approval failed");
    }

	} catch (error) {
		console.error("Error bridging tokens:", error);
		return null;
	}
}

export interface SelectedNft {
  tokenId: string
  tokenUri: string
  tokenAddress: string
}

const BridgeWidget = () => {
  const [showNftList, setShowNftList] = useState(true);
  const connectedWallets = useWallets();
  const [selectedNft, setSelectedNft] = useState<SelectedNft | null>(null);
  const [selectedSrcNetwork, setSelectedSrcNetwork] = useState<Network | undefined>(
    undefined
  );
  const [selectedDstNetwork, setSelectedDstNetwork] = useState<Network | undefined>(
    undefined
  );
  let isBridgeDisabled = !selectedDstNetwork?.chainId || !selectedSrcNetwork?.chainId || !selectedNft?.tokenId
  const [{ wallet }] = useConnectWallet();




  useEffect(() => {
    const showList = async () => {
      const luksoTestnetChainId = networkList.find((network) => network.network === 'Lukso Testnet')?.chainId;
      const luksoMainnetChainId = networkList.find((network) => network.network === 'Lukso Mainnet')?.chainId;

      const isLuksoChain = connectedWallets.some(e => e.chains[0].id === `0x${luksoTestnetChainId?.toString(16)}` || e.chains[0].id === `0x${luksoMainnetChainId?.toString(16)}`);

      setShowNftList(isLuksoChain);
    };

    showList();
  }, [connectedWallets]);

  console.log(selectedSrcNetwork, 'selectedSrcNetwork', selectedDstNetwork, 'SELECTED NFTTT', selectedNft)

  const handleBridgeClick = async () =>{
    if(selectedNft && selectedSrcNetwork && selectedDstNetwork && wallet){
      const {tokenId , tokenAddress, tokenUri} = selectedNft
      if(tokenId && tokenAddress && tokenUri){
        const {chainId, loopsoContractAddress} = selectedSrcNetwork
        const provider = getProviderBasedOnChainId(chainId)
        const signer = await provider?.getSigner() as ethers.Signer;
        const txHash = bridgeNonFungibleTokens(loopsoContractAddress, signer, tokenAddress, wallet.accounts[0].address, selectedDstNetwork.chainId, Number(tokenId), tokenUri)
        console.log(txHash, 'txHash?')
      }
    }


  }

  return (
    <motion.div 
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.25 }}
      className='widget-wrapper'
    >
      <motion.div 
        variants={fadeIn('up', 'tween', 0.3, 1)} 
        className='widget-content blue-pink-gradient'
      >
        <div className='flex items-center justify-center'>
          <p className='flex flex-col items-center justify-center'>
            <span className='font-semibold'>Bridge NFTs&nbsp;</span> 
            <span className='text-xs'>(Powered by Loopso)</span>
          </p>
        </div>
        <div className='flex items-center mt-5 gap-3 pl-2 w-full'>
          <InfinityIcon />
          <p className='font-semibold text-sm pr-1'>Choose Source Chain</p>  
        </div>
        <div className="h-2"></div>
        <SelectBridgeSourceChainModal selectedNetwork={selectedSrcNetwork} setSelectedNetwork={setSelectedSrcNetwork}/>
        <div className="h-4"></div>
          {showNftList ? <LspList selectedNft={selectedNft} setSelectedNft={setSelectedNft}/> : <NftList selectedNft={selectedNft} setSelectedNft={setSelectedNft}/>}
          <div className="h-2"></div>
          <div className='items-center justify-center flex'>
            <MoveDown className='bg-[#E1E1FF]/50 rounded-3xl p-2 h-9 w-9' />
          </div>
          <div className="h-2"></div>
          <div className='flex items-center gap-6 pl-2'>
            <InfinityIcon />
            <p className='font-semibold text-sm'>Choose Destination Chain</p>
          </div>
          <div className="h-2"></div>
          <SelectBridgeDestinationChainModal  selectedNetwork={selectedDstNetwork} setSelectedNetwork={setSelectedDstNetwork}/>
          <div className="h-4"></div>
        <div className="h-4"></div>
        <div className='items-center justify-center flex'>
          <Button disabled={isBridgeDisabled} onClick={handleBridgeClick}type="submit" className='w-[100%] text-md flex items-center justify-center gap-3'>
            <ImageDown className='h-5 w-5'/>
            Bridge
          </Button>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default BridgeWidget