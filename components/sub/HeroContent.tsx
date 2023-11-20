"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  slideInFromLeft,
  slideInFromRight,
  slideInFromTop,
} from "@/utils/motion";
import { SparklesIcon } from "@heroicons/react/24/solid";
import CodeBlock from "./CodeBlock";
import { ImageDown, Repeat2 } from "lucide-react";

const HeroContent = () => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className="flex flex-row items-center justify-center px-20 mt-40 w-full z-[20]"
    >
      <div className="h-full w-full flex flex-col gap-5 justify-center m-auto text-start">
        <motion.div
          variants={slideInFromTop}
          className="Welcome-box py-[10px] px-[10px] border border-white opacity-[0.9]"
        >
          <SparklesIcon className="text-white mr-[10px] h-5 w-5" />
          <h1 className="text-[13px] text-white font-semibold">
            Public Beta
          </h1>
        </motion.div>

        <motion.div
          variants={slideInFromLeft(0.5)}
          className="flex flex-col gap-6 mt-6 text-6xl font-bold text-white max-w-[600px] w-auto h-auto drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.5)]"
        >
          <span>
          <span className="text-[#FDDCE8]">
              {" "}Cross-chain <br/> {" "}
            </span>
            <span className="text-[#E1E1FF]">
              {" "} Bi-directional {" "}
            </span>
            Bridge on Lukso
          </span>
        </motion.div>

        <motion.p
          variants={slideInFromLeft(0.8)}
          className="text-lg text-white my-5 max-w-[600px] font-semibold drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.5)]"
        >
          Bridge Tokens within 30 seconds only at&nbsp;
          <span className='text-[#E1E1FF]'>LOOPSO 🤯</span>
        </motion.p>
        <div className='flex gap-5 items-center'>
          <motion.a
            variants={slideInFromLeft(1)}
            className="bg-[#85A0FF]/70 text-white hover:bg-[#E1E1FF] hover:text-[#85A0FF]/70 rounded-3xl p-3 font-bold text-sm flex gap-2 cursor-pointer"
            href="/swap"
          >
            <Repeat2 className="h-5 w-5" />
            Token Swap
          </motion.a>
          <motion.a
            variants={slideInFromLeft(1)}
            className="bg-[#85A0FF]/70 text-white hover:bg-[#E1E1FF] hover:text-[#85A0FF]/70 rounded-3xl p-3 font-bold text-sm flex gap-2 cursor-pointer"
            href="/bridge"
          >
            <ImageDown className='h-5 w-5'/>
            NFT Bridge
          </motion.a>
        </div>
      </div>

      <motion.div
        variants={slideInFromRight(0.8)}
        className="w-full h-full flex justify-center items-center"
      >
        <CodeBlock />
      </motion.div>
    </motion.div>
  );
};

export default HeroContent;