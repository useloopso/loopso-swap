
import { getProviderBasedOnChainId } from "@/lib/utils";
import { getLoopsoContractFromChainId } from "loopso-bridge-sdk";
import { useEffect, useState } from "react";
import { getExplorerAddress } from "@/helpers/getExplorerAddress";
import { toast } from "sonner";

export function useNonFungibleTokensReleased(dstChainId: number | undefined) {
  const [nonFungibleTokensReleased, setNonFungibleTokensReleased] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const openNewTab = (url: any) => {
    window.open(url, '_blank');
  };

  const loopsoListener = (amount: any, to: any, token: any) => {
    setNonFungibleTokensReleased({ to, amount, token });
    console.log(to, amount, token, "Event fired! Tokens released");

    if (to) {
      console.log("to:", to);
      toast.success(
        <div onClick={() => openNewTab(getExplorerAddress(dstChainId, to))} className='cursor-pointer'>
          <span className='font-semibold'>🍾 Unwrapped Tokens Released 🍾</span>
          <br />
          Click here to view your transaction.
        </div>,
        { duration: 8000 }
      );
    }
  };

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
          loopsoContractOnDstChain.on("NonFungibleTokensReleased", loopsoListener);

          return () => {
            loopsoContractOnDstChain.off("NonFungibleTokensReleased", loopsoListener);
          };
        }
      }
    }
  }, []);

  return {  nonFungibleTokensReleased };
}
