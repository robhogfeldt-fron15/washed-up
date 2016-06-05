var mongoose = require('mongoose');

module.exports = mongoose.model('Timeslot', {
    machineId: {
        type: String,
        default: ''
    },
    date: {
        type: String,
        default: ''
    },
    slot: {
        type: String,
        default: ''
    },
    isTaken: {
        type: Boolean,
        default: false
    },
});
