import React from 'react'
import shapeImg from '../../assets/shape.png'

const AboutAcademy = () => {
  return (
    <section className="branches-section p-50">
        <div className="container-fluid">
            <div className="row justify-content-center">
                <div className="col-lg-6">
                    <div className="branche-head">
                        <img src={shapeImg} alt="" className='m-auto'/>
                        <h2>Welcome to Lion's Den MMA Academy</h2>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-6 mt-4">
                    <div className="branche-box">
                        <div className="branches-text">
                            <img src={shapeImg} alt=""/>
                            <h4>Our Journey </h4>
                            <p>Lion's Den MMA Academy was founded with a vision to create a space where individuals could train, grow, and excel in mixed martial arts. Since our inception, we have been committed to providing top-notch training and fostering a community of passionate martial artists. Located in the heart of Delhi, our academy is dedicated to helping students achieve their personal best, whether they are beginners or advanced fighters.</p>
                        </div>
                    </div>
                </div>
                <div className="col-lg-6 mt-4">
                    <div className="branche-box">
                        <div className="branches-text">
                            <img src={shapeImg} alt=""/>
                            <h4>Our Values</h4>
                            <p>At Lion's Den MMA Academy, we uphold values of respect, integrity, and perseverance. We believe in creating a supportive and inclusive community where everyone feels welcome. Our training philosophy emphasizes hard work, dedication, and continuous improvement. We are committed to helping you achieve excellence both on and off the mat.</p>
                        </div>
                    </div>
                </div>
                <div className="col-lg-6 mt-4">
                    <div className="branche-box">
                        <div className="branches-text">
                            <img src={shapeImg} alt=""/>
                            <h4>Our Vision</h4>
                            <p>At Lion's Den MMA Academy, our vision is to empower individuals through martial arts. We believe that MMA is not just about physical training but also about building mental strength, discipline, and self-confidence. Our goal is to inspire and support our students in their journey to become the best version of themselves.</p>
                        </div>
                    </div>
                </div>
                <div className="col-lg-6 mt-4">
                    <div className="branche-box">
                        <div className="branches-text">
                            <img src={shapeImg} alt=""/>
                            <h4>Our Facility</h4>
                            <p>Our state-of-the-art facility is equipped with everything you need for comprehensive MMA training. We have a fully equipped gym, spacious training mats, a boxing ring, and a variety of training equipment. Our clean and safe environment ensures that you can focus on your training without any distractions.</p>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    </section>
  )
}

export default AboutAcademy