import styles from '@/styles';

interface StartCardProps {
  number: string; // Adjust the type based on your actual data type
  text: string;   // Adjust the type based on your actual data type
}

const StartCard: React.FC<StartCardProps> = ({ number, text }) => (
  <div className={`${styles.flexCenter} flex-row bg-[#85A0FF] p-2 rounded-3xl `}>
    <div
      className={`${styles.flexCenter} w-[70px] h-[70px] rounded-[24px] bg-[#E1E1FF]`}
    >
      <p className="font-bold text-[20px] text-[#85A0FF]">
        {number}
      </p>
    </div>
    <p className="flex-1 ml-[30px] font-normal text-[16px] text-[#E1E1FF] leading-[32.4px]">
      {text}
    </p>
  </div>
);

export default StartCard;
