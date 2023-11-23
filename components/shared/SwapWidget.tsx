"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fadeIn, staggerContainer } from "@/utils/motion";
import { BadgeInfo, InfinityIcon, MoveDown, Repeat2 } from "lucide-react";
import {
  ADDRESSES,
  ERC20_ABI,
  LOOPSO_ABI,

  checkTokenAllowance,
  getLoopsoContractFromContractAddr,
} from "loopso-bridge-sdk";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import SelectTokenModal from "../modal/SelectTokenModal";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import SelectSourceChainModal from "../modal/SelectSourceChainModal";
import SelectDestinationChainModal from "../modal/SelectDestinationChainModal";
import { Network, Token } from "@/lib/types";
import { useConnectWallet, useWallets } from "@web3-onboard/react";
import { TransactionResponse, ethers } from "ethers";
import { useWrappedTokensReleased } from "@/hooks/useWrappedTokensReleased";
import { onboard } from "@/hooks/web3-onboard";

 async function bridgeTokens(
	contractAddressSrc: string,
	signer: ethers.Signer,
	tokenAddress: string,
	amount: bigint,
	dstAddress: string,
	dstChain: number
): Promise<TransactionResponse | null> {
	const loopsoContractOnSrc = await getLoopsoContractFromContractAddr(
		contractAddressSrc,
		signer
	);
	const tokenContract = new ethers.Contract(tokenAddress, ERC20_ABI, signer);

	try {
		let convertedAmount = amount * BigInt(10 ** 18);
		await checkTokenAllowance(signer,tokenContract,contractAddressSrc,convertedAmount);

    if(loopsoContractOnSrc){
      
      const bridgeTx = loopsoContractOnSrc.bridgeTokens(
        tokenAddress,
        convertedAmount,
        dstChain,
        dstAddress
      );
      if (!bridgeTx) {
        throw new Error("Bridge transaction failed");
      }
      return bridgeTx;
    }else return null
	

	} catch (error) {
		console.error("Error bridging tokens:", error);
		return null;
	}
}

async function bridgeTokensBack(
	contractAddress: string,
	signerOrProvider: ethers.Signer | ethers.JsonRpcProvider,
	tokenId: number,
	dstAddress: string,
	attestationId: number
) {
	const loopsoContract = new ethers.Contract(
		contractAddress,
		LOOPSO_ABI,
		signerOrProvider
	);
	return loopsoContract.bridgeTokensBack(tokenId, dstAddress, attestationId);
}


