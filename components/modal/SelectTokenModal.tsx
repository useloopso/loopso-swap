import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import Image from "next/image";
import { ChevronDown, X } from "lucide-react";
import { tokenList } from "@/constants/index.js";
import { Separator } from "../ui/separator";
import { Token } from "@/lib/types";

interface SelectTokenModalProps {
  selectedToken: Token | undefined;
  setSelectedToken: (network: Token | undefined) => void;
}

const SelectTokenModal = (props: SelectTokenModalProps) => {
  const { setSelectedToken, selectedToken } = props;
  const [isOpen, setIsOpen] = useState(false);

  const closeDialog = () => {
    setIsOpen(false);
  };

  const switchToken = (i: any) => {
    setSelectedToken(tokenList[i]);
    closeDialog();
  };

  return (
    <div>
      <Dialog open={isOpen}>
        <DialogTrigger
          className="p-3 bg-[#85A0FF]/60 rounded-2xl text-white text-sm font-semibold flex w-40 h-12 items-center justify-center hover:bg-[#E1E1FF] hover:text-[#85A0FF]/70"
          onClick={() => setIsOpen(true)}
        >
          <div className="flex items-center justify-center gap-3">
            {selectedToken ? (
              <>
                <Image
                  src={selectedToken.img}
                  alt="NetworkImage"
                  width={15}
                  height={15}
                />
                <span>{selectedToken.ticker}</span>
              </>
            ) : (
              <span>Select Token</span>
            )}
          </div>
          <ChevronDown className="ml-auto w-5 h-5" />
        </DialogTrigger>
        <DialogContent className="circlesDialog">
          <DialogHeader className="flex items-center justify-center gap-3">
            <DialogTitle className="flex ml-auto">
              <X
                className="ml-auto w-4 h-4 cursor-pointer"
                onClick={closeDialog}
              />
            </DialogTitle>
            <DialogTitle>⬇️&nbsp; Select Token &nbsp;⬇️</DialogTitle>
            <DialogDescription>
              <div className="grid grid-cols-2 items-center justify-center p-4 gap-x-8 gap-y-2">
                {tokenList?.map((e, i) => (
                  <div
                    className="flex items-center w-52 h-16 gap-3 rounded-3xl cursor-pointer pl-4 bg-[#85A0FF]/70 hover:bg-[#E1E1FF] text-sm text-white hover:text-[#85A0FF]/70 hover:rounded-3xl hover:border hover:border-white"
                    key={i}
                    onClick={() => switchToken(i)}
                  >
                    <Image src={e.img} alt={e.ticker} width={20} height={20} />
                    <div className="">
                      <div className="font-semibold">{e.name}</div>
                      <div className="text-xs">{e.ticker}</div>
                    </div>
                  </div>
                ))}
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SelectTokenModal;
