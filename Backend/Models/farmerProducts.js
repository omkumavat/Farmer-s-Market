import mongoose from "mongoose";
import { User } from "./User.js";
const farmerProductSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  category: { type: String, required: true },
  subCategory: { type: String, required: true },
  quantity: { type: String, required: true },
  pricePerUnit: { type: String, required: true },
  description: { type: String, required: true },
  images: {
    type: [String],
    required: true
  },
  qualityGrade: { type: String, required: true },
  unit: { type: String, required: true },
  farmAddress: { type: String, required: true },
  pincode: { type: String, required: true },
  districtState: { type: String, required: true },
  availableFrom: { type: Date, required: true },
  availableUntil: { type: Date, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true } ,
   comments: [
      {
        rating: { type: Number, required: true },
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        comment: { type: String},
        date: {
          type: String,
          // default: Date.now,
        },
      }
    ],
}, { timestamps: true });

farmerProductSchema.pre('findOneAndDelete', async function (next) {
  const productId = this.getQuery()._id;

  try {
    // console.log(`Deleting product with ID: ${productId}`);

    // Delete related orders
    const Order = mongoose.model('Order');
    const deletedOrders = await Order.deleteMany({ productId });
    // console.log(`Deleted ${deletedOrders.deletedCount} orders associated with product ${productId}`);

    // Update Seller's productsSold
    const Seller = mongoose.model("Seller");
    const updatedSellers = await Seller.updateMany(
      { "productsSold.productId": productId },
      { $pull: { productsSold: { productId } } }
    );
    // console.log(`Updated ${updatedSellers.modifiedCount} sellers by removing product ${productId} from productsSold`);

    // Update User's dealerProducts and carts
    const User = mongoose.model("User");
    const updatedUsers = await User.updateMany(
      { $or: [{ farmerProducts: productId }, { carts: productId }] },
      { $pull: { farmerProducts: productId, carts: productId } }
    );
    // console.log(`Updated ${updatedUsers.modifiedCount} users by removing product ${productId} from dealerProducts and carts`);

    // Delete related payments
    const Payment = mongoose.model('Payment');
    const deletedPayments = await Payment.deleteMany({ productId });
    // console.log(`Deleted ${deletedPayments.deletedCount} payments associated with product ${productId}`);

    next(); // Proceed with the deletion
  } catch (error) {
    console.error(`Error in pre-delete middleware for product ${productId}:`, error);
    next(error); // Pass the error to the next middleware
  }
}); 


const FarmerProduct = mongoose.model("FarmerProduct", farmerProductSchema);

export default FarmerProduct;
