import { getProviderBasedOnChainId } from "@/lib/utils";
import {
  ADDRESSES,
  ERC20_ABI,
  LOOPSO_ABI,
  getLoopsoContractFromChainId,
} from "loopso-bridge-sdk";
import { useEffect, useState } from "react";
import { onboard } from "../components/apis/web3-onboard";
import { getExplorerUrl } from "@/helpers/getExplorerUrl";

export function useWrappedTokensReleased(dstChainId: number | undefined) {
  const [wrappedTokensReleased, setWrappedTokensReleased] = useState<
    any | null
  >(null);

  // Set up the event listener
  const loopsoListener = (amount: any, to: string, attestationId: any) => {
    setWrappedTokensReleased({ to, amount, attestationId });
    console.log(to, amount, attestationId, "bääää");
  };

  // Trigger notification when wrappedTokensReleased changes
  useEffect(() => {
    if (wrappedTokensReleased && wrappedTokensReleased.to) {
      onboard.state.actions.customNotification({
        eventCode: 'txConfirmed',
        type: 'hint',
        message: `🍾 Wrapped Tokens Released! 🍾 Click here to view your wallet transactions.`,
        autoDismiss: 50000,
        onClick: () => {
          const explorerUrl = getExplorerUrl(dstChainId, wrappedTokensReleased.to);
          if (explorerUrl) {
            window.open(explorerUrl);
          }
        }
      });
    }
  }, [wrappedTokensReleased, dstChainId]);

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
