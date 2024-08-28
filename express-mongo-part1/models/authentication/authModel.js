const mongoose = require('mongoose')

const registerSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        match: [/.+\@.+\..+/, 'Please enter a valid email address']
    },
    password: {
        type: String,
        required: true
    },
    isActive: {
        type: String,
        required: true,
        default: "0"
    }
});


const Register = mongoose.model('User', registerSchema)

module.exports = { Register }