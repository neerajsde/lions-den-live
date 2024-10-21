const Coach  = require('../model/coach/coach');
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');

exports.getAllCoach = async (req, res) => {
    try{
        const findAllCoach = await Coach.find();
        if(!findAllCoach || findAllCoach.length === 0){
            return res.status(404).json({
                success:false,
                message:'Empty Coach'
            })
        }

        res.status(200).json({
            success:true,
            data:findAllCoach,
            message:'Get All coach details'
        })
    } catch(err){
        res.status(500).json({
            success:false,
            message:err.message
        })
    }
}

exports.getCoachName = async (req, res) => {
    try{
        const { coachName } = req.params;
        const isCoach = await Coach.findOne({name:coachName});
        if(!isCoach){
            return res.status(401).json({
                success:false,
                message:'Coach Not Found'
            })
        }
        else{
            return res.status(200).json({
                success:true,
                data:isCoach,
                message:'Coach Data Fetched Successfully'
            })
        }
    } catch(err){
        res.status(500).json({
            success:false,
            message:err.message
        })
    }
}

exports.createCoachMember = async (req, res) => {
    try{
        const {name, phone, email, profession, description, facebookUrl, instagramUrl, twitterUrl} = req.body;
        const img = req.files?.img; 

        // Check for required fields
        const requiredFields = ['name','phone', 'email', 'profession' ];
        for (const field of requiredFields) {
            if (!req.body[field]) {
                return res.status(400).json({ success: false, message: `Please fill in the ${field}` });
            }
        }

        // Validate the program image
        if (!img) {
            return res.status(400).json({ success: false, message: 'Please upload the coach image' });
        }
        // Define the directory where the file will be saved
        const uploadDir = path.join(__dirname, '..', 'ImagesFiles');
        
        // Check if the directory exists, if not, create it
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        // Create the file path where the image will be stored on the server
        const timestamp = Date.now();
        const ext = path.extname(img.name);
        const imageName = `${timestamp}${ext}`;
        const serverFilePath = path.join(uploadDir, imageName);

        console.log("Image upload path:", serverFilePath);

        img.mv(serverFilePath, (err) => {
            if (err) {
                console.error('Error while moving image:', err);
                // Send response and stop further execution
                return res.status(500).json({ success: false, message: 'Error while uploading image' });
            }
        });

        const newCoach = new Coach({
            name, phone, email, profession, img:`/files/${imageName}`, description, facebookUrl, instagramUrl, twitterUrl
        })

        await newCoach.save();
        return res.status(201).json({
            success: true,
            message: 'Coach added successfully'
        });
    } catch(err){
        console.error(err);
        return res.status(500).json({
            success: false,
            message: err.message,
            error: err.message
        });
    }
}

function isValidObjectId(id) {
    return mongoose.Types.ObjectId.isValid(id);
}

exports.removeCoach = async (req, res) => {
    try {
        const {coachId} = req.params;

        if(!isValidObjectId(coachId)){
            return res.status(402).json({
                success: false,
                message: 'Invaild Coach Id'
            });
        }

        // Find the coach by ID
        const coach = await Coach.findById(coachId);

        if (!coach) {
            return res.status(404).json({ success: false, message: 'Coach not found' });
        }

        // Define the path of the coach image on the server
        const imageFilePath = path.join(__dirname, '..', 'ImagesFiles', path.basename(coach.img));

        // Check if the image file exists and remove it
        if (fs.existsSync(imageFilePath)) {
            fs.unlinkSync(imageFilePath); // Deletes the file from the server
        } else {
            console.warn('Coach image not found on server, skipping file deletion');
        }

        // Remove the coach record from the database
        await Coach.findByIdAndDelete(coachId);

        return res.status(200).json({
            success: true,
            message: 'Coach removed successfully'
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: err.message,
            error: err.message
        });
    }
};


exports.updateCoach = async (req, res) => {
    try {
        const { id, name, phone, email, profession, description, facebookUrl, instagramUrl, twitterUrl } = req.body;

        // Check if id is provided and is a valid ObjectId
        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid or missing coach ID',
            });
        }

        // Update the branch
        const updatedCoach = await Coach.findByIdAndUpdate(
            id,
            { name, phone, email, profession, description, facebookUrl, instagramUrl, twitterUrl },
            { new: true }
        );

        // Check if branch was found and updated
        if (!updatedCoach) {
            return res.status(404).json({
                success: false,
                message: 'Coach not found',
            });
        }

        // Success response
        res.status(200).json({
            success: true,
            message: 'Coach details updated successfully'
        });
    } catch (err) {
        // Catch internal server errors
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};
