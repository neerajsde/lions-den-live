import React, { useContext } from 'react'
import NavBtns from '../navbar/NavBtns';
import Logo from '../navbar/Logo'
import { CiMenuFries } from "react-icons/ci";
import { AppContext } from '../../context/AppContext';
import { IoClose } from "react-icons/io5";
import NavItems from '../navbar/NavItems';

const Navbar = () => {
  const {isActiveMenuBar, setIsActiveMenuBar} = useContext(AppContext);
  
  return (
    <nav className='w-ful flex justify-evenly py-3 px-4 sm:px-0 items-center bg-[#11111162] max-lg:bg-[#000000d1] max-lg:py-2 max-lg:px-0 max-lg:justify-between'>
      <Logo/>
      <div className="max-lg:hidden"><NavItems/></div>
      <div className="max-lg:hidden"><NavBtns/></div>

      <div onClick={() => setIsActiveMenuBar(!isActiveMenuBar)} className='lg:hidden text-2xl border p-2 border-gray-400 rounded-md'>
        {
          isActiveMenuBar ? (<IoClose/>) : (<CiMenuFries/>)
        }
      </div>
    </nav>
  )
}

export default Navbar