import mongoose from "mongoose";

const farmerProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: [
      "Fruits",
      "Vegetables",
      "Grains & Cereals",
      "Dairy Products",
      "Pulses",
      "Spices & Herbs",
      "Honey & Beverages",
      "Other Products",
    ],
  },
  pricePerUnit: {
    type: Number,
    required: true,
  },
  quantityAvailable: {
    type: Number,
    required: true, // Weight (kg) or Units
  },
  description: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User model (Farmer)
    required: true,
  },
}, { timestamps: true });

const FarmerProduct = mongoose.model("FarmerProduct", farmerProductSchema);

export default FarmerProduct;
