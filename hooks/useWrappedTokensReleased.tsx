import { getProviderBasedOnChainId } from "@/lib/utils";
import { JsonRpcProvider, ethers } from "ethers";
import {
  ADDRESSES,
  ERC20_ABI,
  LOOPSO_ABI,
  getLoopsoContractFromChainId,
} from "loopso-bridge-sdk";
import { useEffect, useState } from "react";
import { onboard } from "./web3-onboard";

export function useWrappedTokensReleased(dstChainId: number | undefined) {
  const [wrappedTokensReleased, setWrappedTokensReleased] = useState<
    any | null
  >(null);

  // Set up the event listener
  const loopsoListener = (amount: any, to: any, attestationId: any) => {
    setWrappedTokensReleased({ to, amount, attestationId });
    console.log(to, amount, attestationId, "bääää");
    onboard.state.actions.customNotification({
      eventCode: 'txConfirmed',
      type: 'hint',
      message: '👉🏼 Click here to view your transaction.',
      autoDismiss: 100000,
      onClick: () => {
        //TODO: scale this, create a helper function to find explorers based on chainId
        if(dstChainId === 4201) {
          window.open(`https://explorer.execution.testnet.lukso.network/address/${wrappedTokensReleased?.to}?tab=token_transfers`)
        } 
      }
    })
  };

  useEffect(() => {
    console.log("Dstchain event 1:", dstChainId);

    if (dstChainId) {
      console.log("Dstchain event:", dstChainId);
      const ethersProvider = getProviderBasedOnChainId(dstChainId);

      if (ethersProvider) {
        console.log("provider event:", ethersProvider);

        const loopsoContractOnDstChain = getLoopsoContractFromChainId(
          dstChainId,
          ethersProvider
        );

        if (loopsoContractOnDstChain) {
          console.log("loopsocontract event:", loopsoContractOnDstChain);

          // Attach the event listener
          loopsoContractOnDstChain.on("WrappedTokensReleased", loopsoListener);

          // Clean up the event listener when the component unmounts
          return () => {
            loopsoContractOnDstChain.off(
              "WrappedTokensReleased",
              loopsoListener
            );
          };
        }
      }
    }
  }, [dstChainId]);

  return { wrappedTokensReleased };
}
