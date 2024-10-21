import React, { useContext, useState, useEffect, useRef } from 'react';
import trainingImg from '../../assets/training.png';
import heartImg from '../../assets/heart.png';
import wararisImg from '../../assets/wraris-den (1).webp';
import shapeImg from '../../assets/shape.png';
import CountUp from 'react-countup';
import { AppContext } from '../../context/AppContext';

const About = () => {
  const { branchData } = useContext(AppContext); // Fetching branchData from context
  const [startCount, setStartCount] = useState(false); // State to track when to start counting
  const counterRef = useRef(null); // Ref for the counter section

  // Detect when the counter section is in the viewport
  useEffect(() => {
    const handleScroll = () => {
      if (counterRef.current) {
        const sectionTop = counterRef.current.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (sectionTop < windowHeight) {
          setStartCount(true); // Start counting when the section is in view
        }
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section className="about-section p-100">
      <div className="container-fluid">
        <div className="row align-items-center">
          {/* Left Text Section */}
          <div className="col-lg-7">
            <div className="about-text">
              <h2>WE ARE PUSHING THE LIMIT OF YOUR CORE STRENGTH</h2>
              <p>
                Lion’s Den Fight Club is one of its kind martial arts training centres in South Delhi
                that perfectly consolidates combat techniques.
              </p>

              {/* Fitness Training Section */}
              <div className="as-box">
                <div className="icon">
                  <img src={trainingImg} alt="Fitness Training" />
                </div>
                <div className="text">
                  <h5>Fitness Training</h5>
                  <p>
                    We teach martial arts because we love it — not because we want to make money off
                    you. Unlike other martial arts schools.
                  </p>
                </div>
              </div>

              {/* Cardio and Strength Section */}
              <div className="as-box">
                <div className="icon">
                  <img src={heartImg} alt="Cardio And Strength" />
                </div>
                <div className="text">
                  <h5>Cardio And Strength</h5>
                  <p>
                  Boost Your Endurance and Build Muscle: Join Our Cardio and Strength Training Classes for Optimal Fitness and Health!
                  </p>
                </div>
              </div>

              <a href="#" className="sec-btn mt-5">
                <span>Read More</span>
              </a>
            </div>
          </div>

          {/* Right Image and Counters Section */}
          <div className="col-lg-5">
            <div className="as-item">
              <div className="about-img">
                <img src={wararisImg} alt="Wararis Den" />
              </div>

              {/* Counter Section */}
              <div id="counter" ref={counterRef}>
                <div className="cont-box">
                  <div className="text">
                    <p>
                      <img src={shapeImg} alt="Branches" /> Branches
                    </p>
                    <h2 className="counter-value">
                      {startCount && <CountUp end={branchData?.length || 0} start={0} />}
                    </h2>
                  </div>
                </div>

                <div className="cont-box">
                  <div className="text">
                    <p>
                      <img src={shapeImg} alt="Coaches" /> EXPERT COACHES
                    </p>
                    <h2 className="counter-value">
                      {startCount && <CountUp start={0} end={25} />}
                    </h2>
                  </div>
                </div>

                <div className="cont-box">
                  <div className="text">
                    <p>
                      <img src={shapeImg} alt="Trained Students" /> Trained Students
                    </p>
                    <h2 className="counter-value">
                      {startCount && <CountUp start={0} end={950} />}
                    </h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
