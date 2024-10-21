const mongoose = require('mongoose');

const createNewServicesBenefits = new mongoose.Schema({
    heading:{
        type:String
    },
    description:{
        type:String
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
});

module.exports = mongoose.model('Benefit', createNewServicesBenefits);