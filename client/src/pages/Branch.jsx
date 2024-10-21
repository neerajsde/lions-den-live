import React, { useEffect, useState } from "react";
import { Helmet } from 'react-helmet';
import Banner from "../componenets/global-com/Banner";
import ContactForm from "../componenets/sections/ContactForm";
import Benefits from "../componenets/home-com/Benefits";
import Footer from "../componenets/home-com/Footer";
import { useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import Spinner from '../componenets/loader/Spinner';
import AboutBranch from "../componenets/global-com/AboutBranch";
import TimeTable from '../componenets/global-com/TimeTable'
import FeeStructure from "../componenets/global-com/FeeStructure";
import { BranchTiming } from "../componenets/global-com/BranchTiming";

const Branch = () => {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const [loading, setLoading] = useState(false);
  const [branchData, setBranchData] = useState(null);
  const location = useLocation();

  const scrollToDiv = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToDiv("branch");
  }, []);

  useEffect(() => {
    document.title = `Branch - ${branchData?.name}`
  },[branchData]);

  useEffect(() => {
    getBranchDetails();
  },[location])

  const getBranchDetails = async () => {
    try{
      setLoading(true);
      const branchName = location.pathname.split('/').at(-1);
      const res = await fetch(`${baseUrl}/getBranchByName/${branchName}`, {
        method: "GET",
      });
      const response = await res.json();
      if(response.success){
        setBranchData(response.data);
      }
      else{
        toast.error(response.message);
      }
    } catch(err){
      toast.error('Something went wrong')
    } finally{
      setLoading(false);
    }
  } 

  return (
    <div id="branch" className="w-full flex-col items-center">
      <Helmet>
          <meta property="og:title" content={`Lion's Den Fight Club - Best MMA Training Classes, Coaching & Clubs in ${branchData?.name}`} />
      </Helmet>
            
      {
        loading ? 
        (<div className="w-full h-screen flex justify-center items-center"><Spinner/></div>) : 
        (
          branchData ? 
          (
            <div>
              <Banner name={`Lion's Den in ${branchData.name}`} />
              <AboutBranch 
                name={branchData.name} 
                locationUrl={branchData.location_url}
              />
              <TimeTable name={branchData.name} data={branchData}/>
              <FeeStructure data={branchData.feeStructure}/>
              <BranchTiming/>
              <ContactForm branch={branchData.name}/>
              <Benefits off={"30"}/>
            </div>
          ) : 
          (
            <div>Empty Branch Details</div>
          )
        )
      }
      <Footer/>
    </div>
  );
};

export default Branch;
