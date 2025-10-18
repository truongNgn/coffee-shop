const mongoose = require('mongoose');

// const orderSchema = new mongoose.Schema({
//   customerName: String,
//   phone: String,
//   address: String,
//   cartItems: [
//     {
//       productId: String,
//       name: String,
//       size: String,
//       qty: Number,
//       price: Number
//     }
//   ],
//   totalPrice: Number,
//   createdAt: { type: Date, default: Date.now },
//   status: { type: String, default: "Pending" } // Pending, Completed, Cancelled
// });

// export default mongoose.model("Order", orderSchema);


const orderSchema = new mongoose.Schema({
  user: {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    note: { type: String },
  },
  items: [
    {
      id_product: { type: String, required: true },
      name: { type: String, required: true },
      size: { type: String },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true },
      image: { type: String },
    },
  ],
  total: { type: Number, required: true },
  status: { type: String, default: "Đang xử lý" }, // hoặc "Chờ xác nhận"
  createdAt: { type: Date, default: Date.now },
});

const Order = mongoose.model("Order", orderSchema, 'order');
module.exports = Order;