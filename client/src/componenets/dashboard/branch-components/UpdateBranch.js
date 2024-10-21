import React, { useState } from 'react';
import SmSpinner from '../../loader/SmSpinner';
import { MdError } from "react-icons/md";
import { MdVerified } from "react-icons/md";
import toast from 'react-hot-toast';
import UpdateFeeStructure from './UpdateFeeStructure';
import UpdateTimeTable from './UpdateTimeTable';

const UpdateBranch = () => {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [sucess, setSucess] = useState('');
  const [branchName, setBranchName] = useState('');
  const [branchData, setBranchData] = useState(null);
  const [formData, setFormData] = useState({
    id:'',
    name: '',
    email: '',
    phone: '',
    location: '',
    location_url: '',
    description: ''
  });

  // Input Handler for Basic Fields
  function inputHandler(event) {
    setFormData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value
    }));
  }

  const submitHandler = async() => {
    if (branchName === "") {
      setError("Please enter branch Id");
      return;
    }
  
    setIsLoading(true); // Start loading
  
    try {
      const response = await fetch(`${baseUrl}/branch/${branchName}`, {
        method: "GET",
      });
  
      const data = await response.json();
      if(data.success){
        setError("");
        setSucess(data.message);
        setBranchData(data.branch);
        setFormData({
          id: data.branch._id,
          name: data.branch.name,
          email: data.branch.email,
          phone: data.branch.phone,
          location: data.branch.location,
          location_url: data.branch.location_url,
          description: data.branch.description
        })
        setBranchName("");
        setSucess("");
      }
      else{
        setSucess("");
        setError(data.message);
      }
    } catch (error) {
      setSucess("");
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  const updateBranchHandler = async () => {
    try{
      setIsLoading(true);
      const token = localStorage.getItem("lionDen");
      if (!token) {
        throw new Error("Token not found. Please log in again.");
      }
      const response = await fetch(`${baseUrl}/branch-update`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      if(data.success){
        setError('');
        setSucess(data.message);
        toast.success(data.message);
      }
      else{
        setSucess('');
        setError(data.message);
      }
    } catch(err){
      setSucess('');
      setError(err.message);
      toast.error(err.message);
    } finally{
      setIsLoading(false);
    }
  }

  if(!branchData){
    return (
      <div className='w-full flex justify-center items-center py-8'>
        <div className='w-[400px] flex flex-col gap-4'>
          <input
            type='text'
            placeholder='enter branch name'
            value={branchName}
            onChange={(event) => setBranchName(event.target.value)}
            className='w-full flex text-lg py-2 px-3 bg-black text-gray-200 font-semibold placeholder:text-gray-600 !border rounded-sm !border-[#333] outline-none focus:!border-yellow-500'
          />

          <div className='w-full flex flex-col items-center justify-between gap-4'>
            {
              error !== '' && (
                <div className='w-full py-1 px-2 !border !border-red-500 text-red-500 bg-transparent text-base font-medium flex items-center gap-2'><MdError className='text-xl text-yellow-600'/>{error}</div>
              )
            }

            {
              sucess !== '' && (
                <div className='w-full py-1 px-2 !border !border-green-500 text-green-500 bg-transparent text-base font-medium flex items-center gap-2'><MdVerified className='text-xl text-green-600'/>{sucess}</div>
              )
            }
            <button onClick={submitHandler} className='px-4 py-2 text-lg font-semibold text-white bg-orange-600 rounded-md flex items-center justify-center gap-2'>{isLoading && (<SmSpinner/>)} Submit</button>
          </div>
        </div>
      </div>
    )
  }


  return (
    <div className='w-full flex flex-col gap-4'>
      <h2 className='text-lg font-bold text-green-500 uppercase'>Update branch</h2>
      <div className='w-full flex justify-between items-start gap-4'>
        <div className='w-full flex flex-col gap-3'>
          <label className='w-full flex flex-col gap-1'>
            <span className='w-full text-gray-400 text-base font-medium capitalize'>Branch Name</span>
            <input
              type='text'
              name='name'
              value={formData.name}
              onChange={inputHandler}
              placeholder='enter branch name'
              className='w-full flex text-lg py-2 px-3 bg-black text-gray-200 font-semibold placeholder:text-gray-600 !border rounded-sm !border-[#333] outline-none focus:!border-yellow-500'
            />
          </label>

          <label className='w-full flex flex-col gap-1'>
            <span className='w-full text-gray-400 text-base font-medium capitalize'>Email</span>
            <input
              type='email'
              name='email'
              value={formData.email}
              onChange={inputHandler}
              placeholder='enter branch email'
              className='w-full flex text-lg py-2 px-3 bg-black text-gray-200 font-semibold placeholder:text-gray-600 !border rounded-sm !border-[#333] outline-none focus:!border-yellow-500'
            />
          </label>

          <label className='w-full flex flex-col gap-1'>
            <span className='w-full text-gray-400 text-base font-medium capitalize'>Phone</span>
            <input
              type='text'
              name='phone'
              value={formData.phone}
              onChange={inputHandler}
              placeholder='phone number e.g. +91 787 132 8987'
              className='w-full flex text-lg py-2 px-3 bg-black text-gray-200 font-semibold placeholder:text-gray-600 !border rounded-sm !border-[#333] outline-none focus:!border-yellow-500'
            />
          </label>

          <label className='w-full flex flex-col gap-1'>
            <span className='w-full text-gray-400 text-base font-medium capitalize'>Address</span>
            <input
              type='text'
              name='location'
              value={formData.location}
              onChange={inputHandler}
              placeholder='branch address'
              className='w-full flex text-lg py-2 px-3 bg-black text-gray-200 font-semibold placeholder:text-gray-600 !border rounded-sm !border-[#333] outline-none focus:!border-yellow-500'
            />
          </label>          
        </div>

        <div className='w-full flex flex-col gap-3'>
          <label className='w-full flex flex-col gap-1'>
            <span className='w-full text-gray-400 text-base font-medium capitalize'>Location URL</span>
            <input
              type='text'
              name='location_url'
              value={formData.location_url}
              onChange={inputHandler}
              placeholder='e.g. https://www.google.com/maps/embed...'
              className='w-full flex text-lg py-2 px-3 bg-black text-gray-200 font-semibold placeholder:text-gray-600 !border rounded-sm !border-[#333] outline-none focus:!border-yellow-500'
            />
          </label>

          <label className='w-full flex flex-col gap-1'>
            <span className='w-full text-gray-400 text-base font-medium capitalize'>Description</span>
            <textarea
              type='text'
              name='description'
              value={formData.description}
              onChange={inputHandler}
              rows={7}
              placeholder='write about branch'
              className='w-full flex text-lg py-2 px-3 bg-black text-gray-200 font-semibold placeholder:text-gray-600 !border rounded-sm !border-[#333] outline-none focus:!border-yellow-500'
            />
          </label>
        </div>
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
        <button onClick={updateBranchHandler} className='px-4 py-2 text-lg font-semibold text-white bg-orange-600 rounded-md flex items-center justify-center gap-2'>{isLoading && (<SmSpinner/>)} Update Details</button>
      </div>

      <UpdateFeeStructure data={branchData}/>
      <UpdateTimeTable data={branchData._id}/>
    </div>
  )
}

export default UpdateBranch