import React from 'react'

const AboutCEO = () => {
    const baseUrl = process.env.REACT_APP_BASE_URL;
  return (
    <div className='w-full flex justify-center gap-8 px-8 py-8 max-md:flex-col-reverse max-md:items-center max-sm:px-4 max-sm:py-6 max-sm:gap-6'>
        <div className='w-[700px] max-lg:w-[500px] max-md:w-full flex flex-col'>
            <div className='w-full flex flex-col max-sm:items-center'>
                <div className='text-3xl font-bold text-[#a88309] max-sm:text-xl'>VIJAY SAINI</div>
                <h2 className='text-2xl font-semibold uppercase text-gray-400 max-sm:text-base max-sm:text-center'>Founder - LION'S DEN FIGHT CLUB PVT LTD</h2>
            </div>
            <div className='w-full flex flex-col'>
            <p className='text-base font-normal text-gray-200 max-sm:text-justify'>With over 21 years of martial arts experience, I specialise in Freestyle Muay Thai and trained at Sawit Muay Thai Camp in Phuket, Thailand. I earned the nickname - ‘Lion’ due to my undefeated streak at Thailand’s Lions club. I am also a black belt in Taekwondo and skilled in kickboxing, boxing, wrestling, JKD and BJJ.</p>
            <p className='text-base font-normal text-gray-200  max-sm:text-justify'>In 2017, won the Best Coach award at the @AIMMAA Nationals.</p>
            <p className='text-base font-normal text-gray-200  max-sm:text-justify'>I strongly believe that MMA training is beneficial for both physical and mental well being. Hence, doing my bit to grow the sport of MMA in India and make it more mainstream.</p>
            </div>
        </div>
        <div className='w-[320px] max-lg:w-[300px] max-h-[340px] flex flex-col justify-start items-start border-4 border-gray-600 rounded-md'>
            <img src={`${baseUrl}/files/1729667323072.png`} alt='ceo-img' className='w-full h-[300px] object-cover rounded-t-md'/>
            <div className='w-full text-center bg-emerald-500 text-white text-xl font-semibold uppercase py-2'>Pro MMA Fighter</div>
        </div>
    </div>
  )
}

export default AboutCEO