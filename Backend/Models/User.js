import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  mobileno: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  confirmpassword: {
    type: String,
    required: true,
  },
  profilePicture: {
    type: String,
    default:
      "https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTAxL3JtNjA5LXNvbGlkaWNvbi13LTAwMi1wLnBuZw.png",
  },
  orders:[
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order',
    }
  ],
  dealerProducts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'DealerProduct', // Reference to DealerProduct model
    },
  ],
  farmerProducts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'FarmerProduct', // Reference to FarmerProduct model
    },
  ],
  role: {
    type: String,
    enum: ['dealer', 'farmer', 'other'], // User roles
    default: 'other',
  },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;
