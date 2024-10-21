import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../../context/AdminContext";
import Spinner from "../../loader/Spinner";
import { MdOutlineRefresh } from "react-icons/md";

const DisplayServices = () => {
  const { isLoading, servicesData, getAllServices } = useContext(AdminContext);

  useEffect(() => {
    if (!servicesData) {
      getAllServices();
    }
  }, []);


  if (isLoading) {
    return (
      <div className="w-full flex justify-center items-center py-8">
        <Spinner />
      </div>
    );
  }

  if (!servicesData) {
    return (
      <div className="w-full flex justify-center items-center py-8">
        <h2 className="text-xl font-normal text-white">Empty Services</h2>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-2">
      <div className="w-full flex items-center justify-between">
        <h2 className="text-lg font-semibold uppercase text-green-600">
          Services info
        </h2>
        <button
          onClick={getAllServices}
          className="text-2xl text-white cursor-pointer"
        >
          <MdOutlineRefresh />
        </button>
      </div>
      <div className="w-full">
        <h3 className="text-gray-400 text-lg font-medium">All Services:</h3>
        <div className="w-full flex flex-col gap-3 mt-2 text-white">
          <table className="w-full border-collapse bg-gray-800">
            <thead>
              <tr className="bg-gray-700">
                <th className="border border-gray-600 px-4 py-2 text-yellow-600  login">
                  Services Id
                </th>
                <th className="border border-gray-600 px-4 py-2 text-yellow-600 login">
                  Name
                </th>
                <th className="border border-gray-600 px-4 py-2 text-yellow-600 login">
                  Title
                </th>
              </tr>
            </thead>
            <tbody>
              {servicesData.map((service, index) => (
                <tr
                  key={index}
                  className={`bg-gray-${
                    index % 2 === 0 ? "800" : "700"
                  } hover:bg-gray-600`}
                >
                  <td className="border border-gray-600 px-4 py-2 login">
                    {service._id}
                  </td>
                  <td className="border border-gray-600 px-4 py-2 login">
                    {service.name}
                  </td>
                  <td className="border border-gray-600 px-4 py-2 login">
                    {service.title}
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

export default DisplayServices;
