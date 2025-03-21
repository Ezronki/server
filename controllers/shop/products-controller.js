const Product = require("../../models/Product"); // Import your Product model

// Function to get filtered products (by category or brand) with sorting options
const getFilteredProducts = async (req, res) => {
  try {
    // Destructure query parameters with default values
    const { category = "", brand = "", sortBy = "price-lowtohigh" } = req.query;

    let filters = {};

    // Apply category filter if provided
    if (category) {
      filters.category = { $in: category.split(",") };  // Convert category string to an array and use $in operator
    }

    // Apply brand filter if provided
    if (brand) {
      filters.brand = { $in: brand.split(",") };  // Convert brand string to an array and use $in operator
    }

    // Set up sorting based on the sortBy query parameter
    let sort = {};

    switch (sortBy) {
      case "price-lowtohigh":
        sort.price = 1;  // Ascending price order
        break;
      case "price-hightolow":
        sort.price = -1; // Descending price order
        break;
      case "title-atoz":
        sort.title = 1;  // Ascending alphabetical order by title
        break;
      case "title-ztoa":
        sort.title = -1; // Descending alphabetical order by title
        break;
      default:
        sort.price = 1; // Default to price-lowtohigh
        break;
    }

    // Fetch products from the database with the filters and sorting
    const products = await Product.find(filters).sort(sort);

    // Respond with the filtered and sorted products
    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      success: false,
      message: "Some error occurred",
    });
  }
};

// Function to get the details of a single product by its ID
const getProductDetails = async (req, res) => {
  try {
    const { id } = req.params;  // Get the product ID from the URL parameter
    const product = await Product.findById(id);  // Find product by ID

    // If the product doesn't exist, return a 404 error
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found!",
      });
    }

    // Respond with the product details
    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      success: false,
      message: "Some error occurred",
    });
  }
};

module.exports = { getFilteredProducts, getProductDetails };