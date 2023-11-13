const mongoose = require('mongoose');
const { Schema } = mongoose;

const orderSchema = new Schema({
    items: {
        type: [Schema.Types.Mixed],
        default:[]
    },
    selectedPaymentMethod: {
        type: String,
        required: true,
        default: "cash",
    },
    selectedDeliveryAddress: {
        type: Object,
        default: {
            "fullName": null,
            "email": null,
            "phone":null,
            "selectedState": null,
            "selectedCity": null,
            "selectedLocation":null,
            "street":null,
            "houseNumber": null,
            "message": null
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required:true
        },
        totalItems: {
            type: Number,
            default:0
        },
        totalAmount: {
            type: Number,
            default:0
        }
    }
})

// We have used id instead of _id in frontend so create virtual
const virtual = orderSchema.virtual('id');
virtual.get(() => {
    return this.id;
})
orderSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: (doc,ret) => {
        delete ret._id;
    }
})

exports.Orders = mongoose.model("Orders", orderSchema);