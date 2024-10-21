import React, { useState } from 'react'
import { LuCalendarClock } from "react-icons/lu";
import { FcTreeStructure } from "react-icons/fc";
import toast from 'react-hot-toast';
import SmSpinner from '../../loader/SmSpinner';
import { MdError } from "react-icons/md";
import { MdVerified } from "react-icons/md";
import imageCompression from 'browser-image-compression';

const reduceImageSize = async (file) => {
  // Get the original file extension
  const fileExtension = file.name.split('.').pop().toLowerCase();

  // Define the options for image compression
  const options = {
    maxSizeMB: 0.8, // Max file size in MB
    maxWidthOrHeight: 800, // Max width or height of the image
    useWebWorker: true, // Use Web Worker for faster processing
    fileType: fileExtension === 'png' ? 'image/png' : 'image/jpeg', // Dynamically set the output file type
    initialQuality: 0.7, // Image quality (from 0 to 1)
  };

  try {
    // Compress the image and return the new file
    const compressedFile = await imageCompression(file, options);
    // Create a new filename with the original extension
    const newFileName = `${file.name.split('.')[0]}_compressed.${fileExtension}`;
    
    // Return the compressed file along with the updated name
    const renamedFile = new File([compressedFile], newFileName, {
      type: compressedFile.type,
      lastModified: Date.now(),
    });

    return renamedFile;
  } catch (error) {
    console.error('Error while reducing image size', error);
    throw error;
  }
};



