const mongoose = require('mongoose');
const { Schema } = mongoose;

const wishlistSchema = new Schema({
    product: {
        type: mongoose.ObjectId,
        ref: "Product",
        required: true
    },
    user: {
        type: mongoose.ObjectId,
        ref: "User",
        required: true 
    }

    
}, { timestamps: true });

const virtual = wishlistSchema.virtual('id');
virtual.get(() => {
    return this.id;
})
wishlistSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: (doc,ret) => {
        delete ret._id;
    }
})

exports.Wishlist = mongoose.model('Wishlist', wishlistSchema);