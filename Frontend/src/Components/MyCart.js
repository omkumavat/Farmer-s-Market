import React, { useState, useEffect } from "react";
import DealerPCard from "./DealerPCard";
import axios from "axios";
import { useAuth } from "../Context/AuthContext";
const MyCart = () => {
    const [cart, setCart] = useState([]);
    const { currentUser } = useAuth();
    const [error, setError] = useState(null);

    useEffect(() => {
        if (currentUser && currentUser._id) {
            axios.get(`http://localhost:4000/server/dealer/getcart/${currentUser._id}`)
                .then(response => {
                    setCart(response.data.cart);
                })
                .catch(error => {
                    console.error('Error fetching cart:', error);
                    setError('Failed to load cart');
                });
        }
    }, [currentUser]);
    return (
        <>
            <div>
                {error && <p>{error}</p>}
                <ul>
                    {cart.length === 0 ? (
                        <li>Your cart is empty</li>
                    ) : (
                        <><h2 className="hh">Your Cart</h2>
                        <div className="productlist">
                            {cart.map((product, index) => (
                                <div key={index}>
                                    {<DealerPCard {...product} />}
                                </div>
                            ))}
                        </div>
                        </>
                    )}
                </ul>
            </div>
        </>
    );
}

export default MyCart;