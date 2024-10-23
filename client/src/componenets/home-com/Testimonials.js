import React from 'react';
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import TestimonialCard from './TestimonialCard';
import shapImg from '../../assets/shape.png'
import test1Img from '../../assets/s-r.png'
import test2Img from '../../assets/k-r.png'
import test3Img from '../../assets/sr.png'

const Testimonials = () => {
    var settings = {
        dots: true,
        arrows:false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
      };
  return (
    <section className="testimonial-section p-100">
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-lg-7">
                    <div className="tes-head">
                        <img src={shapImg} alt="" className='m-auto'/>
                        <h2>Client's Feedback</h2>
                        <p>Real Experiences from Our Community</p>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-6">
                    <div className="tes-img">
                        <img src={`${process.env.REACT_APP_BASE_URL}/files/1729667633011.jpg`} alt="training"/>
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="tes-slide">
                        <Slider {...settings}>
                            <TestimonialCard 
                                name={"shahrukh shaik"} 
                                designation={"10 months ago"} 
                                description={"Top notch trainers & training. Great place to learn basics and to evolve as Mature fighter. Perfect representation of growing MMA community in India."}
                                img={test1Img}
                            />

                            <TestimonialCard 
                                name={"Kamran Hashmi"} 
                                designation={"1 year ago"} 
                                description={"Excellent coach! Teaches amazing and also provides opportunities to learn and showcase your skills by arranging amazing competitions."}
                                img={test2Img}
                            />

                            <TestimonialCard 
                                name={"Sammer Khan"} 
                                designation={"1 year ago"} 
                                description={"They are truly professional coach know their work. Separate batch for fighter's I appreciate the effort what they made about my training."}
                                img={test3Img}
                            />
                        </Slider>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Testimonials