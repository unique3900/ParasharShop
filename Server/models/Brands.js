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
exports.Brand = new mongoose.model("Brand", brandschema);