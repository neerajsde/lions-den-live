const Branch = require('../model/branch/branch');
const Schedule = require('../model/branch/branch-schedule'); 
const FeeStructure = require('../model/branch/branch-fee-stucture'); 
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

// Image uploader function
const imageUploader = async (imageFile, uploadDir, name) => {
    try {
        // Ensure the upload directory exists
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        // Generate a unique filename using a timestamp and the original extension
        const timestamp = Date.now();
        const ext = path.extname(imageFile.name);  // Get the file extension
        const imageName = `branch-${name}${timestamp}${ext}`;   
        const serverFilePath = path.join(uploadDir, imageName);

        console.log("Image upload path:", serverFilePath);

        imageFile.mv(serverFilePath, (err) => {
            if (err) {
                console.error('Error while moving image:', err);
                // Send response and stop further execution
                return res.status(500).json({ success: false, message: 'Error while uploading image' });
            }
        });

        return `/files/${imageName}`;

    } catch (err) {
        console.error('Error while uploading image:', err);
    }
};


exports.getBranches = async (req, res) => {
    try{
        const findAllBraches = await Branch.find()?.populate(['sechudles','feeStructure'])?.exec();
        if(!findAllBraches){
            return res.status(300).json({
                success:false,
                message:'empty branches'
            });
        }

        res.status(200).json({
            success:true,
            branches:findAllBraches,
            message:'Get all branches sucessfully'
        })
    } catch(err){
        res.status(500).json({
            success:false,
            message:err.message
        })
    }
}

exports.getBrancheByName = async (req, res) => {
    try{
        const {branchName} = req.params;

        const findAllBranch = await Branch.find();
        if(findAllBranch.length === 0){
            return res.status(300).json({
                success:false,
                message:'empty branches'
            });
        }
        let branchDetails;
        for(let i=0; i<findAllBranch.length; i++){
            const branch = findAllBranch[i];
            if(branch.name.replace(/\s+/g, '-').toLowerCase() === branchName){
                branchDetails = await Branch.findById(branch._id)?.populate(['sechudles','feeStructure'])?.exec();
                return res.status(200).json({
                    success:true,
                    data:branchDetails,
                    message:'Get branches details sucessfully'
                });
            }
        }

        if(!branchDetails){
            return res.status(300).json({
                success:false,
                message:'empty branches'
            });
        }
        
    } catch(err){
        res.status(500).json({
            success:false,
            message:err.message
        })
    }
}

exports.getBranchName = async (req, res) => {
    try{
        const { branchName } = req.params;
        const isBranch = await Branch.findOne({name:branchName}).populate('feeStructure')?.exec();
        if(!isBranch){
            return res.status(401).json({
                success:false,
                message:'Branch Not Found'
            })
        }
        else{
            return res.status(200).json({
                success:true,
                branch:isBranch,
                message:'Branch Data Fetched Successfully'
            })
        }
    } catch(err){
        res.status(500).json({
            success:false,
            message:err.message
        })
    }
}

