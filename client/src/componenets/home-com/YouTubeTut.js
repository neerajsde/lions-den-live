import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import shapImg from "../../assets/shape.png";
import toast from "react-hot-toast";

const YouTubeTut = () => {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const [youTubeData, setYouTubeData] = useState(null);

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

  const getAllYTVideos = async () => {
    try{
      const res = await fetch(`${baseUrl}/youtube`);
      const response = await res.json();
      if(response.success){
        setYouTubeData(response.data);
      }
    } catch(err){
      toast.error('something went wrong');
    }
  }

  useEffect(() => {
    if(!youTubeData){
      getAllYTVideos();
    }
  },[]);

  return (
    <section className="youtube-section p-100">
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-lg-6">
            <div className="you-head">
              <img src={shapImg} alt="" className="m-auto" />
              <h2>Loin's Den Tutorial Videos</h2>
            </div>
          </div>
        </div>
        <div className="ser-slider">
          <Slider {...settings}>
            {
              youTubeData && youTubeData.map((youtube) => (
                <div key={youtube._id} className="col-lg-4">
                  <div className="you-box">
                    <iframe
                      width="100%"
                      height="330"
                      src={youtube.link}
                      title={youtube.description}
                      frameborder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerpolicy="strict-origin-when-cross-origin"
                      allowfullscreen
                    ></iframe>
                    <h4>
                      <img src={shapImg} alt="shape" />
                      <span>{youtube.title}</span>
                    </h4>
                  </div>
                </div>
              ))
            }
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default YouTubeTut;
