const mongoose = require('mongoose');
const { Schema } = mongoose;

const optionSchema = new mongoose.Schema({
    option: {
      type: String,
      required: true,
    },
});
  
const featureSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
    },
    option: {
        type: String,
        required:true
    },
  });

const cartScheme = new Schema({
    product: {
        type:mongoose.ObjectId,
        ref: 'Product',
        required:true
    },
    user: {
        type: mongoose.ObjectId,
        ref: 'User',
        required:true
    },
    quantity: {
        type: Number,
        default:1
    },
    seller: {
        type: mongoose.ObjectId,
        ref:'Seller'
    },
    status: {
        type: String,
        default:false
    },
    rated: {
        type: Boolean,
        default:false
    },
    features: [featureSchema]
})

// We have used id instead of _id in frontend so create virtual
const virtual = cartScheme.virtual('id');
virtual.get(() => {
    return this.id;
})
cartScheme.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: (doc,ret) => {
        delete ret._id;
    }
})

exports.Cart = mongoose.model("Cart", cartScheme);