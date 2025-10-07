const Product = require('../models/productModel');

const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        if (!products) {
            return res.status(404).json({ message: 'Cannot find any products' });
        }
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const getProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findOne({ id_product: id });
        if (!product) {
            return res.status(404).json({ message: 'Cannot find product' });
        }
        res.status(200).json(product);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = {
    getProducts,
    getProduct
}