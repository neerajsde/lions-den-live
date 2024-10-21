const mongoose = require('mongoose');

const createBlogPost = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    title:{
        type:String
    },
    description:{
        type:String
    },
    tags:{
        type:String,
        default:''
    },
    img:{
        type:String,
        default:''
    },
    isPublish:{
        type:Boolean,
        default: false
    },
    likes:[
        {type: mongoose.Schema.Types.ObjectId, ref:'like'}
    ],
    comments:[
        {type: mongoose.Schema.Types.ObjectId, ref:'comment'}
    ],
    createdAt:{
        type:Date,
        default:Date.now
    }
});

module.exports = mongoose.model('blog', createBlogPost);