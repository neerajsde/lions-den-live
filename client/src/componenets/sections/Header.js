import React from 'react'
import { IoIosMail } from "react-icons/io";
import { FaPhone } from "react-icons/fa6";
import { MdAccessTimeFilled } from "react-icons/md";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa6";
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className='w-full flex items-center justify-between py-2 px-4 bg-black text-white max-lg:flex-col max-lg:justify-start max-md:gap-2 max-md:flex-row max-md:justify-between'>
        <div className='flex items-center gap-4 max-lg:gap-2'>
            <Link to={'mailto:Officiallionsdenfightclub@gmail.com'} className='text-base max-lg:text-sm font-normal flex items-center gap-1 text-gray-200 max-md:hidden'>
                <IoIosMail className='text-2xl'/>
                Officiallionsdenfightclub@gmail.com
            </Link>

            <div className='w-[2px] h-[20px] bg-gray-400 max-md:hidden'></div>

            <Link to={'tel:+919899762760'} className='text-base max-lg:text-sm font-normal flex items-center gap-1 text-gray-200'>
                <FaPhone className='text-xl'/>
                +91 98997 62760
            </Link>

            <div className='w-[2px] h-[20px] bg-gray-400 max-md:hidden'></div>

            <Link  className='text-base max-lg:text-sm font-normal flex items-center gap-1 text-gray-200 max-md:hidden'>
                <MdAccessTimeFilled className='text-2xl'/>
                <span className='font-bold'>Opening Hours:</span>
                Mon - Sat:6.00 am-9.00 pm
            </Link>
        </div>

        <div className='flex items-center gap-2'>
            <Link to={'https://www.facebook.com/lionsdenfightclub?mibextid=qi2Omg&rdid=seqdRy5DaVNFdhNo&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2FRzSvD99c7yV5oFEa%2F%3Fmibextid%3Dqi2Omg'} className='text-2xl text-white max-sm:text-lg transition duration-300 ease-in hover:text-yellow-600'>
                <FaFacebook/>
            </Link>
            <Link to={'https://www.instagram.com/lionsdenfightclub/?igsh=MTc0N2d4OHN2azZieA%3D%3D'} className='text-2xl text-white max-sm:text-lg transition duration-300 ease-in hover:text-yellow-600'>
                <FaInstagram/>
            </Link>
            <Link to={'https://x.com/i/flow/login?redirect_after_login=%2FLionsDenFightC1'} className='text-2xl text-white max-sm:text-lg transition duration-300 ease-in hover:text-yellow-600'>
                <FaXTwitter/>
            </Link>
            <Link to={'https://www.youtube.com/@lionsdenfightclub?si=arnF91ANoH1LfvsX'} className='text-2xl text-white max-sm:text-lg transition duration-300 ease-in hover:text-yellow-600'>
                <FaYoutube/>
            </Link>
        </div>
    </div>
  )
}

export default Header