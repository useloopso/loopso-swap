import { getProviderBasedOnChainId } from "@/lib/utils";
import { JsonRpcProvider, ethers } from "ethers";
import {
  ADDRESSES,
  ERC20_ABI,
  LOOPSO_ABI,
  getLoopsoContractFromChainId,
} from "loopso-bridge-sdk";
import { useEffect, useState } from "react";

export function useWrappedTokensReleased(dstChainId: number | undefined) {
  const [wrappedTokensReleased, setWrappedTokensReleased] = useState<
    any | null
  >(null);

  // Set up the event listener
  const loopsoListener = (amount: any, to: any, attestationId: any) => {
    setWrappedTokensReleased({ to, amount, attestationId });
    console.log(to, amount, attestationId, "bääää");
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
