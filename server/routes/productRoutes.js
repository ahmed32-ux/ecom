const  express = require ("express");
const { createProduct, getAllProducts, updateProduct, deleteProduct } = require("../controllers/productController");

const router = express.Router();

// create a new product
router.post("/add", createProduct);

//  Get all products
router.get("/", getAllProducts);

// Update a product
router.put("update/:id", updateProduct);

// Delete a product 
router.delete("update/:id", deleteProduct);

module.exports = router;