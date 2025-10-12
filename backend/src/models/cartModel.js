const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    id_product: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 0,
    },
    total_price: {
        type: Number,
        required: true,
        min: 0,
    }
});

const Cart = mongoose.model('Cart', cartSchema, 'cart');

module.exports = Cart;