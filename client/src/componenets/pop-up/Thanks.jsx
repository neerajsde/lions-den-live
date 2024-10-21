import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import ThImg from '../../assets/th.webp'
import YTImg from '../../assets/youtube.png'
import insImg from '../../assets/instagram-logo.png';

const Thanks = () => {
    const location = useLocation();
    const data = location.state?.data;
  return (
    <section id="thanks" className="thank-section">
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-lg-7 col-md-10">
                    <div className="thank">
                        <div className="img-over">
                            <img src={ThImg} alt=""/>
                        </div>
                        <h2>Welcome to the LIONS DEN FIGHT CLUB</h2>
                        <p>Your Free Trial has been booked successfully in the below-mentioned schedule</p>
                        <h5>CLICK AND VISIT OUR SOCIAL MEDIA</h5>
                        <ul className="ts-table">
                            <li><b>Name </b><span>{data?.name}</span></li>
                            <li><b>Mobile </b><span>{data?.mobile_no}</span></li>
                            <li><b>Date </b><span>{data?.shedule_date}</span></li>
                            <li><b>Time </b><span>{data?.shedule_for}</span></li>
                            <li><b>Location </b><span>{data?.branch_name}</span></li>
                        </ul>
                        <ul className="social justify-content-center mt-3">
                            <li><Link to="https://youtube.com/@lionsdenfightclub?si=arnF91ANoH1LfvsX"
                                    target="_blank"><img src={YTImg}/></Link></li>
                            <li><Link to="https://www.instagram.com/lionsdenfightclub?igsh=MTc0N2d4OHN2azZieA=="><img
                                        src={insImg}/></Link></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Thanks