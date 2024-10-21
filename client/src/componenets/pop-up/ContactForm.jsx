import React from 'react'

const ContactForm = () => {
  return (
    <div className='backdrop-blur-md bg-[#2222] border border-gray-500 text-black flex p-8 absolute top-0 right-4 w-[400px] h-[500px]'>
        <div className='w-full flex flex-col'>
            <input
                type='text'
                placeholder='Your Name'
                className='w-full px-2 py-4 border border-gray-400 bg-transparent'
            />
        </div>
    </div>
  )
}

export default ContactForm