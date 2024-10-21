import React, { useContext, useEffect, useState } from 'react'
import Spinner from '../../loader/Spinner';
import SmSpinner from '../../loader/SmSpinner'
import toast from 'react-hot-toast';
import { AdminContext } from '../../../context/AdminContext';
import EditBlogData from './EditBlogData';

const Blog = () => {
    const [blogData, setBlogData] = useState(null);
    const baseUrl = process.env.REACT_APP_BASE_URL;
    const {isActiveBlogEdit, setIsACtiveBlogPage} = useContext(AdminContext);
    const [isLoading, setIsLoading] = useState(false);
    const [loading, setLoading] = useState(false);
    const [currentBlogData, setCurrBlogData] = useState(null);

    useEffect(() => {
        if(!blogData){
            fetchBlogs();
        }
    }, [])

    const fetchBlogs = async () => {
        try {
            setIsLoading(true);
            const response = await fetch(`${baseUrl}/blogs`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch blogs');
            }

            const data = await response.json();
            setBlogData(data.blogs);
        } catch (error) {
            setBlogData(null);
        } finally{
            setIsLoading(false);
        }
    };


    const deleteBlogPost = async (blogId) => {
        try {
          setLoading(true);
            const response = await fetch(`${baseUrl}/blogs/${blogId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
    
            const data = await response.json();
    
            if (response.ok) {
              await fetchBlogs();
                toast.success(data.message);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        } finally{
          setLoading(false);
        }
    };

    const editBlogPost = async (blogId) => {
      try{
        setLoading(true);
        const response = await fetch(`${baseUrl}/blog/update`, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json'
          },
          body:JSON.stringify()
        });
        const data = await response.json();
        if (response.ok) {
          await fetchBlogs();
            toast.success(data.message);
        } else {
            toast.error(data.message);
        }
      } catch(err){
        toast.error(err.message)
      } finally{
        setLoading(false);
      }
    }

    const PublishBlogPost = async (blogId) => {
      try {
          const response = await fetch(`${baseUrl}/blogs/${blogId}`, {
              method: 'PUT',
              headers: {
                  'Content-Type': 'application/json'
              },
          });
  
          const data = await response.json();
  
          if (response.ok) {
            await fetchBlogs();
              toast.success(data.message);
          } else {
              toast.error(data.message);
          }
      } catch (error) {
          toast.error(error.message);
      }
  };

    if(isLoading){
        return (
            <div className='w-full h-[90vh] flex justify-center items-center'><Spinner/></div>
        )
    }

  
  return (
    <div className='w-full login h-full flex flex-col gap-4 px-8'>
      <h2 className='text-lg text-orange-500 uppercase'>All Blogs</h2>
      <div className='w-full'>
        {
          !blogData ?
          (
            <div className='text-center text-gray-500'>
              Empty Blogs
            </div>
          ) : 
          (
            <table className='w-full table-auto border-collapse'>
              <thead>
                <tr className='border-b border-gray-600'>
                  <th className='py-2 px-2 text-left  login'>SN</th>
                  <th className='py-2 px-4 text-left login'>Title</th>
                  <th className='py-2 px-4 text-left login'>Author</th>
                  <th className='py-2 px-4 text-left login'>Action</th>
                </tr>
              </thead>
              <tbody>
                {
                    blogData && blogData.map((blog, index) => (
                        <tr key={blog._id} className='border-b border-gray-600'>
                            <td className='py-2 px-2 login'>{index+1}</td>
                            <td className='py-2 px-4 login'>{blog.title}</td>
                            <td className='py-2 px-4 login'>{blog.author}</td>
                            <td className='py-2 px-4 flex justify-start items-center'>
                                <button onClick={() => {setCurrBlogData(blog); setIsACtiveBlogPage(true)}} className='text-blue-500 hover:text-blue-700 px-2 login'>Edit</button>
                                <button onClick={() => deleteBlogPost(blog._id)} className='text-red-500 hover:text-red-700 px-2 login'>Delete</button>
                                {
                                  !blog.isPublish &&
                                  (<button onClick={() => PublishBlogPost(blog._id)} className='text-green-500 hover:text-green-700 px-2 flex items-center justify-center gap-2 login'>Publish {loading && <SmSpinner/>}</button>)
                                }
                            </td>
                        </tr>
                    ))
                }
              </tbody>
            </table>
          )
        }
      </div>

      {
        isActiveBlogEdit && (<div className="w-full h-full fixed top-0 left-0 backdrop-blur-md flex justify-center items-center"><EditBlogData data={currentBlogData}/></div>)
      }
    </div>
  )
}

export default Blog;
