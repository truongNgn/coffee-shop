// models/orderModel.js
import mongoose from "mongoose";

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
      productId: String,
      name: String,
      size: String,
      qty: Number,
      price: Number
    }
  ],
  totalPrice: Number,
  createdAt: { type: Date, default: Date.now },
  status: { type: String, default: "Pending" } // Pending, Completed, Cancelled
});

export default mongoose.model("Order", orderSchema, "order");