exports.AddNewBranch = async (req, res) => {
    try {
        const { name, description, location, phone, email, location_url, feeStructure = [], schedules = [] } = req.body;
        
        // Check if all required fields are filled
        const isFilled = ['name', 'description', 'location', 'phone', 'email', 'location_url'];
        for (const item of isFilled) {
            if (!req.body[item]) {
                return res.status(402).json({
                    success: false,
                    message: `Please fill ${item}`
                });
            }
        }
        const mon_img = req.files?.mon_img;
        const tue_img = req.files?.tue_img;
        const wed_img = req.files?.wed_img;
        const thu_img = req.files?.thu_img;
        const fri_img = req.files?.fri_img;
        const sat_img = req.files?.sat_img;

        const isUpload = ['mon_img', 'tue_img', 'wed_img', 'thu_img', 'fri_img', 'sat_img'];
        for (const item of isUpload) {
            if (!req.files?.[item]) {
                return res.status(402).json({
                    success: false,
                    message: `Please upload ${item}_day`
                });
            }
        }

        const uploadDir = path.join(__dirname, '..', 'ImagesFiles');

        let monImgPath, tueImgPath, wedImgPath, thuImgPath, friImgPath, satImgPath;

        // Upload images, wrap in try-catch to catch upload errors
        try {
            monImgPath = await imageUploader(mon_img, uploadDir, name);
            tueImgPath = await imageUploader(tue_img, uploadDir, name);
            wedImgPath = await imageUploader(wed_img, uploadDir, name);
            thuImgPath = await imageUploader(thu_img, uploadDir, name);
            friImgPath = await imageUploader(fri_img, uploadDir, name);
            satImgPath = await imageUploader(sat_img, uploadDir, name);
        } catch (uploadError) {
            return res.status(500).json({
                success: false,
                message: 'Image upload failed',
                error: uploadError.message,
            });
        }

        // Validate feeStructure and schedules as arrays
        let parsedFeeStructure = [];
        let parsedSchedules = [];

        try {
            parsedFeeStructure = typeof feeStructure === 'string' ? JSON.parse(feeStructure) : feeStructure;
            parsedSchedules = typeof schedules === 'string' ? JSON.parse(schedules) : schedules;
        } catch (parseError) {
            return res.status(400).json({
                success: false,
                message: 'Invalid feeStructure or schedules format',
                error: parseError.message
            });
        }

        // Validate that feeStructure and schedules are indeed arrays
        if (!Array.isArray(parsedFeeStructure)) {
            return res.status(400).json({
                success: false,
                message: 'feeStructure must be an array'
            });
        }

        if (!Array.isArray(parsedSchedules)) {
            return res.status(400).json({
                success: false,
                message: 'schedules must be an array'
            });
        }

        // Create fee structure records
        const feeStructurePromises = parsedFeeStructure.map(async (fee) => {
            const newFeeStructure = new FeeStructure({
                package: fee.package,
                male: fee.male,
                female: fee.female,
                couple: fee.couple,
                kids: fee.kids
            });
            await newFeeStructure.save();
            return newFeeStructure._id;
        });
        const feeStructureIds = await Promise.all(feeStructurePromises);

        // Create schedule records with the array of times
        const schedulePromises = parsedSchedules.map(async (schedule) => {
            const newSchedule = new Schedule({
                day: schedule.day,
                times: schedule.times // Pass the array of time objects directly
            });
            await newSchedule.save();
            return newSchedule._id;
        });
        const scheduleIds = await Promise.all(schedulePromises);

        // Now create the Branch record with the references
        const newBranch = await Branch.create({
            name,
            description,
            location,
            phone,
            email,
            location_url,
            feeStructure: feeStructureIds,
            schedules: scheduleIds, // Fix typo here
            mon_img: monImgPath,
            tue_img: tueImgPath,
            wed_img: wedImgPath,
            thu_img: thuImgPath,
            fri_img: friImgPath,
            sat_img: satImgPath
        });

        // If the branch was created successfully
        if (newBranch) {
            return res.status(200).json({
                success: true,
                message: 'New branch created successfully',
                branch: newBranch
            });
        }

        res.status(401).json({
            success: false,
            message: 'Failed to create branch'
        });

    } catch (err) {
        // Handle any errors
        console.log(err.message)
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};


function isValidObjectId(id) {
    return mongoose.Types.ObjectId.isValid(id);
}

exports.removeBranch = async (req, res) => {
    try {
        const { branchId } = req.params;

        if(!isValidObjectId(branchId)){
            return res.status(402).json({
                success: false,
                message: 'Invaild Branch Id'
            });
        }

        // Find the branch to get the references
        const branch = await Branch.findById(branchId);
        if (!branch) {
            return res.status(404).json({
                success: false,
                message: 'Branch not found'
            });
        }

        // Remove associated fee structure entries
        if (branch.feeStructure && branch.feeStructure.length > 0) {
            await FeeStructure.deleteMany({ _id: { $in: branch.feeStructure } });
        }

        // Remove associated schedule entries
        if (branch.sechudles && branch.sechudles.length > 0) {
            await Schedule.deleteMany({ _id: { $in: branch.sechudles } });
        }

        // Finally, remove the branch itself
        await Branch.findByIdAndDelete(branchId);

        return res.status(200).json({
            success: true,
            message: 'Branch removed successfully'
        });

    } catch (err) {
        // Handle any errors
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};


exports.updateBranch = async (req, res) => {
    try {
        const { id, name, description, location, phone, email, location_url } = req.body;

        // Check if id is provided and is a valid ObjectId
        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid or missing branch ID',
            });
        }

        // Check if all required fields are filled
        const requiredFields = ['name', 'description', 'location', 'phone', 'email', 'location_url'];
        for (const field of requiredFields) {
            if (!req.body[field]) {
                return res.status(400).json({
                    success: false,
                    message: `Please fill the ${field}`,
                });
            }
        }

        // Update the branch
        const updatedBranch = await Branch.findByIdAndUpdate(
            id,
            { name, description, location, phone, email, location_url },
            { new: true }
        );

        // Check if branch was found and updated
        if (!updatedBranch) {
            return res.status(404).json({
                success: false,
                message: 'Branch not found',
            });
        }

        // Success response
        res.status(200).json({
            success: true,
            message: 'Branch updated successfully',
            data: updatedBranch,
        });
    } catch (err) {
        // Catch internal server errors
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};

exports.updateFeeStructure = async (req, res) => {
    try {
        const { id, package, male, female, couple, kids } = req.body;

        // Check if all fields are provided
        if (!id || !package || male === undefined || female === undefined || couple === undefined || kids === undefined) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            });
        }

        // Find the fee structure by id
        const findFeeStructure = await FeeStructure.findById(id);

        // If the fee structure is not found
        if (!findFeeStructure) {
            return res.status(404).json({
                success: false,
                message: 'Fee Structure not found'
            });
        }

        // Update the fee structure
        const updatedFeeStructure = await FeeStructure.findByIdAndUpdate(
            id,
            { package, male, female, couple, kids }, // Directly passing the fields
            { new: true }
        );

        // Respond with the updated data
        res.status(200).json({
            success: true,
            message: 'Updated Successfully',
            data: updatedFeeStructure // Sending back the updated fee structure
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

// Update TimeTable Image
exports.updateTimeTableImg = async (req, res) => {
    try {
        const { id, name } = req.body;
        const img = req.files ? req.files[name] : null;

        // Find the branch by ID
        const findBranch = await Branch.findById(id);

        // If the branch is not found
        if (!findBranch) {
            return res.status(404).json({
                success: false,
                message: 'Branch not found'
            });
        }

        // Validate the image
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

        // Move the image to the server's files directory
        await img.mv(serverFilePath);

        // Update the branch with the new image path
        await Branch.findByIdAndUpdate(
            id,
            { $set: { [name]: `/files/${imageName}` } },
            { new: true }
        );

        // Send success response
        res.status(200).json({
            success: true,
            message: 'Uploaded Successfully'
        });
    } catch (err) {
        console.error('Error:', err.message);
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};