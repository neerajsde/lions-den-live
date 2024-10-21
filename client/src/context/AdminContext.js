import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
export const AdminContext = createContext();

function AdminContextProvider({ children }) {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const [isActiveWebInput, setIsActiveWebActive] = useState(false);
  const [webData, setWebData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [branchData, setBranchData] = useState(null);
  const [contactData, setContactData] = useState(null);
  const [servicesData, setServicesData] = useState(null);
  const [coachData, setCoachData] = useState(null);
  const [spProgramData, setspProgramData] = useState(null);
  const [isActiveBlogEdit, setIsACtiveBlogPage] = useState(false);

  const getAllBranch = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${baseUrl}/get-branch`, {
        method: "GET",
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

  const getAllCoach = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${baseUrl}/get-coach`, {
        method: "GET",
      });

      const data = await response.json();
      if (response.ok && data.success) {
        setCoachData(data.data);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const getAllSpecialProgram = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${baseUrl}/get-sp-programs`, {
        method: "GET",
      });

      const data = await response.json();
      if (response.ok && data.success) {
        setspProgramData(data.data);
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
        method: "GET",
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
  };

  const getContactDetails = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem("lionDen");
      if (!token) {
        throw new Error("Token not found. Please log in again.");
      }

      const response = await fetch(`${baseUrl}/contact-get`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      if (data.success) {
        setContactData(data.data);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllBranch();
    getAllServices();
    getAllCoach();
    getContactDetails();
  }, []);

  const value = {
    isActiveWebInput, setIsActiveWebActive,
    webData, setWebData,
    isLoading,
    setIsLoading,
    branchData,
    setBranchData,
    contactData,
    setContactData,
    servicesData,
    setServicesData,
    coachData, spProgramData,
    setCoachData,
    getAllBranch,
    getAllCoach,
    getAllServices,
    getContactDetails,
    getAllSpecialProgram,
    isActiveBlogEdit, setIsACtiveBlogPage
  };

  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
}

export default AdminContextProvider;
