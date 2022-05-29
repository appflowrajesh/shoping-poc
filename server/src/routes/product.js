const express = require("express");
const router = express.Router();

const productController = require("../controllers/product");

// get all post
router.post("/create", productController.createProduct);
router.get("/all", productController.allProducts);
router.get("/:id", productController.getProductById);
router.get("/searchProduct/:query", productController.searchProduct);
router.delete("/deleteProduct/:id", productController.deleteProduct);

module.exports = router;
