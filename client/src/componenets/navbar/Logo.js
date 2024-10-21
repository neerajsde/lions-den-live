import React from 'react'
import logo from '../../assets/logo.png';
import { useNavigate } from 'react-router-dom';

const Logo = () => {
  const navigate = useNavigate();
  return (
    <div onClick={() => navigate('/')} className='w-[80px] max-md:w-[60px]  cursor-pointer'>
      <img src={logo} alt='logo' className='w-full h-full object-cover'/>
    </div>
  )
}

export default Logo