const mongoose = require('mongoose');

const createNewContactUs = new mongoose.Schema({
    name:{
        type:String
    },
    mobile_no:{
        type:String
    },
    email:{
        type:String
    },
    shedule_date:{
        type:String
    },
    shedule_for:{
        type:String
    },
    branch_name:{
        type:String
    },
    response:{
        type:String,
        default:''
    },
    submitAt:{
        type:Date,
        default:Date.now
    }
});

module.exports = mongoose.model('ContactUs', createNewContactUs);