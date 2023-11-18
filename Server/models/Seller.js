const mongoose = require('mongoose');

const { Schema } = mongoose;

const sellerSchema = new Schema({
    user: {
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
    }
})


// We have used id instead of _id in frontend so create virtual
const virtual = sellerSchema.virtual('id');
virtual.get(() => {
    return this.id;
})
sellerSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: (doc,ret) => {
        delete ret._id;
    }
})
exports.Seller = mongoose.model("Seller", sellerSchema);