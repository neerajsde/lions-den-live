const mongoose = require('mongoose');

const CreateNewComment = new mongoose.Schema({
    user_id:{
        type:String
    },
    message:{
        type: String,
        default:''
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
});

module.exports = mongoose.model('comment', CreateNewComment);