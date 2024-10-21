import React, { useState } from "react";
import { MdError } from "react-icons/md";
import { MdVerified } from "react-icons/md";
import SmSpinner from "../../loader/SmSpinner";

const RemoveBranch = () => {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const [branchId, setbranchId] = useState("");
  const [error, setError] = useState("");
  const [sucess, setSucess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const removeBranch = async () => {
    if (branchId === "") {
      setError("Please enter branch Id");
      return;
    }
  
    setIsLoading(true); // Start loading
  
    try {
      const response = await fetch(`${baseUrl}/branch/${branchId}`, {
        method: "DELETE",
      });
  
      const data = await response.json();
      if(data.success){
        setError("");
        setSucess(data.message);
        setbranchId("");
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
  };
  

  return (
    <div className="w-full flex flex-col justify-center items-center gap-4">
      <div className="w-[400px] max-sm:w-full flex flex-col items-start gap-3">
        <input
          type="text"
          placeholder="enter branch id"
          value={branchId}
          onChange={(event) => setbranchId(event.target.value)}
          className="w-full flex text-lg py-2 px-3 bg-black text-gray-200 font-semibold placeholder:text-gray-600 !border rounded-sm !border-[#333] outline-none focus:!border-yellow-500"
        />

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
        <button
          onClick={removeBranch}
          className="bg-orange-600 flex items-center justify-center gap-2 text-lg font-semibold text-white py-2 px-3 rounded transition duration-300 ease-in hover:bg-orange-800"
        >
          {isLoading && (<SmSpinner/>)}Remove Branch
        </button>
      </div>
    </div>
  );
};

export default RemoveBranch;
