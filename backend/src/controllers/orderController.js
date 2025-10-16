
const Order = require("../models/orderModel");

// ✅ Tạo đơn hàng mới
const createOrder = async (req, res) => {
    try {
        const { user, items, total } = req.body;

        if (!user || !items || items.length === 0)
            return res.status(400).json({ error: "Thiếu thông tin đơn hàng" });

        const newOrder = await Order.create({ user, items, total });

        res.status(201).json({
            message: "Tạo đơn hàng thành công!",
            order: newOrder,
        });
    } catch (error) {
        console.error("❌ Lỗi khi tạo đơn hàng:", error);
        res.status(500).json({ error: "Lỗi server khi tạo đơn hàng" });
    }
};

// ✅ Lấy danh sách tất cả đơn hàng (admin)
const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().sort({ createdAt: -1 });
        res.status(200).json(orders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Lỗi khi lấy danh sách đơn hàng" });
    }
};

// ✅ Lấy đơn hàng theo ID (user)
const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) return res.status(404).json({ error: "Không tìm thấy đơn hàng" });
        res.status(200).json(order);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Lỗi khi lấy đơn hàng" });
    }
};

// ✅ Cập nhật trạng thái đơn hàng
const updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const order = await Order.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );
        if (!order) return res.status(404).json({ error: "Không tìm thấy đơn hàng" });
        res.status(200).json(order);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Lỗi khi cập nhật trạng thái đơn hàng" });
    }
};

module.exports = {
    createOrder,
    getAllOrders,
    getOrderById,
    updateOrderStatus
};