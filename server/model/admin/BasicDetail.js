const mongoose = require('mongoose');

const createContactData = new mongoose.Schema({
    phone:{
        type:String
    },
    email:{
        type:String
    },
    address:{
        type:String
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
});

module.exports = mongoose.model('web-data', createContactData);