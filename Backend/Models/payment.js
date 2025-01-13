import mongoose from "mongoose";
const paymentSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    razorpay_order_id: String,
    razorpay_payment_id: String,
    amount: Number,
    currency: String,
    status: { type: String, enum: ['success', 'failed'], default: 'success' },
    createdAt: { type: Date, default: Date.now },
  });
  
const payment =  mongoose.model('Payment', paymentSchema);
export default payment;
  