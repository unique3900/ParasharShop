const mongoose = require('mongoose');
const { Schema } = mongoose;

const brandschema = new Schema({
    value: {
        type: String,
        requires:true
    },
    label: {
        type: String,
        requires:true
    },
    checked: {
        type: Boolean,
        default:false
    },

})

// We have used id instead of _id in frontend so create virtual
const virtual = brandschema.virtual('id');
virtual.get(() => {
    return this.id;
})
brandschema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: (doc,ret) => {
        delete ret._id;
    }
})
exports.Brand =  mongoose.model("Brand", brandschema);