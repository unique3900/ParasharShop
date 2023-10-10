
const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    name: {
        type: String,
        required:true
    },
    email: {
        type: String,
        required:true
    },
    role: {
        type: String,
        default:"buyer"
    },
    password: {
        type: String,
        required:true
    },
    addresses: {
        type: [String],
        default:[]
    },
    phone: {
        type: Number,
        min: [10, "Minimum length of phone number is 10"],
        mas:[10,"Minimum length of phone number is 10"]
    },
    businessInfo: {
        type: {},
        default: {
            businessName: {
                type: String,
                default:""
            },
            businessAddress: {
                type: String,
                default:""
            },
            businessPassword: {
                type: String,
                default:""
            }
        }
    }
})



exports.User = new mongoose.model("User", UserSchema);