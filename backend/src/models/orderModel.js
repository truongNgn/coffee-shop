// models/orderModel.js
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customerName: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  cartItems: [
    {
      id_product: String,
      name: String,
      size: String,
      quantity: Number,
      price: Number,
      total_price: Number
    }
  ],
  totalPrice: Number,
  createdAt: { type: Date, default: Date.now },
});

orderSchema.pre("save", function (next) {
  // Tính tổng total trong cartItems
  this.totalPrice = this.cartItems.reduce((acc, item) => acc + (item.total || 0), 0);
  next();
});

const Order = mongoose.model("Order", orderSchema, "order");

module.exports = Order;