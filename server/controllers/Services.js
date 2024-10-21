const Services = require('../model/service/services');
const Benefit = require('../model/service/benefits');
const path = require('path');
const fs = require('fs'); // File system module
const mongoose = require('mongoose')


exports.getServices = async (req, res) => {
    try{
        const findAllServices = await Services.find().populate('benefits').exec();
        if(!findAllServices){
            return res.status(300).json({
                success:false,
                message:'empty Services'
            });
        }

        res.status(200).json({
            success:true,
            services:findAllServices,
            message:'Get all sevices sucessfully'
        })
    } catch(err){
        res.status(500).json({
            success:false,
            message:err.message
        })
    }
}

exports.getServicesById = async (req, res) => {
    try{
        const {servicesName} = req.params;

        const findAllServices = await Services.find();
        if(findAllServices.length === 0){
            return res.status(300).json({
                success:false,
                message:'empty services'
            });
        }
        let servicesDetails;
        for(let i=0; i<findAllServices.length; i++){
            const service = findAllServices[i];
            if(service.name.replace(/\s+/g, '-').toLowerCase() === servicesName){
                servicesDetails = await Services.findById(service._id)?.populate('benefits')?.exec();
                return res.status(200).json({
                    success:true,
                    data:servicesDetails,
                    message:'Get services details sucessfully'
                });
            }
        }
        if(!servicesDetails){
            return res.status(200).json({
                success:false,
                message:'Not Found'
            })
        }

    } catch(err){
        res.status(500).json({
            success:false,
            message:err.message
        })
    }
}

exports.addServices = async (req, res) => {
    try {
        // Destructure fields from request body and parse JSON strings
        const { name, title, offer, program_title, program_desc } = req.body;
        const desc1 = JSON.parse(req.body.desc1 || '{}');
        const desc2 = JSON.parse(req.body.desc2 || '{}');
        const benefits = JSON.parse(req.body.benefits || '[]');
        const classLevel = JSON.parse(req.body.classLevel || '[]');
        
        const program_img = req.files?.program_img; 

        // Check for required fields
        const requiredFields = ['name', 'title', 'offer', 'program_title', 'program_desc'];
        for (const field of requiredFields) {
            if (!req.body[field]) {
                return res.status(400).json({ success: false, message: `Please fill in the ${field}` });
            }
        }

        // Validate the program image
        if (!program_img) {
            return res.status(400).json({ success: false, message: 'Please upload the program image' });
        }

        // Ensure `benefits` is an array of valid benefit objects and create new ones
        const benefitDocs = await Promise.all(
            benefits.map(async (benefit) => {
                const newBenefit = new Benefit({
                    heading: benefit.heading,
                    description: benefit.description
                });
                await newBenefit.save();
                return newBenefit._id;
            })
        );

        // Define the directory where the file will be saved
        const uploadDir = path.join(__dirname, '..', 'ImagesFiles');
        
        // Check if the directory exists, if not, create it
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        // Create the file path where the image will be stored on the server
        const timestamp = Date.now();
        const ext = path.extname(program_img.name);
        const imageName = `${timestamp}${ext}`;
        const serverFilePath = path.join(uploadDir, imageName);

        console.log("Image upload path:", serverFilePath);

        // Move the image to the server's files directory
        program_img.mv(serverFilePath, (err) => {
            if (err) {
                console.error('Error while moving image:', err);
                // Send response and stop further execution
                return res.status(500).json({ success: false, message: 'Error while uploading image' });
            }
        });

        // Create a new service object
        const newService = new Services({
            name,
            title,
            offer,
            program_title,
            program_desc,
            program_img: `/files/${imageName}`, // Save the relative path for serving image
            desc1: {
                header: desc1.header || '',
                paragraph: desc1.paragraph || ''
            },
            desc2: {
                header: desc2.header || '',
                paragraph: desc2.paragraph || ''
            },
            benefits: benefitDocs, // Array of benefit IDs
            classLevel: Array.isArray(classLevel) ? classLevel : [] // Ensure classLevel is an array
        });

        // Save the service to the database
        await newService.save();

        // Send success response
        return res.status(201).json({
            success: true,
            message: 'Service added successfully'
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: error.message,
            error: error.message
        });
    }
};

function isValidObjectId(id) {
    return mongoose.Types.ObjectId.isValid(id);
}

