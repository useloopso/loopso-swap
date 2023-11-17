import { useConnectWallet } from "@web3-onboard/react";
import { ethers } from "ethers";
import { ADDRESSES, LOOPSO_ABI } from "loopso-bridge-sdk";
import { useState, useEffect } from "react";

export function useListenToBridgeSuccessfull(dstChainId: number) {
  const [wrappedTokensReleased, setWrappedTokensReleased] = useState<
    any | null
  >(null);
  const [tokensReleased, setTokensReleased] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [{ wallet }] = useConnectWallet();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if ((!wrappedTokensReleased && wallet) || (!tokensReleased && wallet)) {
          if (dstChainId === 4201) {
            //TODO: scale this to more chains, need a helper function for that
            const loopsoContractOnLukso = new ethers.Contract(
              ADDRESSES.LOOPSO_LUKSO_CONTRACT_ADDRESS,
              LOOPSO_ABI
            );

            loopsoContractOnLukso.on(
              "WrappedTokensReleased",
              (amount, to, attestationId) => {
                setWrappedTokensReleased({ to, amount, attestationId });
                console.log(to, amount, attestationId);
              }
            );
          } else if (dstChainId === 80001) {
            const loopsoContractOnMumbai = new ethers.Contract(
              ADDRESSES.LOOPSO_MUMBAI_CONTRACT_ADDRESS,
              LOOPSO_ABI
            );

            loopsoContractOnMumbai.on("TokensReleased", (amount, to, token) => {
              setTokensReleased({ to, amount, token });
              console.log(to, amount, token);
            });
          }
        }
      } catch (error) {
        console.log(error, "Error fetching token metadata");
      }
    };
    fetchData();
  }, [wrappedTokensReleased]);
  return { wrappedTokensReleased, loading };
}

export default useListenToBridgeSuccessfull;
