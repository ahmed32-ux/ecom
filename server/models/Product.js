const mongoose = require ("mongoose");


const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    price: {
        type: String,
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