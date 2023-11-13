const mongoose = require('mongoose');
const { Schema } = mongoose;

const AddressSchema = new Schema({
    user: {
        type: mongoose.ObjectId,
        required:true
    },
    fullName: {
        type: String,
        required:true
    },
    email: {
        type: String,
        required:true
    },
    phone: {
        type: String,
        required:true
    },
    selectedState: {
        type: String,
        required:true
    },
    selectedCity: {
        type: String,
        required:true
    },
    selectedLocation: {
        type: String,
        required:true
    },
    street: {
        type: String,
        required:true
    },
    houseNumber: {
        type: String,
        required:true 
    },
    message: {
        type: String,
        required:true 
    }
})

// We have used id instead of _id in frontend so create virtual
const virtual = AddressSchema.virtual('id');
virtual.get(() => {
    return this.id;
})
AddressSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: (doc,ret) => {
        delete ret._id;
    }
})
exports.Address =  mongoose.model("Address", AddressSchema);