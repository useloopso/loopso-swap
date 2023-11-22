import React from 'react'

interface StartStepsProps {
  number: number
  text: string
}

const StartSteps = ({ number, text }: StartStepsProps) => {
  return (
    <div className='flex-row flex justify-center items-center'>
      <div className='flex justify-center items-center w-[70px] h-[70px] rounded-2xl bg-[#E1E1FF]'>
        <p className='font-bold text-[20px] text-[#85A0FF]'>
          {number}
        </p>
      </div>
      <p className='flex-1 ml-[30px] font-normal text-[18px] text-white leading-[32px]'>
        {text}
      </p>
    </div>
  )
}

export default StartSteps
