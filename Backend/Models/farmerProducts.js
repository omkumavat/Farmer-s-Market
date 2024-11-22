import mongoose from "mongoose";
import { User } from "./User";
const farmerProductSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  category: { type: String, required: true },
  subCategory: { type: String, required: true },
  quantity: { type: String, required: true },
  pricePerUnit: { type: String, required: true },
  description: { type: String, required: true },
  images: [{ type: String, required: true }], // Stores image URLs or filenames
  qualityGrade: { type: String, required: true },
  unit: { type: String, required: true },
  farmAddress: { type: String, required: true },
  pincode: { type: String, required: true },
  districtState: { type: String, required: true },
  availableFrom: { type: Date, required: true },
  availableUntil: { type: Date, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true } // Reference to the User collection
}, { timestamps: true });

const FarmerProduct = mongoose.model("FarmerProduct", farmerProductSchema);

export default FarmerProduct;
