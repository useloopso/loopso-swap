'use client';

import { textContainer, textVariant2 } from '@/utils/motion';
import { motion } from 'framer-motion';
import { ReactElement } from 'react';

interface TypingTextProps {
  title: string;
  textStyles: string;
}

interface TitleTextProps {
  title: string | ReactElement;
  textStyles: string;
}

export const TypingText = ({ title, textStyles}: TypingTextProps) => (
  <motion.p
    variants={textContainer}
    className={`font-normal text-[16px] text-white ${textStyles}`}
  >
    {Array.from(title).map((letter, index) => (
      <motion.span
        variants={textVariant2}
        key={index}
      >
        {letter === ' ' ? '\u00A0' : letter}
      </motion.span>
    ))}
  </motion.p>
);

export const TitleText = ({ title, textStyles }: TitleTextProps) => (
  <motion.h2
    variants={textVariant2}
    initial="hidden"
    whileInView="show"
    className={`mt-[8px] font-bold md:text-[64px] text-[40px] text-white ${textStyles}`}
  >
    {title}
  </motion.h2>
);
