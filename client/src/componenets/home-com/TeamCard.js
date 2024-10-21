import React, { useState } from 'react';
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from 'react-router-dom';

const TeamCard = ({data}) => {
    const baseUrl = process.env.REACT_APP_BASE_URL;
    const [isReadMore, setIsReadMore] = useState(false);

    const toggleReadMore = () => {
        setIsReadMore(!isReadMore);
    };

    return (
        <div className='w-full min-h-[350px] flex p-4 border-2 border-gray-600 gap-3 max-sm:flex-col'>
            <div className='w-full h-[300px]'>
                <img src={`${baseUrl}${data.img}`} alt={data.name} className='w-full h-full object-cover object-top'/>
            </div>
            <div className='w-full h-full flex flex-col gap-2'>
                <div className='flex flex-col'>
                    <div className='text-lg font-bold uppercase'>{data.name}</div>
                    <div className='text-base font-medium text-gray-400'>{data.profession}</div>
                </div>
                <div className={`w-full h-[180px] overflow-auto text-base font-normal leading-5 pr-2 text-justify text-gray-500 custom-scrollbar`}>
                    {isReadMore ? data.description : `${data.description.slice(0, 230)}...`}
                    <button 
                        onClick={toggleReadMore} 
                        className='text-blue-500 font-medium text-sm'
                    >
                        {isReadMore ? "Read Less" : "Read More"}
                    </button>
                </div>
                <div className='flex justify-start items-center gap-2 pt-2'>
                    <Link to={data.facebookUrl} className='w-[40px] h-[40px] flex justify-center items-center bg-[#c39c18] text-white text-xl'>
                        <FaFacebook/>
                    </Link>
                    <Link to={data.instagramUrl} className='w-[40px] h-[40px] flex justify-center items-center bg-[#c39c18] text-white text-xl'>
                        <FaInstagram/>
                    </Link>
                    <Link to={data.twitterUrl} className='w-[40px] h-[40px] flex justify-center items-center bg-[#c39c18] text-white text-xl'>
                        <FaXTwitter/>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default TeamCard;
