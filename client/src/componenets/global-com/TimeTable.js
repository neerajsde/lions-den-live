import React from 'react';
import "slick-carousel/slick/slick.css";
import Slider from "react-slick";
import ShapImg from '../../assets/shape.png';

const Schedule = ({ name, data }) => {
  const baseUrl = process.env.REACT_APP_BASE_URL;

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

  return (
    <section className="schedule-section p-100">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-7">
            <div className="ss-head">
              <h5><img src={ShapImg} alt="" /><span>Time & Table</span></h5>
              <h2>Weekly Training Schedule</h2>
              <p>{`Lion’s Den Fight Club is one of its kind martial arts training centres in ${name || ''}`}</p>
            </div>
          </div>
        </div>
        <div class="ser-slider">
          <Slider {...settings}>
            {data?.mon_img && <div className="ss-img">
                <img src={`${baseUrl}${data?.mon_img}`}/>
            </div>}
              {data?.tue_img && <div className="ss-img">
                <img src={`${baseUrl}${data?.tue_img}`}/>
            </div>}
              {data?.wed_img && <div className="ss-img">
                <img src={`${baseUrl}${data?.wed_img}`}/>
            </div>}
              {data?.thu_img && <div className="ss-img">
                <img src={`${baseUrl}${data?.thu_img}`}/>
            </div>}
              {data?.fri_img && <div className="ss-img">
                <img src={`${baseUrl}${data?.fri_img}`}/>
            </div>}
              {data?.sat_img && <div className="ss-img">
                <img src={`${baseUrl}${data?.sat_img}`}/>
            </div>}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default Schedule;
