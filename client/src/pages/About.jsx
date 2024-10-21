import React, { useEffect } from 'react'
import Banner from '../componenets/global-com/Banner'
import aboutImg from '../assets/about-14.svg'
import about2Img from '../assets/about.jpg'
import ShapImg from '../assets/shape.png'
import { TiTick } from "react-icons/ti";
import AboutAcademy from '../componenets/about-com/AboutAcademy'
import Teams from '../componenets/home-com/Teams'
import Benefits from '../componenets/home-com/Benefits'
import Footer from '../componenets/home-com/Footer'
import AboutCEO from '../componenets/about-com/AboutCEO'


const About = () => {
    const scrollToDiv = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    document.title = 'About'
    scrollToDiv("about");
  }, []);

  return (
    <div id='about' className="w-full flex-col items-center">

      <Banner name={"About Us"}/>

      <section class="about-section p-100">
        <div class="container">
            <div class="row align-items-center">
                <div class="col-lg-5">
                    <div class="as-img">
                        <img src={aboutImg} alt="About"/>
                        <img class="about-img2" src={about2Img} alt="about"/>
                        <h2>Since 2019</h2>
                    </div>
                </div>
                <div class="col-lg-7">
                    <div class="about-text as-text">
                        <span><img src={ShapImg} alt="shape"/>About Us</span>
                        <h1>Best Boxing School and Martial Arts Since 2019</h1>
                        <p><strong>Our Legacy</strong> Since 2019, Lion's Den MMA Academy has been recognized as the
                            premier destination for boxing and martial arts training in Delhi. With a commitment to
                            excellence, we have consistently provided top-tier training and fostered a community of
                            dedicated martial artists. Our longstanding reputation is built on the success and
                            satisfaction of our students.</p>
                        <p><strong>Join the Legacy</strong> Experience the difference that dedication, expertise,
                            and a supportive environment can make. Whether you're aiming to compete at the highest
                            levels or simply want to improve your fitness and skills, Lion's Den MMA Academy is the
                            place to be.</p>
                        <p><strong>Train with the Best</strong> Become a part of our legacy. Discover your potential
                            and unleash your inner warrior at the best boxing school and martial arts academy since
                            2019.</p>
                        <ul>
                            <div class="row">
                                <div class="col-md-6">
                                    <li><i class="fa-solid fa-check"><TiTick/></i><span>Proven Track Record</span></li>
                                    <li><i class="fa-solid fa-check"><TiTick/></i><span>Expert Instructors</span></li>
                                </div>
                                <div class="col-md-6">
                                    <li><i class="fa-solid fa-check"><TiTick/></i><span>Comprehensive Training</span></li>
                                    <li><i class="fa-solid fa-check"><TiTick/></i><span>Community Spirit</span></li>
                                </div>
                            </div>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
      </section>

      <AboutCEO/>
      <AboutAcademy/>

      <Teams/>

      <Benefits off={"20"}/>

      <Footer/>
    </div>
  )
}

export default About