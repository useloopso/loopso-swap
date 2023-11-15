import { motion } from 'framer-motion';
import { textContainer, textVariant2 } from '@/utils/motion';

interface TypingTextProps {
  title: string;
  textStyles?: string;
}

interface TitleTextProps {
    title: string | JSX.Element; 
    textStyles?: string;
}

export const TypingText: React.FC<TypingTextProps> = ({ title, textStyles }) => (
  <motion.p
    variants={textContainer}
    className={`font-semibold text-[23px] blue-gradient drop-shadow-[0_1.2px_1.2px_rgba(135,135,135,0.8)] ${textStyles}`}
  >
    {Array.from(title).map((letter, index) => (
      <motion.span variants={textVariant2} key={index}>
        {letter === ' ' ? '\u00A0' : letter}
      </motion.span>
    ))}
  </motion.p>
);

export const TitleText: React.FC<TitleTextProps> = ({ title, textStyles }) => (
    <motion.h2
      variants={textVariant2}
      initial="hidden"
      whileInView="show"
      className={`mt-[8px] font-bold md:text-[64px] text-[40px] blue-gradient drop-shadow-[0_1.2px_1.2px_rgba(255,255,255,0.8)] ${textStyles}`}
    >
      {title}
    </motion.h2>
  );
