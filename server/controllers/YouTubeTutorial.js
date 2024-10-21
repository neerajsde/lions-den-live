const ytLinks = require('../model/tutorials/tutorial');
const path = require('path');
const fs = require('fs');

exports.addNewYTLink = async (req, res) => {
    try{
        const {title, description, link} = req.body;
        const banner = req.files?.banner;
        // Check for required fields
        const requiredFields = ['title','link', 'description' ];
        for (const field of requiredFields) {
            if (!req.body[field]) {
                return res.status(400).json({ success: false, message: `Please fill in the ${field}` });
            }
        }

        // Validate the program image
        if (!banner) {
            return res.status(400).json({ success: false, message: 'Please upload the youtube banner' });
        }
        // Define the directory where the file will be saved
        const uploadDir = path.join(__dirname, '..', 'ImagesFiles');
        
        // Check if the directory exists, if not, create it
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        // Create the file path where the image will be stored on the server
        const timestamp = Date.now();
        const ext = path.extname(banner.name);
        const imageName = `${timestamp}${ext}`;
        const serverFilePath = path.join(uploadDir, imageName);

        console.log("Image upload path:", serverFilePath);

        banner.mv(serverFilePath, (err) => {
            if (err) {
                console.error('Error while moving image:', err);
                // Send response and stop further execution
                return res.status(500).json({ success: false, message: 'Error while uploading image' });
            }
        });

        const newYtLink = new ytLinks({
            title, link, banner:`/files/${imageName}`, description
        })

        await newYtLink.save();
        return res.status(201).json({
            success: true,
            message: 'YouTube added successfully'
        });
    } catch(err){
        res.status(500).json({
            success:false,
            message:err.message
        })
    }
}

exports.getYTLinks = async (req, res) => {
    try {
        const findYTLink = await ytLinks.find().sort({ createdAt: -1 });
        
        if (!findYTLink || findYTLink.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No YouTube Links found'
            });
        }

        res.status(200).json({
            success: true,
            data: findYTLink,
            message: 'Fetched all YouTube links successfully'
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};