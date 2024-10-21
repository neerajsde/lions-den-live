import React from 'react'
import MMAImg from '../../assets/mma.jpg'

const Card = () => {
  return (
    <div className="ser-box">
    <div className="ser-img">
      <img src={MMAImg} alt="" />
    </div>
    <div className="text">
      <h2>09</h2>
      <h3>
        <a href="muay-thai.html">Mixed Martial Arts</a>
      </h3>
    </div>
  </div>
  )
}

export default Card