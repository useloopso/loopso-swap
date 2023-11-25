import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Separator } from "../ui/separator";
import { SelectedNft } from "../shared/BridgeWidget";

interface NftCardProps {
  tokenId: string;
  tokenAddress: string;
  tokenUri: string;
  tokenName: string;
  tokenSymbol: string;
  amount?: number;
  metadata?: NftMetadata;
  setSelectedNft: (selectedNft: SelectedNft | null) => void;
  selectedNft: SelectedNft | null;
}

interface NftMetadata {
  name: string;
  description: string;
  image: string;
}

const NftCard = ({
  tokenId,
  tokenAddress,
  tokenUri,
  tokenName,
  tokenSymbol,
  amount,
  metadata,
  selectedNft,
  setSelectedNft,
}: NftCardProps) => {
  const imageSrc = metadata?.image || "";
  const description = metadata?.description || "";
  const [isSelected, setIsSelected] = useState(false);

  const handleClick = () => {
    // Unselect the previous NFT if there was one selected
    if (selectedNft) {
      setSelectedNft(null);
    }

    // Select the new NFT or unselect if it was already selected
    const newSelectedState = !isSelected;
    setIsSelected(newSelectedState);

    setSelectedNft(newSelectedState ? {
      id: tokenId,
      contractAddress: tokenAddress,
      metadata: {
        description: metadata?.description || "",
        image: metadata?.image || "",
        name: tokenName,
      },
      tokenId,
      tokenUri,
      tokenAddress,
    } : null);
  };

  return (
    <div
      onClick={handleClick}
      className={`w-[200px] h-[250px] flex-shrink-0 shadow-md mb-5 rounded-3xl hover:scale-110 transition-all mt-[20px] p-3 cursor-pointer flex flex-col text-black bg-[#E1E1FF] hover:bg-[#85A0FF]/70 hover:text-white ${
        isSelected ? "selectedNft" : "bg-[#E1E1FF]"
      }`}
    >
      <div className="flex items-center justify-center">
        <Image
          src={imageSrc}
          alt="NFT"
          width={110}
          height={110}
          className="nftImage rounded-lg"
        />
      </div>
      <div className="h-2"></div>
      <div className="flex text-sm font-semibold">
        <span>{tokenSymbol}</span>
        <span className="ml-auto">#{tokenId}</span>
      </div>
      <Separator />
      <div className="h-2"></div>
      <div className="text-xs font-semibold">{tokenName}</div>
      <div className="h-2"></div>
    </div>
  );
};

export default NftCard;
