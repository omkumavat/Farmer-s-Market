import mongoose from 'mongoose';
import dealerProduct from './dealerProducts.js';
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  mobileno: { type: String, required: true },
  password: { type: String, required: true },
  confirmpassword: { type: String, required: true },
  verified: { type: Boolean, default: false },
  profilePicture: { 
    type: String,
    default: "https://static.vecteezy.com/system/resources/previews/005/544/718/original/profile-icon-design-free-vector.jpg"
  },
  orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }],
  carts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'dealerProduct', // Reference to dealerProduct
  }, {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'FarmerProduct', // Reference to FarmerProduct
  }],
  dealerProducts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'dealerProduct' }],
  farmerProducts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'FarmerProduct' }],
  role: { type: String, enum: ['dealer', 'farmer', 'other'], default: 'other' },
  sellerId: { type: mongoose.Schema.Types.ObjectId, ref: "Seller" },
}, { timestamps: true });


const VerificationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  mobileno: { type: String, required: true },
  location: { type: String, required: true },
  licenseImage: { type: String, required: true },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' }
});

const TicketSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  mobileno: { type: String, required: true },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  query: { type: String, required: true },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ['pending', 'responded'],
    default: 'pending'
  },
  response: {
    type: String,
    default: ''
  },
  responseDate: {
    type: Date,
    default: null
  }
});

export const User = mongoose.model('User', userSchema);
export const Verification = mongoose.model('Verification', VerificationSchema);
export const Ticket = mongoose.model('Ticket', TicketSchema);
