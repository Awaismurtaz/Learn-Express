const mongoose = require('mongoose');

const createJobSchema = new mongoose.Schema({
    job_title: {
        type: String,
        required: true
    },
    job_type: {
        type: String,
        required: true,
        enum: ['Full time', 'Part time', 'Contract']  // Restrict to these specific values
    },
    pay_type: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    minimum_rate: {
        type: Number,
        required: true
    },
    maximum_rate: {
        type: Number,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    experience_level: {
        type: String,
        required: true
    },
    experience_year: {
        type: Number,
        required: true
    },
    skills: {
        type: String,  // Array of strings to list required skills
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ['Open', 'Closed', 'Pending']  // Enum to restrict to specific status values
    }
});

const Job = mongoose.model('job', createJobSchema);

module.exports = Job;
