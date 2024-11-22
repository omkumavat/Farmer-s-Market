import { User } from "../Models/User.js";
import dealerProduct from "../Models/dealerProducts.js";
import FarmerProduct from "../Models/farmerProducts.js";
export const fetchMyProducts= async (req, res) => {
    try {
        // Extract user ID from request params or query
        const userId = req.params.id;
    
        // Find the user by ID
        const user = await User.findById(userId).populate('dealerProducts').populate('farmerProducts');
    
        // If the user doesn't exist
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
    
        // Determine products based on the user's role
        let products = [];
        if (user.role === 'dealer') {
          products = user.dealerProducts; // Pre-populated dealer products
        } else if (user.role === 'farmer') {
          products = user.farmerProducts; // Pre-populated farmer products
        } else {
          return res.status(400).json({ message: 'User role is invalid or has no associated products.' });
        }
    
        // Respond with the products
        return res.status(200).json({ data: products });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error', error: error.message });
      }
};