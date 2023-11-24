import { getProviderBasedOnChainId } from "@/lib/utils";
import {
  getLoopsoContractFromChainId,
} from "loopso-bridge-sdk";
import { useEffect, useState } from "react";
import { onboard } from "./web3-onboard";

export function useWrappedNonFungibleTokensReleased(dstChainId: number | undefined) {
  const [wrappedNonFungibleTokensReleased, setWrappedNonFungibleTokensReleased] = useState<
    any | null
  >(null);

  

  // Set up the event listener
  const loopsoListener = (amount: any, to: any, attestationId: any) => {
    setWrappedNonFungibleTokensReleased({ to, amount, attestationId });
    console.log(to, amount, attestationId, "Event fired! Wrapped Non Fungible Tokens Released");
    onboard.state.actions.customNotification({
      eventCode: 'txConfirmed',
      type: 'hint',
      message: '👉🏼 Click here to view your transaction.',
      autoDismiss: 100000,
      onClick: () => {
        //TODO: scale this, create a helper function to find explorers based on chainId
        if(dstChainId === 4201) {
          window.open(`https://explorer.execution.testnet.lukso.network/address/${wrappedNonFungibleTokensReleased?.to}?tab=token_transfers`)
        } 
      }
    }); 
  };

  useEffect(() => {

    if (dstChainId) {
      console.log("Dstchain event:", dstChainId);
      const ethersProvider = getProviderBasedOnChainId(dstChainId);

      if (ethersProvider) {
        const loopsoContractOnDstChain = getLoopsoContractFromChainId(
          dstChainId,
          ethersProvider
        );

        if (loopsoContractOnDstChain) {
          console.log("loopsocontract event:", loopsoContractOnDstChain);

          // Attach the event listener
          loopsoContractOnDstChain.on("WrappedNonFungibleTokensReleased", loopsoListener);

          // Clean up the event listener when the component unmounts
          return () => {
            loopsoContractOnDstChain.off(
              "WrappedNonFungibleTokensReleased",
              loopsoListener
            );
          };
        }
      }
    }
  }, [dstChainId]);

  return { wrappedNonFungibleTokensReleased};
}
