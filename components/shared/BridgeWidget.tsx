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
import { ADDRESSES, ERC721_ABI,  LOOPSO_ABI,  getLoopsoContractFromChainId, getLoopsoContractFromContractAddr } from 'loopso-bridge-sdk'
import {  TransactionResponse, ethers } from 'ethers'
import { Network } from '@/lib/types'
import { getProviderBasedOnChainId } from '@/lib/utils'
import { onboard } from '@/hooks/web3-onboard'
import { useWrappedNonFungibleTokensReleased } from '@/hooks/useWrappedNonFungibleTokensReleased'

async function checkNftApproval(signer: ethers.Signer, erc721Contract: ethers.Contract, contractAddressSrc: string, tokenId: number): Promise<string | null> {
  const hasApproved = await erc721Contract.getApproved(tokenId)
  //if(hasApproved === await signer.getAddress())
  const approvalTx = await erc721Contract.approve(
		contractAddressSrc,
		tokenId
	)
  
	if (approvalTx){
    return approvalTx
  }else return null

}

const FEE_ABI = [
	"function FEE_NON_FUNGIBLE() external view returns (uint256 memory)",
	"function FEE_FUNGIBLE() external view returns (uint256 memory)",
];

async function getFee(
	contractAddressDst: string,
	signerOrProvider: ethers.Signer | ethers.JsonRpcProvider,
	isFungible: boolean
): Promise<number> {
	const destLoopsoContract = new ethers.Contract(
		contractAddressDst,
		LOOPSO_ABI,
		signerOrProvider
	);

	if (isFungible) {
		const bpFee: number = await destLoopsoContract.FEE_FUNGIBLE();
		const decimalFee = bpFee / 10000;
		return decimalFee;
	} else {
		const etherFee: number = await destLoopsoContract.FEE_NON_FUNGIBLE();
		return etherFee;
	}
}

async function bridgeNonFungibleTokens(
	contractAddressSrc: string,
	signer: ethers.Signer,
	tokenAddress: string,
	dstAddress: string,
	dstChain: number,
  tokenId: number,
  tokenUri: string,
): Promise<any | null> {

	const loopsoContractOnSrc = await getLoopsoContractFromContractAddr(contractAddressSrc, signer)
  console.log(dstChain, 'wats dstChain?')
  const contractAddressDst = await getContractAddressFromChainId(dstChain)


	 const erc721Contract = new ethers.Contract(tokenAddress, ERC721_ABI, signer);
	try {
		const approved = await checkNftApproval(signer, erc721Contract, contractAddressSrc, tokenId)
    if(approved && loopsoContractOnSrc && contractAddressDst){
      const fee = await getFee(contractAddressDst, signer, true)
      const isWrappedTokenInfo = await loopsoContractOnSrc.wrappedTokenInfo(tokenAddress)
      console.log(Object.values(isWrappedTokenInfo), 'is wrapped tokeninfo?', contractAddressDst, signer, false, 'BÄÄÄ')
   
      const bridgeTx = await loopsoContractOnSrc.bridgeNonFungibleTokens(tokenAddress, tokenId, tokenUri, dstChain, dstAddress, { value: 10 });


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


function getContractAddressFromChainId(chainId: number): string | null {
	let contractAddress: string | null = null;

	switch (chainId) {
		case 4201:
			contractAddress = ADDRESSES.LOOPSO_LUKSO_CONTRACT_ADDRESS;
			break;
		case 80001:
			contractAddress = ADDRESSES.LOOPSO_MUMBAI_CONTRACT_ADDRESS;
			break;
		// TODO: add more cases as you deploy on more chains
		default:
			// return null if no matching case
			break;
	}

	if (contractAddress) {
		return contractAddress;
	} else {
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
  const [selectedSrcNetwork, setSelectedSrcNetwork] = useState<Network | undefined>(undefined);
  const [selectedDstNetwork, setSelectedDstNetwork] = useState<Network | undefined>(undefined);
  const [txHash, setTxHash] = useState<string>("");

  let isBridgeDisabled = !selectedDstNetwork?.chainId || !selectedSrcNetwork?.chainId || !selectedNft?.tokenId
  const [showSuccessfull, setShowSuccessfull] = useState<string>("");
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

  const { wrappedNonFungibleTokensReleased   } = useWrappedNonFungibleTokensReleased(
    selectedDstNetwork?.chainId
  );

  useEffect(() => {
    if (wrappedNonFungibleTokensReleased?.to) {
      setShowSuccessfull(
        "Success, your NFT tokens have been bridged and released!"
      );
      onboard.state.actions.customNotification({
        eventCode: 'txConfirmed',
        type: 'hint',
        message: '👉🏼 Click here to view your transaction.',
        autoDismiss: 100000,
        onClick: () => {
          //TODO: scale this, create a helper function to find explorers based on chainId
          if(selectedDstNetwork?.chainId === 4201) {
            window.open(`https://explorer.execution.testnet.lukso.network/tx/${_txHash?.hash}`)
          } 
        }
      }); 
    }
  }, [txHash, wrappedNonFungibleTokensReleased]);
  


  const handleBridgeClick = async () =>{
    if(selectedNft && selectedSrcNetwork && selectedDstNetwork && wallet){
      const {tokenId , tokenAddress, tokenUri} = selectedNft
      if(tokenId && tokenAddress && tokenUri){
        const ethersProvider = new ethers.BrowserProvider(wallet.provider, "any");
        const signer = await ethersProvider.getSigner();
        const _txHash = await bridgeNonFungibleTokens(selectedSrcNetwork.loopsoContractAddress, signer, tokenAddress, wallet.accounts[0].address, selectedDstNetwork.chainId, Number(tokenId), tokenUri)
        console.log(selectedSrcNetwork.loopsoContractAddress, signer, tokenAddress, wallet.accounts[0].address, selectedDstNetwork.chainId, Number(tokenId), tokenUri, 'DATAAAA SENT THRU')
        
        console.log(txHash, 'txHash?')

        if (_txHash) {
          onboard.state.actions.customNotification({
            eventCode: 'txPool',
            type: 'hint',
            message: '👉🏼 Click here to view your transaction.',
            autoDismiss: 100000,
            onClick: () => {
              //TODO: scale this, create a helper function to find explorers based on chainId
              if(selectedSrcNetwork.chainId === 80001) {
                window.open(`https://mumbai.polygonscan.com/tx/${_txHash?.hash}`)
              } 
            }
          })
        } else {
          onboard.state.actions.customNotification({
            eventCode: 'txError',
            type: 'error',
            message: '🛑 Error! Transaction failed.',
            autoDismiss: 10000
          })
        }
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
        <div className="items-center justify-center flex-col">
          Transaction hash:{txHash} {showSuccessfull}
          <br></br>
          <br></br>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default BridgeWidget