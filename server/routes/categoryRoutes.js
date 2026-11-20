
const express = require("express");

const {
    getAllCategories,
    createCategory,
    updateCategory,
    deleteCategory
} = require("../controllers/categoryController");

const router = express.Router();

// Get All Categories
router.get("/", getAllCategories);

// Add Category
router.post("/add", createCategory);

// Update Category
router.put("/:id", updateCategory);

// Delete Category
router.delete("/:id", deleteCategory);

module.exports = router;
