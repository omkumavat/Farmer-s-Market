import express from 'express';
import Razorpay from 'razorpay';
const router = express.Router();



// Initialize Razorpay instance with your credentials
const razorpay = new Razorpay({
  key_id: 'rzp_test_nwUngHToxCY8p6', // Replace with your Razorpay Key ID
  key_secret: '0Wk9jAFK98lmnZIzcF2rfIkX' // Replace with your Razorpay Key Secret
});

router.post('/create-order', async (req, res) => {
  const { amount } = req.body; // Amount in INR (in paise, e.g., 100 INR = 10000 paise)
  try {
    const order = await razorpay.orders.create({
      amount: amount * 100, // Convert amount to paise
      currency: 'INR',
      receipt: 'receipt#1',
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

export default router;
