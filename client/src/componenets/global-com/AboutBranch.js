import React from 'react'
import shapeImg from '../../assets/shape.png'

const AboutBranch = ({name, locationUrl}) => {
  return (
    <section className="location-section p-50">
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-lg-6">
                    <div className="ls-head">
                        <img src={shapeImg} alt="shape" className='m-auto'/>
                        <h2>{`Lion's Den MMA Academy ${name}`}</h2>
                    </div>
                </div>
            </div>
            <div className="row"> 
                <div className="col-lg-12">
                    <div className="ls-map">
                        <iframe
                            src={locationUrl}
                            width="100%" height="100%" className='border-none' allowfullscreen="" loading="lazy"
                            referrerpolicy="no-referrer-when-downgrade"></iframe>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default AboutBranch