import React, { useEffect } from "react";
import Benefits from '../componenets/home-com/Benefits'
import Banner from "../componenets/global-com/Banner";
import Footer from '../componenets/home-com/Footer'

export const Review = () => {

  const scrollToDiv = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    document.title = 'Reviews'
    scrollToDiv("review");
  }, []);


  return (
    <div id="review" className="w-full flex-col items-center">
      <Banner name={"Reviews"}/>

      <div className="w-full relative bg-[#111111]">
        <div class="elfsight-app-8fed6bfc-de53-442d-9479-97fb50daef0e" data-elfsight-app-lazy></div>
        <div className=" absolute bottom-[45px]  bg-[#111111] z-10 w-[200px] left-[50%] translate-x-[-50%] h-[40px]"></div>
      </div>
        
      <Benefits off={"30"}/>
      <Footer/>
    </div>
  );
};
