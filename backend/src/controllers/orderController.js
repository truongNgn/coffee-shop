const Order = require("../models/orderModel");
const Cart = require("../models/cartModel");

const createOrder = async (req, res) => {
    try {
        const { customerName, phone, address } = req.body;
        const cartItems = await Cart.find({ phone: phone });
        if (cartItems.length === 0) return res.status(400).json({ message: "Cart is empty" });
        const now = new Date();
        const order = new Order({ customerName, phone, address, cartItems, createdAt: now.toLocaleString() });
        await order.save();
        await Cart.deleteMany({ phone: phone });
        res.status(201).json(order);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getOrders = async (req, res) => {
    try {
        const { phone } = req.params;
        const orders = await Order.find({ phone: phone });
        if (!orders) return res.status(404).json({ message: "Orders not found" });
        res.status(200).json(orders);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = {
    createOrder,
    getOrders
}