import React from "react";
import { useState, useEffect } from "react";
import { useAuth } from "../Context/AuthContext";
import axios from 'axios';
import MyOrderCard from "../cards/MyOrderCard";
import '../CSS/mycart.css'
const MyOrderes = () => {
    const [orders, setOrders] = useState([]);
    const { currentUser } = useAuth();
    const [error, setError] = useState(null);

    useEffect(() => {
        if (currentUser && currentUser._id) {
            axios.get(`http://localhost:4000/server/orders/get-order/${currentUser._id}`)
                .then(response => {
                    console.log(response.data.orders);
                    setOrders(response.data.orders);
                })
                .catch(error => {
                    console.error('Error fetching cart:', error);
                    setError('Failed to load cart');
                });
        }
    }, [currentUser]);

    return (
        <div className="orders">
            {orders && orders.map((product, index) => {
                const idd = product.productId._id;
                return (
                    <div key={index}>
                        <MyOrderCard {...product.productId} {...product} idd={idd} />
                    </div>
                );
            })}

        </div>
    );
}

export default MyOrderes;