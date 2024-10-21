const mongoose = require('mongoose');

const createNewFreeTrial = new mongoose.Schema({
    name:{
        type:String
    },
    mobile_no:{
        type:String
    },
    email:{
        type:String
    },
    branch:{
        type:String
    },
    scheduleDate:{
        type:String
    },
    scheduleTime:{
        type:String
    },
    termsAndCondition:{
        type:Boolean
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
});

module.exports = mongoose.model('FreeTrial', createNewFreeTrial);