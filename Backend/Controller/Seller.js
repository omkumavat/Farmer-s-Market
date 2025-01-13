import Seller from "../Models/Seller.js";
import dealerProduct from "../Models/dealerProducts.js";
import mongoose from "mongoose";

export const getSellerProductSales = async (req, res) => {
    try {
      const sellerId = new mongoose.Types.ObjectId(req.params.id);

      console.log(sellerId)
      const result = await Seller.aggregate([
        // Match the specific seller by ID
        { $match: { _id: sellerId } },
  
        // Unwind productsSold array to process each product individually
        { $unwind: '$productsSold' },
  
        // Add fields to convert productId to ObjectId if needed
        { $addFields: { 'productsSold.productId': { $toObjectId: '$productsSold.productId' } } },
  
        // Lookup to join with the products collection to get product details
        {
          $lookup: {
            from: 'dealerproducts', // Check your collection name
            localField: 'productsSold.productId', // Field in the seller schema
            foreignField: '_id',
            as: 'productDetails', // Alias for the joined data
          },
        },
  
        // Flatten the productDetails array (since lookup returns an array)
        { $unwind: '$productDetails' },
  
        // Group by product ID and calculate total revenue for each product
        {
          $group: {
            _id: '$productsSold.productId', // Group by productId
            productName: { $first: '$productDetails.title' }, // Get product name
            totalRevenue: { $sum: '$productsSold.revenue' }, // Sum revenue
          },
        },
  
        // Optionally sort by total revenue in descending order
        { $sort: { totalRevenue: -1 } },
      ]);
  
      // Send the response
      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      console.error('Error fetching seller product sales:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch product sales',
        error: error.message,
      });
    }
  };