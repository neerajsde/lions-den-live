const mongoose = require('mongoose');

const createNewProgram = new mongoose.Schema({
    name:{
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
    createdAt:{
        type:Date,
        default:Date.now
    }
});

module.exports = mongoose.model('sp-program', createNewProgram);