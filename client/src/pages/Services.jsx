import React, { useEffect, useState } from "react";
import Banner from "../componenets/global-com/Banner";
import shapeImg from "../assets/shape.png";
import fea2Img from '../assets/fea2.png';
import thai2Imgs from '../assets/muay-thai2.png';
import ContactForm from "../componenets/sections/ContactForm";
import Benefits from "../componenets/home-com/Benefits";
import Footer from "../componenets/home-com/Footer";
import { useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import Spinner from '../componenets/loader/Spinner';

const Services = () => {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const [loading, setLoading] = useState(false);
  const [servicesData, setServicesData] = useState(null);
  const location = useLocation();

  useEffect(() => {
    getServicesDetails();
  }, [location]);

  const getServicesDetails = async () => {
    try {
      setLoading(true);
      const servicesName = location.pathname.split('/').at(-1);
      const res = await fetch(`${baseUrl}/servicesByName/${servicesName}`, {
        method: "GET",
      });
      const response = await res.json();
      if (response.success) {
        setServicesData(response.data);
      } else {
        toast.error(response.message);
      }
    } catch (err) {
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const scrollToDiv = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToDiv("services");
  }, []);

  useEffect(() => {
    document.title = `Services - ${servicesData?.name}`
  },[servicesData]);

  return (
    <div id="services" className="w-full flex-col items-center">
      {loading ? (
        <div className="w-full h-screen flex justify-center items-center">
          <Spinner />
        </div>
      ) : servicesData ? (
        <div>
          <Banner name={servicesData.name} />

          {/* Render your service details */}
          <section className="service-details p-100">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-7">
                  <div className="sd-head">
                    <img src={shapeImg} alt="shape" className="m-auto" />
                    <h1>{`${servicesData.name} at Lion's Den MMA Academy`}</h1>
                  </div>
                </div>
              </div>
              <div className="row align-items-center">
                <div className="col-lg-6">
                  <div className="sd-img">
                    <img src={`${baseUrl}${servicesData.program_img}`} alt={`${servicesData.name}`} />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="sd-content">
                    <h3>{servicesData?.desc1?.header}</h3>
                    <p>{servicesData?.desc1?.paragraph}</p>
                    <h4>{servicesData?.desc2?.header}</h4>
                    <p>{servicesData?.desc2?.paragraph}</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Other sections */}
          <section className="other-section p-50">
            <div className="container-fluid">
              <div className="row justify-content-center">
                <div className="col-lg-6">
                  <div className="other-head">
                    <img src={shapeImg} alt="" className="m-auto"/>
                    <h2>{`Benefits of ${servicesData.name} Training`}</h2>
                  </div>
                </div>
              </div>
              <div className="row align-items-center">
                <div className="col-lg-4 col-md-6">
                  <div className="other-box">
                    <div className="other-text">
                      <img src={shapeImg} alt="" />
                      <h4><span>{servicesData.benefits[0].heading}</span></h4>
                      <p>{servicesData.benefits[0].description}</p>
                    </div>
                  </div>
                  <div className="other-box">
                    <div className="other-text">
                      <img src={shapeImg} alt="" />
                      <h4><span>{servicesData.benefits[1].heading}</span></h4>
                      <p>{servicesData.benefits[1].description}</p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 d-md-none d-lg-block">
                  <div className="other-img">
                    <img src={fea2Img} alt="" />
                  </div>
                </div>
                <div className="col-lg-4 col-md-6">
                  <div className="other-box">
                    <div className="other-text">
                      <img src={shapeImg} alt="" />
                      <h4><span>{servicesData?.benefits[2]?.heading}</span></h4>
                      <p>{servicesData?.benefits[2]?.description}</p>
                    </div>
                  </div>
                  <div className="other-box">
                    <div className="other-text">
                      <img src={shapeImg} alt="" />
                      <h4><span>{servicesData?.benefits[3]?.heading}</span></h4>
                      <p>{servicesData?.benefits[3]?.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="program-section p-100">
            <div className="container">
              <div className="ps-item">
                <div className="row align-items-center">
                  <div className="col-lg-6">
                    <div className="ps-box">
                      <h4>{`Our ${servicesData.program_title}`}</h4>
                      <p>{`${servicesData.program_desc}`}</p>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="ps-img">
                      <img src={thai2Imgs} alt="" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                {
                  servicesData && servicesData.classLevel.map((classL) => (
                    <div key={classL._id} className="col-md-6">
                      <div className="ps-list">
                        <h4>{classL.level}</h4>
                        <ul>
                          {
                            classL.content.map((desc, idx) => (
                              <li key={idx}>{desc}</li>
                            ))
                          }
                        </ul>
                      </div>
                    </div>
                  ))
                }
              </div>
            </div>
          </section>

          <ContactForm branch={"All"}/>
          <Benefits off={servicesData.offer}/>
        </div>
      ) : (
        <p>Service details not found.</p>
      )}

      <Footer />
    </div>
  );
};

export default Services;
