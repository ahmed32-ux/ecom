const express = require("express");
const router = express.Router();

const {
    addToCart,
    removeFromCart,
    updateCart,
    getCart
} = require("../controllers/cartController");

// Add product to cart
router.post("/add", addToCart);

// Remove product from cart
router.delete("/remove", removeFromCart);

// Update product quantity
router.put("/update", updateCart);

// Get cart by user ID
router.get("/:userId", getCart);

module.exports = router;
