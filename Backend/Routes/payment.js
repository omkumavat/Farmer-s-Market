import express from 'express';
import Razorpay from 'razorpay';
import crypto from 'crypto'; // For signature verification
import payment from '../Models/payment.js';
const router = express.Router();

// Razorpay instance
const razorpay = new Razorpay({
  key_id: 'rzp_test_nwUngHToxCY8p6',
  key_secret: '0Wk9jAFK98lmnZIzcF2rfIkX',
});

// Create order
router.post('/create-order', async (req, res) => {
  const { amount } = req.body;
  try {
    const order = await razorpay.orders.create({
      amount: amount * 100, // Amount in paise
      currency: 'INR',
      receipt: `receipt_${Date.now()}`,
    });

    res.json({
      id: order.id,
      currency: order.currency,
      amount: order.amount / 100, // Amount in INR
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error creating order');
  }
});

// Payment verification and saving
router.post('/verify-payment', async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, userId, productId } = req.body;

  try {
    // Create the expected signature
    const generated_signature = crypto
      .createHmac('sha256', razorpay.key_secret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');

    // Verify the signature
    if (generated_signature === razorpay_signature) {
      // Save payment to DB
      const paymentData = new payment({
        userId,
        productId,
        razorpay_order_id,
        razorpay_payment_id,
        amount: req.body.amount,
        currency: 'INR',
        status: 'success',
      });

      await paymentData.save(); 
      res.json({ message: 'Payment verified and saved successfully' });
    } else {
      res.status(400).send('Invalid payment signature');
    }
  } catch (error) {
    console.error('Error verifying payment:', error);
    res.status(500).send('Error verifying payment');
  }
});

export default router;
