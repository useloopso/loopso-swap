import { getProviderBasedOnChainId } from "@/lib/utils";
import { JsonRpcProvider, ethers } from "ethers";
import { getLoopsoContractFromChainId } from "loopso-bridge-sdk";
import { useEffect, useState } from "react";
import { onboard } from "./web3-onboard";

export function useTokensReleased(dstChainId: number | undefined) {
  const [tokensReleased, setTokensReleased] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const loopsoListener = (amount: any, to: any, token: any) => {
    setTokensReleased({ to, amount, token });
    console.log(to, amount, token, "Event fired! Tokens released");

    onboard.state.actions.customNotification({
      eventCode: 'txConfirmed',
      type: 'hint',
      message: '👉🏼 Click here to view your transaction.',
      autoDismiss: 100000,
      onClick: () => {
        //TODO: scale this, create a helper function to find explorers based on chainId
        if(dstChainId === 80001) {
          window.open(`https://mumbai.polygonscan.com/address/${tokensReleased.to}`)
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
