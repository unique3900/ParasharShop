const mongoose = require('mongoose');
const { Schema } = mongoose;

const categoryschema = new Schema({
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
exports.Category = new mongoose.model("Category", categoryschema);