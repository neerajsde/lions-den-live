import { createContext, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";


export const AppContext = createContext();

function AppContextProvider({children}){
    const baseUrl = process.env.REACT_APP_BASE_URL;
    const [isLoading, setIsLoading] = useState(false);
    const [isActiveMenuBar, setIsActiveMenuBar] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [adminData, setAdminData] = useState({});
    const navigate = useNavigate();
    const [isWriteBlog, setIsWriteBlog] = useState(false);
    // branch
    const [branchData, setBranchData] = useState(null);
    // services
    const [servicesData, setServicesData] = useState(null);
    // coach
    const [coachData, setCoachData] = useState(null);

    const AuthAdmin = async () => {
        try {
          const token = localStorage.getItem("lionDen");
          if (!token) {
            throw new Error("Token not found. Please log in again.");
          }
          const url = `${baseUrl}/dashboard`;
          const response = await fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ token }),
          });
          const data = await response.json();
          if (response.ok && data.success) {
            setIsLoggedIn(true);
            setAdminData(data.adminData);
            navigate('/admin-dashboard');
            toast.success('Your Admin Dashboard');
          } else {
            toast.error(
              data.message || "Failed to authenticate. Please try again."
            );
          }
        } catch (err) {
          console.log(err.message);
        }
    };

    const value = {
        AuthAdmin, adminData,
        isLoading, setIsLoading,
        isActiveMenuBar, setIsActiveMenuBar,
        isLoggedIn, setIsLoggedIn,
        branchData, setBranchData,
        servicesData, setServicesData,
        coachData, setCoachData,
        isWriteBlog, setIsWriteBlog
    }

    return <AppContext.Provider value={value}>
                {children}
            </AppContext.Provider>
}

export default AppContextProvider;