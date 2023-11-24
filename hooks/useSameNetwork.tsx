import { useEffect } from "react";
import { Network } from "@/lib/types";

export function useSameNetwork(
  srcNetwork: Network | undefined,
  dstNetwork: Network | undefined,
  onSameNetwork: () => void
) {
  useEffect(() => {
    if (srcNetwork && dstNetwork && srcNetwork.chainId === dstNetwork.chainId) {
      onSameNetwork();
    }
  }, [srcNetwork, dstNetwork, onSameNetwork]);
}
