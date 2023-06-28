const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    user: {
        type: mongoose.ObjectId,
        ref:"user"
    },
    price: {
        type: Number,
        required:true
    },
    product: {
        type: mongoose.ObjectId,
        ref:"products"
    },
    orderStatus: {
        type: String,
        required:true
    },
    deliveryOption: {
        type: String,
        required:true
    },
    deliveryAddress: {
        type: mongoose.ObjectId,
        ref:"user"
    }
},{timestamps:true});

module.exports = mongoose.model("orders", OrderSchema);