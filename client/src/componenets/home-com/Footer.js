import React from 'react';
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import Fe2Img from '../../assets/fea2.png'
import FeBgImg from '../../assets/fea-bg.png'
import Logo from '../../assets/logo.png'
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer-section p-50">
        <div className="f-shape">
            <img src={Fe2Img} alt=""/>
        </div>
        <div className="f-shape2">
            <img src={FeBgImg} alt=""/>
        </div>
        <div className="container-fluid">
            <div className="row">
                <div className="col-lg-4">
                    <div className="f-welcome">
                        <h4>Request a Call Back</h4>
                        <p>Lions Den has specialized in martial arts since 2019 and has one of the most innovative programs in the nation.</p>
                        <a href="tel:+91 98997 62760" className="sec-btn"><span>Call Now</span></a>
                        <ul className="social">
                            <li><Link to={'https://www.facebook.com/lionsdenfightclub?mibextid=qi2Omg&rdid=seqdRy5DaVNFdhNo&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2FRzSvD99c7yV5oFEa%2F%3Fmibextid%3Dqi2Omg'}><i><FaFacebook/></i></Link></li>
                            <li><Link to={'https://x.com/i/flow/login?redirect_after_login=%2FLionsDenFightC1'}><i><FaXTwitter/></i></Link></li>
                            <li><Link to={'https://www.instagram.com/lionsdenfightclub/?igsh=MTc0N2d4OHN2azZieA%3D%3D'}><i><FaInstagram/></i></Link></li>
                            <li><Link to={'https://www.linkedin.com/company/lion-s-den-fight-club/'}><i><FaLinkedin/></i></Link></li>
                            <li><Link to={'https://www.youtube.com/@lionsdenfightclub?si=arnF91ANoH1LfvsX'}><i><FaYoutube/></i></Link></li>
                        </ul>
                    </div>
                </div>
                <div className="col-lg-5 col-md-7">
                    <div className="footer-info">
                        <div className="logo">
                            <img src={Logo} alt="logo"/>
                        </div>
                        <div className="text">
                            <div className="f-call flex flex-col">
                                <h6>Call Us Anytime</h6>
                                <a href="tel:+919899762760">+91 9899762760</a>
                                <a href="tel:+917078607663">+91 7078607663</a>
                            </div>
                            <div className="f-email">
                                <h6>Email Address</h6>
                            <a href="mailto:Officiallionsdenfightclub@gmail.com">Officiallionsdenfightclub@gmail.com</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 col-md-5">
                    <div className="f-link">
                        <h4>Quick's Links</h4>
                        <ul>
                            <li><Link to={'/'}>Home</Link></li>
                            <li><Link to={'/blogs'}>Blog</Link></li>
                            <li><Link to={'/about'}>About Us</Link></li>
                            <li><Link to={'/review'}>Reviews</Link></li>
                            <li><Link to={'/contactus'}>Contact Us</Link></li>
                            <li><Link to={'/'}>Privacy Policy</Link></li>
                            <li><Link to={'/'}>Terms Of Services</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="copy-right">
                <p>© Copyright 2024 | Powered by LION'S DEN MIXED MARTIAL ARTS ACADEMY || Developed By <a href="standupstartups.com">Standup Startups.</a></p>
            </div>
        </div>
    </footer>
  )
}

export default Footer