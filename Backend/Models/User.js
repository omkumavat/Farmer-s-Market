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
  verified: { type: Boolean, default: false },
  profilePicture: {
    type: String,
    default:
      "https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTAxL3JtNjA5LXNvbGlkaWNvbi13LTAwMi1wLnBuZw.png",
  },
  orders: [
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

export const User = mongoose.model('User', userSchema);

const VerificationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  mobileno: { type: String, required: true },
  location:{type:String,required:true},
  licenseImage: { type: String, required: true },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' }
});

export const Verification = mongoose.model('Verification', VerificationSchema);
