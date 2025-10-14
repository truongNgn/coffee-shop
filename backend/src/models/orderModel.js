// models/orderModel.js
import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  customerName: String,
  phone: String,
  address: String,
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

export default mongoose.model("Order", orderSchema);
