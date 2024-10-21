import React, { useState } from 'react';
import toast from 'react-hot-toast';
import SmSpinner from '../../loader/SmSpinner';

const UpdateTimeTable = ({ data }) => {
    const baseUrl = process.env.REACT_APP_BASE_URL;
    const [isFileLoading, setIsFileLoading] = useState([false, false, false, false, false, false]); // Individual loading state
    const [message, setMessage] = useState(['', '', '', '', '', '']); // For handling individual messages
    const [formData, setFormData] = useState({
        id: data,
        mon_img: null,
        tue_img: null,
        wed_img: null,
        thu_img: null,
        fri_img: null,
        sat_img: null
    });

    // Handles image selection
    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        const name = event.target.name;

        if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
            if (file.size < 2 * 1024 * 1024) { // File size less than 2MB
                setFormData((prevState) => ({
                    ...prevState,
                    [name]: file
                }));
            } else {
                toast.error("Image size should be less than 2MB");
            }
        } else {
            toast.error("Only .jpg and .png formats are allowed");
        }
    };

    // Handles form submission
    const handleSubmit = async (img_name, index) => {
        if (!formData[img_name]) {
            setMessage((prevState) => {
                const curMessage = [...prevState];
                curMessage[index] = 'Please select an image';
                return curMessage;
            });
            return;
        }

        // Create form data to send file and additional fields
        const formXData = new FormData();
        formXData.append('name', img_name);
        formXData.append('id', formData.id);
        formXData.append(img_name, formData[img_name]);

        try {
            // Set loading for the current button
            setIsFileLoading((prevState) => {
                const curLoading = [...prevState];
                curLoading[index] = true;
                return curLoading;
            });

            const response = await fetch(`${baseUrl}/update/feestructure-img`, {
                method: 'PUT',
                body: formXData
            });

            const data = await response.json();

            if (data.success) {
                setMessage((prevState) => {
                    const curMessage = [...prevState];
                    curMessage[index] = data.message || 'Image uploaded successfully';
                    return curMessage;
                });
            } else {
                setMessage((prevState) => {
                    const curMessage = [...prevState];
                    curMessage[index] = data.message || 'Failed to upload image';
                    return curMessage;
                });
            }

        } catch (error) {
            console.error(error);
            setMessage((prevState) => {
                const curMessage = [...prevState];
                curMessage[index] = error.message;
                return curMessage;
            });
        } finally {
            // Reset loading for the current button
            setIsFileLoading((prevState) => {
                const curLoading = [...prevState];
                curLoading[index] = false;
                return curLoading;
            });
        }
    };

    return (
        <div className='w-full flex flex-col'>
            <h2 className='text-2xl font-bold text-green-600 uppercase'>Update Time Table Images</h2>
            <div className='w-full flex flex-col gap-4'>
                {/* Monday Upload */}
                <div className='w-full flex justify-between items-end gap-4'>
                    <label className='w-full flex flex-col gap-1'>
                        <span className='w-full text-gray-400 text-base font-medium capitalize'>Monday</span>
                        <input
                            type='file'
                            name='mon_img'
                            onChange={handleImageUpload}
                            className='w-full flex text-lg py-2 px-3 bg-black text-gray-200 font-semibold placeholder:text-gray-600 !border rounded-sm !border-[#333] outline-none focus:!border-yellow-500'
                        />
                    </label>
                    <div className='w-full flex flex-col justify-start items-start'>
                        <div className='text-base font-semibold text-green-600'>{message[0] && message[0]}</div>
                        <button onClick={() => handleSubmit("mon_img", 0)} className='px-4 py-2 text-lg font-semibold text-white bg-orange-600 rounded-md flex items-center justify-center gap-2'>
                            Upload {isFileLoading[0] && (<SmSpinner />)}
                        </button>
                    </div>
                </div>

                {/* Tuesday Upload */}
                <div className='w-full flex justify-between items-end gap-4'>
                    <label className='w-full flex flex-col gap-1'>
                        <span className='w-full text-gray-400 text-base font-medium capitalize'>Tuesday</span>
                        <input
                            type='file'
                            name='tue_img'
                            onChange={handleImageUpload}
                            className='w-full flex text-lg py-2 px-3 bg-black text-gray-200 font-semibold placeholder:text-gray-600 !border rounded-sm !border-[#333] outline-none focus:!border-yellow-500'
                        />
                    </label>
                    <div className='w-full flex flex-col justify-start items-start'>
                        <div className='text-base font-semibold text-green-600'>{message[1] && message[1]}</div>
                        <button onClick={() => handleSubmit("tue_img", 1)} className='px-4 py-2 text-lg font-semibold text-white bg-orange-600 rounded-md flex items-center justify-center gap-2'>
                            Upload {isFileLoading[1] && (<SmSpinner />)}
                        </button>
                    </div>
                </div>

                <div className='w-full flex justify-between items-end gap-4'>
                    <label className='w-full flex flex-col gap-1'>
                        <span className='w-full text-gray-400 text-base font-medium capitalize'>Wednesday</span>
                        <input
                            type='file'
                            name='wed_img'
                            onChange={handleImageUpload}
                            className='w-full flex text-lg py-2 px-3 bg-black text-gray-200 font-semibold placeholder:text-gray-600 !border rounded-sm !border-[#333] outline-none focus:!border-yellow-500'
                        />
                    </label>
                    <div className='w-full flex flex-col justify-start items-start'>
                        <div className='text-base font-semibold text-green-600'>{message[2] && message[2]}</div>
                        <button onClick={() => handleSubmit("wed_img", 2)} className='px-4 py-2 text-lg font-semibold text-white bg-orange-600 rounded-md flex items-center justify-center gap-2'>
                            Upload {isFileLoading[2] && (<SmSpinner />)}
                        </button>
                    </div>
                </div>

                <div className='w-full flex justify-between items-end gap-4'>
                    <label className='w-full flex flex-col gap-1'>
                        <span className='w-full text-gray-400 text-base font-medium capitalize'>Thursday</span>
                        <input
                            type='file'
                            name='thu_img'
                            onChange={handleImageUpload}
                            className='w-full flex text-lg py-2 px-3 bg-black text-gray-200 font-semibold placeholder:text-gray-600 !border rounded-sm !border-[#333] outline-none focus:!border-yellow-500'
                        />
                    </label>
                    <div className='w-full flex flex-col justify-start items-start'>
                        <div className='text-base font-semibold text-green-600'>{message[3] && message[3]}</div>
                        <button onClick={() => handleSubmit("thu_img", 3)} className='px-4 py-2 text-lg font-semibold text-white bg-orange-600 rounded-md flex items-center justify-center gap-2'>
                            Upload {isFileLoading[3] && (<SmSpinner />)}
                        </button>
                    </div>
                </div>

                <div className='w-full flex justify-between items-end gap-4'>
                    <label className='w-full flex flex-col gap-1'>
                        <span className='w-full text-gray-400 text-base font-medium capitalize'>Friday</span>
                        <input
                            type='file'
                            name='fri_img'
                            onChange={handleImageUpload}
                            className='w-full flex text-lg py-2 px-3 bg-black text-gray-200 font-semibold placeholder:text-gray-600 !border rounded-sm !border-[#333] outline-none focus:!border-yellow-500'
                        />
                    </label>
                    <div className='w-full flex flex-col justify-start items-start'>
                        <div className='text-base font-semibold text-green-600'>{message[4] && message[4]}</div>
                        <button onClick={() => handleSubmit("fri_img", 4)} className='px-4 py-2 text-lg font-semibold text-white bg-orange-600 rounded-md flex items-center justify-center gap-2'>
                            Upload {isFileLoading[4] && (<SmSpinner />)}
                        </button>
                    </div>
                </div>

                <div className='w-full flex justify-between items-end gap-4'>
                    <label className='w-full flex flex-col gap-1'>
                        <span className='w-full text-gray-400 text-base font-medium capitalize'>Saturday</span>
                        <input
                            type='file'
                            name='sat_img'
                            onChange={handleImageUpload}
                            className='w-full flex text-lg py-2 px-3 bg-black text-gray-200 font-semibold placeholder:text-gray-600 !border rounded-sm !border-[#333] outline-none focus:!border-yellow-500'
                        />
                    </label>
                    <div className='w-full flex flex-col justify-start items-start'>
                        <div className='text-base font-semibold text-green-600'>{message[5] && message[5]}</div>
                        <button onClick={() => handleSubmit("sat_img", 5)} className='px-4 py-2 text-lg font-semibold text-white bg-orange-600 rounded-md flex items-center justify-center gap-2'>
                            Upload {isFileLoading[5] && (<SmSpinner />)}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateTimeTable;
