import { getProviderBasedOnChainId } from "@/lib/utils";
import {
  getLoopsoContractFromChainId,
} from "loopso-bridge-sdk";
import { useEffect, useState } from "react";

export function useWrappedNonFungibleTokensReleased(dstChainId: number | undefined) {
  const [wrappedNonFungibleTokensReleased, setWrappedNonFungibleTokensReleased] = useState<
    any | null
  >(null);

  

  // Set up the event listener
  const loopsoListener = (amount: any, to: any, attestationId: any) => {
    setWrappedNonFungibleTokensReleased({ to, amount, attestationId });
    console.log(to, amount, attestationId, "bääää");
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
