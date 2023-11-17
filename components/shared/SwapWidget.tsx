"use client";

import React, { useEffect, useState } from "react";
import { BadgeInfo, InfinityIcon, MoveDown, Repeat2 } from "lucide-react";
import { ADDRESSES, bridgeTokens } from "loopso-bridge-sdk";
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
import { TransactionResponse, ethers } from "ethers";

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

  const [{ wallet }] = useConnectWallet();

  useEffect(() => {}, [txHash]);

  const handleSubmitAndBridge = async () => {
    //TODO: how to handle if the source network is from Lukso UP wallet?
    if (
      wallet &&
      selectedSourceToken &&
      selectedSourceChainNetwork &&
      selectedDestinationChainNetwork
    ) {
      const ethersProvider = new ethers.BrowserProvider(wallet.provider, "any");
      const signer = await ethersProvider.getSigner();

      const _txHash = await bridgeTokens(
        selectedSourceChainNetwork.loopsoContractAddress,
        signer,
        //TODO: we need to do a helper function for this to scale
        selectedSourceChainNetwork.chainId === 4201
          ? ADDRESSES.LAJOS_TOKEN_ADDRESS_WRAPPED_LUKSO
          : ADDRESSES.LAJOS_TOKEN_ADDRESS_MUMBAI,
        Number(amount),
        wallet?.accounts[0].address,
        selectedDestinationChainNetwork.chainId
      );
      if (_txHash) {
        setTxHash(_txHash?.hash);
        console.log(txHash, "TXHASH");
      } else {
        setTxHash("ERROR: No tx hash");
      }
    }
  };

  return (
    <div className="widget-wrapper">
      <div className="widget-content blue-pink-gradient">
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
          Transaction hash:{txHash}
        </div>
      </div>
    </div>
  );
};

export default SwapWidget;
