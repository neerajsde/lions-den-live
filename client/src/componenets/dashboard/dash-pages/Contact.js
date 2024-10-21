import React, { useContext, useEffect, useState } from 'react'
import { AdminContext } from '../../../context/AdminContext';
import { Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { CiPaperplane } from "react-icons/ci";
import toast from 'react-hot-toast';
import { TiTick } from "react-icons/ti";
import { RiErrorWarningFill } from "react-icons/ri";
import SmSpinner from '../../loader/SmSpinner';

const Contact = () => {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const { isLoading, contactData, getContactDetails } = useContext(AdminContext);
  const [currUserView, setIsCurrentUserView] = useState({ isActive: false, data: null, message:'', isSend: false });
  const [message, setMessage] = useState("");
  const [smsLoading, setsmsLoading] = useState(false);

  useEffect(() => {
    if (!contactData) {
      getContactDetails();
    }
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[90vh]">
        <Spinner />
      </div>
    );
  }

  if (!contactData) {
    return (
      <div className="flex  login justify-center items-center h-[90vh]">
        <h2 className="text-gray-300 text-lg">No Contact Details Found</h2>
      </div>
    );
  }

  const visibleSectionHandler = (contact) => {
    setIsCurrentUserView({
      isActive: true,
      data: contact,
    });
  };

  const sendResponseHandler = async (userId) => {
    try {
      setsmsLoading(true);
  
      const res = await fetch(`${baseUrl}/send-response`, {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          client_id: userId,
          message: message,
        }),
      });
  
      // Check if the response status is OK (2xx)
      if (res.ok) {
        const response = await res.json();
  
        if (response.success) {
          setIsCurrentUserView((prevState) => ({
            ...prevState,
            message: message,
            isSend: true,
          }));
          toast.success(response.message);
        } else {
          setIsCurrentUserView((prevState) => ({
            ...prevState,
            message: "",
            isSend: false,
          }));
          toast.error(response.message);
        }
      } else {
        // Handle non-2xx HTTP responses
        toast.error(`Failed to send response: ${res.statusText}`);
      }
    } catch (err) {
      toast.error(err.message || "An error occurred while sending the response");
    } finally {
      setsmsLoading(false); // Stop loading spinner whether success or error
    }
  };
  

  return (
    <div className="w-full h-[80vh] bg-gray-900 rounded-lg">
      <div className="w-full flex flex-col h-full">
        <div className="w-full flex items-center justify-start px-4 py-4 bg-gray-800 shadow-md">
          <div className="w-[350px] text-lg font-bold text-white">Contact Details</div>
          {currUserView.data && (
            <div className='w-full flex justify-between items-center'>
              <div className=' text-lg font-semibold uppercase'>{currUserView.data.name}</div>
              <div className=' text-base font-normal uppercase text-yellow-500'>{currUserView.data?.dateTime}</div>
            </div>
            )}
        </div>

        <div className="w-full flex justify-between h-full">
          {/* Sidebar */}
          <div className="w-[350px] overflow-y-scroll bg-gray-800 border-r border-gray-700 custom-scrollbar">
            {contactData.map((contact, index) => (
              <div
                key={index}
                onClick={() => visibleSectionHandler(contact)}
                className="w-full flex items-start justify-start gap-2 p-3 rounded-md transition duration-300 ease-in hover:bg-gray-700 cursor-pointer"
              >
                <div className="w-[50px] h-[50px] border-2 border-gray-500 flex justify-center items-center rounded-full">
                  <img
                    src={`https://api.dicebear.com/5.x/initials/svg?seed=${contact.name}`}
                    alt="user-img"
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
                <div className="flex flex-col">
                  <div className="text-base font-semibold text-gray-200">{contact.name}</div>
                  <div className="text-sm font-light text-gray-400">{contact.subject}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Contact details view */}
          <div className="w-full flex flex-col justify-between p-4 bg-gray-900">
            <div className="w-full overflow-y-scroll h-full flex flex-col justify-start gap-4">
              {currUserView.isActive ? (
                <div className="w-full flex flex-col items-start gap-2 p-4 bg-gray-800 rounded-lg">
                  <div className="py-1 px-2 text-base bg-gray-700 rounded-md text-gray-300">
                    {`Branch Name: ${currUserView.data.branch_name}`}
                  </div>
                  <div className="py-1 px-2 text-base bg-gray-700 rounded-md text-gray-300">
                    {`Phone: ${currUserView.data.mobile_no}`}
                  </div>
                  <Link
                    to={`mailto:${currUserView.data.email}`}
                    className="py-1 px-2 text-base bg-gray-700 rounded-md text-blue-400 hover:underline"
                  >
                    {currUserView.data.email}
                  </Link>
                  <div className="py-1 px-2 text-base bg-gray-700 rounded-md text-gray-300">
                    {`Shedule Date: ${currUserView.data.shedule_date}`}
                  </div>
                  <div className="py-1 px-2 text-base bg-gray-700 rounded-md text-gray-300">
                    {`Shedule Time: ${currUserView.data.shedule_for}`}
                  </div>
                  {
                    currUserView.data?.response !== "" && (
                      <div className='w-full flex flex-col justify-end items-end gap-2'>
                        <div className='text-sm font-normal text-green-600'>Your Reply Message</div>
                        <div className="py-1 px-2 text-base bg-gray-700 rounded-md text-gray-300 flex items-center justify-start">
                          {`${currUserView.data.response}`}
                          <span className='text-blue-600'><TiTick className='text-xl'/></span>
                        </div>
                      </div>
                    )
                  }

                  {
                    currUserView?.message?.length > 0 && (
                      <div className='w-full flex flex-col justify-end items-end gap-2'>
                        <div className='text-sm font-normal text-green-600'>Your Reply Message</div>
                        <div className="py-1 px-2 text-base bg-gray-700 rounded-md text-gray-300 flex items-center justify-start">
                          {`${currUserView.message}`}
                          { currUserView.isSend ? 
                            (<span className='text-blue-500'><TiTick className='text-xl'/></span>)
                            :
                            (<span className='text-red-600'><RiErrorWarningFill className='text-xl'/></span>)
                          }
                        </div>
                      </div>
                    )
                  }
                </div>
              ) : (
                <div className="w-full flex justify-center items-center text-gray-400">
                  No Messages Selected
                </div>
              )}
            </div>

            {/* Message input */}
            <div className="w-full h-[70px] flex items-center mt-4">
              <input
                type="text"
                name='message'
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                placeholder="Enter response message"
                className="w-full h-full px-4 bg-gray-800 text-lg text-white outline-none rounded-l-md"
              />
              <button onClick={() => sendResponseHandler(currUserView.data._id)} className="h-full px-6 bg-blue-600 hover:bg-blue-700 transition-all duration-300 rounded-r-md">
                {
                  smsLoading ? 
                  (<SmSpinner/>)
                  :
                  (<CiPaperplane size={24} className="text-white" />)
                }
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