exports.deleteService = async (req, res) => {
    try {
        const {serviceId} = req.params; // Get the service ID from request params

        if(!isValidObjectId(serviceId)){
            return res.status(402).json({
                success: false,
                message: 'Invaild Sevices Id'
            });
        }

        console.log("Servivces Id: ", serviceId)

        // Find the service by ID
        const service = await Services.findById(serviceId);

        // If service not found, return an error response
        if (!service) {
            return res.status(404).json({
                success: false,
                message: 'Service not found'
            });
        }

        // Get the file path of the program image from the server
        const programImagePath = path.join(__dirname, '..', 'ImagesFiles', path.basename(service.program_img));

        // Check if the program image exists and delete it from the server
        if (fs.existsSync(programImagePath)) {
            fs.unlinkSync(programImagePath); // Delete the file
            console.log(`Deleted image file: ${programImagePath}`);
        }

        // Delete the service from the database
        await Services.findByIdAndDelete(serviceId);

        // Send success response
        return res.status(200).json({
            success: true,
            message: 'Service deleted successfully'
        });

    } catch (error) {
        console.error('Error deleting service:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};


// get by services id
exports.getServicesForDB = async (req, res) => {
    try{
        const {serviceId} = req.params;

        const findServices = await Services.findById(serviceId)?.populate('benefits').exec();
        if(!findServices){
            return res.status(300).json({
                success:false,
                message:'Not Found services'
            });
        }
        else{
            res.status(200).json({
                success: true,
                data:findServices,
                message:'Get Data Sucessfully'
            })
        }
    } catch(err){
        res.status(500).json({
            success: false,
            message:err.message
        })
    }
}

exports.updateServices = async (req, res) => {
    try{
        const {id, name, program_title, program_desc, h_1, desc_1, h_2, desc_2} = req.body;

        const findServices = await Services.findById(id);
        if(!findServices){
            return res.status(300).json({
                success:false,
                message:'Not Found Services'
            });
        }
        // Check for required fields
        const requiredFields = ['name', 'program_title', 'program_desc'];
        for (const field of requiredFields) {
            if (!req.body[field]) {
                return res.status(400).json({ success: false, message: `Please fill in the ${field}` });
            }
        } 

        const upadatedDetails = await Services.findByIdAndUpdate(
            id,
            {
                $set: {
                    name:name,
                    program_title:program_title,
                    program_desc: program_desc,
                    desc1:{
                        header: h_1,
                        paragraph: desc_1
                    },
                    desc2:{
                        header: h_2,
                        paragraph: desc_2
                    }
                }
            },
            {new: true}
        )
        res.status(200).json({
            success: true,
            message:'Updated Sucessfully'
        })
    } catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

exports.upadateBenefits = async (req, res) => {
    try{
        const {id, heading, description} = req.body;

        const findBenefit = await Benefit.findById(id);
        if(!findBenefit){
            return res.status(300).json({
                success:false,
                message:'Not Found'
            });
        }
        // Check for required fields
        const requiredFields = ['heading', 'description'];
        for (const field of requiredFields) {
            if (!req.body[field]) {
                return res.status(400).json({ success: false, message: `Please fill in the ${field}` });
            }
        } 

        await Benefit.findByIdAndUpdate(
            id,
            {
                $set:{
                    heading:heading,
                    description: description
                }
            },
            {new: true}
        );

        res.status(200).json({
            success: true,
            message:'Updated Benefit Details'
        })
    } catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}


exports.updateClassLevelHandler = async (req, res) => {
    try {
        const { id, level, content = [], index } = req.body;
        
        const findServices = await Services.findById(id);
        if (!findServices) {
            return res.status(404).json({
                success: false,
                message: 'Service not found'
            });
        }

        // Check for required fields
        if (!level) {
            return res.status(400).json({
                success: false,
                message: 'Please provide the level'
            });
        }

        // Use dot notation to update the classLevel array at the specified index
        const updateQuery = {};
        updateQuery[`classLevel.${index}`] = { level, content };

        const updatedService = await Services.findByIdAndUpdate(
            id,
            { $set: updateQuery },
            { new: true }
        );

        if (!updatedService) {
            return res.status(500).json({
                success: false,
                message: 'Error updating the service'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Updated successfully',
            data: updatedService
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};
