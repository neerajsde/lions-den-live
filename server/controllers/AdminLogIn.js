const admin = require('../model/admin/admin');
const bcrypt = require('bcryptjs'); // Ensure bcrypt is required
const jwt = require('jsonwebtoken');
const {sendOtpVerificationMail} = require('../mail/templates/SendOtpMail');
const mailSender = require('../utils/mailSender');

function validateEmail(email) {
    // Regular expression to validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    // Test the email against the regular expression
    return emailRegex.test(email);
}

exports.adminLogin = async (req, res) => {
    try{
        const {email, password} = req.body;

        if (!validateEmail(email)) {
            return res.status(400).json({
                success: false,
                tag: 'email',
                message: "Invalid email ID"
            });
        }

        const isUserPersent = await admin.findOne({ email });
        if (!isUserPersent) {
            return res.status(401).json({
                success: false,
                tag: 'email',
                message: "Admin not found."
            });
        }

        try {
            const isVaildPass = await bcrypt.compare(password, isUserPersent.password);
            if (!isVaildPass) {
                return res.status(401).json({
                    success: false,
                    tag: 'password',
                    message: "Wrong password"
                });
            }
        } catch (err) {
            return res.status(500).json({
                success: false,
                tag: 'error',
                message: "Something went wrong"
            });
        }

        if(!isUserPersent.isAdmin){
            console.log('💠',email,' - try to login in');
            return res.status(300).json({
                success:false,
                tag:'notAdmin',
                message:'You are not admin'
            })
        }

        const payload = {
            id: isUserPersent._id,
            name: isUserPersent.name,
            email: isUserPersent.email,
        }

        let token = jwt.sign(
            payload,
            process.env.JWT_SECRET,
            {
                expiresIn: "10d"
            }
        );

        const setToken = await admin.findByIdAndUpdate(
            isUserPersent._id,
            { token: token},
            { new: true}
        );

        // Cookies
        const options = {
            expires: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
            httpOnly: true,
        };
        res.cookie("lionDen", token, options);
        res.status(200).json({ 
            success: true, 
            token,
            admin: isUserPersent.isAdmin,
            admin_id:isUserPersent._id,
            message: 'Admin Logged In successfully' 
        });
        console.log("Admin Logged In Sucecessfully: user- ",isUserPersent.email);

    } catch(err){
        res.status(500).json({
            success:false,
            message:err.message
        })
    }
}

function generateHardPassword(length = 6) {
    const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lower = 'abcdefghijklmnopqrstuvwxyz';
    const digits = '123456789';

    const allCharacters = upper + lower + digits;
    let password = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * allCharacters.length);
        password += allCharacters[randomIndex];
    }

    return password;
}

exports.sendOtpOnMail = async(req, res) => {
    try{
        const {user_id} = req.body;
        const exitsUser = await admin.findById(user_id);

        if(!exitsUser){
            return res.status(300).json({
                success:false,
                tag:'otp',
                message:'admin not exits'
            });
        }

        if(exitsUser.isAdmin){
            const otpCode = generateHardPassword();
            await mailSender(
                exitsUser.email, 
                "OTP Verification for Your Login Attempt",
                sendOtpVerificationMail(exitsUser.name, otpCode)
            );    
            return res.status(200).json({
                success:true,
                message:'Otp sent sucessfully',
                otp:otpCode,
            });
        } 
        else{
            return new Error('user not vaild');
        }
    } catch(err){
        res.status(500).json({
            success:false,
            tag:'error',
            message:err.message
        })
    }
}