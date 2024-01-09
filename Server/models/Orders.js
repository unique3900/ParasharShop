const mongoose = require("mongoose");
const { Schema } = mongoose;
const optionSchema = new mongoose.Schema({
  option: {
    type: String,
    required: true,
  },
});

const featureSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  option: {
      type: String,
      required:true
  },
});

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
    type: mongoose.ObjectId,
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
  }
},{timestamps:true});

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
