import React, { useEffect, useContext } from "react";
import { AppContext } from "../context/AppContext";
import heroImg from "../assets/hero-img.webp";
import "bootstrap/dist/css/bootstrap.min.css";
import ContactForm from "../componenets/sections/ContactForm";
import Services from "../componenets/home-com/Services";
import About from "../componenets/home-com/About";
import Branch from "../componenets/home-com/Branch";
import Teams from "../componenets/home-com/Teams";
import { Link } from "react-router-dom";
import Footer from "../componenets/home-com/Footer";
import Testimonials from "../componenets/home-com/Testimonials";
import YouTubeTut from "../componenets/home-com/YouTubeTut";
import TimeTable from "../componenets/global-com/TimeTable";
import SpecialCard from "../componenets/global-com/SpecialCard";

const Home = () => {
  const { branchData } = useContext(AppContext);

  const scrollToDiv = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    document.title = "Lion's Den Fight Club - Best MMA Training Classes, Coaching & Clubs"
    scrollToDiv("home");
  }, []);

  return (
    <div className="w-full flex-col items-center">

      {/* Hero Section */}
      <div id="home" className="hero-section">
        <div className="hero-shape"></div>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="hero-img">
                <img src={heroImg} alt="Hero images" />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="hero-content">
                <span className="under">
                  #1 Mixed Martial Arts School in India
                </span>
                <h2>JOIN TO DISCOVER YOUR</h2>
                <h1>BEST VERSION INSIDE YOU</h1>
                <p>
                  Discover the best version of yourself with expert training,
                  discipline, and dedication at Lion's Den MMA Academy in
                  Delhi."
                </p>
                <div className="hero-btn">
                  <a href="tel:+9198997 62760" className="sec-btn">
                    <span>Join Now</span>
                  </a>
                  <Link to={"/contact"} className="sec-btn2">
                    <span>Book Free Trial</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Form */}
      <ContactForm  branch={"All"} />
      <SpecialCard/>
      <Branch />
      <Teams />
      <Services />
      <About />

      {branchData && branchData[0] && (
        <TimeTable name={"South Delhi"} data={branchData[0]} />
      )}


      <Testimonials />
      <YouTubeTut />
      <Footer />
    </div>
  );
};

export default Home;
