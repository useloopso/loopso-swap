"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fadeIn, staggerContainer } from "@/utils/motion";
import { BadgeInfo, InfinityIcon, MoveDown, Repeat2 } from "lucide-react";
import { ERC20_ABI, bridgeTokens, checkTokenAllowance, getAttestationIDHash, getContractAddressFromChainId, getLoopsoContractFromContractAddr, getWrappedTokenInfo, wrapNativeToken } from "loopso-bridge-sdk";
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
import { ERC20Token, NativeToken, Network, Token } from "@/lib/types";
import { useConnectWallet, useWallets } from "@web3-onboard/react";
import {  TransactionResponse, ethers } from "ethers";
import { useWrappedTokensReleased } from "@/hooks/useWrappedTokensReleased";
import { useTokensReleased } from "@/hooks/useTokensReleased";
import { useSameNetwork } from "@/hooks/useSameNetwork";
import { toast } from 'sonner'
import { getExplorerTransaction } from "@/helpers/getExplorerTransaction";
import SelectTokenModalV2 from "../modal/SelectTokenModalV2";




const SwapWidget = () => {
  const [selectedSourceChainNetwork, setSelectedSourceChainNetwork] = useState<Network | undefined>(undefined);
  const [selectedDestinationChainNetwork, setSelectedDestinationChainNetwork] = useState<Network | undefined>(undefined);
  const [selectedSourceToken, setSelectedSourceToken] = useState<ERC20Token | NativeToken | undefined>(undefined);

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

  const openNewTab = (url: any) => {
    window.open(url, '_blank');
  };

  useEffect(() => {

  }, [txHash, wrappedTokensReleased, tokensReleased]);

  const handleSubmitAndBridge = async () => {
    if (!wallet || !selectedSourceToken || !selectedSourceChainNetwork || !selectedDestinationChainNetwork) {
      // Handle missing values or conditions
      return;
    }
  
    let isOnLukso = connectedWallet?.label === "Universal Profiles";
    const ethersProvider = new ethers.BrowserProvider(isOnLukso ? window.lukso : wallet.provider);
    const signer = await ethersProvider.getSigner();
  
    let _txHash: TransactionResponse | null = null; 
  
    try {
      if (selectedSourceToken.isNative) {
        const wrappedTx = await wrapNativeToken(signer, selectedSourceChainNetwork.chainId, BigInt(amount));
        if (!wrappedTx) {
          throw new Error("Failed to wrap native token");
        }
      }
  
      _txHash = await bridgeTokens(
        selectedSourceChainNetwork.loopsoContractAddress,
        signer,
        selectedSourceToken.token_address,
        BigInt(amount),
        wallet?.accounts[0].address,
        selectedDestinationChainNetwork.chainId
      );
    } catch (error) {
      console.error("Error bridging tokens:", error);
    }
  
    if (_txHash) {
      setTxHash(_txHash.hash);
      toast.info(
        <div onClick={() => openNewTab(getExplorerTransaction(selectedSourceChainNetwork.chainId, _txHash!.hash ))} className='cursor-pointer'>
          <span className='font-semibold'>🍻 Transaction Created 🍻</span>
          <br />
          Click here to view your transaction.
        </div>,
        { duration: 8000 }
      );
    } else {
      setTxHash("ERROR: No tx hash");
      toast.error(
        <div>
          🛑 Something went wrong. Please try again.
        </div>,
        { duration: 8000 }
      );
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
              {/* <SelectTokenModal
                network={selectedSourceChainNetwork}
                selectedToken={selectedSourceToken}
                setSelectedToken={setSelectedSourceToken}
              /> */}
              <SelectTokenModalV2 
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
          <p className="text-xs pt-2 ml-1">
            <span className='font-semibold'>Bridge Fee:&nbsp;</span>
            {fee}
          </p>
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
