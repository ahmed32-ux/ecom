const  express = require ("express");
const { createProduct, getAllProducts, updateProduct, getSingleProduct,  deleteProduct } = require("../controllers/productController");

const router = express.Router();

// create a new product
router.post("/add", createProduct);

//  Get all products
router.get("/", getAllProducts);
router.get("/:id", getSingleProduct);

// Update a product
router.put("/:id", updateProduct);

// Delete a product 
router.delete("/:id", deleteProduct);



module.exports = router;