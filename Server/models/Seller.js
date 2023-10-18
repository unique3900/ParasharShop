const mongoose = require('mongoose');

const { Schema } = mongoose;

const sellerSchema = new Schema({
    email: {
        type: mongoose.ObjectId,
        ref: 'User',
        required:true
    },
    businessName: {
        type: String,
        required: true,
        index: true,
        unique: true
    },
    businessAddress: {
        type: String,
        required:true
    },
    businessPassword: {
        type: String,
        required:true
    },
    admin: {
        type: mongoose.ObjectId,
        ref: 'User',
        required:true
    }
})
exports.Seller = mongoose.model("Seller", sellerSchema);