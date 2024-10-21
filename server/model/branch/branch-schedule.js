const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
    day: {
        type: String,
        required: true
    },
    times: [{
        morningTime: {
            type: String
        },
        eveningTime: {
            type: String,
        },
        description: {
            type: String
        }
    }]
});

module.exports = mongoose.model('Schedule', scheduleSchema);