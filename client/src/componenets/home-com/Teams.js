import React, { useContext, useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import TeamCard from "./TeamCard";
import { AppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const Teams = () => {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const { coachData, setCoachData } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!coachData) {
      getAllCoach();
    }
  }, []);

  const getAllCoach = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${baseUrl}/get-coach`, {
        method: "GET",
      });

      const data = await response.json();
      if (response.ok && data.success) {
        setCoachData(data.data);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  };

  return (
    <section className="team-section p-100">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="team-head">
              <h2>Team Of Expert Coaches</h2>
              <p>
                Our coaches are active professional fighters. So all the
                instruction comes from champions. They make real efforts to
                teach every single client all the skills. They are dedicated,
                punctual and focused. Individual attention is provided even in
                group classes.
              </p>
            </div>
          </div>
        </div>
        <div className="ser-slider">
          <Slider {...settings}>
            {coachData &&
              coachData.map((coach) => (
                <TeamCard key={coach._id} data={coach} />
              ))}
          </Slider>
        </div>
      </div>
      <div className="staff">
        <h2>Coaches</h2>
      </div>
    </section>
  );
};

export default Teams;
