import React, { useContext, useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { AppContext } from "../context/AppContext";
import Spinner from '../componenets/loader/Spinner'
import BlogCard from "../componenets/global-com/BlogCard";
import Footer from '../componenets/home-com/Footer'

const Blogs = () => {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const { setIsWriteBlog } = useContext(AppContext);
  const [blogData, setBlogData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const scrollToDiv = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    document.title = "Blogs";
    scrollToDiv("blog");
  }, []);

  useEffect(() => {
    if (!blogData) {
      fetchBlogs();
    }
  }, []);

  const fetchBlogs = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${baseUrl}/all-blogs`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch blogs");
      }

      const data = await response.json();
      setBlogData(data.blogs);
    } catch (error) {
      setBlogData(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div id="blog" className="w-full flex flex-col pt-44 login">
      <div className="w-full flex justify-between items-center px-8">
        <h2 className="text-xl font-semibold text-gray-200">Our Blogs</h2>
        <button
          onClick={() => setIsWriteBlog(true)}
          className="flex justify-center items-center gap-2 py-2 px-2 !border !border-blue-600 rounded-md text-blue-600 text-base font-semibold transition duration-300 ease-in-out hover:text-white hover:bg-blue-600"
        >
          <FaEdit /> write a blog
        </button>
      </div>
      <div className="w-full bg-black mt-2 p-8 flex justify-center items-start gap-4 flex-wrap">
        {
          isLoading ? 
          (<div className="w-full h-[70vh] flex justify-center items-center"><Spinner/></div>):
          (
            blogData ? 
            blogData.map((blog) => (
              <BlogCard
                key={blog._id}
                data={blog}
              />
            ))
            :
            (<div className="w-full h-[70vh] flex justify-center items-center text-2xl font-bold text-gray-200">Empty Blogs</div>)
          )
        }
      </div>

      <Footer/>
    </div>
  );
};

export default Blogs;
