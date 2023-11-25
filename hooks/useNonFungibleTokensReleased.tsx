
import { getExplorerAddress } from "@/helpers/getExplorerAddress";
import { getProviderBasedOnChainId } from "@/lib/utils";
import {
  getLoopsoContractFromChainId,
} from "loopso-bridge-sdk";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export function useNonFungibleTokensReleased(dstChainId: number | undefined) {
  const [nonFungibleTokensReleased, setNonFungibleTokensReleased] = useState<any | null>(null);

  const openNewTab = (url: any) => {
    window.open(url, '_blank');
  };

  // Set up the event listener
  const loopsoListener = (amount: any, to: any, attestationId: any) => {
    setNonFungibleTokensReleased({ to, amount, attestationId });
    console.log(to, amount, attestationId, "Event fired! Wrapped Non Fungible Tokens Released");
    if (to) {
      toast.success(
        <div onClick={() => openNewTab(getExplorerAddress(dstChainId, to))} className='cursor-pointer'>
          <span className='font-semibold'>🍾 Wrapped NFT Released 🍾</span>
          <br />
          Click here to view your transaction.
        </div>,
        { duration: 8000 }
      );
    }
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
          loopsoContractOnDstChain.on("NonFungibleTokensReleased", loopsoListener);

          // Clean up the event listener when the component unmounts
          return () => {
            loopsoContractOnDstChain.off(
              "NonFungibleTokensReleased",
              loopsoListener
            );
          };
        }
      }
    }
  }, [dstChainId]);

  return { nonFungibleTokensReleased};
}

