const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    title: {
        type: String,
        required:true
    },
    description: {
        type: String,
        required:true
    },
    seller: {
        type: mongoose.ObjectId,
        ref:"seller"
    },
    images: {
        type:[String],
        required: true
    },
    price: {
        type: Number,
        required:true
    },
    brand: {
        type: String,
        required:true
    },
    category: {
        type: mongoose.ObjectId,
        ref:"category"
    },
    features: {
        type: [String],
    },
    quantity: {
        type: Number,
        required: true
    },
}, { timestamps: true });

module.exports = mongoose.model("products", ProductSchema);