const mongoose = require('mongoose');

const createNewTutorial = new mongoose.Schema({
    title:{
        type:String
    },
    link:{
        type:String
    },
    description:{
        type:String
    },
    banner:{
        type:String
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
});

module.exports = mongoose.model('youTubeTutorial', createNewTutorial);