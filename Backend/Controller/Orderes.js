import dealerProduct from "../Models/dealerProducts.js";
import FarmerProduct from "../Models/farmerProducts.js";
import Order from "../Models/Order.js";
import { User } from "../Models/User.js";
import Seller from "../Models/Seller.js";

export const createOrder = async (req, res) => {
    try {
        const { productId, quantity, price, shippingAddress, buyer,sellerId } = req.body;


        const product = await dealerProduct.findById(productId);
        const productType = "DealerProduct";
        if (!product) {
            productType = "FarmerProduct";
            product = await FarmerProduct.findById(productId);
        }

        // Check if the user exists
        const user = await User.findById(buyer);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Create a new order
        console.log(sellerId)
        const order = new Order({
            productType,
            productId,
            buyer,
            seller:sellerId,
            quantity,
            totalPrice: price * quantity,
            orderStatus: "Completed",
            paymentStatus: "Paid",
            shippingAddress,
        });

        // Save the order
        await order.save();

        user.orders.push(order._id);
        user.save();

        const sellers = await Seller.findById(sellerId);
        console.log(sellers);
        sellers.totalSales += price * quantity;
        sellers.totalOrders += 1;

        const productIndex = sellers.productsSold.findIndex(
            (item) => item.productId.toString() === productId
        );

        if (productIndex >= 0) {
            // Update existing product sales data
            sellers.productsSold[productIndex].quantity += quantity;
            sellers.productsSold[productIndex].revenue += price * quantity;
        } else {
            // Add new product sales data
            sellers.productsSold.push({
                productId,
                quantity,
                revenue: price * quantity,
            });
        }

        await sellers.save();

        res.status(201).json({ message: 'Order created successfully', order });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const getOrders = async (req, res) => {
    try {
        const userId = req.params.id;

        const user = await User.findById(userId).populate({
            path: 'orders',
            populate: [
                { path: 'buyer', select: 'name email' },
                { path: 'seller', select: 'name email' },
                { path: 'productId' },
            ],
        });
        const orders = user.orders;

        // Send the orders to the front-end or render the dashboard
        res.status(200).json({ success: true, orders });
    } catch (error) {
        console.error('Error fetching user orders:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch orders' });
    }
};
