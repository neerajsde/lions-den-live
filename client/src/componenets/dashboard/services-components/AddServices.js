import React, { useState } from 'react';
import toast from 'react-hot-toast';
import SmSpinner from '../../loader/SmSpinner';
import { MdError } from "react-icons/md";
import { MdVerified } from "react-icons/md";

const AddServices = () => {
    const baseUrl = process.env.REACT_APP_BASE_URL;
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [sucess, setSucess] = useState('');
    const [content, setContent] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        title: '',
        offer: '',
        program_title:'',
        program_desc:'',
        program_img:null,
        desc1: {
            header: '',
            paragraph: ''
        },
        desc2: {
            header: '',
            paragraph: ''
        },
        benefits: [],
        classLevel: []
    });

    const [benefitData, setBenefitData] = useState({
        heading: '',
        description: ''
    });

    function benifitHandler(event) {
        setBenefitData((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value
        }));
    }

    const [classLevelData, setClassLevelData] = useState({
        level: 'beginner',
        content: []
    });

    function classLevelHandler(event) {
        setClassLevelData((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value
        }));
    }

    // Input Handler for Basic Fields
    function inputHandler(event) {
        const { name, value } = event.target;
        
        if (name.includes('desc1')) {
            setFormData((prevState) => ({
                ...prevState,
                desc1: {
                    ...prevState.desc1,
                    [name.split('.')[1]]: value
                }
            }));
        } else if (name.includes('desc2')) {
            setFormData((prevState) => ({
                ...prevState,
                desc2: {
                    ...prevState.desc2,
                    [name.split('.')[1]]: value
                }
            }));
        } else {
            setFormData((prevState) => ({
                ...prevState,
                [name]: value
            }));
        }
    }

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
            if (file.size < 2 * 1024 * 1024) { // file size less than 2MB
                setFormData((prevState) => ({
                    ...prevState,
                    program_img: file
                }));
            } else {
                toast.error("Image size should be less than 2MB");
            }
        } else {
            toast.error("Only .jpg and .png formats are allowed");
        }
    };
    

    const addBenefit = () => {
        if(benefitData.heading === '' && benefitData.description === ""){
            toast.error('Please fill the field');
            return;
        }
        setFormData((prevState) => ({
            ...prevState,
            benefits: [...prevState.benefits, benefitData]
        }));
        setBenefitData({ heading: '', description: '' });
    };

    const addMoreContent = () => {
        setClassLevelData((prevState) => ({
            ...prevState,
            content: [...prevState.content, content]
        }));

        setContent('');
    }

    const addMoreMoreBenefit = () => {
        setFormData((prevState) => ({
            ...prevState,
            classLevel: [...prevState.classLevel, classLevelData]
        }));
        setClassLevelData(
            {
                level: 'beginner',
                content: []
            }
        )
    }

    const submitHandler = async () => {
        if(formData.benefits.length < 4){
            toast.error('You need to Add Min 4 Benefits');
            return;
        }
        try {
            setIsLoading(true);
            const token = localStorage.getItem("lionDen");
            if (!token) {
                throw new Error("Token not found. Please log in again.");
            }
    
            // Create FormData to handle file and text data
            const formPayload = new FormData();
            formPayload.append('name', formData.name);
            formPayload.append('title', formData.title);
            formPayload.append('offer', formData.offer);
            formPayload.append('program_title', formData.program_title);
            formPayload.append('program_desc', formData.program_desc);
    
            // Append the file if available
            if (formData.program_img) {
                formPayload.append('program_img', formData.program_img);
            }
    
            // Append the rest of the form data, including nested objects as JSON strings
            formPayload.append('desc1', JSON.stringify(formData.desc1));
            formPayload.append('desc2', JSON.stringify(formData.desc2));
            formPayload.append('benefits', JSON.stringify(formData.benefits));
            formPayload.append('classLevel', JSON.stringify(formData.classLevel));
    
            const response = await fetch(`${baseUrl}/services-add`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`, // Remove 'Content-Type' for FormData
                },
                body: formPayload
            });
    
            const data = await response.json();
            
            if (response.ok) {
                setError('');
                setSucess(data.message || 'Success');
                toast.success(data.message || 'Service added successfully');
            } else {
                setSucess('');
                setError(data.message || 'Error occurred');
                toast.error(data.message || 'Error occurred');
            }
            
            console.log('Response Data:', data);
        } catch (err) {
            setSucess('');
            setError(err.message);
            toast.error(err.message);
        } finally {
            setIsLoading(false);
        }
    };
   
    
    return (
        <div className='w-full flex flex-col gap-4'>
            <h2 className='text-lg font-bold text-green-500 uppercase'>Add New Services</h2>
            <div className='w-full flex justify-between items-start gap-4'>
                <div className='w-full flex flex-col gap-3'>
                    <label className='w-full flex flex-col gap-1'>
                        <span className='w-full text-gray-400 text-base font-medium capitalize'>Services Name</span>
                        <input
                            type='text'
                            name='name'
                            value={formData.name}
                            onChange={inputHandler}
                            placeholder='enter services name'
                            className='w-full flex text-lg py-2 px-3 bg-black text-gray-200 font-semibold placeholder:text-gray-600 !border rounded-sm !border-[#333] outline-none focus:!border-yellow-500'
                        />
                    </label>

                    <label className='w-full flex flex-col gap-1'>
                        <span className='w-full text-gray-400 text-base font-medium capitalize'>Offer</span>
                        <input
                            type='text'
                            name='offer'
                            value={formData.offer}
                            onChange={inputHandler}
                            placeholder='add offer like 10%'
                            className='w-full flex text-lg py-2 px-3 bg-black text-gray-200 font-semibold placeholder:text-gray-600 !border rounded-sm !border-[#333] outline-none focus:!border-yellow-500'
                        />
                    </label>
                </div>
                <div className='w-full flex flex-col gap-3'>
                    <label className='w-full flex flex-col gap-1'>
                        <span className='w-full text-gray-400 text-base font-medium capitalize'>Title</span>
                        <input
                            type='text'
                            name='title'
                            value={formData.title}
                            onChange={inputHandler}
                            placeholder='enter services title'
                            className='w-full flex text-lg py-2 px-3 bg-black text-gray-200 font-semibold placeholder:text-gray-600 !border rounded-sm !border-[#333] outline-none focus:!border-yellow-500'
                        />
                    </label>
                </div>
            </div>

            <h2 className='text-lg font-bold text-green-500 uppercase'>Description</h2>
            <div className='w-full flex justify-between items-start gap-4'>
                <div className='w-full flex flex-col items-center gap-3'>
                    <p className='text-base font-semibold text-gray-400'>Description - 1</p>
                    <label className='w-full flex flex-col gap-1'>
                        <span className='w-full text-gray-400 text-base font-medium capitalize'>Header</span>
                        <input
                            type='text'
                            name='desc1.header'
                            value={formData.desc1.header}
                            onChange={inputHandler}
                            placeholder='enter desc-1 header'
                            className='w-full flex text-lg py-2 px-3 bg-black text-gray-200 font-semibold placeholder:text-gray-600 !border rounded-sm !border-[#333] outline-none focus:!border-yellow-500'
                        />
                    </label>

                    <label className='w-full flex flex-col gap-1'>
                        <span className='w-full text-gray-400 text-base font-medium capitalize'>Paragraph</span>
                        <textarea
                            name='desc1.paragraph'
                            value={formData.desc1.paragraph}
                            onChange={inputHandler}
                            placeholder='desc-1 paragraph'
                            className='w-full flex text-lg py-2 px-3 bg-black text-gray-200 font-semibold placeholder:text-gray-600 !border rounded-sm !border-[#333] outline-none focus:!border-yellow-500'
                        />
                    </label>
                </div>

                <div className='w-full flex flex-col gap-3 items-center'>
                    <p className='text-base font-semibold text-gray-400'>Description - 2</p>
                    <label className='w-full flex flex-col gap-1'>
                        <span className='w-full text-gray-400 text-base font-medium capitalize'>Header</span>
                        <input
                            type='text'
                            name='desc2.header'
                            value={formData.desc2.header}
                            onChange={inputHandler}
                            placeholder='enter desc-2 header'
                            className='w-full flex text-lg py-2 px-3 bg-black text-gray-200 font-semibold placeholder:text-gray-600 !border rounded-sm !border-[#333] outline-none focus:!border-yellow-500'
                        />
                    </label>

                    <label className='w-full flex flex-col gap-1'>
                        <span className='w-full text-gray-400 text-base font-medium capitalize'>Paragraph</span>
                        <textarea
                            name='desc2.paragraph'
                            value={formData.desc2.paragraph}
                            onChange={inputHandler}
                            placeholder='desc-2 paragraph'
                            className='w-full flex text-lg py-2 px-3 bg-black text-gray-200 font-semibold placeholder:text-gray-600 !border rounded-sm !border-[#333] outline-none focus:!border-yellow-500'
                        />
                    </label>
                </div>
            </div>


            <h2 className='text-lg font-bold text-green-500 uppercase'>Program</h2>
            <div className='w-full flex justify-between items-start gap-4'>
                <div className='w-full flex flex-col gap-3'>
                    <label className='w-full flex flex-col gap-1'>
                        <span className='w-full text-gray-400 text-base font-medium capitalize'>Program Title</span>
                        <input
                            type='text'
                            name='program_title'
                            value={formData.program_title}
                            onChange={inputHandler}
                            placeholder='enter program name'
                            className='w-full flex text-lg py-2 px-3 bg-black text-gray-200 font-semibold placeholder:text-gray-600 !border rounded-sm !border-[#333] outline-none focus:!border-yellow-500'
                        />
                    </label>

                    <label className='w-full flex flex-col gap-1'>
                        <span className='w-full text-gray-400 text-base font-medium capitalize'>Program Img</span>
                        <input
                            type='file'
                            name='program_img'
                            onChange={handleImageUpload}
                            className='w-full flex text-lg py-2 px-3 bg-black text-gray-200 font-semibold placeholder:text-gray-600 !border rounded-sm !border-[#333] outline-none focus:!border-yellow-500'
                        />
                    </label>
                </div>
                <div className='w-full flex flex-col gap-3'>
                    <label className='w-full flex flex-col gap-1'>
                        <span className='w-full text-gray-400 text-base font-medium capitalize'>Description</span>
                        <textarea
                            type='text'
                            name='program_desc'
                            value={formData.program_desc}
                            onChange={inputHandler}
                            rows={5}
                            placeholder='enter program Description'
                            className='w-full flex text-lg py-2 px-3 bg-black text-gray-200 font-semibold placeholder:text-gray-600 !border rounded-sm !border-[#333] outline-none focus:!border-yellow-500'
                        />
                    </label>
                </div>
            </div>

            <h2 className='text-lg font-bold text-green-500 uppercase'>Benefits - You need to Add Min 4 Benefits</h2>
            <div className='w-full flex justify-between items-start gap-4'>
                <div className='w-full flex flex-col gap-3'>
                    <label className='w-full flex flex-col gap-1'>
                        <span className='w-full text-gray-400 text-base font-medium capitalize'>heading</span>
                        <input
                            type='text'
                            name='heading'
                            value={benefitData.heading}
                            onChange={benifitHandler}
                            placeholder='enter benefit heading'
                            className='w-full flex text-lg py-2 px-3 bg-black text-gray-200 font-semibold placeholder:text-gray-600 !border rounded-sm !border-[#333] outline-none focus:!border-yellow-500'
                        />
                    </label>
                </div>
                <div className='w-full flex flex-col gap-3'>
                    <label className='w-full flex flex-col gap-1'>
                        <span className='w-full text-gray-400 text-base font-medium capitalize'>Description</span>
                        <input
                            type='text'
                            name='description'
                            value={benefitData.description}
                            onChange={benifitHandler}
                            placeholder='enter benefit Description'
                            className='w-full flex text-lg py-2 px-3 bg-black text-gray-200 font-semibold placeholder:text-gray-600 !border rounded-sm !border-[#333] outline-none focus:!border-yellow-500'
                        />
                    </label>
                </div>
            </div>
            <div className='w-full flex justify-end items-center'>
                <button onClick={addBenefit} className='px-3 py-2 text-lg bg-amber-600 text-white font-semibold rounded-md transition duration-200 ease-in hover:bg-amber-700'>Add Benfit</button>
            </div>
            <h2 className='text-lg font-bold text-gray-300 uppercase'>All Benefits:</h2>
            <div className='w-full flex flex-wrap justify-start gap-2'>
                {
                    formData.benefits.map((benefit, index) => (
                        <div key={index} className='p-2 rounded-md bg-slate-700 flex flex-col justify-center items-start'>
                            <h3 className='text-base'>{benefit.heading}</h3>
                            <div className='text-sm font-normal'>{benefit.description}</div>
                        </div>
                    ))
                }
            </div>


            <h2 className='text-lg font-bold text-green-500 uppercase'>Class level</h2>
            <div className='w-full flex justify-between items-start gap-4'>
                <div className='w-full flex flex-col gap-3'>
                    <label className='w-full flex flex-col gap-1'>
                        <span className='w-full text-gray-400 text-base font-medium capitalize'>Level</span>
                        <select 
                            name='level'
                            value={classLevelData.level}
                            onChange={classLevelHandler}
                            className='w-[50%] flex text-lg py-2 px-3 bg-black text-gray-200 font-semibold placeholder:text-gray-600 !border rounded-sm !border-[#333] outline-none focus:!border-yellow-500'
                        >
                            <option value="beginner">Beginner</option>
                            <option value="intermediate">Intermediate</option>
                            <option value="advanced">Advanced</option>
                        </select>
                    </label>

                    <div className='w-full flex justify-between items-end gap-4'>
                        <label className='w-full flex flex-col gap-1'>
                            <span className='w-full text-gray-400 text-base font-medium capitalize'>Description</span>
                            <input
                                type='text'
                                name='content'
                                value={content}
                                onChange={(event) => setContent(event.target.value)}
                                placeholder='enter content'
                                className='w-full flex text-lg py-2 px-3 bg-black text-gray-200 font-semibold placeholder:text-gray-600 !border rounded-sm !border-[#333] outline-none focus:!border-yellow-500'
                            />
                        </label>
                        <div className='w-full flex justify-start items-center gap-4'>
                            <button onClick={addMoreContent} className='px-3 py-2 text-lg bg-amber-600 text-white font-semibold rounded-md transition duration-200 ease-in hover:bg-amber-700'>Add</button>
                            <button onClick={addMoreMoreBenefit} className='px-3 py-2 text-lg bg-green-600 text-white font-semibold rounded-md transition duration-200 ease-in hover:bg-green-700'>Add Class Level</button>
                        </div>
                    </div>
                </div>
            </div>
            <h2 className='text-lg font-bold text-gray-300 uppercase'>All Class Levels:</h2>
            <div className='flex flex-col justify-start gap-2'>
            {
                formData.classLevel.map((level, index) => (
                    <div key={index} className='p-2 rounded-md bg-slate-700 flex flex-col justify-center items-start'>
                        <h3 className='text-base'>{level.level}</h3>
                        {
                            level.content.map((con, idx) => (
                                <div key={idx} className='text-sm font-normal text-gray-500'>{con}</div>
                            ))
                        }
                    </div>
                ))
            }
            </div>

            <div className='w-full flex items-center justify-between'>
                {
                    error !== '' && (
                    <div className='py-1 px-2 !border !border-red-500 text-red-500 bg-transparent text-base font-medium flex items-center gap-2'><MdError className='text-xl text-yellow-600'/>{error}</div>
                    )
                }

                {
                    sucess !== '' && (
                    <div className='py-1 px-2 !border !border-green-500 text-green-500 bg-transparent text-base font-medium flex items-center gap-2'><MdVerified className='text-xl text-green-600'/>{sucess}</div>
                    )
                }
                <button onClick={submitHandler} className='px-4 py-2 text-lg font-semibold text-white bg-orange-600 rounded-md flex items-center justify-center gap-2'>{isLoading && (<SmSpinner/>)} Submit</button>
            </div>
        </div>
    );
};

export default AddServices;
