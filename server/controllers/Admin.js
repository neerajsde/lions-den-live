const admin = require('../model/admin/admin');
const bcrypt = require('bcryptjs'); 

exports.updateAdminToAdd = async (req, res) => {
    try{
        const { id, password, email } = req.body;
        const currAdmin = await admin.findById(id);
        if (password === "") {
            return res.status(401).json({
                success: false,
                message: "Please enter password"
            });
        }

        if (!currAdmin) {
            return res.status(401).json({
                success: false,
                message: "Something went wrong. try some time later"
            });
        }

        try {
            const isVaildPass = await bcrypt.compare(password, currAdmin.password);
            if (!isVaildPass) {
                return res.status(401).json({
                    success: false,
                    message: "Wrong password"
                });
            }
        } catch (err) {
            return res.status(500).json({
                success: false,
                message: "Something went wrong"
            });
        }

        if (email === "") {
            return res.status(401).json({
                success: false,
                message: "Please enter email"
            });
        }

        const isFind = await admin.findOne({email});
        if(!isFind || isFind.length === 0){
            return res.status(404).json({
                success:false,
                message:'Admin user not found'
            })
        }
        else{
            if(currAdmin.isAdmin === true){
                await admin.findByIdAndUpdate(
                    isFind._id,
                    {isAdmin : true},
                    {new: true}
                );
    
                return res.status(200).json({
                    success:true,
                    message:'Admin updated..'
                })
            }
            return res.status(200).json({
                success:false,
                message:'unvaild admin'
            })
        }
    } catch(err){
        res.status(500).json({
            success:false,
            message:err.message
        })
    }
}

exports.getAdminDetails = async (req, res) => {
    try {
        const { token } = req.body;

        const adminData = await admin.find({ token });

        // Check if admin data was found
        if (!adminData || adminData.length === 0) {
            return res.status(301).json({
                success: false,
                message: 'Token not valid'
            });
        }

        // Remove sensitive fields from the admin data
        const adminDetails = { ...adminData[0]._doc };  // Access the document properties
        delete adminDetails.password;
        delete adminDetails.token;
        delete adminDetails.createdAt;
        delete adminDetails.isAdmin;

        // Send a successful response with the admin data
        res.status(200).json({
            success: true,
            adminData: adminDetails,
            message: 'Admin data fetched'
        });
    } catch (err) {
        // Handle errors and return a 500 response
        res.status(500).json({
            success: false,
            message: err.message // Fix typo here
        });
    }
};