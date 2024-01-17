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
    options: {
        type: [String],
        required:true
    },
  });

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
        default:0,
        min: [0, "Discount Percentage Should be More than 1"],
        max: [100, "Discount Percentage Should be Less than 100"]
    },
    rating: {
        type: Number,
        default:0
    },
    totalRatings: {
        type: Number,
        default:0
    },
    brand: {
        // type:mongoose.ObjectId
        // ref:'Brand',
        type: String
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
    highlights: {
        type: [String],
        required:true,
    },
    features: [featureSchema],
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