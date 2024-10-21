const webData = require('../model/admin/BasicDetail');

function validateEmail(email) {
    // Regular expression to validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    // Test the email against the regular expression
    return emailRegex.test(email);
}

exports.updateWebData = async (req, res) => {
    try{
        const {id, phone, email, address} = req.body;

        if(!validateEmail(email)){
            return res.status(400).json({
                success:false,
                message:'incorrect email'
            })
        }

        if(email === ""){
            return res.status(401).json({
                success:false,
                message:'Please enter admin email'
            })
        }

        await webData.findByIdAndUpdate(
            id,
            {$set: {phone, email, address}},
            {new: true}
        );


        res.status(200).json({
            success:true,
            message:'Website contact data updated sucessfully'
        })
    } catch(err){
        res.status(500).json({
            success:false,
            message:err.message
        })
    }
}

exports.addWebData = async (req, res) => {
    try{
        const {phone, email, address} = req.body;

        await webData.create({phone, email, address});

        res.status(200).json({
            success:true,
            message:'Website contact data added sucessfully'
        })
    } catch(err){
        res.status(500).json({
            success:false,
            message:err.message
        })
    }
}

exports.getWebData = async (req, res) => {
    try{
        const webdata = await webData.find();

        if(!webdata || webdata.length === 0){
            return res.status(400).json({
                success:false,
                message:'Not FOund'
            })
        }

        res.status(200).json({
            success: true,
            webdata:webdata[0],
            message:'Get Web Contact Data Sucessfully'
        })
    } catch(err){
        res.status(500).json({
            success:false,
            message:err.message
        })
    }
}