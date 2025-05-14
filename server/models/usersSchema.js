const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50,
        minLength: 1
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50,
        minLength: 1
    },
    password: {
        type: String,
        required: true,
        minLength: 8
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
