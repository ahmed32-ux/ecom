
const Product = require("../models/Product");

// Add/Create New Product
const createProduct = async (req, res) => {
    try {
        const newProduct = await Product.create(req.body);

        res.status(201).json({
            message: "New Product Created Successfully",
            product: newProduct,
        });

    } catch (error) {
        console.log("Create Product Error:", error);

        res.status(500).json({
            message: "Server Error",
            error: error.message
        });
    }
};


// Get All Products
const getAllProducts = async (req, res) => {
    try {
        const { search, category } = req.query;

        let filter = {};

        if (search) {
            filter.name = {
                $regex: search,
                $options: "i"
            };
        }

        if (category && category !== "All") {
            filter.category = category;
        }

        const products = await Product.find(filter)
            .sort({ createdAt: -1 });

        res.status(200).json(products);

    } catch (error) {
        console.log("Get Products Error:", error);

        res.status(500).json({
            message: "Server Error",
            error: error.message
        });
    }
};


const getSingleProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                message: "Product Not Found"
            });
        }

        res.status(200).json({
            success: true,
            product
        });

    } catch (error) {
        console.log("Get Single Product Error:", error);

        res.status(500).json({
            message: "Server Error",
            error: error.message
        });
    }
};


// Update Product
const updateProduct = async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({
                message: "Product Not Found"
            });
        }

        res.json({
            message: "Product Updated Successfully",
            product: updatedProduct,
        });

    } catch (error) {
        console.log("Update Product Error:", error);

        res.status(500).json({
            message: "Server Error",
            error: error.message
        });
    }
};

// Delete Product
const deleteProduct = async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(
            req.params.id
        );

        if (!deletedProduct) {
            return res.status(404).json({
                message: "Product Not Found"
            });
        }

        res.json({
            message: "Product Deleted Successfully",
            product: deletedProduct,
        });

    } catch (error) {
        console.log("Delete Product Error:", error);

        res.status(500).json({
            message: "Server Error",
            error: error.message
        });
    }
};

module.exports = {
    createProduct,
    getAllProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct
};
