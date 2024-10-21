import React, { useEffect, useState } from 'react'
import Shape from '../../assets/shape.png'
import "slick-carousel/slick/slick.css";
import Slider from "react-slick";
import fitKickImg from "../../assets/fitness-kick.jpg"
import boxingImg from '../../assets/boxing.jpg'
import kickBoxingImg from '../../assets/kick-boxing.jpg'
import jitImg from '../../assets/jui-jitsu.jpg'
import kidsImg from '../../assets/kids.jpg'
import selfDeffImg from '../../assets/self-defence.jpg'
import muayImg from '../../assets/muay-thai.jpg'
import wrestImg from '../../assets/wrestling.jpg'
import mmaImg from '../../assets/mma.jpg'
import fitImg from '../../assets/fitness.jpg'

const Services = () => {
    const [servicesCol, setServicesCol] = useState(false);

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

    useEffect(() => {
        // Function to handle screen resizing
        const handleResize = () => {
            if(window.innerWidth > 872){
                setServicesCol(false);
            }
            if(window.innerWidth < 872){
                setServicesCol(false);
            }
            if(window.innerWidth < 600){
                setServicesCol(true);
            }
        };

        // Add event listener to handle window resize
        window.addEventListener('resize', handleResize);

        // Clean up the event listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    });

  return (
    <section className="service-section p-100">
        <div className="container-fluid">
            <div className="row justify-content-center">
                <div className="col-lg-8">
                    <div className="ser-head">
                        <img src={Shape} className='m-auto' alt="shape"/>
                        <h2>Comprehensive Martial Arts Training Programs</h2>
                        <p>At Lion's Den MMA Academy, we offer a wide range of class to cater to different skill levels and interests. Whether you're a beginner or a seasoned fighter, we have something for you.</p>
                    </div>
                </div>
            </div>
            <div className={`ser-slider ${servicesCol ? 'row' : 'hidden'}`}>
                <div class="col-lg-4">
                        <div class="ser-box">
                            <div class="ser-img">
                                <img src={fitKickImg} alt=""/>
                            </div>
                            <div class="text">
                                <h2>01</h2>
                                <h3><a href="muay-thai.html">Fitness And Kick <br/> Boxing</a></h3>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <div class="ser-box">
                            <div class="ser-img">
                                <img src={boxingImg} alt=""/>
                            </div>
                            <div class="text">
                                <h2>02</h2>
                                <h3><a href="muay-thai.html">Boxing</a></h3>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <div class="ser-box">
                            <div class="ser-img">
                                <img src={kickBoxingImg} alt=""/>
                            </div>
                            <div class="text">
                                <h2>03</h2>
                                <h3><a href="muay-thai.html">Kick Boxing</a></h3>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <div class="ser-box">
                            <div class="ser-img">
                                <img src={jitImg} alt=""/>
                            </div>
                            <div class="text">
                                <h2>04</h2>
                                <h3><a href="muay-thai.html">Jui Jitsu</a></h3>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <div class="ser-box">
                            <div class="ser-img">
                                <img src={kidsImg} alt=""/>
                            </div>
                            <div class="text">
                                <h2>05</h2>
                                <h3><a href="muay-thai.html">Kids Self Defence</a></h3>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <div class="ser-box">
                            <div class="ser-img">
                                <img src={selfDeffImg} alt=""/>
                            </div>
                            <div class="text">
                                <h2>06</h2>
                                <h3><a href="muay-thai.html">Self Defence</a></h3>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <div class="ser-box">
                            <div class="ser-img">
                                <img src={muayImg} alt=""/>
                            </div>
                            <div class="text">
                                <h2>07</h2>
                                <h3><a href="muay-thai.html">Muay Thai</a></h3>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <div class="ser-box">
                            <div class="ser-img">
                                <img src={wrestImg} alt=""/>
                            </div>
                            <div class="text">
                                <h2>08</h2>
                                <h3><a href="muay-thai.html">Wrestling</a></h3>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <div class="ser-box">
                            <div class="ser-img">
                                <img src={mmaImg} alt=""/>
                            </div>
                            <div class="text">
                                <h2>09</h2>
                                <h3><a href="muay-thai.html">Mixed Martial Arts</a></h3>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <div class="ser-box">
                            <div class="ser-img">
                                <img src={fitImg} alt=""/>
                            </div>
                            <div class="text">
                                <h2>10</h2>
                                <h3><a href="muay-thai.html">Fitness</a></h3>
                            </div>
                        </div>
                    </div>
            </div>
            <div className={`ser-slider ${servicesCol ? 'hidden' : 'row'}`}>
                <Slider {...settings}>
                    <div class="col-lg-4">
                        <div class="ser-box">
                            <div class="ser-img">
                                <img src={fitKickImg} alt=""/>
                            </div>
                            <div class="text">
                                <h2>01</h2>
                                <h3><a href="muay-thai.html">Fitness And Kick <br/> Boxing</a></h3>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <div class="ser-box">
                            <div class="ser-img">
                                <img src={boxingImg} alt=""/>
                            </div>
                            <div class="text">
                                <h2>02</h2>
                                <h3><a href="muay-thai.html">Boxing</a></h3>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <div class="ser-box">
                            <div class="ser-img">
                                <img src={kickBoxingImg} alt=""/>
                            </div>
                            <div class="text">
                                <h2>03</h2>
                                <h3><a href="muay-thai.html">Kick Boxing</a></h3>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <div class="ser-box">
                            <div class="ser-img">
                                <img src={jitImg} alt=""/>
                            </div>
                            <div class="text">
                                <h2>04</h2>
                                <h3><a href="muay-thai.html">Jui Jitsu</a></h3>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <div class="ser-box">
                            <div class="ser-img">
                                <img src={kidsImg} alt=""/>
                            </div>
                            <div class="text">
                                <h2>05</h2>
                                <h3><a href="muay-thai.html">Kids Self Defence</a></h3>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <div class="ser-box">
                            <div class="ser-img">
                                <img src={selfDeffImg} alt=""/>
                            </div>
                            <div class="text">
                                <h2>06</h2>
                                <h3><a href="muay-thai.html">Self Defence</a></h3>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <div class="ser-box">
                            <div class="ser-img">
                                <img src={muayImg} alt=""/>
                            </div>
                            <div class="text">
                                <h2>07</h2>
                                <h3><a href="muay-thai.html">Muay Thai</a></h3>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <div class="ser-box">
                            <div class="ser-img">
                                <img src={wrestImg} alt=""/>
                            </div>
                            <div class="text">
                                <h2>08</h2>
                                <h3><a href="muay-thai.html">Wrestling</a></h3>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <div class="ser-box">
                            <div class="ser-img">
                                <img src={mmaImg} alt=""/>
                            </div>
                            <div class="text">
                                <h2>09</h2>
                                <h3><a href="muay-thai.html">Mixed Martial Arts</a></h3>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <div class="ser-box">
                            <div class="ser-img">
                                <img src={fitImg} alt=""/>
                            </div>
                            <div class="text">
                                <h2>10</h2>
                                <h3><a href="muay-thai.html">Fitness</a></h3>
                            </div>
                        </div>
                    </div>
                </Slider>
            </div>
        </div>
    </section>

  )
}

export default Services