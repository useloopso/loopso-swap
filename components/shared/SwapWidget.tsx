"use client";

import React, { useState } from "react";
import { BadgeInfo, InfinityIcon, MoveDown, Repeat2 } from "lucide-react";
import { bridgeTokens } from "loopso-bridge-sdk";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { networkList, tokenList } from "@/constants/index.js";
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
import useWeb3Onboard from "@/hooks/web3-onboard";
import { useConnectWallet } from "@web3-onboard/react";
import { ethers } from "ethers";
import { providers } from "web3";

const SwapWidget = () => {
  const [selectedSourceChainNetwork, setSelectedSourceChainNetwork] = useState<
    Network | undefined
  >(undefined);
  const [selectedDestinationChainNetwork, setSelectedDestinationChainNetwork] =
    useState<Network | undefined>(undefined);
  const [selectedSourceToken, setSelectedSourceToken] = useState<
    Token | undefined
  >(undefined);
  const [selectedDestinationToken, setSelectedDestinationToken] = useState<
    Token | undefined
  >(undefined);
  const [amount, setAmount] = useState<string>("");

  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();

  console.log(
    selectedSourceChainNetwork,
    "Source chain",
    selectedSourceToken,
    "Source token"
  );
  console.log(
    selectedDestinationChainNetwork,
    "Dst chain",
    selectedDestinationToken,
    "Dst token"
  );

  const handleSubmitAndBridge = async () => {
    let ethersProvider;

    //TODO: how to handle if the wallet is from Lukso UP wallet?
    if (wallet && selectedSourceToken && selectedSourceChainNetwork &&  selectedDestinationChainNetwork) {
      ethersProvider = new ethers.BrowserProvider(wallet.provider, "any");
          const txHash = await bridgeTokens(
        selectedSourceChainNetwork.loopsoContractAddress
        ethersProvider, 
        selectedSourceToken.address,
        selectedSourceChainNetwork.chainId
        amount, 
        "connectedAddress", 
        selectedDestinationChainNetwork.chainId


        
      ); 
    }

    /*     const txHash = await bridgeTokens(
      selectedSourceChainNetwork?.loopsoContractAddress
    ); */
    //console.log(txHash);
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
            <Input placeholder="0.00" type="number" disabled={true} />
            <SelectTokenModal
              selectedToken={selectedDestinationToken}
              setSelectedToken={setSelectedDestinationToken}
            />
          </div>
        </div>
        <div className="h-4"></div>
        <div className="items-center justify-center flex">
          <Button
            onClick={handleSubmitAndBridge}
            type="submit"
            className="w-[100%] text-md flex items-center justify-center gap-3"
          >
            <Repeat2 className="h-5 w-5" />
            Swap
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SwapWidget;
