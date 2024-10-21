import React, { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { TiArrowSortedDown } from "react-icons/ti";
import { TiArrowSortedUp } from "react-icons/ti";
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';

const NavItems = () => {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const [isLoading, setIsLoading] = useState(false);
  const { branchData, setBranchData, servicesData, setServicesData, setIsActiveMenuBar } = useContext(AppContext);
  // branch handler top down
  const [isActiveBranchList, setIsActiveBranchList] = useState(false);
  const [isActiveFeeStructureList, setIsActiveFeeStructureList] = useState(false);
  // services handler top down
  const [isActiveServicesList, setIsActiveServicesList] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!branchData) {
      getAllBranch();
    }
    if(!servicesData){
      getAllServices();
    }
  }, []);

  const getAllBranch = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${baseUrl}/get-branch`, {
        method: 'GET',
      });

      const data = await response.json();
      if (response.ok && data.success) {
        setBranchData(data.branches);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const getAllServices = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${baseUrl}/get-services`, {
        method: 'GET',
      });

      const data = await response.json();
      if (response.ok && data.success) {
        setServicesData(data.services);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex items-center max-lg:items-start gap-4 max-lg:gap-0 max-lg:flex-col">
      <div onClick={() => {
        navigate('/');
        setIsActiveMenuBar(false);
      }} className="text-lg max-lg:text-base font-semibold transition duration-200 ease-in hover:text-yellow-600 cursor-pointer max-md:hover:text-white">
        Home
      </div>
      <div onClick={() => {
        navigate('/about');
        setIsActiveMenuBar(false);
      }} className="text-lg max-lg:text-base font-semibold transition duration-200 ease-in hover:text-yellow-600 cursor-pointer max-md:hover:text-white">
        About Us
      </div>
      {/* Services Dropdown */}
      <div className="flex flex-col items-center max-lg:items-start relative gap-2">
        <div
          onMouseEnter={() => setIsActiveServicesList(true)}
          onMouseLeave={() => setIsActiveServicesList(false)}
          className="text-lg flex items-center gap-2 justify-center max-lg:text-base font-semibold transition duration-200 ease-in hover:text-yellow-600 cursor-pointer max-md:hover:text-white"
        >
          Services {isActiveServicesList ? (<TiArrowSortedUp/>) : (<TiArrowSortedDown/>)}
        </div>

        <div
          onMouseEnter={() => setIsActiveServicesList(true)} // Keeps the dropdown open while hovering
          onMouseLeave={() => setIsActiveServicesList(false)} // Closes dropdown when mouse leaves
          className={`absolute top-full  login rounded-md border-none max-lg:relative ${
            isActiveServicesList ? 'w-[250px] bg-[#000] backdrop-blur-md flex flex-col text-white' : 'hidden'
          }`}
        >
          {isLoading ? (
            <div className="text-white py-1 text-center">Loading...</div>
          ) : servicesData ? (
            servicesData.map((service, index) => (
              <button key={index} onClick={() => {
                navigate(`/services/${service.name.replace(/\s+/g, '-').toLowerCase()}`);
                setIsActiveMenuBar(false);
              }} className="w-full text-left capitalize py-1 text-base font-bold text-white px-4 hover:bg-[#222] !border-l-2 !border-transparent hover:!border-[#a88309]">
                {service.name}
              </button>
            ))
          ) : (
            <div className="text-white py-1 text-center">Empty</div>
          )}
        </div>
      </div>
      {/* Branches Dropdown */}
      <div className="flex flex-col items-center  max-lg:items-start relative gap-2">
        <div
          onMouseEnter={() => setIsActiveBranchList(true)}
          onMouseLeave={() => setIsActiveBranchList(false)}
          className="text-lg flex items-center gap-2 justify-center max-lg:text-base font-semibold transition duration-200 ease-in hover:text-yellow-600 cursor-pointer max-md:hover:text-white"
        >
          Branches {isActiveBranchList ? (<TiArrowSortedUp/>) : (<TiArrowSortedDown/>)}
        </div>

        <div
          onMouseEnter={() => setIsActiveBranchList(true)} // Keeps the dropdown open while hovering
          onMouseLeave={() => setIsActiveBranchList(false)} // Closes dropdown when mouse leaves
          className={`absolute top-full  login rounded-md border-none max-lg:relative ${
            isActiveBranchList ? 'w-[250px] bg-[#000] backdrop-blur-md flex flex-col text-white' : 'hidden'
          }`}
        >
          {isLoading ? (
            <div className="text-white py-1 text-center">Loading...</div>
          ) : branchData ? (
            branchData.map((branch, index) => (
              <button key={index} onClick={() => {
                navigate(`/branch/${branch.name.replace(/\s+/g, '-').toLowerCase()}`);
                setIsActiveMenuBar(false);
              }} className="w-full text-left capitalize py-1 text-base font-bold text-white px-4 hover:bg-[#222] !border-l-2 !border-transparent hover:!border-[#a88309]">
                {branch.name}
              </button>
            ))
          ) : (
            <div className="text-white py-1 text-center">Empty</div>
          )}
        </div>
      </div>

      {/* FeeStructure Dropdown */}
      <div className="flex flex-col items-center  max-lg:items-start relative gap-2">
        <div
          onMouseEnter={() => setIsActiveFeeStructureList(true)}
          onMouseLeave={() => setIsActiveFeeStructureList(false)}
          className="text-lg flex items-center gap-2 justify-center max-lg:text-base font-semibold transition duration-200 ease-in hover:text-yellow-600 cursor-pointer max-md:hover:text-white"
        >
          Fee Structure {isActiveFeeStructureList ? (<TiArrowSortedUp/>) : (<TiArrowSortedDown/>)}
        </div>

        <div
          onMouseEnter={() => setIsActiveFeeStructureList(true)} // Keeps the dropdown open while hovering
          onMouseLeave={() => setIsActiveFeeStructureList(false)} // Closes dropdown when mouse leaves
          className={`absolute top-full  login rounded-md border-none max-lg:relative ${
            isActiveFeeStructureList ? 'w-[250px] bg-[#000] backdrop-blur-md flex flex-col text-white' : 'hidden'
          }`}
        >
          {isLoading ? (
            <div className="text-white py-1 text-center">Loading...</div>
          ) : branchData ? (
            branchData.map((branch, index) => (
              <button key={index} onClick={() => {
                navigate(`/branch/${branch.name.replace(/\s+/g, '-').toLowerCase()}`);
                setIsActiveMenuBar(false);
              }} className="w-full text-left capitalize py-1 text-base font-bold text-white px-4 hover:bg-[#222] !border-l-2 !border-transparent hover:!border-[#a88309]">
                {branch.name}
              </button>
            ))
          ) : (
            <div className="text-white py-1 text-center">Empty</div>
          )}
        </div>
      </div>

      {/* Review and Contact Us */}
      <div onClick={() => {
        navigate('/review')
        setIsActiveMenuBar(false);
      }} className="text-lg max-lg:text-base font-semibold transition duration-200 ease-in hover:text-yellow-600 cursor-pointer max-md:hover:text-white">
        Reviews
      </div>
      <div onClick={() => {
        navigate('/contactus')
        setIsActiveMenuBar(false);
      }} className="text-lg max-lg:text-base font-semibold transition duration-200 ease-in hover:text-yellow-600 cursor-pointer max-md:hover:text-white">
        Contact Us
      </div>
      <Link to={`https://docs.google.com/forms/d/e/1FAIpQLSfD3lBvQWRFReoSAbFop1ZS7Ih2XVB_-4eefXIxhplwXVS0yQ/viewform`} target='_blank' onClick={() => { setIsActiveMenuBar(false); }} className="text-lg text-white max-lg:text-base font-semibold transition duration-200 ease-in hover:text-yellow-600 cursor-pointer max-md:hover:text-white">
        Addmisson
      </Link>
    </div>
  );
};

export default NavItems;
