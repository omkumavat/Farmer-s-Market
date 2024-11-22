import { User } from "../Models/User.js";
export const addToCart = async (req, res) => {
    const { userId, productId } = req.body; // Get userId and productId from request body
    console.log(req.body);
    try {
      // Find the user by userId
      const user = await User.findById(userId);
  
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
  
      return res.status(200).json({ message: 'Product added to cart', cart: user.cart });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Server error' });
    }
  };
  
  export const getCart = async (req, res) => {
    const userId  = req.params.id; 
    console.log(userId);
    
    try {
      const user = await User.findById(userId).populate('carts');
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      return res.status(200).json({ cart: user.carts });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Server error' });
    }
  };
  