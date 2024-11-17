import React, { useState } from "react";
import SmSpinner from "../../loader/SmSpinner";
import { MdError } from "react-icons/md";
import { MdVerified } from "react-icons/md";
import toast from "react-hot-toast";

const UpdateCoach = () => {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [sucess, setSucess] = useState("");
  const [coachName, setCoachName] = useState("");
  const [coachData, setCoachData] = useState(null);
  const [formData, setFormData] = useState({
    id:"",
    name: "",
    phone: "",
    email: "",
    profession: "",
    description: "",
    facebookUrl: "",
    instagramUrl: "",
    twitterUrl: "",
  });


  // Input Handler for Basic Fields
  function inputHandler(event) {
    setFormData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  }

  const submitHandler = async () => {
    if (coachName === "") {
      setError("Please enter coach name");
      return;
    }

    setIsLoading(true); // Start loading

    try {
      const response = await fetch(`${baseUrl}/coach/${coachName}`, {
        method: "GET",
      });

      const data = await response.json();
      if (data.success) {
        setError("");
        setSucess(data.message);
        setCoachData(data.data);
        setFormData({
            id: data.data?._id,
          name: data.data?.name,
          phone: data.data?.phone,
          email: data.data?.email,
          profession: data.data?.profession,
          description: data.data?.description,
          facebookUrl: data.data?.facebookUrl,
          instagramUrl: data.data?.instagramUrl,
          twitterUrl: data.data?.twitterUrl,
        });
        toast.success(data.message);
        setCoachName("");
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

  const updateCoachHandler = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem("lionDen");
      if (!token) {
        throw new Error("Token not found. Please log in again.");
      }
      const response = await fetch(`${baseUrl}/coach-update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
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

  if (!coachData) {
    return (
      <div className="w-full flex justify-center items-center py-8">
        <div className="w-[400px] flex flex-col gap-4">
          <input
            type="text"
            placeholder="enter coach name"
            value={coachName}
            onChange={(event) => setCoachName(event.target.value)}
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
        Update Coach
      </h2>
      <div className="w-full flex justify-between items-start gap-4">
        <div className="w-full flex flex-col gap-3">
          <label className="w-full flex flex-col gap-1">
            <span className="w-full text-gray-400 text-base font-medium capitalize">
              Coach Name
            </span>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={inputHandler}
              placeholder="enter coach name"
              className="w-full flex text-lg py-2 px-3 bg-black text-gray-200 font-semibold placeholder:text-gray-600 !border rounded-sm !border-[#333] outline-none focus:!border-yellow-500"
            />
          </label>

          <label className="w-full flex flex-col gap-1">
            <span className="w-full text-gray-400 text-base font-medium capitalize">
              Email
            </span>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={inputHandler}
              placeholder="enter coach email"
              className="w-full flex text-lg py-2 px-3 bg-black text-gray-200 font-semibold placeholder:text-gray-600 !border rounded-sm !border-[#333] outline-none focus:!border-yellow-500"
            />
          </label>

          <label className="w-full flex flex-col gap-1">
            <span className="w-full text-gray-400 text-base font-medium capitalize">
              Designation
            </span>
            <input
              type="text"
              name="profession"
              value={formData.profession}
              onChange={inputHandler}
              placeholder="coach designation"
              className="w-full flex text-lg py-2 px-3 bg-black text-gray-200 font-semibold placeholder:text-gray-600 !border rounded-sm !border-[#333] outline-none focus:!border-yellow-500"
            />
          </label>

          <label className="w-full flex flex-col gap-1">
            <span className="w-full text-gray-400 text-base font-medium capitalize">
              About Coach
            </span>
            <textarea
              type="text"
              name="description"
              value={formData.description}
              onChange={inputHandler}
              placeholder="write about coach"
              className="w-full flex text-lg py-2 px-3 bg-black text-gray-200 font-semibold placeholder:text-gray-600 !border rounded-sm !border-[#333] outline-none focus:!border-yellow-500"
            />
          </label>
        </div>

        <div className="w-full flex flex-col gap-3">
            <label className="w-full flex flex-col gap-1">
                <span className="w-full text-gray-400 text-base font-medium capitalize">
                Phone
                </span>
                <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={inputHandler}
                placeholder="phone number e.g. +91 787 132 8987"
                className="w-full flex text-lg py-2 px-3 bg-black text-gray-200 font-semibold placeholder:text-gray-600 !border rounded-sm !border-[#333] outline-none focus:!border-yellow-500"
                />
            </label>
            <label className="w-full flex flex-col gap-1">
                <span className="w-full text-gray-400 text-base font-medium capitalize">
                    Facebook
                </span>
                <input
                type="text"
                name="facebookUrl"
                value={formData.facebookUrl}
                onChange={inputHandler}
                placeholder="paste coach facebook-id link"
                className="w-full flex text-lg py-2 px-3 bg-black text-gray-200 font-semibold placeholder:text-gray-600 !border rounded-sm !border-[#333] outline-none focus:!border-yellow-500"
                />
            </label>

            <label className="w-full flex flex-col gap-1">
                <span className="w-full text-gray-400 text-base font-medium capitalize">
                    Instagram
                </span>
                <input
                type="text"
                name="instagramUrl"
                value={formData.instagramUrl}
                onChange={inputHandler}
                placeholder="paste coach instagram-id link"
                className="w-full flex text-lg py-2 px-3 bg-black text-gray-200 font-semibold placeholder:text-gray-600 !border rounded-sm !border-[#333] outline-none focus:!border-yellow-500"
                />
            </label>

            <label className="w-full flex flex-col gap-1">
                <span className="w-full text-gray-400 text-base font-medium capitalize">
                    Twitter
                </span>
                <input
                type="text"
                name="twitterUrl"
                value={formData.twitterUrl}
                onChange={inputHandler}
                placeholder="paste coach twitter-id link"
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
          onClick={updateCoachHandler}
          className="px-4 py-2 text-lg font-semibold text-white bg-orange-600 rounded-md flex items-center justify-center gap-2"
        >
          {isLoading && <SmSpinner />} Update Coach
        </button>
      </div>
    </div>
  );
};

export default UpdateCoach;
