import React from 'react'
export const BranchTiming = () => {
  return (
    <section className="contact-section timing-section p-100">
        <div className="container-fluid">
            <div className="row justify-content-center">
                <div className="col-lg-6">
                    <div className="ts-head">
                        <h2>Timings</h2>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-4  g-0">
                    <div className="contact-box">
                        <h4><span>Adults Morning Batches</span></h4>
                        <ul>
                            <li>6:00AM - 7:00AM</li>
                            <li>7:00AM - 8:00AM</li>
                            <li>8:00AM - 9:00AM</li>
                        </ul>
                    </div>
                </div>
                <div className="col-4  g-0">
                    <div className="contact-box">
                        <h4><span>Kids Batches</span></h4>
                        <ul>
                            <li>4:00PM - 5:00PM</li>
                            <li>5:00PM - 6:00PM</li>
                            <li>&nbsp;</li>
                        </ul>
                    </div>
                </div>
                <div className="col-4 g-0">
                    <div className="contact-box">
                        <h4><span>Adults Evening Batches</span></h4>
                        <ul>
                            <li>6:00PM - 7:00PM</li>
                            <li>7:00PM - 8:00PM</li>
                            <li>8:00PM - 9:00PM</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}
