import React, { useEffect, useState } from 'react';
import toast from "react-hot-toast";
import "slick-carousel/slick/slick.css";
import Slider from "react-slick";

const SpecialCard = () => {
    const baseUrl = process.env.REACT_APP_BASE_URL;
    const [spProgramData, setspProgramData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
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

    useEffect(() => {
        if(!spProgramData){
            getAllSpecialProgram();
        }
    }, [])

      console.log(spProgramData)
  return (
    <section className="schedule-section p-100">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-7">
            <div className="ss-head">
              <h2>Special Programs</h2>
              <p>{`Lion’s Den Fight Club is one of its kind martial arts training centres in South Delhi`}</p>
            </div>
          </div>
        </div>
        <div class="ser-slider">
          <Slider {...settings}>
                {
                    spProgramData && spProgramData.map((program) => (
                        <img key={program._id} src={`${baseUrl}${program?.img}`} alt={program?.name}/>
                    ))
                }
                {
                    spProgramData && spProgramData.map((program) => (
                        <img key={program._id} src={`${baseUrl}${program?.img}`} alt={program?.name}/>
                    ))
                }
                {
                    spProgramData && spProgramData.map((program) => (
                        <img key={program._id} src={`${baseUrl}${program?.img}`} alt={program?.name}/>
                    ))
                }
          </Slider>
        </div>
      </div>
    </section>
  )
}

export default SpecialCard