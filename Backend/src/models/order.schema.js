const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: {
    type:mongoose.Schema.Types.ObjectId,
    required:true
  },
  buyerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Buyer",
    default: null,
  },
  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        min: 1,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
