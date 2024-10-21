import React, { useContext, useState } from "react";
import QuoteImg from '../../assets/fea2.png'
import toast from "react-hot-toast";
import SmSpinner from "../loader/SmSpinner";
import { AppContext } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";

const ContactForm = ({branch}) => {
    const baseUrl = process.env.REACT_APP_BASE_URL;
    const [isLoading, setIsLoading] = useState(false);
    const {branchData} = useContext(AppContext);
    const navigate = useNavigate();
    
    const [formData, setFormdata] = useState({
        name:'',
        email:'',
        mobile_no:'',
        shedule_date:'', 
        shedule_for:'', 
        branch_name:branch
    })

    function inputHanlder(event){
      if (event.target.name === "mobile_no" && event.target.value.length > 10) {
        return;
      }
        setFormdata((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value
        }))
    }

    const sumbitHandler = async(event) => {
        event.preventDefault();
        try{
            setIsLoading(true);            
            const today = new Date(); // Current date
            const sixMonthsLater = new Date(); 
            sixMonthsLater.setMonth(today.getMonth() + 6); // Add 6 months

            // Format today's date and sixMonthsLater to YYYY-MM-DD for comparison
            const formattedToday = today.toISOString().split('T')[0]; 
            const formattedSixMonthsLater = sixMonthsLater.toISOString().split('T')[0]; 

            // Split selected form date
            const selectedDate = formData.shedule_date;
            const dateParts = selectedDate.split('-');
            const formattedDate = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`; // DD/MM/YYYY

            // Compare selected date with today's date and six months from today
            if (selectedDate < formattedToday || selectedDate > formattedSixMonthsLater) {
              toast.error('Please select a valid date');
              return;
            }

            const updatedFormData = { 
                ...formData, 
                shedule_date: formattedDate 
            };
            const res = await fetch(`${baseUrl}/contact/submit`, {
                method:"POST",
                headers:{
                    "Content-Type": "application/json",
                }, 
                body: JSON.stringify(updatedFormData)
            })
            const response = await res.json();
            if(response.success){
                toast.success(response.message);
                navigate("/thanks", { state: { data: updatedFormData } });
            }
            else{
                toast.error(response.message);
            }
        } catch(err){
            toast.error('Retry to Submit')
        } finally{
            setIsLoading(false);
        }
    }

  return (
    <section class="form-section p-100">
      <div class="container-fluid">
        <div class="row align-items-center">
          <div class="col-lg-7">
            <div class="form-box">
              <h2>Book your free trial</h2>
              <form>
                <div class="row">
                  <div class="col-md-6">
                    <div class="f-group">
                      <label>Full Name *</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={inputHanlder}
                        placeholder="Enter Full Name"
                        required
                      />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="f-group">
                      <label>Mobile Number *</label>
                      <input
                        type="number"
                        name="mobile_no"
                        value={formData.mobile_no}
                        onChange={inputHanlder}
                        placeholder="Enter Your Mobile No."
                        required
                      />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="f-group">
                      <label>Email Id *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={inputHanlder}
                        placeholder="Enter Your Email ID"
                        required
                      />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="f-group">
                      <label>Schedule Free Trial *</label>
                      <input
                        type="date"
                        name="shedule_date"
                        value={formData.shedule_date}
                        onChange={inputHanlder}
                        placeholder="Enter Date"
                        required
                        min={new Date().toISOString().split("T")[0]}
                      />
                    </div>
                  </div>
                  { branch === "All" && (<div class="col-md-6">
                    <div class="f-group">
                      <label>Branche*</label>
                      <select name="branch_name" value={formData.branch_name} onChange={inputHanlder} required>
                        <option value="Choose Branche">Choose Branche</option>
                        {
                          branchData ? 
                          (
                            branchData.map((branch) => 
                              (<option key={branch._id} value={branch.name.toUpperCase()}>{branch.name.toUpperCase()}</option>)
                            )
                          ):
                          (<option value="Empty">Empty</option>)
                        }
                      </select>
                    </div>
                  </div>)}
                  <div class={`${ branch === "All" ? 'col-md-6' : 'col-md-12'}`}>
                    <div class="f-group">
                      <label>Schedule Trial*</label>
                      <select name="shedule_for" value={formData.shedule_for} onChange={inputHanlder} required>
                        <option value="none">Schedule Trial</option>
                        <option value="4pm - 5pm kids batch">4PM - 5PM kids batch</option>
                        <option value="5pm - 6pm kids batch">5PM - 6PM kids batch</option>
                        <option value="6am - 7am">6AM - 7AM</option>
                        <option value="7am - 8am">7AM - 8AM</option>
                        <option value="8am - 9am">8AM - 9AM</option>
                        <option value="6pm - 7pm">6PM - 7PM</option>
                        <option value="7pm - 8pm">7PM - 8PM</option>
                        <option value="8pm - 9pm">8PM - 9PM</option>
                      </select>
                    </div>
                  </div>
                  <div class="col-lg-6">
                    <button type="submit" class="sec-btn submit" name="submit" onClick={sumbitHandler}>
                        <span>Book Free Trial</span>
                        {isLoading && (<div className="z-20 relative"><SmSpinner/></div>)}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div class="col-lg-5">
            <div class="form-img">
              <img src={QuoteImg} alt="imas" />
              <div class="form-shape"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
