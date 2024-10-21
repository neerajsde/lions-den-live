const mongoose = require('mongoose');

const createNewAdmin = new mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    token:{
        type:String,
        default:''
    },
    img:{
        type:String
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
});

module.exports = mongoose.model('admin', createNewAdmin);