const mongoose = require('mongoose');

const CreateNewLike = new mongoose.Schema({
    user_id:{
        type:String
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
});

module.exports = mongoose.model('like', CreateNewLike);