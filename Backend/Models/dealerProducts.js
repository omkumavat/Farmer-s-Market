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
  },
}, { timestamps: true }); // Add timestamps for createdAt and updatedAt

function arrayLimit(val) {
  return val.length <= 3; // Restrict images array to a maximum of 3 items
}
const dealerProduct = mongoose.model("dealerProduct", productSchema);

export default dealerProduct;
