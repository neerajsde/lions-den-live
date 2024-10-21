const mongoose = require('mongoose');

const createNewClassTime = new mongoose.Schema({
    name:{
        type:String
    },
    description:{
        type:String
    },
    times:[
        {type:String}
    ],
    createdAt:{
        type:Date,
        default:Date.now
    }
});

module.exports = mongoose.model('classTime', createNewClassTime);