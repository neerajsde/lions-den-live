import React, { useEffect, useState } from "react";
import { TiDocumentAdd } from "react-icons/ti";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { IoHome } from "react-icons/io5";
import DisplayCoach from "../coach-com/DisplayCoach";
import AddCoach from "../coach-com/AddCoach";
import UpdateCoach from "../coach-com/UpdateCoach";
import RemoveCoach from "../coach-com/RemoveCoach";

const Coach = () => {
  const [currentSection, setCurrentSection] = useState("/");

  useEffect(() => {});
  return (
    <div className="w-full login flex flex-col gap-4">
      <div className="w-full flex items-center justify-between bg-[#222] p-3 rounded-sm !border !border-[#444]">
        <button
          onClick={() => setCurrentSection("/")}
          className={`text-base font-semibold cursor-pointer flex justify-center items-center gap-1 py-2 px-3 border-1 text-gray-300 border-gray-300 rounded-md transition duration-200 ease-in ${currentSection === '/' ? 'bg-white text-black' : 'hover:bg-gray-200 hover:text-black'}`}
          >
          <IoHome className="text-xl" /> All Coach
        </button>
        <div className="flex items-center justify-center gap-4">
            <button
            onClick={() => setCurrentSection("add")}
            className={`text-base font-semibold flex justify-center items-center gap-1 py-2 px-3 border-1 text-blue-600 border-blue-600 rounded-md transition duration-200 ease-in ${currentSection === 'add' ? 'bg-blue-600 text-white' : 'hover:bg-blue-600 hover:text-white'}`}
            >
            <TiDocumentAdd className="text-xl" /> Add New Coach
            </button>

            <button
            onClick={() => setCurrentSection("update")}
            className={`text-base font-semibold flex justify-center items-center gap-1 py-2 px-3 border-1 text-blue-600 border-blue-600 rounded-md transition duration-200 ease-in ${currentSection === 'update' ? 'bg-blue-600 text-white' : 'hover:bg-blue-600 hover:text-white'}`}
            >
            <FaEdit className="text-xl" /> Update Coach
            </button>

            <button
            onClick={() => setCurrentSection("remove")}
            className={`text-base font-semibold flex justify-center items-center gap-1 py-2 px-3 border-1 text-red-600 border-red-600 rounded-md transition duration-200 ease-in ${currentSection === 'remove' ? 'bg-red-600 text-white' : 'hover:bg-red-600 hover:text-white'}`}
            >
            <MdDelete className="text-xl" /> Remove Coach
            </button>
        </div>
      </div>

      <div className="w-full bg-[#111] p-3 rounded-sm !border !border-[#333]">
        {currentSection === '/' && (<DisplayCoach/>)}
        {currentSection === 'add' && (<AddCoach/>)}
        {currentSection === 'update' && (<UpdateCoach/>)}
        {currentSection === 'remove' && (<RemoveCoach/>)}
      </div>
    </div>
  );
};

export default Coach;