import { User } from "../Models/User.js";
import mongoose from "mongoose";
export const addToCart = async (req, res) => {
    const { userId, productId } = req.body; // Get userId and productId from request body
    // // console.log(req.body);
    try {
      // Find the user by userId
      const user = await User.findById(userId);
      // // // console.log(user);
  
      // If user is not found, return an error
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Check if the product is already in the user's cart
      if (user.carts.includes(productId)) {
        return res.status(400).json({ message: 'Product is already in the cart' });
      }
  
      // Add the product to the cart
      user.carts.push(productId);
  
      // Save the updated user document
      await user.save();
      // // // console.log(user);
  
      return res.status(200).json({ message: 'Product added to cart', cart: user.carts });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Server error' });
    }
  };

  export const getCart = async (req, res) => {
    const userId = req.params.id;
    // // // console.log(userId);
  
    try {
      const user = await User.aggregate([
        { $match: { _id: new mongoose.Types.ObjectId(userId) } }, // Match the user by ID
        {
          $lookup: {
            from: 'dealerproducts', // Collection name in lowercase
            localField: 'carts',
            foreignField: '_id',
            as: 'dealerProductDetails'
          }
        },
        {
          $lookup: {
            from: 'farmerproducts', // Collection name in lowercase
            localField: 'carts',
            foreignField: '_id',
            as: 'farmerProductDetails'
          }
        },
        {
          $project: {
            carts: 1, // Keep original carts array
            dealerProductDetails: 1, // Include populated dealerProduct details
            farmerProductDetails: 1, // Include populated farmerProduct details
          }
        }
      ]);
  
      if (user.length === 0) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Merge both arrays (dealerProductDetails and farmerProductDetails)
      const mergedProducts = [
        ...user[0].dealerProductDetails,
        ...user[0].farmerProductDetails
      ];
  
      // Send the merged result in the response
      return res.status(200).json({ dealercart: user[0].dealerProductDetails,farmercart:user[0].farmerProductDetails });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Server error' });
    }
  };
  
  export const removeCartItem = async (req, res) => {
    try {
      const { userId, cartId } = req.params;
  
      // Find and update the user by removing the cart ID from the carts array
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { $pull: { carts: cartId } }, // Remove the cartId from the carts array
        { new: true } // Return the updated user
      );
  
      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.status(200).json({ message: 'Cart item removed successfully', user: updatedUser });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

  export const checkCartPresence = async (req, res) => {
    try {
      const { cartId, userId } = req.params;
  
      // Validate input
      if (!userId || !cartId) {
        return res.status(400).json({ success: false, message: "User ID and Cart ID are required." });
      }
  
      // Find user by ID and check cart presence
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ success: false, message: "User not found." });
      }
  
      // Check if cartId exists in the carts array
      const isCartPresent = user.carts.includes(cartId);
  
      return res.status(200).json({ 
        success: true, 
        isPresent: isCartPresent 
      });
    } catch (error) {
      console.error("Error checking cart presence:", error);
      res.status(500).json({ 
        success: false, 
        message: "An error occurred while checking cart presence.", 
        error: error.message 
      });
    }
  };