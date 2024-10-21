import React, { useState } from 'react'
import toast from 'react-hot-toast';
import SmSpinner from "../../loader/SmSpinner";
import { MdError } from "react-icons/md";
import { MdVerified } from "react-icons/md";

const YTlinks = () => {
    const baseUrl = process.env.REACT_APP_BASE_URL;
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [sucess, setSucess] = useState("");
    const [formData, setFormData] = useState({
        title:'',
        link:'',
        description:'',
        banner:null
    })

    function inputHandler(event){
        setFormData((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value
        }))
    }

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
            setFormData((prevState) => ({
                ...prevState,
                banner: file,
            }));
        } else {
          toast.error("Only .jpg and .png formats are allowed");
        }
    };

    const submitHandler = async () => {
        try {
            setIsLoading(true);
            const token = localStorage.getItem("lionDen");
            if (!token) {
              throw new Error("Token not found. Please log in again.");
            }
      
            // Use FormData for file upload
            const formDataToSend = new FormData();
            formDataToSend.append("title", formData.title);
            formDataToSend.append("description", formData.description);
            formDataToSend.append("link", formData.link);
            formDataToSend.append("banner", formData.banner);
      
            const response = await fetch(`${baseUrl}/addYouTubeLink`, {
              method: "POST",
              headers: {
                Authorization: `Bearer ${token}`,
              },
              body: formDataToSend,
            });
      
            if (!response.ok) {
              const data = await response.json();
              throw new Error(data.message || "Something went wrong.");
            }
      
            const data = await response.json();
            if (data.success) {
              setError("");
              setSucess(data.message);
              toast.success(data.message);
              setFormData({
                title:'',
                link:'',
                description:'',
                banner:null
            })
            } else {
              setSucess("");
              setError(data.message);
              toast.error(data.message);
            }
          } catch (err) {
            setSucess("");
            setError(err.message);
            toast.error(err.message);
          } finally {
            setIsLoading(false);
          }
    }

  return (
    <div className='w-full h-full flex flex-col !border !border-[#444] bg-[#ffffff23] backdrop-blur-md gap-4 p-4'>
        <h2 className='text-lg text-orange-500'>Add New YouTube Tutorial Link</h2>
        <div className='w-full flex justify-between gap-8'>
            <div className='w-full flex flex-col gap-4'>
                <label className='w-full flex flex-col'>
                    <span className='text-base text-gray-400'>Title</span>
                    <input
                        type='text'
                        name='title'
                        value={formData.title}
                        onChange={inputHandler}
                        placeholder='enter video title'
                        className='w-full flex text-lg py-2 px-3 bg-black text-gray-200 font-semibold placeholder:text-gray-600 !border rounded-sm !border-[#333] outline-none focus:!border-yellow-500'
                    />
                </label>
                <label className='w-full flex flex-col'>
                    <span className='text-base text-gray-400'>Description</span>
                    <textarea
                        type='text'
                        name='description'
                        value={formData.description}
                        onChange={inputHandler}
                        placeholder='write about description'
                        className='w-full flex text-lg py-2 px-3 bg-black text-gray-200 font-semibold placeholder:text-gray-600 !border rounded-sm !border-[#333] outline-none focus:!border-yellow-500'
                    />
                </label>
            </div>

            <div className='w-full flex flex-col gap-4'>
                <label className='w-full flex flex-col'>
                    <span className='text-base text-gray-400'>YouTube Link</span>
                    <input
                        type='text'
                        name='link'
                        value={formData.link}
                        onChange={inputHandler}
                        placeholder='paste youtube url'
                        className='w-full flex text-lg py-2 px-3 bg-black text-gray-200 font-semibold placeholder:text-gray-600 !border rounded-sm !border-[#333] outline-none focus:!border-yellow-500'
                    />
                </label>
                <label className='w-full flex flex-col'>
                    <span className='text-base text-gray-400'>Upload YT Banner</span>
                    <input
                        type='file'
                        name='banner'
                        onChange={handleImageUpload}
                        className='w-full flex text-lg py-2 px-3 bg-black text-gray-200 font-semibold placeholder:text-gray-600 !border rounded-sm !border-[#333] outline-none focus:!border-yellow-500'
                    />
                </label>
            </div>
        </div>

        <div className="w-full flex items-center justify-between">
            {error !== "" && (
            <div className="py-1 px-2 !border !border-red-500 text-red-500 bg-transparent text-base font-medium flex items-center gap-2">
                <MdError className="text-xl text-yellow-600" />
                {error}
            </div>
            )}

            {sucess !== "" && (
            <div className="py-1 px-2 !border !border-green-500 text-green-500 bg-transparent text-base font-medium flex items-center gap-2">
                <MdVerified className="text-xl text-green-600" />
                {sucess}
            </div>
            )}
            <button
                onClick={submitHandler}
                className="px-4 py-2 text-lg font-semibold text-white bg-orange-600 rounded-md flex items-center justify-center gap-2"
            >
                Submit {isLoading && <SmSpinner />}
            </button>
        </div>
    </div>
  )
}

export default YTlinks