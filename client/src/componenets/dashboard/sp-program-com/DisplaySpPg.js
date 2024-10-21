import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../../context/AdminContext";
import Spinner from "../../loader/Spinner";
import { MdOutlineRefresh } from "react-icons/md";

const DisplaySpPg = () => {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const { isLoading, spProgramData, getAllSpecialProgram } = useContext(AdminContext);

  useEffect(() => {
    if (!spProgramData) {
      getAllSpecialProgram();
    }
  }, []);

  if (isLoading) {
    return (
      <div className="w-full flex justify-center items-center py-8">
        <Spinner />
      </div>
    );
  }

  if (!spProgramData) {
    return (
      <div className="w-full flex justify-center items-center py-8">
        <h2 className="text-xl font-normal text-white">Empty Special Programs</h2>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-2">
      <div className="w-full flex items-center justify-between">
        <h2 className="text-lg font-semibold uppercase text-green-600">
          Special program info
        </h2>
        <button
          onClick={getAllSpecialProgram}
          className="text-2xl text-white cursor-pointer"
        >
          <MdOutlineRefresh />
        </button>
      </div>
      <div className="w-full">
        <div className="w-full flex flex-col gap-3 mt-2 text-white">
          <table className="w-full border-collapse bg-gray-800">
            <thead>
              <tr className="bg-gray-700">
                <th className="border border-gray-600 px-4 py-2 text-yellow-600 login">
                  Program Image
                </th>
                <th className="border border-gray-600 px-4 py-2 text-yellow-600 login">
                  Program Id
                </th>
                <th className="border border-gray-600 px-4 py-2 text-yellow-600 login">
                  Name
                </th>
              </tr>
            </thead>
            <tbody>
              {spProgramData.map((program, index) => (
                <tr
                  key={program._id}
                  className={`bg-gray-${
                    index % 2 === 0 ? "800" : "700"
                  } hover:bg-gray-600`}
                >
                  <td className="border border-gray-600 px-4 py-2"> 
                    <div className="w-[45px] h-[45px] flex justify-center items-center !border-2 !border-blue-600 rounded-full">
                      <img src={`${baseUrl}${program.img}`} alt={program.name} className="w-full h-full rounded-full object-cover object-top"/>
                    </div>
                  </td>
                  <td className="border border-gray-600 px-4 py-2 login">
                    {program._id}
                  </td>
                  <td className="border border-gray-600 px-4 py-2 login">
                    {program.name}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DisplaySpPg;