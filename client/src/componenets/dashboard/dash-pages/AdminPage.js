import React, { useContext, useEffect, useState } from 'react'
import SmSpinner from '../../loader/SmSpinner';
import { MdError } from "react-icons/md";
import { MdVerified } from "react-icons/md";
import { AppContext } from '../../../context/AppContext';
import { AdminContext } from '../../../context/AdminContext';

const AdminPage = () => {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const {adminData} = useContext(AppContext);
  const {branchData, contactData, servicesData, coachData, setIsActiveWebActive} = useContext(AdminContext);
  const [formData, setFormData] = useState({
    id:'',
    password:'',
    email:''
  })

  useEffect(() => {
    if(adminData){
      setFormData((prevState) => ({
        ...prevState,
        id: adminData._id
      }))
    }
  }, [adminData])

  function inputHandler(event){
    setFormData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value
    }))
  }

  const submitHandler = async () => {
    try{
      setIsLoading(true);
      const token = localStorage.getItem("lionDen");
      if (!token) {
        throw new Error("Token not found. Please log in again.");
      }
      const response = await fetch(`${baseUrl}/update-admin`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData)
      });

      const res = await response.json();
      if(res.success){
        setError("");
        setSuccess(res.message);
        setFormData({
          id:'',
          password:'',
          email:''
        })
      }
      else{
        setSuccess("");
        setError(res.message);
      }
    } catch(err){
      setSuccess("");
      setError(err.message);
    } finally{
      setIsLoading(false);
    }
  }

  return (
    <div className='w-full flex flex-col gap-8 '>
      <div className='w-full flex justify-around items-center gap-4'>
        <div className='w-[150px] !border !border-[#e19833a9] rounded-lg px-2 py-2 flex flex-col items-center justify-center'>
          <h2 className='text-xl font-semibold text-yellow-600'>Total Branch</h2>
          <span className='text-2xl font-bold text-gray-400'>{branchData?.length}</span>
        </div>

        <div className='w-[150px] !border !border-[#e19833a9] rounded-lg px-2 py-2 flex flex-col items-center justify-center'>
          <h2 className='text-xl font-semibold text-yellow-600'>Total Services</h2>
          <span className='text-2xl font-bold text-gray-400'>{servicesData?.length}</span>
        </div>

        <div className='w-[150px] !border !border-[#e19833a9] rounded-lg px-2 py-2 flex flex-col items-center justify-center'>
          <h2 className='text-xl font-semibold text-yellow-600'>Total Coach</h2>
          <span className='text-2xl font-bold text-gray-400'>{coachData?.length}</span>
        </div>

        <div className='min-w-[150px] !border !border-[#e19833a9] rounded-lg px-2 py-2 flex flex-col items-center justify-center'>
          <h2 className='text-xl font-semibold text-yellow-600'>Total Free Tail Schedule</h2>
          <span className='text-2xl font-bold text-gray-400'>{contactData?.length}</span>
        </div>
      </div>

      <div className='w-full flex items-start justify-between gap-8'>
        <div className='w-full flex flex-col justify-between items-center gap-8 px-4 !border !border-[#444] py-4 rounded-s-lg bg-[#4444] backdrop-blur-md'>
          <h2>Add new Admin</h2>
          <label className='w-full flex flex-col gap-1'>
            <span className=' text-gray-400 text-base font-medium capitalize'>Password</span>
            <input
              type='password'
              name='password'
              value={formData.password}
              onChange={inputHandler}
              required
              placeholder='enter your password'
              className='w-full flex text-lg py-2 px-3 bg-black text-gray-200 font-semibold placeholder:text-gray-600 !border rounded-sm !border-[#333] outline-none focus:!border-yellow-500'
            />
          </label>
          <label className='w-full flex flex-col gap-1'>
            <span className=' text-gray-400 text-base font-medium capitalize'>Add a new admin who requires access.</span>
            <input
              type='email'
              name='email'
              value={formData.email}
              onChange={inputHandler}
              required
              placeholder='enter email'
              className='w-full flex text-lg py-2 px-3 bg-black text-gray-200 font-semibold placeholder:text-gray-600 !border rounded-sm !border-[#333] outline-none focus:!border-yellow-500'
            />
          </label>
          
          {
            error !== '' && (
              <div className='w-full py-1 px-2 !border !border-red-500 text-red-500 bg-transparent text-base font-medium flex items-center gap-2'><MdError className='text-xl text-yellow-600'/>{error}</div>
            )
          }

          {
            success !== '' && (
              <div className='w-full py-1 px-2 !border !border-green-500 text-green-500 bg-transparent text-base font-medium flex items-center gap-2'><MdVerified className='text-xl text-green-600'/>{success}</div>
            )
          }
          <button onClick={submitHandler} className='bg-blue-600 text-lg text-left font-semibold py-2 px-4 flex justify-center gap-2 items-center'>submit {isLoading && (<SmSpinner/>)}</button>
        </div>

        <div className='w-full'>
          <button onClick={() => setIsActiveWebActive(true)} className='!border !border-[#555] py-2 px-3 bg-blue-600 text-md text-gray-300 font-semibold rounded uppercase'>Update Basic Contact Details</button>
        </div>
      </div>
    </div>
  )
}

export default AdminPage