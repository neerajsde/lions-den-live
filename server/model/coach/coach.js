const mongoose = require('mongoose');

const createNewCoach = new mongoose.Schema({
    name:{
        type:String
    },
    phone:{
        type:String
    },
    email:{
        type:String
    },
    profession:{
        type:String
    },
    description:{
        type:String,
        default:''
    },
    img:{
        type:String,
        default:''
    },
    facebookUrl:{
        type:String,
        default:''
    },
    instagramUrl:{
        type:String,
        default:''
    },
    twitterUrl:{
        type:String,
        default:''
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
});

module.exports = mongoose.model('coach', createNewCoach);