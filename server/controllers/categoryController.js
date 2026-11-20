
const Category = require("../models/Category");

// GET: All Categories
const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find().sort({
            createdAt: -1
        });

        res.status(200).json(categories);

    } catch (error) {
        res.status(500).json({
            message: "Unable to fetch categories",
            error: error.message
        });
    }
};


// POST: Add Category
const createCategory = async (req, res) => {
    try {
        const { name } = req.body;

        if (!name || !name.trim()) {
            return res.status(400).json({
                message: "Category name is required"
            });
        }

        const existingCategory = await Category.findOne({
            name: name.trim()
        });

        if (existingCategory) {
            return res.status(409).json({
                message: "Category already exists"
            });
        }

        const category = await Category.create({
            name: name.trim()
        });

        res.status(201).json({
            message: "Category added successfully",
            category
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


// PUT: Update Category
const updateCategory = async (req, res) => {
    try {
        const { name } = req.body;

        if (!name || !name.trim()) {
            return res.status(400).json({
                message: "Category name is required"
            });
        }

        const existingCategory = await Category.findOne({
            name: name.trim(),
            _id: { $ne: req.params.id }
        });

        if (existingCategory) {
            return res.status(409).json({
                message: "Category already exists"
            });
        }

        const category = await Category.findByIdAndUpdate(
            req.params.id,
            { name: name.trim() },
            { new: true, runValidators: true }
        );

        if (!category) {
            return res.status(404).json({
                message: "Category not found"
            });
        }

        res.status(200).json({
            message: "Category updated successfully",
            category
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


// DELETE: Delete Category
const deleteCategory = async (req, res) => {
    try {
        const category = await Category.findByIdAndDelete(
            req.params.id
        );

        if (!category) {
            return res.status(404).json({
                message: "Category not found"
            });
        }

        res.status(200).json({
            message: "Category deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


module.exports = {
    getAllCategories,
    createCategory,
    updateCategory,
    deleteCategory
};
