const mongoose = require('mongoose');

const createNewBranchFeeStucture = new mongoose.Schema({
    package:{
        type:String
    },
    male:{
        type:String
    },
    female:{
        type:String
    },
    couple:{
        type:String
    },
    kids:{
        type:String
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
});

module.exports = mongoose.model('feeStructure', createNewBranchFeeStucture);