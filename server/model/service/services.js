const mongoose = require('mongoose');

const createNewServices = new mongoose.Schema({
    name: {
        type: String,
        required: true // Add required validation for important fields
    },
    title: {
        type: String,
        required: true
    },
    desc1: {
        header: {
            type: String
        },
        paragraph: {
            type: String
        }
    },
    desc2: {
        header: {
            type: String,
            default: ''
        },
        paragraph: {
            type: String,
            default: ''
        }
    },
    offer: {
        type: String,
        required: true // Required validation to ensure this field is filled
    },
    program_title:{
        type:String,
    },
    program_desc:{
        type:String,
    },
    program_img:{
        type:String,
    },
    benefits: [ // Corrected spelling
        { type: mongoose.Schema.Types.ObjectId, ref: 'Benefit' }
    ],
    classLevel: [
        {
            level: {
                type: String,
                enum: ['beginner', 'intermediate', 'advanced'] // Optional: Enum for predefined levels
            },
            content: [String]
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Services', createNewServices);
