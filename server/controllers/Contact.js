const contact = require('../model/ContactForm');
const mailSender = require('../utils/mailSender');
const {contactUsMail} = require('../mail/templates/ContactUsMail');
const {adminNotificationMail} = require('../mail/templates/AdminFreeTrialMail');
const {customMessageMail} = require('../mail/templates/ReplyFreeShedule')
const Admin = require('../model/admin/admin');

function convertToIST(utcDateStr) {
    // Create a Date object from the input UTC date string
    const utcDate = new Date(utcDateStr);
  
    // Get the UTC time in milliseconds
    const utcTime = utcDate.getTime();
  
    // IST is UTC + 5 hours and 30 minutes, so we add (5 * 60 + 30) * 60 * 1000 milliseconds
    const istOffset = (5 * 60 + 30) * 60 * 1000;
  
    // Create a new Date object with the IST offset
    const istDate = new Date(utcTime + istOffset);
  
    // Format the IST date and time in a readable way
    return istDate.toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    });
} 

exports.getContactDetails = async (req, res) => {
    try {
        // Fetch all contact details from the database and sort by submitAt in descending order
        const allContactDetails = await contact.find().sort({ submitAt: -1 });

        // Check if contact details are empty
        if (!allContactDetails || allContactDetails.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No contact details found'
            });
        }

        let newContactDetails = [];
        allContactDetails.forEach((contact) => {
            const details = contact.toObject(); // Convert the document to a plain JS object
            details.dateTime = convertToIST(contact.submitAt); // Convert submitAt to IST and add dateTime
            delete details.submitAt; // Remove submitAt from the object
            newContactDetails.push(details); // Push the modified object to the array
        });

        // Respond with the modified contact details
        res.status(200).json({
            success: true,
            data: newContactDetails, // Return the modified array with sorted contacts
            message: 'Fetched all contact details successfully'
        });
    } catch (err) {
        // Handle any errors that occur during the database operation
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};


exports.SubmitConatctForm = async(req, res) => {
    try{
        const {name, mobile_no, email, shedule_date, shedule_for, branch_name} = req.body;

        const isFilled = ['name', 'mobile_no', 'email', 'shedule_date','shedule_for' ];
        for (const item of isFilled) {
            if (!req.body[item]) {  // Correctly access the dynamic property
                return res.status(402).json({
                    success: false,
                    message: `Please fill ${item}`
                });
            }
        }

        const newContact = await contact.create({
            name, mobile_no, email, shedule_date, shedule_for, branch_name
        });

        const adminData = await Admin.find();
        if(adminData && adminData.length > 0){
            for(let i=0;i<adminData.length; i++){
                if(adminData[i].isAdmin){
                    await mailSender(
                        adminData[i].email,
                        "New Free Trial Request",
                        adminNotificationMail(name, mobile_no, email, shedule_date, shedule_for, branch_name )
                    );
                }
            }
        }

        if(newContact){
            await mailSender(
                email, 
                "Thank You for Contacting Us",
                contactUsMail(name)
            );
            return res.status(200).json({
                success:true,
                message:'Submitted Sucessfully'
            })
        }

        res.status(300).json({
            success:false,
            message:'Not Submitted Sucessfully'
        })
    } catch(err){
        res.status(500).json({
            success:false,
            message:err.message
        })
    }
}

exports.sendResponse = async (req, res) => {
    try{
        const {client_id, message} = req.body; 
        if(message === ""){
            res.status(302).json({
                success:false,
                message:'please enter the message'
            })
        }

        if(client_id === ""){
            res.status(302).json({
                success:false,
                message:'something went wrong. please try again'
            })
        }

        const updateContact = await contact.findByIdAndUpdate(
            client_id,
            {$set: {response: message}},
            {new: true}
        )

        if(updateContact){
            await mailSender(
                updateContact.email,
                "Reply",
                customMessageMail(updateContact.name, "Reply for shedule", message)
            )
        }

        res.status(200).json({
            success:true,
            message:'sent message sucessfully'
        })

    } catch(err){
        res.status(500).json({
            success:false,
            message:err.message
        })
    }
}