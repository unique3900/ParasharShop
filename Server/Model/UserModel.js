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
        default: 2222,
    },
    address: {
        type: String,
        required: true,
    }
}, { timestamps: true });

module.exports = mongoose.model("user", userSchema);