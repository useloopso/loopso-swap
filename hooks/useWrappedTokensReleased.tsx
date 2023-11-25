import { getProviderBasedOnChainId } from "@/lib/utils";
import {
  ADDRESSES,
  ERC20_ABI,
  LOOPSO_ABI,
  getLoopsoContractFromChainId,
} from "loopso-bridge-sdk";
import { useEffect, useState } from "react";
import { getExplorerAddress } from "@/helpers/getExplorerAddress";
import { toast } from "sonner";

export function useWrappedTokensReleased(dstChainId: number | undefined) {
  const [wrappedTokensReleased, setWrappedTokensReleased] = useState<
    any | null
  >(null);

  const openNewTab = (url: any) => {
    window.open(url, '_blank');
  };

  // Set up the event listener
  const loopsoListener = (amount: any, to: string, attestationId: any) => {
    setWrappedTokensReleased({ to, amount, attestationId });
    console.log(to, amount, attestationId, "bääää");
  
    if (to) {
      toast.success(
        <div onClick={() => openNewTab(getExplorerAddress(dstChainId, to))} className='cursor-pointer'>
          <span className='font-semibold'>🍾 Wrapped Tokens Released 🍾</span>
          <br />
          Click here to view your transaction.
        </div>,
        { duration: 8000 }
      );
    }
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
