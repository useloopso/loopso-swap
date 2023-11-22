import React from 'react'

interface StartStepsProps {
  number: number
  text: string
}

const StartSteps = ({ number, text }: StartStepsProps) => {
  return (
    <div className='flex-row flex justify-center items-center'>
      <div className='flex justify-center items-center w-[70px] h-[70px] rounded-2xl bg-[#323f5d]'>
        <p className='font-bold text-[20px] text-white'>
          {number}
        </p>
      </div>
      <p className='flex-1 ml-[30px] font-normal text-[18px] text-[#000000] leading-[32px]'>
        {text}
      </p>
    </div>
  )
}

export default StartSteps
