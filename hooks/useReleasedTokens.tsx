import { getProviderBasedOnChainId } from "@/lib/utils";
import { JsonRpcProvider, ethers } from "ethers";
import { getLoopsoContractFromChainId } from "loopso-bridge-sdk";
import { useEffect, useState } from "react";

export function useTokensReleased(dstChainId: number | undefined) {
  const [tokensReleased, setTokensReleased] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const loopsoListener = (amount: any, to: any, attestationId: any) => {
    setTokensReleased({ to, amount, attestationId });
    console.log(to, amount, attestationId, "bääää");
  };
  //TODO: this component not done/thought thru yet

  useEffect(() => {
    if (dstChainId) {
      const ethersProvider = getProviderBasedOnChainId(dstChainId);

      if (ethersProvider) {
        const loopsoContractOnDstChain = getLoopsoContractFromChainId(
          dstChainId,
          ethersProvider
        );

        if (loopsoContractOnDstChain) {
          // attach the event listener
          loopsoContractOnDstChain.on("TokensReleased", loopsoListener);

          return () => {
            loopsoContractOnDstChain.off("TokensReleased", loopsoListener);
          };
        }
      }
    }
  }, []);

  return { tokensReleased };
}
