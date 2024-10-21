import React, { useContext, useEffect, useState } from 'react'
import shapeImg from '../../assets/shape.png'
import BranchCard from './BranchCard';
import {AppContext} from '../../context/AppContext'

const Branch = () => {
    const {branchData} = useContext(AppContext)

  return (
    <section className="branches-section p-100">
        <div className="container">
            <div className="row justify-content-center">
                    <div className="col-lg-8">
                        <div className="branche-head">
                            <img src={shapeImg} alt="shape"/>
                            <h2>Click On Branch Button For All information</h2>
                            <span>(Location, Fees, Timing, Schedule and Free Trial)</span>
                        </div>
                    </div>
                </div>
            <div class="row justify-content-center">
                {
                    branchData && branchData.map((branch) => (
                        <BranchCard
                            data={branch}
                        />
                    ))
                }
            </div>
        </div>
    </section>
  )
}

export default Branch