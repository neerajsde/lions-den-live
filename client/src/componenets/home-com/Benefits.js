import React from 'react'
import feaOverImg from '../../assets/fea-ovelay.webp'
import fea2Img from '../../assets/fea2.png'
import { TiTick } from "react-icons/ti";

const Benefits = ({off}) => {
  return (
    <section className="feature-section p-100">
        <div className="fea-shape">
            <img src={feaOverImg} alt="shape"/>
        </div>
        <div className="container">
            <div className="row">
                <div className="col-lg-6">
                    <div className="fea-img">
                        <img src={fea2Img} alt=""/>
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="fea-content">
                        <h2>Get Expert Training Session Today</h2>
                        <div className="row align-items-center">
                            <div className="col-md-5">
                                <div className="fea-offer">
                                    <h3>{`${off}%`}<br/>off</h3>
                                    <p>New Members Registration</p>
                                </div>
                            </div>
                            <div className="col-md-7">
                                <div className="fea-list">
                                    <ul>
                                        <li><i className="fas fa-check"><TiTick/></i><span>Modern Equipment</span></li>
                                        <li><i className="fas fa-check"><TiTick/></i><span>Student Free Access</span></li>
                                        <li><i className="fas fa-check"><TiTick/></i><span>Individual approach
                                        </span></li>
                                        <li><i className="fas fa-check"><TiTick/></i><span>Effective workouts
                                        </span></li>
                                        <li><i className="fas fa-check"><TiTick/></i><span>Experienced Trainers</span></li>
                                        <li><i className="fas fa-check"><TiTick/></i><span>Large comfortable  halls</span></li>
                                        <li><i className="fas fa-check"><TiTick/></i><span>Reasonable Prices</span></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Benefits