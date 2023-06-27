const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    secretKey: {
        type: Number,
        default: null,
        expires: '1m'
    },
    address: {
        type: String,
        required: true,
    },
    isSeller: {
        type: Boolean,
        default:false
    }
}, { timestamps: true });

module.exports = mongoose.model("user", userSchema);