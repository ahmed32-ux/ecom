
const Cart = require("../models/Cart");

// Add item to cart
const addToCart = async (req, res) => {
    try {
        const { userId, productId } = req.body;

        let cart = await Cart.findOne({ userId });

        if (!cart) {
            cart = new Cart({
                userId,
                items: [{ productId, quantity: 1 }]
            });
        } else {
            const item = cart.items.find(
                i => i.productId.toString() === productId
            );

            if (item) {
                item.quantity += 1;
            } else {
                cart.items.push({
                    productId,
                    quantity: 1
                });
            }
        }

        await cart.save();

        res.status(200).json({
            message: "Item added to cart",
            cart
        });

    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            error: error.message
        });
    }
};


// Remove item from cart
const removeFromCart = async (req, res) => {
    try {
        const { userId, productId } = req.body;

        const cart = await Cart.findOne({ userId });

        if (!cart) {
            return res.status(404).json({
                message: "Cart not found"
            });
        }

        cart.items = cart.items.filter(
            i => i.productId.toString() !== productId
        );

        await cart.save();

        res.status(200).json({
            message: "Item removed from cart",
            cart
        });

    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            error: error.message
        });
    }
};


// Update item quantity in cart
const updateCart = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;

        if (!Number.isInteger(quantity) || quantity < 1) {
            return res.status(400).json({
                message: "Quantity must be a positive integer"
            });
        }

        const cart = await Cart.findOne({ userId });

        if (!cart) {
            return res.status(404).json({
                message: "Cart not found"
            });
        }

        const item = cart.items.find(
            i => i.productId.toString() === productId
        );

        if (!item) {
            return res.status(404).json({
                message: "Product not found in cart"
            });
        }

        item.quantity = quantity;

        await cart.save();

        res.status(200).json({
            message: "Cart quantity updated",
            cart
        });

    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            error: error.message
        });
    }
};

// get cart from userId
const getCart = async (req, res) => {
    try {
        const { userId } = req.params;

        const cart = await Cart.findOne({ userId })
            .populate("userId")
            .populate("items.productId");

        if (!cart) {
            return res.status(404).json({
                message: "Cart not found"
            });
        }

        res.status(200).json({
            message: "Cart fetched successfully",
            cart
        });

    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            error: error.message
        });
    }
};


module.exports = {
    addToCart,
    removeFromCart,
    updateCart,
    getCart
};
