import React, { useContext } from 'react';
import Logo from '../navbar/Logo';
import { IoNotifications } from "react-icons/io5";
import { AppContext } from '../../context/AppContext';

const TopHeader = () => {
    const {adminData} = useContext(AppContext);

  return (
    <div className='w-full flex justify-between px-4 py-2 bg-[#111]'>
        <Logo/>
        <div className='flex items-center text-white gap-2'>
            <IoNotifications className='text-3xl'/>
            {
                adminData && (
                    <div className='w-[40px] h-[40px] flex justify-center items-center border-2 border-yellow-600 rounded-full'>
                        <img src={adminData.img} alt='user-img' className='rounded-full w-full h-full object-cover'/>
                    </div>
                )
            }
        </div>
    </div>
  )
}

export default TopHeader