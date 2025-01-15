import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  productType: {
    type: String,
    required: true,
    enum: ["DealerProduct", "FarmerProduct"], // To differentiate between product types
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "dealerProduct", 
    ref: "FarmerProduct"
  },
  buyer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the seller (dealer for dealer products, farmer for farmer products)
    required: true,
  },
  quantity: {
    type: Number,
    required: true, // Quantity ordered
  },
  totalPrice: {
    type: Number,
    required: true, // Calculated total price
  },
  orderStatus: {
    type: String,
    enum: ["Pending", "Completed", "Cancelled"],
    default: "Pending",
  },
  paymentStatus: {
    type: String,
    enum: ["Paid", "Unpaid"],
    default: "Unpaid",
  },
  orderDate: {
    type: Date,
    default: Date.now,
  },
  deliveryDate: {
    type: Date, // Optional delivery date
  },
  shippingAddress: {
    type: String,
    required: true, // Address for order delivery
  },
}, { timestamps: true });

const Order = mongoose.model("Order", orderSchema);

export default Order;
