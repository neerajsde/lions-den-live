import React, { useState } from 'react';
import { HiDotsVertical } from "react-icons/hi";
import { BiLike } from "react-icons/bi";
import { BiSolidLike } from "react-icons/bi";
import { MdWhatsapp } from "react-icons/md";

function convertToIST(utcDateStr) {
    const utcDate = new Date(utcDateStr);
    const utcTime = utcDate.getTime();
    const istOffset = (5 * 60 + 30) * 60 * 1000;
    const istDate = new Date(utcTime + istOffset);
  
    return istDate.toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
}

const BlogCard = ({ data }) => {
    const baseUrl = process.env.REACT_APP_BASE_URL;
    const [isExpanded, setIsExpanded] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const [likes, setLikes] = useState(data.likes.length);
    
    const toggleReadMore = () => {
        setIsExpanded(!isExpanded);
    };

    const likeHandler = () => {
        if (isLiked) {
            setLikes(likes - 1);
        } else {
            setLikes(likes + 1);
        }
        setIsLiked(!isLiked);
    };
    
    const shareOnWhatsapp = () => {
        const whatsappUrl = `https://api.whatsapp.com/send?text=Check out this blog: ${data.title} - ${window.location.href}`;
        window.open(whatsappUrl, '_blank');
    };

    const MAX_DESC_LENGTH = 40;
    
    return (
        <div className='w-[380px] bg-[#111] rounded-md flex flex-col p-4 gap-2 max-sm:w-full'>
            <div className='w-full flex justify-between items-start'>
                <div className='flex items-center justify-center gap-2'>
                    <div className='w-[45px] h-[45px] flex justify-center items-center rounded-full border-2 border-[#444]'>
                        <img src={data.user.img} alt='user-img' className='w-full h-full rounded-full object-cover' />
                    </div>
                    <div className='flex flex-col items-start justify-center gap-0'>
                        <span className='text-base font-bold text-gray-200'>{data.user.name}</span>
                        <span className='text-sm font-semibold text-gray-500'>{convertToIST(data.user.createdAt)}</span>
                    </div>
                </div>
                <div className='w-[40px] h-[40px] flex justify-center items-center transition duration-300 ease-in hover:bg-[#333] rounded-full cursor-pointer'>
                    <HiDotsVertical className='text-2xl text-gray-400' />
                </div>
            </div>

            <div className='w-full flex flex-col'>
                <span className='text-base font-semibold text-gray-400'>{data.title}</span>
                <span className='text-sm font-normal text-gray-500 text-justify'>
                    {isExpanded ? data.description : `${data.description.slice(0, MAX_DESC_LENGTH)}...`}
                </span>
                {
                    data.description.length > MAX_DESC_LENGTH && (
                        <button 
                            className='text-[#c39c18] font-semibold text-sm mt-1 hover:underline'
                            onClick={toggleReadMore}
                        >
                            {isExpanded ? 'less' : 'Read More'}
                        </button>
                    )
                }
                <div className='w-full flex justify-start items-start gap-2 flex-wrap'>{
                    data?.tags && data.tags.split(' ').map((tag, index) => (
                        <span key={index} className='text-sm text-blue-500 font-semibold transition duration-300 ease-in cursor-pointer hover:underline'>
                            {tag}
                        </span>
                    ))
                }</div>
            </div>

            {
                data.img !== "" && (
                    <div className='w-full'>
                        <img src={`${baseUrl}/blog${data.img}`} alt={data.title} className='w-full object-cover' />
                    </div>
                )
            }

            <div className='w-full flex flex-col gap-1'>
                <div className='w-full flex justify-start items-center'>
                    { data.likes.length > 0 && (<span className='text-xs text-red-500'>{`${data.likes.length} likes`}</span>)}
                </div>
                <div className='w-full h-[1px] bg-gray-700'></div>
                <div className='w-full flex justify-between items-center'>
                    <button
                        onClick={likeHandler}
                        className={`text-sm font-semibold flex justify-center items-center gap-1 transition duration-200 ease-in cursor-pointer ${isLiked ? 'text-blue-600' : 'text-gray-100 hover:text-gray-400'}`}
                    >
                        { isLiked ? <BiSolidLike className='text-lg'/> : <BiLike className='text-lg' />} Like
                    </button>
                    <button 
                        className='text-sm text-gray-100 font-semibold flex justify-center items-center gap-1 transition duration-200 ease-in hover:text-gray-400 cursor-pointer'
                        onClick={shareOnWhatsapp}
                    >
                        <MdWhatsapp className='text-lg' /> Share
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BlogCard;
