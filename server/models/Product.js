const mongoose = require ("mongoose");


const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    category: {
        type: String,
    },
    image: {
        type: String
    },
    stock: {
        type: Number
    }
}, {timestamps: true});

module.exports = mongoose.model ('product', productSchema);