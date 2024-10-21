const mongoose = require('mongoose');

const createNewUser = new mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type: String,
        default:""
    },
    token:{
        type:String,
        default:''
    },
    phone:{
        type:String,
        default:''
    },
    img:{
        type:String,
        default:''
    },
    noOfBlogsAdded:{
        type:Number,
        default:0
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
});

module.exports = mongoose.model('user', createNewUser);