const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    phone: {
        type: String,
        required: true
    },
    id_product: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 0,
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    },
    total_price: {
        type: Number,
        min: 0
    },
    size: {
        type: String,
        enum: ['M', 'L'],
        required: true
    },
    image: {
        type: String,
        required: true
    }
});

cartSchema.pre('save', function (next) {
    if (this.price && this.quantity) {
        this.total_price = this.price * this.quantity;
    }
    next();
});

const Cart = mongoose.model('Cart', cartSchema, 'cart');

module.exports = Cart;