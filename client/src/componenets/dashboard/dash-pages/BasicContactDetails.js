import React, { useContext, useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { AdminContext } from "../../../context/AdminContext";
import SmSpinner from "../../loader/SmSpinner";
import toast from "react-hot-toast";
import { MdError } from "react-icons/md";
import { MdVerified } from "react-icons/md";

const BasicContactDetails = () => {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const { setIsActiveWebActive,webData, setWebData } = useContext(AdminContext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [formData, setFormData] = useState({
    id: webData ? webData._id : '',
    phone: "",
    email: "",
    address: "",
  });

  function inputHandler(event) {
    setFormData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  }

  useEffect(() => {
    getWebData();
  }, []);

  const getWebData = async () => {
    try {
      const token = localStorage.getItem("lionDen");
      if (!token) {
        throw new Error("Token not found. Please log in again.");
      }
      const res = await fetch(`${baseUrl}/get-webdata`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const response = await res.json();
      if (response.success) {
        setWebData(response.webdata);
        setFormData({
            id:response.webdata?._id,
            phone:response.webdata?.phone,
            email:response.webdata?.email,
            address:response.webdata?.address
        })
      }
      else{
        toast.error(response.message)
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  const submitHandler = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem("lionDen");
      if (!token) {
        throw new Error("Token not found. Please log in again.");
      }
      const res = await fetch(`${baseUrl}/update-webdata`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const response = await res.json();
      if (response.success) {
        setSuccess(response.message);
        setError("");
      } else {
        setSuccess("");
        setError(response.message);
      }
    } catch (err) {
      setSuccess("");
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="w-[500px] login bg-[#222] !border-2 !border-[#555] py-4 px-4 flex flex-col rounded-lg gap-2">
      <div className="w-full flex justify-between">
        <h3 className="text-lg text-gray-200 uppercase">
          update Contact Details
        </h3>
        <div
          onClick={() => setIsActiveWebActive(false)}
          className="cursor-pointer"
        >
          <IoClose className="text-4xl text-red-600" />
        </div>
      </div>
      <div className="w-full flex flex-col gap-4">
        <label className="w-full flex flex-col">
          <span className="text-blue-500 text-base uppercase">phone</span>
          <input
            type="number"
            name="phone"
            value={formData.phone}
            placeholder="e.g. 1234567890"
            onChange={inputHandler}
            className="w-full text-gray-200 flex py-2 px-3 text-lg bg-black placeholder:text-gray-700 outline-none !border !border-[#ffffff4a] rounded transition duration-300 ease-in-out focus:!border-yellow-500"
          />
        </label>

        <label className="w-full flex flex-col">
          <span className="text-blue-500 text-base uppercase">email</span>
          <input
            type="email"
            name="email"
            value={formData.email}
            placeholder="e.g. abc@gmail.com"
            onChange={inputHandler}
            className="w-full text-gray-200 flex py-2 px-3 text-lg bg-black placeholder:text-gray-700 outline-none !border !border-[#ffffff4a] rounded transition duration-300 ease-in-out focus:!border-yellow-500"
          />
        </label>

        <label className="w-full flex flex-col">
          <span className="text-blue-500 text-base uppercase">address</span>
          <input
            type="text"
            name="address"
            value={formData.address}
            placeholder="e.g. abc"
            onChange={inputHandler}
            className="w-full text-gray-200 flex py-2 px-3 text-lg bg-black placeholder:text-gray-700 outline-none !border !border-[#ffffff4a] rounded transition duration-300 ease-in-out focus:!border-yellow-500"
          />
        </label>
      </div>

      {error !== "" && (
        <div className="w-full py-1 px-2 text-red-500 bg-transparent text-base font-medium flex justify-center items-center gap-2">
          <MdError className="text-xl text-yellow-600" />
          {error}
        </div>
      )}

      {success !== "" && (
        <div className="w-full py-1 px-2 text-green-500 bg-transparent text-base font-medium flex items-center gap-2">
          <MdVerified className="text-xl text-green-600" />
          {success}
        </div>
      )}

      <div className="w-full flex justify-center items-center">
        <button
          onClick={submitHandler}
          className="text-lg px-4 py-2 rounded-md capitalize text-white !border !border-blue-700 bg-blue-600 transition duration-300 ease-in hover:bg-blue-700 flex justify-center items-center gap-2"
        >
          update {isLoading && <SmSpinner />}
        </button>
      </div>
    </div>
  );
};

export default BasicContactDetails;
