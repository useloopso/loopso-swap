import { ethers } from "ethers";
import { ADDRESSES, LOOPSO_ABI } from "loopso-bridge-sdk";
import { useEffect, useState } from "react";

export function useReleasedTokens(dstChainId: number | undefined) {
  const [wrappedTokensReleased, setWrappedTokensReleased] = useState<
    any | null
  >(null);
  const [tokensReleased, setTokensReleased] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Set up the event listener
  const luksoListener = (amount: any, to: any, attestationId: any) => {
    setWrappedTokensReleased({ to, amount, attestationId });
    console.log(to, amount, attestationId, "bääää");
  };

  useEffect(() => {
    const ethersProvider = new ethers.JsonRpcProvider(
      "https://lukso-testnet.rpc.thirdweb.com"
    );
    const loopsoContractOnLukso = new ethers.Contract(
      ADDRESSES.LOOPSO_LUKSO_CONTRACT_ADDRESS,
      LOOPSO_ABI,
      ethersProvider
    );

    // Attach the event listener
    loopsoContractOnLukso.on("WrappedTokensReleased", luksoListener);

    // Clean up the event listener when the component unmounts
    return () => {
      loopsoContractOnLukso.off("WrappedTokensReleased", luksoListener);
    };
  }, []);

  /* useEffect(() => {
    const fetchData = async () => {
      try {
        let rpc =
          dstChainId === 80001
            ? "https://polygon-mumbai.g.alchemy.com/v2/demo"
            : "https://lukso-testnet.rpc.thirdweb.com";
        const ethersProvider = new ethers.JsonRpcProvider(rpc);

        if (!wrappedTokensReleased || !tokensReleased) {
          if (dstChainId === 4201) {
            console.log("GETTING INTO LUKSO", rpc);

            const loopsoContractOnLukso = new ethers.Contract(
              ADDRESSES.LOOPSO_LUKSO_CONTRACT_ADDRESS,
              LOOPSO_ABI,
              ethersProvider
            );

            // Attach the event listener
            loopsoContractOnLukso.on("WrappedTokensReleased", luksoListener);

            // Clean up the event listener when the component unmounts
            return () => {
              loopsoContractOnLukso.off("WrappedTokensReleased", luksoListener);
            };
          } else if (dstChainId === 80001) {
            console.log("GETTING INTO MUMBAI");
            const loopsoContractOnMumbai = new ethers.Contract(
              ADDRESSES.LOOPSO_MUMBAI_CONTRACT_ADDRESS,
              LOOPSO_ABI,
              ethersProvider
            );

            // Set up the event listener
            const listener = (amount: any, to: any, token: string) => {
              setTokensReleased({ to, amount, token });
              console.log(to, amount, token, "bää");
            };

            // Attach the event listener
            loopsoContractOnMumbai.on("TokensReleased", listener);

            // Clean up the event listener when the component unmounts
            return () => {
              loopsoContractOnMumbai.off("TokensReleased", listener);
            };
          }
        }
      } catch (error) {
        console.log(error, "Error fetching token metadata");
      }
    };

    fetchData();
  }, [wrappedTokensReleased, tokensReleased, dstChainId]);
 */
  return { wrappedTokensReleased };
}
