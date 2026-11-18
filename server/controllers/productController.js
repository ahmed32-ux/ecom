const mongoose = require ("mongoose");
const product = require ("../models/Product");
const express = require ("express");


// Add/Create New Product Here
const createProduct = async(req, res) =>{
    try {
        const product = await product.create(req.body);
        res.json({
            message: "New Product Created Successfully",
            product,
        });
    } catch (error) {
        res.status(500).json({message: "Server Error", error})
    }
};

// Get All Products Here
const getAllProducts = async(req, res) => {
    try {
        const products = await product.find().sort({createdAt: -1});
        res.json(products)
    } catch (error) {
        res.status(500).json({message: "Server Error", error})
    }
}

// Update Product Here
const updateProduct = async(req, res) => {
    try {
        const update = await product.findByIdAndUpdate(
            req.param.id,
            req.body,
            {new: true}
        );
        res.json({
            message: "Product Updated Successfully",
            update,
        });
    } catch (error) {
        res.status(500).json({message: "Server Error", error})
    }
};

// Delete A Product

const deleteProduct = async(req, res) =>{
    try {
        const deletedProduct  = await product.findByIdAndDelete(
            req.param.id,
            req.body,
            {new: true}
        );
        res.json({
            message: "Product Deleted Successfully",
            deletedProduct ,
        });
    } catch (error) {
        res.status(500).json({message: "Server Error", error})
    }
};

module.exports = {
    createProduct,
    getAllProducts,
    updateProduct,
    deleteProduct
};
