const mongoose = require('mongoose');
const { Schema } = mongoose;

const orderSchema = new Schema({
    orderDetail: {
        type: Object,
        products: {
            type: [mongoose.ObjectId],
            ref:"Product"
        },
        selectedPaymentMethod: {
            type: String,
            required: true,
            default: "cash",
        },
        selectedDeliveryAddress: {
            type: Schema.Types.ObjectId,
            ref:"Address"
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
        },
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