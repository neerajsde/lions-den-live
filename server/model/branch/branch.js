const mongoose = require('mongoose');

const createNewBranches = new mongoose.Schema({
    name:{
        type:String
    },
    description:{
        type:String
    },
    location:{
        type:String
    },
    location_url:{
        type:String
    },
    phone:{
        type:String
    },
    email:{
        type:String
    },
    mon_img:{
        type:String,
        default:""
    },
    tue_img:{
        type:String,
        default:""
    },
    wed_img:{
        type:String,
        default:""
    },
    thu_img:{
        type:String,
        default:""
    },
    fri_img:{
        type:String,
        default:""
    },
    sat_img:{
        type:String,
        default:""
    },
    sechudles:[
        {type:mongoose.Schema.Types.ObjectId, ref:'Schedule'}
    ],
    feeStructure:[
        {type:mongoose.Schema.Types.ObjectId, ref: 'feeStructure'}
    ],
    classTimes:[
        {type:mongoose.Schema.Types.ObjectId, ref:'classTime'}
    ],
    createdAt:{
        type:Date,
        default:Date.now
    }
});

module.exports = mongoose.model('Branches', createNewBranches);