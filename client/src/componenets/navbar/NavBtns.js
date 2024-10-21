import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../../context/AppContext';

const NavBtns = () => {
  const navigate = useNavigate();
  const {setIsActiveMenuBar } = useContext(AppContext);

  return (
    <div>
      <button className='sec-btn text-white' onClick={() => {
        navigate('/contact');
        setIsActiveMenuBar(false);
      }}><span>Book Free Trial</span></button>
    </div>
  )
}

export default NavBtns