const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  products: {
    type: Object,
  },
  selectedDeliveryAddress: {
    type: Schema.Types.ObjectId,
    ref: "Address",
  },
  selectedPaymentMethod: {
    type: String,
    required: true,
    default: "cash",
  },
  totalItems: {
    type: Number,
    default: 0,
  },
  totalAmount: {
    type: Number,
    default: 0,
  },
  status: {
    type: String,
    default: "Pending",
  },
});

// We have used id instead of _id in frontend so create virtual
const virtual = orderSchema.virtual("id");
virtual.get(() => {
  return this.id;
});
orderSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: (doc, ret) => {
    delete ret._id;
  },
});

exports.Orders = mongoose.model("Orders", orderSchema);
