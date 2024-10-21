import React from 'react'
import { Link } from 'react-router-dom'

const Banner = ({name}) => {
  return (
    <section className="banner-section">
        <div className="container">
            <div className="row">
                <div className="col-lg-6">
                    <div className="banner-title">
                        <h2>{name}</h2>
                        <ul>
                            <li><Link to={'/'}>Home</Link></li>
                            <li>||</li>
                            <li>{name}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Banner