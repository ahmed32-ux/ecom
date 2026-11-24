const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const authRoute = require("../routes/authRoutes");
const productRoute = require ("../routes/productRoutes")
const categoryRoute = require ("../routes/categoryRoutes");
const cartRoute = require ("../routes/cartRoutes")


// Create Express App
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoute);
app.use("/api/product", productRoute);
app.use("/api/categories", categoryRoute);
app.use("api/cart", cartRoute);

// DOT ENV
const PORT = process.env.PORT || 5000;
const DB_URL = process.env.MONGO_URI;

// DB CONNECTION
mongoose.connect(DB_URL)
    .then(() => console.log("MongoDB Connected Successfully"))
    .catch((err) => console.log("MongoDB Connection Error:", err));

// Home Route
app.get("/", (req, res) => {
    res.send("Ecom Server is running");
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
