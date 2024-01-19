const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        index: true,
        unique: true
    },
    password: {
        type: String,
        required:true
    },
    fullName: {
        type: String,
        required:true
    },
    gender: {
        type: String,
        required:true
    },
    phone: {
        type: Number,
        required:true  
    },
    addresses: {
     type:[Schema.Types.Mixed]
    },


})


// We have used id instead of _id in frontend so create virtual
const virtual = userSchema.virtual('id');
virtual.get(() => {
    return this.id;
})
userSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: (doc,ret) => {
        delete ret._id;
    }
})


exports.User = mongoose.model("User", userSchema);