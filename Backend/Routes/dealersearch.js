import express from "express";
import dealerProduct from "../Models/dealerProducts.js"; // Import your Mongoose model

const router = express.Router();

// Controller and Route for Searching Products
router.get("/search", async (req, res) => {
  try {
    const query = req.query.q; // Extract the search term from query parameters

    if (!query) {
      return res.status(400).json({
        success: false,
        message: "No search term provided",
      });
    }

    // Define the search conditions for MongoDB
    const searchRegex = new RegExp(query, "i"); // Case-insensitive regex for partial matches
    const conditions = {
      $or: [
        { title: searchRegex },
        { name: searchRegex },
        { category: searchRegex },
        { desc: searchRegex },
      ],
    };

    // Query the database for matching products
    const products = await dealerProduct.find(conditions);
  // // console.log(products);
    // Return the results
    return res.status(200).json({
      success: true,
      message: "Products fetched successfully",
      data: products,
    });
  } catch (error) {
    console.error("Error searching for products:", error);
    return res.status(500).json({
      success: false,
      message: "Error searching for products",
      error: error.message,
    });
  }
});

export default router;
