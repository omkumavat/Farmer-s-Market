import React, { useState } from 'react';
function PaymentButton() {
  const [amount, setAmount] = useState(100); // Amount in INR (100 INR)

  
  const handlePayment = async () => {
    try {
      const response = await fetch('https://farmer-dealer-user.vercel.app/api/payment/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount }),
      });

      const order = await response.json();



      // Create Razorpay options object
      const options = {
        key: 'rzp_test_nwUngHToxCY8p6', // Replace with your Razorpay Key ID
        amount: order.amount * 100, // Amount in paise
        currency: order.currency,
        name: 'Your Company Name',
        description: 'Payment for your product',
        order_id: order.id,
        handler: function (response) {
          alert('Payment Successful');
          // console.log(response);
        },
        prefill: {
          name: 'Customer Name',
          email: 'customer@example.com',
          contact: '9876543210',
        },
        theme: {
          color: '#F37254', // Customize the color
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open(); // Open the Razorpay checkout window
    } catch (error) {
      console.error('Error during payment:', error);
      alert('Error while initiating payment');
    }
  };

  return (
    <div>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Enter amount"
      />
      <button onClick={handlePayment}>Pay Now</button>
    </div>
  );
}

export default PaymentButton;