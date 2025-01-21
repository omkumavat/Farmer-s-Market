import React from "react";
import { useState, useEffect } from "react";
import { useAuth } from "../Context/AuthContext";
import axios from 'axios';
import MyOrderCard from "../cards/MyOrderCard";
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import '../DashboardCSS/myorders.css';

const MyOrderes = () => {
    const [orders, setOrders] = useState([]);
    const { currentUser } = useAuth();
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // Initialize navigate

    useEffect(() => {
        if (currentUser && currentUser._id) {
            axios.get(`https://farmer-dealer-user.vercel.app/server/orders/get-order/${currentUser._id}`)
                .then(response => {
                    // console.log(response.data.orders);
                    setOrders(response.data.orders);
                })
                .catch(error => {
                    console.error('Error fetching orders:', error);
                    setError('Failed to load orders');
                });
        }
    }, [currentUser]);

    return (
        <>
            <h2 className="hh1">Your Orders</h2>
            <div className="orders">
                {orders.length > 0 ? (
                    orders.map((product, index) => {
                        const idd = product.productId;
                        return (
                            <div key={index}>
                                <MyOrderCard {...product.productDetails} {...product} idd={idd} />
                            </div>
                        );
                    })
                ) : (
                    <div className="empty-order">
                        {error ? (
                            <p>{error}</p>
                        ) : (
                            <>
                                <p>You Have Not Done Any Order Please Do Order</p>
                                <button
                                    className="continue-shopping"
                                    onClick={() => navigate('/farmer')} // Navigate to the shopping page
                                >
                                    Continue Shopping
                                </button>
                            </>
                        )}
                    </div>
                )}
            </div>
        </>
    );
}

export default MyOrderes;
