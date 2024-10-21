import React, { useEffect } from "react";
import Banner from "../componenets/global-com/Banner";
import ContactDetails from "../componenets/global-com/ContactDetails";
import ContactForm from "../componenets/sections/ContactForm";
import Benefits from "../componenets/home-com/Benefits";
import Footer from "../componenets/home-com/Footer";

const ContactUs = () => {

    const scrollToDiv = (id) => {
        const element = document.getElementById(id);
        if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        }
    };

    useEffect(() => {
        document.title = 'contact us'
        scrollToDiv('contact');
    },[])

  return (
    <div id="contact" className="w-full flex-col items-center">
      <Banner name={"Contact Us"} />

      <ContactDetails />
      <ContactForm branch={"All"}/>
      <Benefits off={"40"} />
      <Footer />
    </div>
  );
};

export default ContactUs;
