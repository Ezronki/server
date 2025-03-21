const express = require("express");

const {
  getFilteredProducts,  // Controller function to filter products by category or brand
  getProductDetails,    // Controller function to fetch a single product by ID
} = require("../../controllers/shop/products-controller");

const router = express.Router();

// Route to get filtered products (by category or brand)
router.get("/get", getFilteredProducts);

// Route to get a single product's details by ID
router.get("/get/:id", getProductDetails);

module.exports = router;
