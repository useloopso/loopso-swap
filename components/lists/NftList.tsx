import React, { useEffect, useRef, useState } from "react";
import Moralis from "moralis";
import { useWallets } from "@web3-onboard/react";
import MoralisService from "@/hooks/moralis-nft";
import { Button } from "../ui/button";
import NftCard from "../cards/NftCard";
import { networkList } from "@/constants";
import { ArrowBigLeftDash, ArrowBigRightDash } from "lucide-react";
import { SelectedNft } from "../shared/BridgeWidget";

interface NftMetadata {
  name: string;
  description: string;
  image: string;

}

interface NftListProps {
  setSelectedNft: (selectedNft: SelectedNft) => void
  selectedNft: SelectedNft | null
}
const NftList = (props: NftListProps) => {
  const {setSelectedNft, selectedNft} = props
  const connectedWallets = useWallets();
  const [nftCards, setNftCards] = useState<React.ReactNode[]>([]);

  const [defaultState, setDefaultState] = useState<string>(
    "⬆️ Retrieve NFTs from selected network ⬆️"
  );

  console.log(selectedNft, "SELECTED NFT IS?");

  const goerliTestnetChainId = networkList.find(
    (network) => network.network === "Goerli Testnet"
  )?.chainId;
  const sepoliaTestnetChainId = networkList.find(
    (network) => network.network === "Sepolia Testnet"
  )?.chainId;
  const mumbaiTestnetChainId = networkList.find(
    (network) => network.network === "Mumbai Testnet"
  )?.chainId;
  const ethereumMainnetChainId = networkList.find(
    (network) => network.network === "Ethereum Mainnet"
  )?.chainId;
  const polygonMainnetChainId = networkList.find(
    (network) => network.network === "Polygon Mainnet"
  )?.chainId;


  useEffect(() => {
    const initMoralis = async () => {
      console.log(process.env.NEXT_PUBLIC_MORALIS_API_KEY, "I API KEY");

      try {
        if (Moralis.Core.isStarted) {
          return;
        }

        await Moralis.start({
          apiKey: process.env.NEXT_PUBLIC_MORALIS_API_KEY,
        });
      } catch (error) {
        console.error("Error Initialising Moralis", error);
      }
    };
    initMoralis();
  }, [selectedNft]);

  const handleFetchNFTs = async () => {
    try {
      const address = connectedWallets[0]?.accounts[0]?.address;

      const promises = connectedWallets.map(async (e) => {
        if (e.chains[0].id === `0x${goerliTestnetChainId?.toString(16)}`) {
          return await MoralisService.fetchGoerliNFTs(address);
        } else if (
          e.chains[0].id === `0x${sepoliaTestnetChainId?.toString(16)}`
        ) {
          return await MoralisService.fetchSepoliaNFTs(address);
        } else if (
          e.chains[0].id === `0x${mumbaiTestnetChainId?.toString(16)}`
        ) {
          return await MoralisService.fetchMumbaiNFTs(address);
        } else if (
          e.chains[0].id === `0x${ethereumMainnetChainId?.toString(16)}`
        ) {
          return await MoralisService.fetchEthereumNFTs(address);
        } else if (
          e.chains[0].id === `0x${polygonMainnetChainId?.toString(16)}`
        ) {
          return await MoralisService.fetchPolygonNFTs(address);
        }
      });

      const results = await Promise.all(promises);

      console.log("Results:", results);

      const nftCards = results.flat().map((nft, index) => (
        <div className="rounded-3xl" key={index}>
          <NftCard
            selectedNft={selectedNft}
            setSelectedNft={setSelectedNft}
            key={nft?.tokenHash?.toString()}
            tokenId={nft?.tokenId.toString() || ""}
            tokenAddress={nft?.tokenAddress?.toJSON?.() || ""}
            tokenUri={nft?.tokenUri?.toString() || ""}
            tokenName={nft?.tokenName?.toString() || ""}
            tokenSymbol={nft?.tokenSymbol?.toString() || ""}
            amount={nft?.amount ? parseInt(nft?.amount.toString()) : undefined}
            metadata={nft?.metadata as NftMetadata | undefined}
          />
        </div>
      ));

      setNftCards(nftCards);

      if (nftCards.length === 0) {
        setDefaultState("🚨 No NFTs found on this network 🚨");
      } else {
        setDefaultState("⬆️ Retrieve NFTs from selected network ⬆️");
      }
    } catch (error) {
      console.error("Error fetching NFTs:", error);
      setDefaultState("Error fetching NFTs");
    }
  };

  const elementRef = useRef(null);

  const slideRight = (element: any) => {
    element.scrollLeft += 500;
  };
  const slideLeft = (element: any) => {
    element.scrollLeft -= 500;
  };

  return (
    <div className="w-full">
      <div className="h-1"></div>
      <Button onClick={handleFetchNFTs} className="w-full">
        Retrieve Assets
      </Button>
      <div className="h-4"></div>
      {nftCards.length === 0 ? (
        <p className="flex items-center justify-center text-sm font-semibold">
          {defaultState}
        </p>
      ) : (
        <div>
          {nftCards.length > 3 ? (
            <>
              <div className="flex items-center justify-center">
                <ArrowBigLeftDash
                  onClick={() => slideLeft(elementRef.current)}
                  className="relative w-8 h-8 cursor-pointer bg-[#85A0FF]/70 rounded-full text-white p-1 hover:bg-[#E1E1FF] hover:text-[#85A0FF]/70"
                />
                <div
                  className="ml-5 mr-5 w-[90%] flex gap-5 mb-2 overflow-x-auto overflow-scroll scroll-smooth"
                  ref={elementRef}
                >
                  {nftCards}
                </div>
                <ArrowBigRightDash
                  onClick={() => slideRight(elementRef.current)}
                  className="relative w-8 h-8 cursor-pointer ml-auto bg-[#85A0FF]/70 rounded-full text-white p-1 hover:bg-[#E1E1FF] hover:text-[#85A0FF]/70"
                />
              </div>
            </>
          ) : (
            <>
              <div className="flex gap-5 ml-10 mr-10 items-center justify-center">
                {nftCards}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default NftList;
