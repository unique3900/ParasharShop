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
        default:0
    },
    brand: {
        // type:mongoose.ObjectId
        // ref:'Brand',
        type: String,
        required:true
    },
    category: {
        // type:mongoose.ObjectId,
        // ref:'Category',
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
    keywords:{
        type:[String],
        required:true
    },
    seller: {
        type: mongoose.ObjectId,
        ref: "Seller",
        required:true
    },
    features: {
        title: {
            type: String,
            required:true
        },
        options: [{
            option: {
                type: String,
                required:true
            }
        }]
    }
},{timestamps:true})


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