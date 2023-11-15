'use client';

import { motion } from 'framer-motion';
import styles from '@/styles';
import { TitleText, TypingText } from '@/components/shared/CustomTexts';
import { staggerContainer, fadeIn, planetVariants } from '@/utils/motion';
import Image from 'next/image';

const AboutLoopso = () => (
  <section className={`${styles.paddings} relative z-10`}>
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.25 }}
      className={`${styles.innerWidth} mx-auto flex lg:flex-row flex-col`}
    >
      <motion.div
        variants={planetVariants('left')}
        className={`flex-1 ${styles.flexCenter}`}
      >
        <Image
          src="/assets/lukso-world.png"
          alt="get-started"
          width={1000}
          height={1000}
          className="w-[80%] h-[80%] object-contain mt-20"
        />
      </motion.div>
      <motion.div
        variants={fadeIn('left', 'tween', 0.2, 1)}
        className="flex-[0.75] flex justify-center flex-col mr-10"
      >
        <TitleText title={<>Loop into the New Creative Economy</>} />
        <div className="mt-[31px] flex flex-col gap-[20px]">
          <TypingText title="🚀 The First Multichain Bridge for LSPs" />
        </div>
      </motion.div>
    </motion.div>
  </section>
);

export default AboutLoopso;