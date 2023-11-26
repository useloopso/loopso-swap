"use client";

import React from "react";
import { motion } from "framer-motion";
import { TitleText, TypingText } from "@/components/sub/CustomTexts";
import { rollVariants, staggerContainer, fadeIn } from "@/utils/motion";
import Code from "../sub/Code";
import { SparklesIcon } from "lucide-react";

const CodeBlock = () => {
  return (
    <section className="sm:p-16 xs:p-8 px-6 py-12 relative z-10 mb-10">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.25 }}
        className={`2xl:max-w-[1280px] w-full mx-auto flex lg:flex-row flex-col gap-8`}
      >
        <motion.div
          variants={fadeIn("right", "tween", 0.2, 1)}
          className="flex-[0.95] flex justify-center flex-col"
        >
          <div className="sparkles-box py-[10px] px-[10px] border border-white opacity-[0.9] lg:ml-10 md:ml-8 sm:ml-4 ml-2">
            <SparklesIcon className="text-white mr-[10px] h-5 w-5" />
            <h1 className="text-[13px] text-white font-semibold">
              Public Beta
            </h1>
          </div>
          <TitleText
            title={
              <>
                <span className="text-[#FDDCE8] drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.5)]">
                  Cross-chain
                  <br />
                </span>
                <span className="text-[#E1E1FF] drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.5)]">
                  Bi-directional <br />
                </span>
                <span className="drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.5)]">
                  Bridge Protocol
                </span>
              </>
            }
            textStyles="lg:ml-10 md:ml-8 sm:ml-4 ml-2"
          />
          <div className="flex flex-wrap justify-between gap-[24px]">
            <p className="text-[23px] text-white my-5 max-w-[600px] font-semibold drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.5)] lg:ml-10 md:ml-8 sm:ml-4 ml-2">
              {/* Effortlessly bridge to
              <span className="text-[#FE005B] uppercase">
                &nbsp;Lukso&nbsp;
              </span> */}
              Only on
              <span className="text-[#FE005B] uppercase">
                &nbsp;Loopso&nbsp;
              </span>
            </p>
          </div>
        </motion.div>

        <motion.div
          variants={rollVariants("right")}
          className={`flex-1 flex items-center justify-center`}
        >
          <Code />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default CodeBlock;
