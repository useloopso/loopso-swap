"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fadeIn, staggerContainer } from "@/utils/motion";
import { BadgeInfo, InfinityIcon, MoveDown, Repeat2 } from "lucide-react";
import { bridgeTokens} from "loopso-bridge-sdk";
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
import { useConnectWallet } from "@web3-onboard/react";
import {  ethers } from "ethers";
import { useWrappedTokensReleased } from "@/hooks/useWrappedTokensReleased";
import { onboard } from "@/hooks/web3-onboard";
import { useTokensReleased } from "@/hooks/useReleasedTokens";
import { useSameNetwork } from "@/hooks/useSameNetwork";


const SwapWidget = () => {
  const [selectedSourceChainNetwork, setSelectedSourceChainNetwork] = useState<Network | undefined>(undefined);
  const [selectedDestinationChainNetwork, setSelectedDestinationChainNetwork] =useState<Network | undefined>(undefined);
  const [selectedSourceToken, setSelectedSourceToken] = useState<Token | undefined>(undefined);

  const [amount, setAmount] = useState<string>("");
  const [txHash, setTxHash] = useState<string>("");

  const receiveAmount = (parseFloat(amount) * 0.995).toFixed(2);
  const fee = (parseFloat(amount) * 0.005).toFixed(2);

  const [{ wallet }] = useConnectWallet();
  const [connectedWallet, setConnectedWallet] = useState(wallet);

  const { wrappedTokensReleased } = useWrappedTokensReleased(
    selectedDestinationChainNetwork?.chainId
  );
  const { tokensReleased } = useTokensReleased(
    selectedDestinationChainNetwork?.chainId
  );

  const handleSameNetwork = () => {
    window.alert("Source and Destination networks should not be the same.");
    setSelectedDestinationChainNetwork(undefined);
  };

  useSameNetwork(selectedSourceChainNetwork, selectedDestinationChainNetwork, handleSameNetwork);

  useEffect(() => {
    const showFee  =async ()=>{
      //const _fee = await getFee(contractAddressDst, signer, true) //TODO: show on the frontend the fee
      //setFee(_fee)
    }
  }, [txHash, wrappedTokensReleased, tokensReleased]);


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
              onChange={(e) => {
                const inputValue = e.target.value.replace(/[^0-9.]/g, '');
                if (
                  selectedSourceChainNetwork &&
                  selectedSourceToken &&
                  selectedDestinationChainNetwork
                ) {
                  setAmount(inputValue);
                }
              }}
              disabled={
                !selectedSourceChainNetwork ||
                !selectedSourceToken ||
                !selectedDestinationChainNetwork
              }
            />
            <div className={selectedSourceChainNetwork ? '' : 'disabled-modal'}>
              <SelectTokenModal
                network={selectedSourceChainNetwork}
                selectedToken={selectedSourceToken}
                setSelectedToken={setSelectedSourceToken}
              />
            </div>
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
          <div className={selectedSourceChainNetwork && selectedSourceToken ? '' : 'disabled-modal'}>
            <SelectDestinationChainModal
              setSelectedNetwork={setSelectedDestinationChainNetwork}
              selectedNetwork={selectedDestinationChainNetwork}
            />
          </div>
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
                    This amount is estimated based on the current bridge rate and fees.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <p className="font-semibold text-xs">Receive (estimated):</p>
          </div>
          <div className="flex items-center pt-3">
            <Input
              value={receiveAmount}
              placeholder="0.00"
              type="number"
              disabled={true}
            />
          </div>
          {amount ? 
          <p className="text-xs pt-2 ml-1"><span className='font-semibold'>Bridge Fee:&nbsp;</span>{fee}</p>
          : null }
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
    
      </motion.div>
    </motion.div>
  );
};

export default SwapWidget;
