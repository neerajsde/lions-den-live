import React from 'react'
import ShapImg from '../../assets/shape.png'

const TimeTableCard = ({morningTime, description, eveningTime}) => {
  return (
    <div className="row ss-box align-items-center">
        <div className="col-md-4">
            <div className="ss-class">
                <h5><img src={ShapImg} alt="shape"/><span>Class Name</span></h5>
                <p>{description}</p>
            </div>
        </div>
        <div className="col-md-8">
            <div className="row align-items-center">
                <div className="col-md-6">
                    <div className="ss-tr">
                        <h5><img src={ShapImg} alt="shape"/><span>Morning Time</span>
                        </h5>
                        <p>{morningTime}</p>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="ss-tr">
                        <h5><img src={ShapImg} alt="shape"/><span>Evening Time</span>
                        </h5>
                        <p>{eveningTime}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default TimeTableCard