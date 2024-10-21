import React, { useContext, useState } from 'react';
import { IoClose } from "react-icons/io5";
import { AppContext } from '../../context/AppContext';
import { FaRegImage } from "react-icons/fa6";
import { MdError } from "react-icons/md";
import { MdVerified } from "react-icons/md";
import SmSpinner from '../loader/SmSpinner'
import toast from 'react-hot-toast';

const WriteBlog = () => {
    const baseUrl = process.env.REACT_APP_BASE_URL;
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [sucess, setSucess] = useState('');
    const {setIsWriteBlog} = useContext(AppContext);
    const [formData, setFormdData] = useState({
        name:'',
        email:'',
        title:'',
        description:'',
        tags:'',
        img: null
    });

    // New state for storing the uploaded image file name
    const [imgName, setImgName] = useState('');

    function inputHandler(event){
        setFormdData((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value
        }));
    }

    const imageUploadHandler = (event) => {
        const file = event.target.files[0];
        if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
            if (file.size < 2 * 1024 * 1024) { // file size less than 2MB
                setFormdData((prevState) => ({
                    ...prevState,
                    img: file
                }));
                setImgName(file.name);
            } else {
                toast.error("Image size should be less than 2MB");
            }
        } else {
            toast.error("Only .jpg and .png formats are allowed");
        }
    };

    const submitHandler = async () => {
        try{
            setIsLoading(true);
            const BlogData = new FormData();
            BlogData.append("name", formData.name);
            BlogData.append("email", formData.email);
            BlogData.append("title", formData.title);
            BlogData.append("tags", formData.tags);
            BlogData.append("description", formData.description);
            BlogData.append("img", formData.img);
            const res = await fetch(`${baseUrl}/blog/create`, {
                method:"POST",
                body: BlogData
            })

            const response = await res.json();
            if(response.success){
                setError("");
                setSucess(response.message);
            }
            else{
                setSucess("");
                setError(response.message);
            }
        } catch(err){
            setSucess("");
            setError(err.message);
        } finally{
            setIsLoading(false);
        }
    }

    return (
        <div className='w-[800px] bg-stone-300 flex flex-col p-2 login rounded-lg gap-2 pb-4 max-md:w-full'>
            <div className='w-full flex justify-between items-center'>
                <h3 className='text-2xl font-bold text-black'>Write Blog</h3>
                <div onClick={() => setIsWriteBlog(false)} className='w-[40px] h-[40px] flex justify-center items-center bg-[#2222] rounded-full transition duration-200 ease-in hover:bg-red-600 hover:text-gray-300 cursor-pointer'>
                    <IoClose className='text-3xl'/>
                </div>
            </div>
            <div className='w-full flex justify-between items-start gap-4 px-4 max-sm:flex-col max-sm:px-2'>
                <div className='w-full flex flex-col gap-2'>
                    <label className='w-full flex flex-col gap-1'>
                        <span className='text-base font-gray-400 font-semibold'>Name<span className='text-red-500'>*</span></span>
                        <input
                            type='text'
                            name='name'
                            value={formData.name}
                            onChange={inputHandler}
                            placeholder='enter your name'
                            required
                            className='w-full py-2 px-3 placeholder:text-gray-400 text-base font-semibold rounded-sm outline-none bg-stone-100 !border !border-gray-400 focus:!border-blue-500'
                        />
                    </label>
                    <label className='w-full flex flex-col gap-1'>
                        <span className='text-base font-gray-400 font-semibold'>Email<span className='text-red-500'>*</span></span>
                        <input
                            type='text'
                            name='email'
                            value={formData.email}
                            onChange={inputHandler}
                            placeholder='enter your email'
                            required
                            className='w-full py-2 px-3 placeholder:text-gray-400 text-base font-semibold rounded-sm outline-none bg-stone-100 !border !border-gray-400 focus:!border-blue-500'
                        />
                    </label>
                </div>

                <div className='w-full flex flex-col gap-2'>
                    <label className='w-full flex flex-col gap-1'>
                        <span className='text-base font-gray-400 font-semibold'>Title<span className='text-red-500'>*</span></span>
                        <input
                            type='text'
                            name='title'
                            value={formData.title}
                            onChange={inputHandler}
                            placeholder='write blog title'
                            required
                            className='w-full py-2 px-3 placeholder:text-gray-400 text-base font-semibold rounded-sm outline-none bg-stone-100 !border !border-gray-400 focus:!border-blue-500'
                        />
                    </label>
                    <label className='w-full flex flex-col gap-1'>
                        <span className='text-base font-gray-400 font-semibold'>Upload Image</span>
                        <div className="relative w-full">
                            <input
                                type='file'
                                name='img'
                                onChange={imageUploadHandler}
                                required
                                className='absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer'
                            />
                            <div className="w-full py-2 px-4 text-gray-400 !border-2 !border-gray-400 !border-dashed text-center font-semibold rounded-sm cursor-pointer hover:bg-blue-600">
                                {imgName ? imgName : (<div className='flex items-center justify-center gap-2'><FaRegImage/> Choose Image</div>)}
                            </div>
                        </div>
                    </label>
                </div>
            </div>
            <label className='w-full flex flex-col gap-1 px-4 max-sm:px-2'>
                <span className='text-base font-gray-400 font-semibold'>Description<span className='text-red-500'>*</span></span>
                <textarea
                    type='text'
                    name='description'
                    value={formData.description}
                    onChange={inputHandler}
                    placeholder='write blog'
                    rows={4}
                    className='w-full py-2 px-3 placeholder:text-gray-400 text-base font-semibold rounded-sm outline-none bg-stone-100 !border !border-gray-400 focus:!border-blue-500'
                />
            </label>

            <div className='w-full flex justify-between gap-4 px-4 max-sm:px-2 max-sm:flex-col'>
                <label className='w-full flex flex-col gap-1'>
                    <span className='text-base font-gray-400 font-semibold'>Add Tags<span className='text-red-500'>*</span></span>
                    <input
                        type='text'
                        name='tags'
                        value={formData.tags}
                        onChange={inputHandler}
                        placeholder='e.g. #blog #post'
                        required
                        className='w-full py-2 px-3 placeholder:text-gray-400 text-base font-semibold rounded-sm outline-none bg-stone-100 !border !border-gray-400 focus:!border-blue-500'
                    />
                </label>
                <div className='w-full flex flex-col justify-end gap-1'>
                    {
                        error !== '' && (
                        <div className='px-2 text-red-600 bg-transparent text-base font-medium flex items-center gap-2'><MdError className='text-xl text-yellow-600'/>{error}</div>
                        )
                    }

                    {
                        sucess !== '' && (
                        <div className='px-2 text-green-600 bg-transparent text-base font-medium flex items-center gap-2'><MdVerified className='text-xl text-green-600'/>{sucess}</div>
                        )
                    }
                    <button onClick={submitHandler} className='w-full py-1 text-lg text-gray-200 font-semibold !border-2 !border-blue-500 bg-blue-500 flex justify-center items-center gap-4 rounded'>Submit {isLoading && (<SmSpinner/>)}</button>
                </div>
            </div>
        </div>
    );
}

export default WriteBlog;
