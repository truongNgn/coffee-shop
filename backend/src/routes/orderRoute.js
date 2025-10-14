const express = require('express');
const router = express.Router();
const { createOrder, getAllOrders, getOrderById, updateOrderStatus } = require('../controllers/orderController');

// POST /api/orders
router.post('/', createOrder);

// GET /api/orders
router.get('/', getAllOrders);

// GET /api/orders/:id
router.get('/:id', getOrderById);

// PUT /api/orders/:id
router.put('/:id', updateOrderStatus);

module.exports = router;
