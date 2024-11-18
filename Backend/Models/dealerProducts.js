import mongoose from "mongoose";

const dealerProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: [
      "Machinery",
      "Equipment",
      "Fertilizers",
      "Pesticides",
      "Seeds",
      "Irrigation Tools",
      "Farm Animals",
    ],
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User model (Dealer)
    required: true,
  },
}, { timestamps: true });

const DealerProduct = mongoose.model("DealerProduct", dealerProductSchema);

export default DealerProduct;
