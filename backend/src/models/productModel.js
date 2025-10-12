const mongoose = require('mongoose');

// Schema con cho từng size
const sizeSchema = new mongoose.Schema({
    size: {
        type: String,
        enum: ['S', 'M', 'L'],   // chỉ cho phép các giá trị hợp lệ
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    }
});

// Schema chính cho sản phẩm
const productSchema = new mongoose.Schema({
    id_product: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: String,
        enum: ['Coffee', 'Tea', 'Juice', 'Smoothie', 'Other'],
        required: true
    },
    description: String,
    image: String,
    sizes: {
        type: [sizeSchema],   // mảng chứa nhiều size
        validate: {
            validator: function (arr) {
                return arr.length > 0;
            },
            message: 'A product must have at least one size.'
        }
    }
});

const Product = mongoose.model('Product', productSchema, 'product')

module.exports = Product;