const SwapWidget = () => {
  const [selectedSourceChainNetwork, setSelectedSourceChainNetwork] = useState<
    Network | undefined
  >(undefined);
  const [selectedDestinationChainNetwork, setSelectedDestinationChainNetwork] =
    useState<Network | undefined>(undefined);
  const [selectedSourceToken, setSelectedSourceToken] = useState<
    Token | undefined
  >(undefined);

  const [amount, setAmount] = useState<string>("");
  const [txHash, setTxHash] = useState<string>("");
  const [showSuccessfull, setShowSuccessfull] = useState<string>("");

  const connectedWallets = useWallets();
  const [connectedWallet, setConnectedWallet] = useState(connectedWallets[0]);

  const { wrappedTokensReleased } = useWrappedTokensReleased(
    selectedDestinationChainNetwork?.chainId
  );

  const [{ wallet }] = useConnectWallet();
  useEffect(() => {
    if (wrappedTokensReleased?.to) {
      setShowSuccessfull(
        "Success, your tokens have been bridged and released!"
      );
      onboard.state.actions.customNotification({
        eventCode: 'txConfirmed',
        type: 'hint',
        message: '👉🏼 Click here to view your transaction.',
        autoDismiss: 100000,
        onClick: () => {
          //TODO: scale this, create a helper function to find explorers based on chainId
          if(selectedDestinationChainNetwork?.chainId === 4201) {
            window.open(`https://explorer.execution.testnet.lukso.network/${wrappedTokensReleased?.to}`)
          } 
        }
      })
    }
  }, [txHash, wrappedTokensReleased]);

  const handleSubmitAndBridge = async () => {
    //TODO: how to handle if the source network is from Lukso UP wallet?
    if (
      wallet &&
      selectedSourceToken &&
      selectedSourceChainNetwork &&
      selectedDestinationChainNetwork
    ) {
      let isOnLukso = connectedWallet?.label === "Universal Profiles"
      const ethersProvider = new ethers.BrowserProvider(isOnLukso ? window.lukso : wallet.provider);
      const signer = await ethersProvider.getSigner();
     
      const _txHash = await bridgeTokens(
        selectedSourceChainNetwork.loopsoContractAddress,
        signer,
        selectedSourceToken.address,
        BigInt(amount),
        wallet?.accounts[0].address,
        selectedDestinationChainNetwork.chainId
      );

      if (_txHash) {
        setTxHash(_txHash?.hash);
        onboard.state.actions.customNotification({
          eventCode: 'txPool',
          type: 'hint',
          message: '👉🏼 Click here to view your transaction.',
          autoDismiss: 100000,
          onClick: () => {
            //TODO: scale this, create a helper function to find explorers based on chainId
            if(selectedSourceChainNetwork.chainId === 80001) {
              window.open(`https://mumbai.polygonscan.com/tx/${_txHash?.hash}`)
            } 
          }
        })
        console.log(txHash, "TXHASH");
      } else {
        setTxHash("ERROR: No tx hash");
        onboard.state.actions.customNotification({
          eventCode: 'txError',
          type: 'error',
          message: '🛑 Error! Transaction failed.',
          autoDismiss: 10000
        })
      }
    }
  };

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.25 }}
      className="widget-wrapper"
    >
      <motion.div
        variants={fadeIn("up", "tween", 0.3, 1)}
        className="widget-content blue-pink-gradient"
      >
        <div className="flex items-center justify-center">
          <p className="flex flex-col items-center justify-center">
            <span className="font-semibold">Swap Tokens&nbsp;</span>
            <span className="text-xs">(Powered by Loopso)</span>
          </p>
        </div>
        <div className="flex items-center mt-5 gap-3 pl-2">
          <InfinityIcon />
          <p className="font-semibold text-sm pr-1">From</p>
          <SelectSourceChainModal
            setSelectedNetwork={setSelectedSourceChainNetwork}
            selectedNetwork={selectedSourceChainNetwork}
          />
        </div>
        <div className="h-4"></div>
        <div className="swap-content">
          <p className="font-semibold text-xs pl-1 pt-3">Send:</p>
          <div className="flex items-center pt-3">
            <Input
              placeholder="0.00"
              type="number"
              className="placeholder:hover:text-[#85A0FF]/70"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <SelectTokenModal
              network={selectedSourceChainNetwork}
              selectedToken={selectedSourceToken}
              setSelectedToken={setSelectedSourceToken}
            />
          </div>
        </div>
        <div className="h-2"></div>
        <div className="items-center justify-center flex">
          <MoveDown className="bg-[#E1E1FF]/50 rounded-3xl p-2 h-9 w-9" />
        </div>
        <div className="h-2"></div>
        <div className="flex items-center gap-6 pl-2">
          <InfinityIcon />
          <p className="font-semibold text-sm">To</p>
          <SelectDestinationChainModal
            setSelectedNetwork={setSelectedDestinationChainNetwork}
            selectedNetwork={selectedDestinationChainNetwork}
          />
        </div>
        <div className="h-4"></div>
        <div className="swap-content">
          <div className="flex items-center pl-1 pt-3 gap-1">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <BadgeInfo className="w-4 h-4" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>
                    This amount is estimated based on the current bridge rate
                    and fees.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <p className="font-semibold text-xs">Receive (estimated):</p>
          </div>
          <div className="flex items-center pt-3">
            <Input
              value={amount}
              placeholder="0.00"
              type="number"
              disabled={true}
            />
          </div>
        </div>
        <div className="h-4"></div>
        <div className="items-center justify-center flex">
          <Button
            disabled={
              !selectedDestinationChainNetwork ||
              !selectedSourceChainNetwork ||
              !selectedSourceToken
            }
            onClick={handleSubmitAndBridge}
            type="submit"
            className="w-[100%] text-md flex items-center justify-center gap-3"
          >
            <Repeat2 className="h-5 w-5" />
            Swap
          </Button>
        </div>
        <div className="items-center justify-center flex-col">
          Transaction hash:{txHash}
          <br></br>
          <br></br>
          Success: {showSuccessfull}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SwapWidget;
