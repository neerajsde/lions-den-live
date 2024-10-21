const user = require('../model/users/user');
const blog = require('../model/blog/blog');
const { userSignupMail } = require('../mail/user/SignUpMail');
const { blogSubmissionMail } = require('../mail/user/BlogApproval');
const mailSender = require('../utils/mailSender');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

exports.createNewBlogPost = async (req, res) => {
    try {
        const { name, email, title, description, tags } = req.body;
        const img = req.files?.img;

        // Check for required fields
        const requiredFields = ['name', 'email', 'title', 'description'];
        for (const field of requiredFields) {
            if (!req.body[field]) {
                return res.status(400).json({ success: false, message: `Please fill in the ${field}` });
            }
        }

        const findUser = await user.findOne({ email });
        let userData = null;
        if (findUser) {
            userData = findUser;
        } else {
            userData = await user.create({ name, email, img:`https://api.dicebear.com/5.x/initials/svg?seed=${name}` });
            await mailSender(
                userData.email,
                "Thanks For Writing a Blog",
                userSignupMail(name, email)
            );
        }

        let imageName = "";
        if (img) {
            const uploadDir = path.join(__dirname, '..', 'BlogImages');

            // Check if the directory exists, if not, create it
            if (!fs.existsSync(uploadDir)) {
                fs.mkdirSync(uploadDir, { recursive: true });
            }

            const timestamp = Date.now();
            const ext = path.extname(img.name);
            imageName = `${timestamp}${ext}`;
            const serverFilePath = path.join(uploadDir, imageName);

            console.log("Image upload path:", serverFilePath);

            const moveFile = (file, dest) => {
                return new Promise((resolve, reject) => {
                    file.mv(dest, (err) => {
                        if (err) return reject(err);
                        resolve();
                    });
                });
            };

            try {
                await moveFile(img, serverFilePath);
            } catch (err) {
                console.error('Error while moving image:', err);
                return res.status(500).json({ success: false, message: 'Error while uploading image' });
            }
        }

        const newBlog = new blog({
            user: userData._id,
            title,
            description,
            tags,
            img: imageName === "" ? "" : `/files/${imageName}`
        });
        await newBlog.save();

        await mailSender(
            process.env.ADMIN_EMAIL,
            "New Blog Approval",
            blogSubmissionMail(userData.name, title, description, `${process.env.WEB_URL}/admin-dashboard`)
        );

        return res.status(201).json({
            success: true,
            message: 'Blog added successfully'
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

exports.getBlogs = async (req, res) => {
    try {
        const allBlogs = await blog.find().sort({ createdAt: -1 });

        if (!allBlogs || allBlogs.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No blogs available'
            });
        }

        // Transform blogs to include the author's name
        const blogsWithAuthors = await Promise.all(
            allBlogs.map(async (blog) => {
                const findUserName = await user.findById(blog.user); // Fetch user info
                const currBlog = blog.toObject(); // Convert Mongoose document to plain JS object
                currBlog.author = findUserName.name; // Add author field
                return currBlog;
            })
        );

        res.status(200).json({
            success: true,
            blogs: blogsWithAuthors,  // Return all blogs, latest one on top
            message: 'All blogs retrieved successfully'
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

exports.deleteBlogPost = async (req, res) => {
    try {
        const { blogId } = req.params;

        // Find the blog by ID
        const findBlog = await blog.findById(blogId);

        if (!findBlog) {
            return res.status(404).json({ success: false, message: 'Blog not found' });
        }

        // If the blog has an image, delete it from the server
        if (findBlog.img) {
            const imagePath = path.join(__dirname, '..', findBlog.img);
            fs.unlink(imagePath, (err) => {
                if (err) {
                    console.error('Error while deleting image:', err);
                }
            });
        }

        // Remove the blog from the database
        await blog.findByIdAndDelete(blogId);

        return res.status(200).json({
            success: true,
            message: 'Blog deleted successfully'
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

exports.publishBlog = async (req, res) => {
    try{
        const { blogId } = req.params;

        // Find the blog by ID
        const findBlog = await blog.findById(blogId);

        if (!findBlog) {
            return res.status(404).json({ success: false, message: 'Blog not found' });
        }

        await blog.findByIdAndUpdate(
            blogId,
            {$set: {isPublish: true}},
            {new: true}
        );

        return res.status(200).json({
            success: true,
            message: 'Blog published successfully'
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
}


exports.editBlogPost = async (req, res) => {
    try{
        const { blogId, title, description, tags } = req.body;

        // Find the blog by ID
        const findBlog = await blog.findById(blogId);

        if (!findBlog) {
            return res.status(404).json({ success: false, message: 'Blog not found' });
        }

        await blog.findByIdAndUpdate(
            blogId,
            {$set: { title, description, tags}},
            {new: true}
        );

        return res.status(200).json({
            success: true,
            message: 'Blog updated successfully'
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
}


exports.getAllBlogsWithMoreInfo = async (req, res) => {
    try {
        const allBlogs = await blog.find().sort({ createdAt: -1 }).populate('user');

        if (!allBlogs || allBlogs.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No blogs available'
            });
        }

        res.status(200).json({
            success: true,
            blogs: allBlogs,
            message: 'All blogs retrieved successfully'
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};
