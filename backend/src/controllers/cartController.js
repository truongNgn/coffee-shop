const Cart = require("../models/cartModel");
const Product = require("../models/productModel");

const getCart = async (req, res) => {
    try {
        const cart = await Cart.find({ phone: req.params.phone });
        if (!cart) return res.status(404).json({ message: "Cart not found" });
        res.status(200).json(cart);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const addToCart = async (req, res) => {
    try {
        const { phone, id_product, quantity, size } = req.body;
        const product = await Product.findOne({ id_product: id_product });
        if (!product) return res.status(404).json({ message: "Product not found" });
        const selectedSize = product.sizes.find(s => s.size === size);
        if (!selectedSize) {
            return res.status(400).json({ message: "Invalid size" });
        }
        const cartItem = new Cart({ phone, id_product, name: product.name, quantity, price: selectedSize.price, size: size });
        await cartItem.save();
        res.status(201).json(cartItem);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const updateCart = async (req, res) => {
    try {
        const { phone, id_product, quantity, size } = req.body;
        const cartItem = await Cart.findOne({ phone: phone, id_product: id_product, size: size });
        if (!cartItem) return res.status(404).json({ message: "Cart item not found" });
        cartItem.quantity = quantity;
        await cartItem.save();
        res.status(200).json(cartItem);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const deleteFromCart = async (req, res) => {
    try {
        const { phone, id_product, size } = req.body;
        const cartItem = await Cart.findOneAndDelete({ phone: phone, id_product: id_product, size: size });
        if (!cartItem) return res.status(404).json({ message: "Cart item not found" });
        res.status(200).json({ message: "Cart item deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const deleteAllCart = async (req, res) => {
    try {
        const { phone } = req.body;
        const result = await Cart.deleteMany({ phone });
        if (result.deletedCount === 0) return res.status(404).json({ message: "No cart items found" });
        res.status(200).json({ message: "All cart items deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getCart,
    addToCart,
    updateCart,
    deleteFromCart,
    deleteAllCart
}