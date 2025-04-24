import mongoose from "mongoose";


const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  serviceType: { type: String, required: true },
  desc: { type: String, required: true },
  images: {
    type: [String],
    required: true,
    validate: [arrayLimit, '{PATH} exceeds the limit of 3'], // Restrict to 3 images
  },
  quantity: { type: Number, required: true },
  size: { type: Number, required: true },
  sizeUnit: { type: String, required: true,  }, // e.g., "g"
  largerSizeAvailable: { type: Boolean, default: false },
  smallerSizeAvailable: { type: Boolean, default: false },
  largerSizes: [
    {
      price: { type: Number,  },
      quantity: { type: Number,  },
      size: { type: Number,  },
      unit: { type: String, }
    }
  ],
  smallerSizes: [
    {
      price: { type: Number, },
      quantity: { type: Number,  },
      size: { type: Number,},
      unit: { type: String, }
    }
  ],
  dealerid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User model (Farmer)
    required: true,
  }, comments: [
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
  
}, { timestamps: true }); // Add timestamps for createdAt and updatedAt

function arrayLimit(val) {
  return val.length <= 3; // Restrict images array to a maximum of 3 items
}

productSchema.pre('findOneAndDelete', async function (next) {
  const productId = this.getQuery()._id;

  try {
    // // console.log(`Deleting product with ID: ${productId}`);

    // Delete related orders
    const Order = mongoose.model('Order');
    const deletedOrders = await Order.deleteMany({ productId });
    // // console.log(`Deleted ${deletedOrders.deletedCount} orders associated with product ${productId}`);

    // Update Seller's productsSold
    const Seller = mongoose.model("Seller");
    const updatedSellers = await Seller.updateMany(
      { "productsSold.productId": productId },
      { $pull: { productsSold: { productId } } }
    );
    // // console.log(`Updated ${updatedSellers.modifiedCount} sellers by removing product ${productId} from productsSold`);

    // Update User's dealerProducts and carts
    const User = mongoose.model("User");
    const updatedUsers = await User.updateMany(
      { $or: [{ dealerProducts: productId }, { carts: productId }] },
      { $pull: { dealerProducts: productId, carts: productId } }
    );
    // // console.log(`Updated ${updatedUsers.modifiedCount} users by removing product ${productId} from dealerProducts and carts`);

    // Delete related payments
    const Payment = mongoose.model('Payment');
    const deletedPayments = await Payment.deleteMany({ productId });
    // // console.log(`Deleted ${deletedPayments.deletedCount} payments associated with product ${productId}`);

    next(); // Proceed with the deletion
  } catch (error) {
    console.error(`Error in pre-delete middleware for product ${productId}:`, error);
    next(error); // Pass the error to the next middleware
  }
}); 

const dealerProduct = mongoose.model("dealerProduct", productSchema);

export default dealerProduct;

