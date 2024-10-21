const express = require('express');
const router = express.Router();

const { auth } = require('../middleware/auth')
const { getWebData, updateWebData, addWebData } = require('../controllers/WebData');
const { addNewYTLink, getYTLinks } = require('../controllers/YouTubeTutorial');
const { getAdminDetails, updateAdminToAdd } = require('../controllers/Admin');
const { adminLogin, sendOtpOnMail } = require('../controllers/AdminLogIn');
const { createNewAdmin } = require('../controllers/AdminSignup');
const { getBranches,getBrancheByName, AddNewBranch, removeBranch, getBranchName, updateBranch, updateFeeStructure, updateTimeTableImg } = require('../controllers/Branch');
const { SubmitConatctForm, sendResponse } = require('../controllers/Contact');
const { addServices, deleteService, getServices, getServicesById, getServicesForDB, updateServices, upadateBenefits, updateClassLevelHandler } = require('../controllers/Services');
const { getContactDetails } = require('../controllers/Contact');
const { createCoachMember, getAllCoach, removeCoach, getCoachName, updateCoach } = require('../controllers/Coach');
const { getAllSpecialProgram, AddSpecialProgram , removeSpecialProgram} = require('../controllers/SpecialProgram');
const { getBlogs, createNewBlogPost, deleteBlogPost, publishBlog, editBlogPost, getAllBlogsWithMoreInfo } = require('../controllers/Blog');

router.put('/update-webdata',auth, updateWebData);
router.get('/get-webdata', auth, getWebData);
router.post('/add-webdata', addWebData);
router.post('/admin-login', adminLogin);
router.post('/admin-signup', createNewAdmin);
router.put('/update-admin', auth, updateAdminToAdd);
router.post('/send-otp', sendOtpOnMail);
// YouTube Link
router.post('/addYouTubeLink', auth, addNewYTLink);
router.get('/youtube', getYTLinks);
// branch
router.get('/get-branch', getBranches);
router.post('/branch-add', auth,  AddNewBranch);
router.post('/branch-update', auth, updateBranch);
router.delete('/branch/:branchId', removeBranch);
router.get('/branch/:branchName', getBranchName);
router.get('/getBranchByName/:branchName', getBrancheByName);
router.put('/update/branch/feestructure', updateFeeStructure);
router.put('/update/feestructure-img', updateTimeTableImg);
// services
router.post('/services-add', auth, addServices);
router.delete('/services/:serviceId', deleteService);
router.get('/get-services', getServices);
router.get('/servicesByName/:servicesName', getServicesById);
router.get('/services/getById/:serviceId', getServicesForDB);
router.put('/services/update', auth, updateServices);
router.put('/services/benfit/update', auth, upadateBenefits);
router.put('/services/classLevel/update', auth, updateClassLevelHandler);
// contact 
router.get('/contact-get', auth, getContactDetails);
router.post('/contact/submit', SubmitConatctForm);
router.put('/send-response', sendResponse);
// coach
router.post('/coach-add',auth, createCoachMember);
router.put('/coach-update', auth, updateCoach);
router.get('/coach/:coachName', getCoachName);
router.get('/get-coach', getAllCoach)
router.delete('/coach/:coachId', removeCoach);
// special program
router.post('/sp-program/add', auth, AddSpecialProgram);
router.get('/get-sp-programs', getAllSpecialProgram);
router.delete('/sp-program-delete/:programId', removeSpecialProgram);
// Blog
router.get('/blogs', getBlogs);
router.get('/all-blogs', getAllBlogsWithMoreInfo);
router.post('/blog/create', createNewBlogPost);
router.delete('/blogs/:blogId', deleteBlogPost);
router.put('/blogs/:blogId', publishBlog);
router.put('/blog/update', auth, editBlogPost);

router.post('/dashboard', auth, getAdminDetails);

router.get('/', (req, res) => {
    res.status(200).json({
        success:true,
        messgae:'testing perpose'
    })
})

module.exports = router;