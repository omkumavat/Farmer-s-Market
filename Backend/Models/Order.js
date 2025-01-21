import mongoose from "mongoose";
import FarmerProduct from "./farmerProducts.js";
import dealerProduct from "./dealerProducts.js";

const orderSchema = new mongoose.Schema({
  productType: {
    type: String,
    required: true,
    enum: ["dealerProduct", "FarmerProduct"], 
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath:"productType"
  },

  buyer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", 
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
    type: Date, 
  },
  shippingAddress: {
    type: String,
    required: true, // Address for order delivery
  },
}, { timestamps: true });

const Order = mongoose.model("Order", orderSchema);

export default Order;