const AddBranch = () => { 
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [sucess, setSucess] = useState('');
  const [feeStructureForm, setFeeStructureForm] = useState({
    package: '',
    male: '',
    female: '',
    couple: '',
    kids: ''
  });

  const [scheduleForm, setScheduleForm] = useState({
    day: '',
    times: [{ morningTime: '', description: '', eveningTime:'' }]
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    location_url: '',
    description: '',
    feeStructure: [],
    schedules: [],
    mon_img:null,
    tue_img:null,
    wed_img:null,
    thu_img:null,
    fri_img:null,
    sat_img:null
  });

  // Input Handler for Basic Fields
  function inputHandler(event) {
    setFormData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value
    }));
  }

  // Input Handler for Fee Structure
  function feeStructureHandler(event) {
    const { name, value } = event.target;
    setFeeStructureForm((prevState) => ({
      ...prevState,
      [name]: value
    }));
  }

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
      if (file.size < 2 * 1024 * 1024) { // file size less than 2MB
        setFormData((prevState) => ({
            ...prevState,
            [event.target.name]: file
        }));
      } else {
          toast.error("Image size should be less than 2MB");
      }
    } else {
        toast.error("Only .jpg and .png formats are allowed");
    }
  };

  // Add Fee Structure to FormData
  function AddMoreFeeStructure() {
    setFormData((prevState) => {
      const currState = { ...prevState };
      const prevFeeStructure = [...currState.feeStructure];
      const newFeeStructure = { ...feeStructureForm };
      
      prevFeeStructure.push(newFeeStructure);
      
      // Reset feeStructureForm after adding
      setFeeStructureForm({
        package: '',
        male: '',
        female: '',
        couple: '',
        kids: ''
      });

      return {
        ...currState,
        feeStructure: prevFeeStructure
      };
    });
  }

  // Schedule Form Handler
  function scheduleFormHandler(event) {
    const { name, value } = event.target;
    setScheduleForm((prevState) => ({
      ...prevState,
      [name]: value
    }));
  }

  // Handle Schedule Time Change
  const handleScheduleTimeChange = (index, event) => {
    const updatedTimes = [...scheduleForm.times];
    updatedTimes[index][event.target.name] = event.target.value;
    
    setScheduleForm((prevState) => ({
      ...prevState,
      times: updatedTimes
    }));
  };

  // Add New Time Field
  const addNewTimeField = () => {
    setScheduleForm((prevState) => ({
      ...prevState,
      times: [...prevState.times, { morningTime: '', description: '', eveningTime:'' }]
    }));
  };

  // Add Schedule to FormData
  const addSchedule = () => {
    setFormData((prevState) => ({
      ...prevState,
      schedules: [...prevState.schedules, { ...scheduleForm }]
    }));

    // Reset scheduleForm after adding
    setScheduleForm({
      day: '',
      times: [{ morningTime: '', description: '', eveningTime:'' }]
    });
  };

  const submitHandler = async() => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem("lionDen");
      if (!token) {
        throw new Error("Token not found. Please log in again.");
      }
  
      // Compress images before uploading
      const compressedMonImg = await reduceImageSize(formData.mon_img);
      const compressedTueImg = await reduceImageSize(formData.tue_img);
      const compressedWedImg = await reduceImageSize(formData.wed_img);
      const compressedThuImg = await reduceImageSize(formData.thu_img);
      const compressedFriImg = await reduceImageSize(formData.fri_img);
      const compressedSatImg = await reduceImageSize(formData.sat_img);
  
      const formXdata = new FormData();
      formXdata.append("name", formData.name);
      formXdata.append("email", formData.email);
      formXdata.append("phone", formData.phone);
      formXdata.append("location", formData.location);
      formXdata.append("location_url", formData.location_url);
      formXdata.append("description", formData.description);
      formXdata.append("feeStructure", JSON.stringify(formData.feeStructure));
      formXdata.append("schedules", JSON.stringify(formData.schedules));
      formXdata.append("mon_img", compressedMonImg);
      formXdata.append("tue_img", compressedTueImg);
      formXdata.append("wed_img", compressedWedImg);
      formXdata.append("thu_img", compressedThuImg);
      formXdata.append("fri_img", compressedFriImg);
      formXdata.append("sat_img", compressedSatImg);      
  
      const response = await fetch(`${baseUrl}/branch-add`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`, // Do not set 'Content-Type' for FormData
        },
        body: formXdata
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
  
      const data = await response.json();
      if(data.success){
        setError('');
        setSucess(data.message);
        toast.success(data.message);
      } else {
        setSucess('');
        setError(data.message);
      }
      console.log(data);
    } catch(err){
      setSucess('');
      setError(err.message);
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <div className='w-full flex flex-col gap-4'>
      <h2 className='text-lg font-bold text-green-500 uppercase'>Add New Branch</h2>
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
              placeholder='phone number e.g. 787 132 8987'
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

      <h2 className='mt-4 text-lg font-bold text-green-600 flex items-center gap-1'><FcTreeStructure className='text-2xl'/>Fee Structure</h2>
      <div className='w-full flex justify-between items-start gap-4'>
        <div className='w-full flex flex-col gap-3'>
          <label className='w-full flex flex-col gap-1'>
            <span className='w-full text-gray-400 text-base font-medium capitalize'>Package Name</span>
            <input
              type='text'
              name='package'
              value={feeStructureForm.package}
              onChange={feeStructureHandler}
              placeholder='enter package name'
              className='w-full flex text-lg py-2 px-3 bg-black text-gray-200 font-semibold placeholder:text-gray-600 !border rounded-sm !border-[#333] outline-none focus:!border-yellow-500'
            />
          </label>

          <label className='w-full flex flex-col gap-1'>
            <span className='w-full text-gray-400 text-base font-medium capitalize'>Male</span>
            <input
              type='number'
              name='male'
              value={feeStructureForm.male}
              onChange={feeStructureHandler}
              placeholder='enter package amount for men'
              className='w-full flex text-lg py-2 px-3 bg-black text-gray-200 font-semibold placeholder:text-gray-600 !border rounded-sm !border-[#333] outline-none focus:!border-yellow-500'
            />
          </label>

          <label className='w-full flex flex-col gap-1'>
            <span className='w-full text-gray-400 text-base font-medium capitalize'>Female</span>
            <input
              type='number'
              name='female'
              value={feeStructureForm.female}
              onChange={feeStructureHandler}
              placeholder='enter package amount for female'
              className='w-full flex text-lg py-2 px-3 bg-black text-gray-200 font-semibold placeholder:text-gray-600 !border rounded-sm !border-[#333] outline-none focus:!border-yellow-500'
            />
          </label>
        </div>

        <div className='w-full flex flex-col gap-3'>
          <label className='w-full flex flex-col gap-1'>
            <span className='w-full text-gray-400 text-base font-medium capitalize'>Kids</span>
            <input
              type='text'
              name='kids'
              value={feeStructureForm.kids}
              onChange={feeStructureHandler}
              placeholder='enter package amount for kids'
              className='w-full flex text-lg py-2 px-3 bg-black text-gray-200 font-semibold placeholder:text-gray-600 !border rounded-sm !border-[#333] outline-none focus:!border-yellow-500'
            />
          </label>

          <label className='w-full flex flex-col gap-1'>
            <span className='w-full text-gray-400 text-base font-medium capitalize'>Couple</span>
            <input
              type='text'
              name='couple'
              value={feeStructureForm.couple}
              onChange={feeStructureHandler}
              placeholder='enter package amount for couple'
              className='w-full flex text-lg py-2 px-3 bg-black text-gray-200 font-semibold placeholder:text-gray-600 !border rounded-sm !border-[#333] outline-none focus:!border-yellow-500'
            />
          </label>

          <div className='w-full flex items-center justify-end'>
            <button onClick={AddMoreFeeStructure} className='px-3 py-2 text-lg bg-amber-600 text-white font-semibold rounded-md transition duration-200 ease-in hover:bg-amber-700'>Add more package</button>
          </div>
        </div>
      </div>
      <div className='w-full'>
        <h3 className='text-gray-400 text-lg font-medium'>All Packges:</h3>
        <div className='w-full flex flex-col gap-3 mt-2 text-white'>
          <table className='w-full border-collapse bg-gray-800'>
            <thead>
              <tr className='bg-gray-700'>
                <th className='border border-gray-600 px-4 py-2'>Package</th>
                <th className='border border-gray-600 px-4 py-2'>Male</th>
                <th className='border border-gray-600 px-4 py-2'>Female</th>
                <th className='border border-gray-600 px-4 py-2'>Couple</th>
                <th className='border border-gray-600 px-4 py-2'>Kids</th>
              </tr>
            </thead>
            <tbody>
              {formData.feeStructure.map((fee, index) => (
                <tr key={index} className={`bg-gray-${index % 2 === 0 ? '800' : '700'} hover:bg-gray-600`}>
                  <td className='border border-gray-600 px-4 py-2'>{fee.package}</td>
                  <td className='border border-gray-600 px-4 py-2'>{fee.male}</td>
                  <td className='border border-gray-600 px-4 py-2'>{fee.female}</td>
                  <td className='border border-gray-600 px-4 py-2'>{fee.couple}</td>
                  <td className='border border-gray-600 px-4 py-2'>{fee.kids}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <h2 className='mt-4 text-lg font-bold text-green-600 flex items-center gap-1'><LuCalendarClock className='text-2xl text-yellow-600'/>Upload Schedules Images</h2>
      <div className='w-full flex justify-between gap-6'>
        <div className='w-full flex flex-col gap-3'>
          <label className='w-full flex flex-col gap-1'>
            <span className='w-full text-gray-400 text-base font-medium capitalize'>Monday</span>
            <input
              type='file'
              name='mon_img'
              onChange={handleImageUpload}
              className='w-full flex text-lg py-2 px-3 bg-black text-gray-200 font-semibold placeholder:text-gray-600 !border rounded-sm !border-[#333] outline-none focus:!border-yellow-500'
            />
          </label>
          <label className='w-full flex flex-col gap-1'>
            <span className='w-full text-gray-400 text-base font-medium capitalize'>Wednesday</span>
            <input
              type='file'
              name='wed_img'
              onChange={handleImageUpload}
              className='w-full flex text-lg py-2 px-3 bg-black text-gray-200 font-semibold placeholder:text-gray-600 !border rounded-sm !border-[#333] outline-none focus:!border-yellow-500'
            />
          </label>
          <label className='w-full flex flex-col gap-1'>
            <span className='w-full text-gray-400 text-base font-medium capitalize'>Friday</span>
            <input
              type='file'
              name='fri_img'
              onChange={handleImageUpload}
              className='w-full flex text-lg py-2 px-3 bg-black text-gray-200 font-semibold placeholder:text-gray-600 !border rounded-sm !border-[#333] outline-none focus:!border-yellow-500'
            />
          </label>
        </div>
        <div className='w-full flex flex-col gap-3'>
          <label className='w-full flex flex-col gap-1'>
            <span className='w-full text-gray-400 text-base font-medium capitalize'>Tuesday</span>
            <input
              type='file'
              name='tue_img'
              onChange={handleImageUpload}
              className='w-full flex text-lg py-2 px-3 bg-black text-gray-200 font-semibold placeholder:text-gray-600 !border rounded-sm !border-[#333] outline-none focus:!border-yellow-500'
            />
          </label>
          <label className='w-full flex flex-col gap-1'>
            <span className='w-full text-gray-400 text-base font-medium capitalize'>Thrusday</span>
            <input
              type='file'
              name='thu_img'
              onChange={handleImageUpload}
              className='w-full flex text-lg py-2 px-3 bg-black text-gray-200 font-semibold placeholder:text-gray-600 !border rounded-sm !border-[#333] outline-none focus:!border-yellow-500'
            />
          </label>

          <label className='w-full flex flex-col gap-1'>
            <span className='w-full text-gray-400 text-base font-medium capitalize'>Saturday</span>
            <input
              type='file'
              name='sat_img'
              onChange={handleImageUpload}
              className='w-full flex text-lg py-2 px-3 bg-black text-gray-200 font-semibold placeholder:text-gray-600 !border rounded-sm !border-[#333] outline-none focus:!border-yellow-500'
            />
          </label>
        </div>
      </div>

      <h2 className='mt-4 text-lg font-bold text-green-600 flex items-center gap-1'><LuCalendarClock className='text-2xl text-yellow-600'/> OR Schedules With text</h2>
      {/* Day Input */}
      <div className='w-full flex flex-col gap-3'>
        <label className='w-full flex flex-col gap-1'>
          <span className='w-full text-gray-400 text-base font-medium capitalize'>Day</span>
          <input
            type='text'
            name='day'
            value={scheduleForm.day}
            onChange={scheduleFormHandler}
            placeholder='Enter day of schedule'
            className='w-full flex text-lg py-2 px-3 bg-black text-gray-200 font-semibold placeholder:text-gray-600 !border rounded-sm !border-[#333] outline-none focus:!border-yellow-500'
          />
        </label>

        {/* Schedule Time Section */}
        {scheduleForm.times.map((time, index) => (
          <div key={index} className='w-full flex gap-4'>
            <label className='w-full flex flex-col gap-1'>
              <span className='w-full text-gray-400 text-base font-medium capitalize'>Morning Time</span>
              <input
                type='text'
                name='morningTime'
                value={time.morningTime}
                onChange={(event) => handleScheduleTimeChange(index, event)}
                placeholder='Enter morning time'
                className='w-full flex text-lg py-2 px-3 bg-black text-gray-200 font-semibold placeholder:text-gray-600 !border rounded-sm !border-[#333] outline-none focus:!border-yellow-500'
              />
            </label>
            <label className='w-full flex flex-col gap-1'>
              <span className='w-full text-gray-400 text-base font-medium capitalize'>Evening Time</span>
              <input
                type='text'
                name='eveningTime'
                value={time.eveningTime}
                onChange={(event) => handleScheduleTimeChange(index, event)}
                placeholder='Enter evening Name'
                className='w-full flex text-lg py-2 px-3 bg-black text-gray-200 font-semibold placeholder:text-gray-600 !border rounded-sm !border-[#333] outline-none focus:!border-yellow-500'
              />
            </label>
            <label className='w-full flex flex-col gap-1'>
              <span className='w-full text-gray-400 text-base font-medium capitalize'>Description</span>
              <input
                type='text'
                name='description'
                value={time.description}
                onChange={(event) => handleScheduleTimeChange(index, event)}
                placeholder='Enter time description'
                className='w-full flex text-lg py-2 px-3 bg-black text-gray-200 font-semibold placeholder:text-gray-600 !border rounded-sm !border-[#333] outline-none focus:!border-yellow-500'
              />
            </label>
          </div>
        ))}

        <div className='w-full flex items-center justify-start gap-4'>
          <button
            type='button'
            onClick={addNewTimeField}
            className='text-center py-2 px-3 bg-yellow-600 text-white font-semibold mt-2 rounded-sm'
          >
            Add Another Time
          </button>

          <button
            type='button'
            onClick={addSchedule}
            className='text-center py-2 px-3 bg-green-600 text-white font-semibold mt-2 rounded-sm'
          >
            Add Schedule
          </button>
        </div>
      </div>

      {/* Display all schedules */}
      <div className='w-full mt-5'>
        <h3 className='text-gray-400 text-lg font-medium'>All Schedules:</h3>
        <div className='w-full flex flex-col gap-3 mt-2'>
          {formData.schedules.map((schedule, index) => (
            <div key={index} className='p-3 bg-gray-800 rounded-md'>
              <h4 className='text-yellow-500 text-md'>{schedule.day}</h4>
              <ul className='mt-2'>
                {schedule.times.map((timeEntry, idx) => (
                  <li key={idx} className='text-gray-300'>
                    {timeEntry.morningTime}, {timeEntry.eveningTime} - {timeEntry.description}
                  </li>
                ))}
              </ul>
            </div>
          ))}
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
        <button onClick={submitHandler} className='px-4 py-2 text-lg font-semibold text-white bg-orange-600 rounded-md flex items-center justify-center gap-2'>{isLoading && (<SmSpinner/>)} Submit</button>
      </div>
    </div>
  )
}

export default AddBranch