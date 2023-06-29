const mongoose = require('mongoose');

const SellerSchema = new mongoose.Schema({
    businessName: {
        type: String,
        required:true 
    },
    businessAddress: {
        type: String,
        required:true 
    },
    password: {
        type: String,
        required:true
    },
    data: {
        type: mongoose.ObjectId,
        ref:"user"
    },
  
});

module.exports = mongoose.model("seller", SellerSchema);