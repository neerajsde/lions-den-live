import { Link, Route, Routes, useLocation } from 'react-router-dom'; // Only import Routes and Route
import './App.css';
import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import AdminContextProvider from './context/AdminContext';
import PrivateRoute from './componenets/dashboard/PrivateRoute';
import Dashboard from './pages/Dashboard';
import NotFound from './componenets/sections/NotFound';
import Contact from './pages/Contact';
import Services from './pages/Services';
import Branch from './pages/Branch';
import { Review } from './pages/Review';
import ContactUs from './pages/ContactUs';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from './context/AppContext';
import Header from './componenets/sections/Header';
import Navbar from './componenets/sections/Navbar';
import MenuBar from './componenets/pop-up/MenuBar';
import Thanks from './componenets/pop-up/Thanks';
import { FaWhatsapp } from "react-icons/fa";
import { FaPhone } from "react-icons/fa6";
import Blogs from './pages/Blogs';
import WriteBlog from './componenets/pop-up/WriteBlog';

function App() {
  const {isActiveMenuBar, isWriteBlog} = useContext(AppContext);
  const [isActiveNav, setIsActiveNav] = useState(false);
  const location = useLocation();
  const [isActiveAdmin, setIsActiveAdmin] = useState(false);

  useEffect(() => {
    if (location.pathname === '/admin-login' || location.pathname === '/admin-dashboard' || location.pathname === '/admin-signup' || location.pathname === '*') {
      setIsActiveAdmin(true);
    } else {
      setIsActiveAdmin(false);  // Correct this part
    }
  }, [location.pathname]);
  

  // Use useEffect to add scroll event listener
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setIsActiveNav(true);
      } else {
        setIsActiveNav(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="w-screen flex flex-col items-center relative">

      {/* Navbar Section with dynamic styling */}
      <div
        className={`${isActiveAdmin ? 'hidden' : 'w-full absolute top-0 left-0 flex flex-col z-50 text-white' } ${
          isActiveNav ? "new-menu backdrop-blur-md" : ""
        }`}
      >
        <div className={`${isActiveNav ? " hidden" : "flex"}`}>
          <Header />
        </div>
        <Navbar />
        {isActiveMenuBar && <MenuBar />}
      </div>

      <div className={`${ isActiveAdmin || isWriteBlog ? 'hidden' : 'what'}`}>
          <Link to="https://wa.me/919899762760" target="_blank"><i className="fa-brands fa-whatsapp"><FaWhatsapp/></i></Link>
          <Link to="tel:+91 9899762760">
              <i className="fa-solid fa-phone"><FaPhone/></i>
          </Link>
      </div>
    
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/services/:name' element={<Services />} />
        <Route path='/branch/:name' element={<Branch />} />
        <Route path='/review' element={<Review />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/contactus' element={<ContactUs />} />
        <Route path='/thanks' element={<Thanks/>}/>
        <Route path='/admin-login' element={<Login />} />
        <Route path='/admin-signup' element={<SignUp />} />
        <Route path='/blogs' element={<Blogs/>}/>
        
        <Route path='/admin-dashboard' element={
          <AdminContextProvider>
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          </AdminContextProvider>
        } />

        <Route path='*' element={<NotFound />} />
      </Routes>

      {
        isWriteBlog && (<div className='w-full min-h-screen absolute top-0 left-0 backdrop-blur-md z-50 flex justify-center items-center'><WriteBlog/></div>)
      }
    </div>
  );
}

export default App;
