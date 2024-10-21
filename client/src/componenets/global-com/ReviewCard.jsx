import React from "react";
import { IoStar } from "react-icons/io5";
import userImg from "../../assets/tes1.jpg";
import { FcGoogle } from "react-icons/fc";

export const ReviewCard = () => {
  return (
    <>
      <div className="col-lg-4 col-md-6">
        <div className="review-box">
          <div className="rs-text flex justify-between items-center mb-4">
            <div className="rs-info">
              <img src={userImg} alt="user" />
              <div className="text">
                <h5>karan meena</h5>
                <span>Kickboxer</span>
              </div>
            </div>
            <FcGoogle  className="text-5xl"/>
          </div>
          <div className="ratting">
            <IoStar />
            <IoStar />
            <IoStar />
            <IoStar />
            <IoStar />
          </div>
          <q>Great place to get stronger,faster and agile Staff and owners are super helpful. I’ll recommend to everyone
          </q>
        </div>
      </div>
    </>
  );
};
