import React, { useEffect } from 'react'
import ContactForm from '../componenets/sections/ContactForm'
import Footer from '../componenets/home-com/Footer'

const Contact = () => {
  const scrollToDiv = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    document.title = 'Book Free Trial'
    scrollToDiv("contact");
  }, []);

  return (
    <div id='contact' className='flex flex-col '>
        <div className=' pt-24'><ContactForm branch={"All"}/></div>
        <Footer/>
    </div>
  )
}

export default Contact