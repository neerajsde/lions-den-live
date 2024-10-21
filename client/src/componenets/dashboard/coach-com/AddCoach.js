import React, { useState } from "react";
import { FcTreeStructure } from "react-icons/fc";
import toast from "react-hot-toast";
import SmSpinner from "../../loader/SmSpinner";
import { MdError } from "react-icons/md";
import { MdVerified } from "react-icons/md";

const AddCoach = () => {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [sucess, setSucess] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    profession: "",
    description: "",
    facebookUrl: "",
    instagramUrl: "",
    twitterUrl: "",
    img: null,
  });

  // Input Handler for Basic Fields
  function inputHandler(event) {
    setFormData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  }

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
        setFormData((prevState) => ({
            ...prevState,
            img: file,
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
      formDataToSend.append("name", formData.name);
      formDataToSend.append("phone", formData.phone);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("profession", formData.profession);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("facebookUrl", formData.facebookUrl);
      formDataToSend.append("instagramUrl", formData.instagramUrl);
      formDataToSend.append("twitterUrl", formData.twitterUrl);
      formDataToSend.append("img", formData.img); // Append the image file

      const response = await fetch(`${baseUrl}/coach-add`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`, // Authorization header is still required
        },
        body: formDataToSend, // Send the FormData object
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
  };

  return (
    <div className="w-full flex flex-col gap-4">
      <h2 className="text-lg font-bold text-green-500 uppercase">
        Add New Coach
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
              placeholder="enter coach email-id"
              className="w-full flex text-lg py-2 px-3 bg-black text-gray-200 font-semibold placeholder:text-gray-600 !border rounded-sm !border-[#333] outline-none focus:!border-yellow-500"
            />
          </label>

          <label className="w-full flex flex-col gap-1">
            <span className="w-full text-gray-400 text-base font-medium capitalize">
              Phone
            </span>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={inputHandler}
              placeholder="phone number e.g. 787 132 8987"
              className="w-full flex text-lg py-2 px-3 bg-black text-gray-200 font-semibold placeholder:text-gray-600 !border rounded-sm !border-[#333] outline-none focus:!border-yellow-500"
            />
          </label>
        </div>

        <div className="w-full flex flex-col gap-3">
          <label className="w-full flex flex-col gap-1">
            <span className="w-full text-gray-400 text-base font-medium capitalize">
              Degisnation
            </span>
            <input
              type="text"
              name="profession"
              value={formData.profession}
              onChange={inputHandler}
              placeholder="e.g. kick boxer"
              className="w-full flex text-lg py-2 px-3 bg-black text-gray-200 font-semibold placeholder:text-gray-600 !border rounded-sm !border-[#333] outline-none focus:!border-yellow-500"
            />
          </label>

          <label className="w-full flex flex-col gap-1">
            <span className="w-full text-gray-400 text-base font-medium capitalize">
              Upload Coach Image
            </span>
            <input
              type="file"
              name="img"
              onChange={handleImageUpload}
              placeholder="e.g. kick boxer"
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
              rows={2}
              placeholder="write about coach"
              className="w-full flex text-lg py-2 px-3 bg-black text-gray-200 font-semibold placeholder:text-gray-600 !border rounded-sm !border-[#333] outline-none focus:!border-yellow-500"
            />
          </label>
        </div>
      </div>

      <h2 className="mt-2 text-lg font-bold text-green-600 flex items-center gap-1">
        <FcTreeStructure className="text-2xl" /> Social Media Links
      </h2>
      <div className="w-[50%] flex justify-between items-start gap-4">
        <div className="w-full flex flex-col gap-3">
          <label className="w-full flex flex-col gap-1">
            <span className="w-full text-gray-400 text-base font-medium capitalize">
              Facebook
            </span>
            <input
              type="text"
              name="facebookUrl"
              value={formData.facebookUrl}
              onChange={inputHandler}
              placeholder="enter facebook url"
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
              placeholder="enter instagram url"
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
              placeholder="enter twitter url"
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
          onClick={submitHandler}
          className="px-4 py-2 text-lg font-semibold text-white bg-orange-600 rounded-md flex items-center justify-center gap-2"
        >
          {isLoading && <SmSpinner />} Submit
        </button>
      </div>
    </div>
  );
};

export default AddCoach;
