import { getProviderBasedOnChainId } from "@/lib/utils";
import { getLoopsoContractFromChainId } from "loopso-bridge-sdk";
import { useEffect, useState } from "react";
import { onboard } from "./web3-onboard";
import { getExplorerUrl } from "@/helpers/getExplorerUrl";

export function useTokensReleased(dstChainId: number | undefined) {
  const [tokensReleased, setTokensReleased] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const loopsoListener = (amount: any, to: any, token: any) => {
    setTokensReleased({ to, amount, token });
    console.log(to, amount, token, "Event fired! Tokens released");

    onboard.state.actions.customNotification({
      eventCode: 'txConfirmed',
      type: 'hint',
      message: `🍾 Tokens Released! 🍾 Click here to view your wallet transactions.`,
      autoDismiss: 100000,
      onClick: () => {
        const explorerUrl = getExplorerUrl(dstChainId, to);
        if (explorerUrl) {
          window.open(explorerUrl);
        }
      }
    })
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
