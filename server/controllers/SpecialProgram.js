const SpecialPrograms = require('../model/special-programs/programs');
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');

exports.getAllSpecialProgram = async (req, res) => {
    try{
        const findAllSpecialProgram = await SpecialPrograms.find();
        if(!findAllSpecialProgram || findAllSpecialProgram.length === 0){
            return res.status(404).json({
                success:false,
                message:'Empty Coach'
            })
        }

        res.status(200).json({
            success:true,
            data:findAllSpecialProgram,
            message:'Get All special program details'
        })
    } catch(err){
        res.status(500).json({
            success:false,
            message:err.message
        })
    }
}

exports.AddSpecialProgram = async (req, res) => {
    try{
        const {name, description} = req.body;
        const img = req.files?.img; 
        // Check for required fields
        const requiredFields = ['name','description' ];
        for (const field of requiredFields) {
            if (!req.body[field]) {
                return res.status(400).json({ success: false, message: `Please fill in the ${field}` });
            }
        }

        // Validate the program image
        if (!img) {
            return res.status(400).json({ success: false, message: 'Please upload the program image' });
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

        const newSpecialProgram = new SpecialPrograms({
            name, img:`/files/${imageName}`, description
        })

        await newSpecialProgram.save();
        return res.status(201).json({
            success: true,
            message: 'Special program added successfully'
        });
    } catch(err){
        res.status(500).json({
            success:false,
            message:err.message
        })
    }
}

function isValidObjectId(id) {
    return mongoose.Types.ObjectId.isValid(id);
}

exports.removeSpecialProgram = async (req, res) => {
    try {
        const {programId} = req.params;

        if(!isValidObjectId(programId)){
            return res.status(402).json({
                success: false,
                message: 'Invaild Program Id'
            });
        }

        const program = await SpecialPrograms.findById(programId);

        if (!program) {
            return res.status(404).json({ success: false, message: 'Program not found' });
        }

        // Define the path of the coach image on the server
        const imageFilePath = path.join(__dirname, '..', 'ImagesFiles', path.basename(program.img));

        // Check if the image file exists and remove it
        if (fs.existsSync(imageFilePath)) {
            fs.unlinkSync(imageFilePath); 
        } else {
            console.warn('Coach image not found on server, skipping file deletion');
        }

        // Remove the coach record from the database
        await SpecialPrograms.findByIdAndDelete(programId);

        return res.status(200).json({
            success: true,
            message: 'Special program removed successfully'
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
