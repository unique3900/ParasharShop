const mongoose = require('mongoose');

const SellerSchema = new mongoose.Schema({
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