const mongoose = require('mongoose');
const { Schema } = mongoose;



const productSchema = new Schema({
    title: {
        type: String,
        required:true
    },
    description: {
        type: String,
        required:true
    },
    price: {
        type: Number,
        min:[0,"Price Should be More than 0"]
    },
    discountPercentage: {
        type: Number,
        min: [1, "Discount Percentage Should be More than 1"],
        max: [100, "Discount Percentage Should be Less than 100"]
    },
    stock: {
        type: Number,
        min: [1, "Discount Percentage Should be More than 1"],
        required:true
    },
    rating: {
        type: Number,
        min: [1, "Minimum Rating is 1"],
        max: [5, "Maximul Rating is 5"],
        default:0
    },
    brand: {
        type: String,
        required:true
    },
    category: {
        type: String,
        required:true
    },
    thumbnail: {
        type: String,
        required:true
    },
    images:{
        type: [String],
        required:true
    },
    deleted: {
        type: Boolean,
        default:false
    },
    seller: {
        type: mongoose.ObjectId,
        ref: "Seller",
        required:true
    }
})


// We have used id instead of _id in frontend so create virtual
const virtual = productSchema.virtual('id');
virtual.get(() => {
    return this.id;
})
productSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: (doc,ret) => {
        delete ret._id;
    }
})


exports.Product= mongoose.model("Product", productSchema);