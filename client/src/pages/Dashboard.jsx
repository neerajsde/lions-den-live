import React, { useContext, useEffect, useState } from "react";
import TopHeader from "../componenets/dashboard/TopHeader";
import { FiBarChart2 } from "react-icons/fi";
import { FaCodeBranch } from "react-icons/fa";
import { CgGym } from "react-icons/cg";
import { RiContactsBook3Line } from "react-icons/ri";
import { TbLogout } from "react-icons/tb";
import { AiOutlineTeam } from "react-icons/ai";
import toast from "react-hot-toast";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import AdminPage from "../componenets/dashboard/dash-pages/AdminPage";
import Branch from "../componenets/dashboard/dash-pages/Branch";
import Services from "../componenets/dashboard/dash-pages/Services";
import Coach from "../componenets/dashboard/dash-pages/Coach";
import Contact from "../componenets/dashboard/dash-pages/Contact";
import SpecialPrograms from "../componenets/dashboard/dash-pages/SpecialPrograms";
import { MdOutlineNewLabel } from "react-icons/md";
import { AdminContext } from "../context/AdminContext";
import BasicContactDetails from "../componenets/dashboard/dash-pages/BasicContactDetails";
import { FaYoutube } from "react-icons/fa";
import YTlinks from "../componenets/dashboard/dash-pages/YTlinks";
import Blog from "../componenets/dashboard/dash-pages/Blog";
import { FaBlog } from "react-icons/fa";


const Dashboard = () => {
  const { setIsLoggedIn } = useContext(AppContext);
  const {isActiveWebInput} = useContext(AdminContext);
  const [currentSection, setCurrentSection] = useState("dashboard");
  const navigate = useNavigate();

  useEffect(() => {
    window.document.title = "Admin-Dashboard";
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("lionDen");
    setIsLoggedIn(false);
    navigate("/admin-login");
    toast.error("Log Out Successfully");
  };

  return (
    <div className="w-screen min-h-screen flex flex-col bg-black">
      <TopHeader />

      <div className="w-full flex justify-start items-start">
        <div className="w-[250px] h-screen sticky top-0 flex flex-col items-center justify-start bg-[#111]">
          <button
            onClick={() => setCurrentSection("dashboard")}
            className={`w-full py-2 flex justify-center items-center gap-1 text-gray-400 text-lg font-semibold !border !border-gray-700 transition duration-300 ease-in-out ${currentSection === 'dashboard' ? 'bg-[#000] text-white': 'hover:bg-[#000] hover:text-white'}`}
          >
            <FiBarChart2 className="text-xl text-yellow-600" /> Dashboard
          </button>
          <button
            onClick={() => setCurrentSection("blog")}
            className={`w-full py-2 flex justify-start px-2 items-center gap-1 text-gray-400 text-lg font-semibold !border !border-gray-700 transition duration-300 ease-in-out ${currentSection === 'blog' ? 'bg-[#000] text-white': 'hover:bg-[#000] hover:text-white'}`}
          >
            <FaBlog className="text-xl" /> Blog
          </button>
          <button
            onClick={() => setCurrentSection("sp-program")}
            className={`w-full py-2 flex justify-start px-2 items-center gap-1 text-gray-400 text-lg font-semibold !border !border-gray-700 transition duration-300 ease-in-out ${currentSection === 'sp-program' ? 'bg-[#000] text-white': 'hover:bg-[#000] hover:text-white'}`}
          >
            <MdOutlineNewLabel className="text-xl" /> Special Programs
          </button>
          <button
            onClick={() => setCurrentSection("branch")}
            className={`w-full py-2 flex justify-start px-2 items-center gap-1 text-gray-400 text-lg font-semibold !border !border-gray-700 transition duration-300 ease-in-out ${currentSection === 'branch' ? 'bg-[#000] text-white': 'hover:bg-[#000] hover:text-white'}`}
          >
            <FaCodeBranch className="text-xl" /> Branch
          </button>
          <button
            onClick={() => setCurrentSection("services")}
            className={`w-full py-2 flex justify-start px-2 items-center gap-1 text-gray-400 text-lg font-semibold !border !border-gray-700 transition duration-300 ease-in-out ${currentSection === 'services' ? 'bg-[#000] text-white': 'hover:bg-[#000] hover:text-white'}`}
          >
            <CgGym className="text-xl" /> Services
          </button>
          <button
            onClick={() => setCurrentSection("coach")}
            className={`w-full py-2 flex justify-start px-2 items-center gap-1 text-gray-400 text-lg font-semibold !border !border-gray-700 transition duration-300 ease-in-out ${currentSection === 'coach' ? 'bg-[#000] text-white': 'hover:bg-[#000] hover:text-white'}`}
          >
            <AiOutlineTeam className="text-xl" /> Coach
          </button>
          <button
            onClick={() => setCurrentSection("ytlinks")}
            className={`w-full py-2 flex justify-start px-2 items-center gap-1 text-gray-400 text-lg font-semibold !border !border-gray-700 transition duration-300 ease-in-out ${currentSection === 'ytlinks' ? 'bg-[#000] text-white': 'hover:bg-[#000] hover:text-white'}`}
          >
            <FaYoutube className="text-xl text-[#FF0000]" /> Add Youtube Links
          </button>
          <button
            onClick={() => setCurrentSection("contacts")}
            className={`w-full py-2 flex justify-start px-2 items-center gap-1 text-gray-400 text-lg font-semibold !border !border-gray-700 transition duration-300 ease-in-out ${currentSection === 'contacts' ? 'bg-[#000] text-white': 'hover:bg-[#000] hover:text-white'}`}
          >
            <RiContactsBook3Line className="text-xl" /> Contacts
          </button>
          <button
            onClick={handleLogout}
            className="w-full py-1 flex justify-evenly items-center gap-1 text-red-400 text-lg font-semibold !border !border-gray-700 transition duration-300 ease-in-out hover:bg-[#000] hover:text-red-500"
          >
            LogOut <TbLogout className="text-xl text-red-600" />
          </button>
        </div>

        <div className="w-full flex justify-start items-start text-white p-4">
          {currentSection === "dashboard" && <AdminPage/>}
          {currentSection === "blog" && <Blog/>}
          {currentSection === "sp-program" && <SpecialPrograms/>}
          {currentSection === "branch" && <Branch/>}
          {currentSection === "services" && <Services/>}
          {currentSection === "coach" && <Coach/>}
          {currentSection === "ytlinks" && <YTlinks/>}
          {currentSection === "contacts" && <Contact/>}
        </div>
      </div>

      {
        isActiveWebInput && (<div className="w-full h-full fixed top-0 left-0 backdrop-blur-md flex justify-center items-center"><BasicContactDetails/></div>)
      }
    </div>
  );
};

export default Dashboard;
