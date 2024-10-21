import React from "react";
import quoteImg from "../../assets/quote1.png";
import { FaStar } from "react-icons/fa6";

const TestimonialCard = ({name, designation, description, img}) => {
  return (
    <div className="tes-box">
      <div className="tes-info">
        <div className="tes-inner-info">
          <div className="user-img">
            <img src={img} alt="" />
          </div>
          <div className="text">
            <h5>{name}</h5>
            <ul>
              <li>
                <span>{designation}</span>
              </li>
              <li className="ratting">
                <FaStar className="fa-solid fa-star"/>
                <FaStar className="fa-solid fa-star" />
                <FaStar className="fa-solid fa-star" />
                <FaStar className="fa-solid fa-star" />
              </li>
            </ul>
          </div>
        </div>
        <div className="quote">
          <img src={quoteImg} alt="" />
        </div>
      </div>
      <div className="tes-para">
        <p>{description}</p>
      </div>
    </div>
  );
};

export default TestimonialCard;
