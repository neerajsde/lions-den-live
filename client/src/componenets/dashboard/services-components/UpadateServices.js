import React, { useEffect, useState } from "react";
import SmSpinner from "../../loader/SmSpinner";
import { MdError } from "react-icons/md";
import { MdVerified } from "react-icons/md";
import toast from "react-hot-toast";

const UpadateServices = () => {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [sucess, setSucess] = useState("");
  const [serviceId, setServicesID] = useState("");
  const [servicesData, setServicesData] = useState(null);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    program_title: "",
    program_desc: "",
    program_img: null,
    h_1: "",
    desc_1: "",
    h_2: "",
    desc_2: ""
  });

  const [benefitsData, setbenefitsData] = useState([]);
  const [classLevelData, setClassLevelData] = useState([]);
  useEffect(() => {
    if(servicesData){
      // benefits
      const newBenefit = [];
      servicesData.benefits.map((service) => {
        newBenefit.push({
          id: service._id,
          heading:service.heading,
          description: service.description,
          isLoading: false
        })
      })
      setbenefitsData(newBenefit);

      // classLevel
      const classLevels = [];
      servicesData.classLevel.map((item) => {
        classLevels.push({
          id:item._id,
          level: item.level,
          content: item.content,
          isLoading: false
        })
      })
      setClassLevelData(classLevels);
    }
  },[servicesData]);

  const benefitInputHandler = (index, event) => {
    const { name, value } = event.target;
    const updatedBenefits = [...benefitsData];
    updatedBenefits[index][name] = value;
    setbenefitsData(updatedBenefits);
  };

  const classLavelInputHandler = (classLevelIndex, event, contentIndex = null) => {
    const { name, value } = event.target;
    const updatedclassLevel = [...classLevelData];
  
    // If the content index is provided, we're updating the content array
    if (contentIndex !== null) {
      updatedclassLevel[classLevelIndex].content[contentIndex] = value;
    } else {
      // Otherwise, we're updating the class level directly
      updatedclassLevel[classLevelIndex][name] = value;
    }
    setClassLevelData(updatedclassLevel);
  };
  

  // Input Handler for Basic Fields
  function inputHandler(event) {
    setFormData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  }

  const submitHandler = async () => {
    if (serviceId === "") {
      setError("Please enter services ID");
      return;
    }

    setIsLoading(true); // Start loading

    try {
      const response = await fetch(`${baseUrl}/services/getById/${serviceId}`, {
        method: "GET",
      });

      const data = await response.json();
      if (data.success) {
        setError("");
        setSucess(data.message);
        setServicesData(data.data);
        setFormData({
          id: data.data?._id,
          name: data.data?.name,
          program_title: data.data?.program_title,
          program_desc: data.data?.program_desc,
          h_1: data.data?.desc1?.header,
          desc_1: data.data?.desc1?.paragraph,
          h_2: data.data?.desc2?.header,
          desc_2: data.data?.desc2?.paragraph,
          program_img: null,
          benefits: data.data?.benefits
        });
        toast.success(data.message);
        setSucess("");
      } else {
        setSucess("");
        setError(data.message);
      }
    } catch (error) {
      setSucess("");
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const updateServicesHandler = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem("lionDen");
      if (!token) {
        throw new Error("Token not found. Please log in again.");
      }
      const response = await fetch(`${baseUrl}/services/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          id:formData.id, 
          name:formData.name, 
          program_title:formData.program_title, 
          program_desc: formData.program_desc, 
          h_1:formData.h_1, 
          desc_1:formData.desc_1, 
          h_2:formData.h_2, 
          desc_2:formData.desc_2
        }),
      });

      const data = await response.json();
      if (data.success) {
        setError("");
        setSucess(data.message);
        toast.success(data.message);
      } else {
        setSucess("");
        setError(data.message);
      }
      console.log(data);
    } catch (err) {
      setSucess("");
      setError(err.message);
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const updateBenefitHandler = async (index) => {
    try{
      setbenefitsData((prevState) => {
        const currState = [...prevState];
        currState[index].isLoading = true;
        return currState;
      })
      const token = localStorage.getItem("lionDen");
      if (!token) {
        throw new Error("Token not found. Please log in again.");
      }
      const response = await fetch(`${baseUrl}/services/benfit/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          id: benefitsData[index].id,
          heading: benefitsData[index].heading,
          description: benefitsData[index].description
        }),
      });

      const data = await response.json();
      if(data.success){
        toast.success(data.message);
      }
      else{
        toast.error(data.message);
      }
    } catch(err){
      toast.error('something went wrong');
    } finally{
      setbenefitsData((prevState) => {
        const currState = [...prevState];
        currState[index].isLoading = false;
        return currState;
      })
    }
  }

  const updateClassLevel = async (index) => {
    try{
      setClassLevelData((prevState) => {
        const currState = [...prevState];
        currState[index].isLoading = true;
        return currState;
      })
      const token = localStorage.getItem("lionDen");
      if (!token) {
        throw new Error("Token not found. Please log in again.");
      }
      const response = await fetch(`${baseUrl}/services/classLevel/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          id: formData.id,
          level: classLevelData[index].level,
          content: classLevelData[index].content,
          index: index
        }),
      });

      const data = await response.json();
      if(data.success){
        toast.success(data.message);
      }
      else{
        toast.error(data.message);
      }
    } catch(err){
      toast.error('something went wrong');
    } finally{
      setClassLevelData((prevState) => {
        const currState = [...prevState];
        currState[index].isLoading = false;
        return currState;
      })
    }
  }

  if (!servicesData) {
    return (
      <div className="w-full flex justify-center items-center py-8">
        <div className="w-[400px] flex flex-col gap-4">
          <input
            type="text"
            placeholder="enter services ID"
            value={serviceId}
            onChange={(event) => setServicesID(event.target.value)}
            className="w-full flex text-lg py-2 px-3 bg-black text-gray-200 font-semibold placeholder:text-gray-600 !border rounded-sm !border-[#333] outline-none focus:!border-yellow-500"
          />

          <div className="w-full flex flex-col items-center justify-between gap-4">
            {error !== "" && (
              <div className="w-full py-1 px-2 !border !border-red-500 text-red-500 bg-transparent text-base font-medium flex items-center gap-2">
                <MdError className="text-xl text-yellow-600" />
                {error}
              </div>
            )}

            {sucess !== "" && (
              <div className="w-full py-1 px-2 !border !border-green-500 text-green-500 bg-transparent text-base font-medium flex items-center gap-2">
                <MdVerified className="text-xl text-green-600" />
                {sucess}
              </div>
            )}
            <button
              onClick={submitHandler}
              className="px-4 py-2 text-lg font-semibold text-white bg-orange-600 rounded-md flex items-center justify-center gap-2"
            >
              {isLoading && <SmSpinner />} Submit
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-4">
      <h2 className="text-lg font-bold text-green-500 uppercase">
        Update Services
      </h2>
      <div className="w-full flex justify-between items-start gap-4">
        <div className="w-full flex flex-col gap-3">
          <label className="w-[500px] flex flex-col gap-1">
            <span className="w-full text-gray-400 text-base font-medium capitalize">
              Services Name
            </span>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={inputHandler}
              placeholder="enter services name"
              className="w-full flex text-lg py-2 px-3 bg-black text-gray-200 font-semibold placeholder:text-gray-600 !border rounded-sm !border-[#333] outline-none focus:!border-yellow-500"
            />
          </label>
        </div>
      </div>

      <div className="w-full flex justify-between items-start gap-4">
        <div className="w-full flex flex-col gap-2">
          <label className="w-full flex flex-col gap-1">
            <span className="w-full text-gray-400 text-base font-medium capitalize">
              Heading-1
            </span>
            <input
              type="text"
              name="h_1"
              value={formData.h_1}
              onChange={inputHandler}
              placeholder="enter services title"
              className="w-full flex text-lg py-2 px-3 bg-black text-gray-200 font-semibold placeholder:text-gray-600 !border rounded-sm !border-[#333] outline-none focus:!border-yellow-500"
            />
          </label>

          <label className="w-full flex flex-col gap-1">
            <span className="w-full text-gray-400 text-base font-medium capitalize">
              Description-1
            </span>
            <textarea
              type="text"
              name="desc_1"
              value={formData.desc_1}
              onChange={inputHandler}
              placeholder="write about services"
              className="w-full flex text-lg py-2 px-3 bg-black text-gray-200 font-semibold placeholder:text-gray-600 !border rounded-sm !border-[#333] outline-none focus:!border-yellow-500"
            />
          </label>
        </div>

        <div className="w-full flex flex-col gap-2">
          <label className="w-full flex flex-col gap-1">
            <span className="w-full text-gray-400 text-base font-medium capitalize">
              Heading-2
            </span>
            <input
              type="text"
              name="h_2"
              value={formData.h_2}
              onChange={inputHandler}
              placeholder="enter services title"
              className="w-full flex text-lg py-2 px-3 bg-black text-gray-200 font-semibold placeholder:text-gray-600 !border rounded-sm !border-[#333] outline-none focus:!border-yellow-500"
            />
          </label>

          <label className="w-full flex flex-col gap-1">
            <span className="w-full text-gray-400 text-base font-medium capitalize">
              Description-2
            </span>
            <textarea
              type="text"
              name="desc_2"
              value={formData.desc_2}
              onChange={inputHandler}
              placeholder="write about services"
              className="w-full flex text-lg py-2 px-3 bg-black text-gray-200 font-semibold placeholder:text-gray-600 !border rounded-sm !border-[#333] outline-none focus:!border-yellow-500"
            />
          </label>
        </div>
      </div>

      <div className="w-full flex flex-col gap-3">
        <h2 className="text-lg font-bold text-yellow-500 uppercase">
          Program Details
        </h2>
        <div className="w-full flex justify-between gap-4">
          <label className="w-full flex flex-col gap-1">
            <span className="w-full text-gray-400 text-base font-medium capitalize">
              Title
            </span>
            <input
              type="text"
              name="program_title"
              value={formData.program_title}
              onChange={inputHandler}
              placeholder="write program title"
              className="w-full flex text-lg py-2 px-3 bg-black text-gray-200 font-semibold placeholder:text-gray-600 !border rounded-sm !border-[#333] outline-none focus:!border-yellow-500"
            />
          </label>
          <label className="w-full flex flex-col gap-1">
            <span className="w-full text-gray-400 text-base font-medium capitalize">
              Description
            </span>
            <input
              type="text"
              name="program_desc"
              value={formData.program_desc}
              onChange={inputHandler}
              placeholder="write about description"
              className="w-full flex text-lg py-2 px-3 bg-black text-gray-200 font-semibold placeholder:text-gray-600 !border rounded-sm !border-[#333] outline-none focus:!border-yellow-500"
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
          onClick={updateServicesHandler}
          className="px-2 py-1 text-lg font-semibold text-white bg-orange-600 rounded-md flex items-center justify-center gap-2"
        >
          {isLoading && <SmSpinner />} Update
        </button>
      </div>


      <div className="w-full flex flex-col gap-3">
        <h2 className="text-lg font-bold text-yellow-500 uppercase">
          Update Benefits
        </h2>
        <div className="w-full flex flex-col gap-4">
          {
            benefitsData &&  benefitsData.map((benefit, index) => (
              <div className="w-full flex justify-between items-end gap-4">
                <label className="w-full flex flex-col gap-1">
                  <span className="w-full text-gray-400 text-base font-medium capitalize">
                    Title
                  </span>
                  <input
                    type="text"
                    name="heading"
                    value={benefit.heading}
                    onChange={(e) => benefitInputHandler(index, e)}
                    placeholder="write program title"
                    className="w-full flex text-lg py-2 px-3 bg-black text-gray-200 font-semibold placeholder:text-gray-600 !border rounded-sm !border-[#333] outline-none focus:!border-yellow-500"
                  />
                </label>
                <label className="w-full flex flex-col gap-1">
                  <span className="w-full text-gray-400 text-base font-medium capitalize">
                    Description
                  </span>
                  <input
                    type="text"
                    name="description"
                    value={benefit.description}
                    onChange={(e) => benefitInputHandler(index, e)}
                    placeholder="write about description"
                    className="w-full flex text-lg py-2 px-3 bg-black text-gray-200 font-semibold placeholder:text-gray-600 !border rounded-sm !border-[#333] outline-none focus:!border-yellow-500"
                  />
                </label>
                <button onClick={() => updateBenefitHandler(index)} className="h-[40px] py-1 px-3 bg-blue-600 text-white font-semibold text-lg">{benefitsData[index].isLoading ? (<SmSpinner/>) : 'Save'}</button>
              </div>
            ))
          }
        </div>
      </div>

      <div className="w-full flex flex-col gap-3">
        <h2 className="text-lg font-bold text-yellow-500 uppercase">
          Update Class Level
        </h2>
        <div className="w-full flex flex-wrap gap-4">
          {
            classLevelData &&  classLevelData.map((classLevel, indexOf) => (
              <div key={classLevel.id} className="w-[48%] !border !border-gray-500 rounded-xl p-4 flex flex-col justify-between items-end gap-4">
                <label className="w-full flex flex-col gap-1">
                  <span className="w-full text-gray-400 text-base font-medium capitalize">
                    Level
                  </span>
                  <input
                    type="text"
                    name="level"
                    value={classLevel.level}
                    onChange={(e) => classLavelInputHandler(indexOf, e)}
                    placeholder="write program title"
                    className="w-full flex text-lg py-2 px-3 bg-black text-gray-200 font-semibold placeholder:text-gray-600 !border rounded-sm !border-[#333] outline-none focus:!border-yellow-500"
                  />
                </label>
                <div className="w-full flex flex-col gap-2">
                {
                  classLevel && classLevel.content.map((item, contentIndex) => (
                    <label className="w-full flex flex-col gap-1" key={contentIndex}>
                      <span className="w-full text-gray-400 text-base font-medium capitalize">
                        Description - {contentIndex + 1}
                      </span>
                      <input
                        type="text"
                        name="content"
                        value={item}  // Access each item in the content array directly
                        onChange={(e) => classLavelInputHandler(indexOf, e, contentIndex)}  // Pass contentIndex
                        placeholder="write about description"
                        className="w-full flex text-lg py-2 px-3 bg-black text-gray-200 font-semibold placeholder:text-gray-600 !border rounded-sm !border-[#333] outline-none focus:!border-yellow-500"
                      />
                    </label>
                  ))
                }
                </div>
                <button onClick={() => updateClassLevel(indexOf)} className="h-[40px] py-1 px-3 bg-blue-600 text-white font-semibold text-lg">{classLevelData[indexOf].isLoading ? (<SmSpinner/>) : 'Save'}</button>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
};

export default UpadateServices;
