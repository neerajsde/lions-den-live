import React from 'react'
import NavBtns from '../navbar/NavBtns'
import NavItems from '../navbar/NavItems'

const MenuBar = () => {
  return (
    <div className={`w-full lg:hidden flex flex-col justify-center items-start px-4 py-8 max-sm:pt-1 gap-2 bg-[#000000d1]`}>
        <NavItems/>
        <NavBtns/>
    </div>
  )
}

export default MenuBar